#!/usr/bin/env node
/**
 * Dual PDF Report Generator — compiles deterministic PDFs/XLSX from canonical JSON.
 *
 * Inputs (per vehicle under --data-root):
 *   VEHICLE_MANIFEST.json
 *   SPATIAL_EVIDENCE.json
 *
 * See Docs/Architecture/DUAL_PDF_REPORT_GENERATION_ENGINE.md
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Handlebars from "handlebars";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MISSING_BLOCKING = new Set(["NOT_MEASURED", "RESEARCH_REQUIRED"]);

function parseArgs(argv) {
  const out = {
    vehicle: "VEH-000042",
    format: ["pdf", "xlsx"],
    types: ["client", "internal", "photosheet"],
    dataRoot: path.join(ROOT, "dev/fixtures/vehicles"),
    templateRoot: path.join(ROOT, "dev/templates/reports"),
    outDir: null,
    allowIncomplete: false,
    forceClientDraft: false,
    mode: "package",
  };

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = argv[i + 1];
    if (a === "--vehicle" && next) {
      out.vehicle = next;
      i++;
    } else if (a === "--format" && next) {
      out.format = next.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      i++;
    } else if ((a === "--types" || a === "--type") && next) {
      out.types = next.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      i++;
    } else if (a === "--data-root" && next) {
      out.dataRoot = path.resolve(next);
      i++;
    } else if (a === "--template-root" && next) {
      out.templateRoot = path.resolve(next);
      i++;
    } else if (a === "--out-dir" && next) {
      out.outDir = path.resolve(next);
      i++;
    } else if (a === "--allow-incomplete") {
      out.allowIncomplete = true;
    } else if (a === "--force-client-draft") {
      out.forceClientDraft = true;
    } else if (a === "--internal-only") {
      out.mode = "internal";
      out.types = ["internal"];
      out.format = ["pdf"];
    } else if (a === "--help" || a === "-h") {
      out.help = true;
    }
  }

  if (!out.outDir) {
    out.outDir = path.join(ROOT, "artifacts/reports", out.vehicle);
  }
  return out;
}

function usage() {
  console.log(`Usage:
  node scripts/generate-reports.mjs --vehicle VEH-000042 [--format pdf,xlsx]
       [--types client,internal,photosheet] [--out-dir DIR] [--data-root DIR]
       [--allow-incomplete] [--force-client-draft] [--internal-only]
`);
}

function sha256Buffer(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function sha256File(filePath) {
  return sha256Buffer(fs.readFileSync(filePath));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateCanonical(manifest, spatial, { allowIncomplete }) {
  const errors = [];
  if (!manifest?.vehicle?.vin) errors.push("VEHICLE_MANIFEST.vehicle.vin required");
  if (!manifest?.vehicle?.make) errors.push("VEHICLE_MANIFEST.vehicle.make required");
  if (!manifest?.assessment?.suitability_rating) {
    errors.push("VEHICLE_MANIFEST.assessment.suitability_rating required");
  }
  if (!spatial?.capture?.session_id) errors.push("SPATIAL_EVIDENCE.capture.session_id required");
  if (!Array.isArray(spatial?.zones)) errors.push("SPATIAL_EVIDENCE.zones[] required");

  const missing = (spatial.missing_registers || []).filter((r) =>
    MISSING_BLOCKING.has(String(r.status || "").toUpperCase()),
  );
  const hasMissing = missing.length > 0;

  if (errors.length) {
    const msg = `Schema validation failed:\n- ${errors.join("\n- ")}`;
    if (!allowIncomplete) throw new Error(msg);
    console.warn(msg);
  }

  return { hasMissing };
}

function buildViewModel(vehicleId, manifest, spatial, sourceHash, hasMissing) {
  const stamp = new Date().toISOString();
  return {
    report: {
      id: `${vehicleId}`,
      timestamp: stamp,
      source_hash: sourceHash,
      has_missing_data: hasMissing,
    },
    vehicle: manifest.vehicle,
    assessment: manifest.assessment,
    pathways: manifest.pathways || [],
    inspection_photos: spatial.photos || manifest.inspection_photos || [],
    spatial_zones: spatial.zones || [],
    metrology: spatial.metrology || [],
    missing_registers: spatial.missing_registers || [],
    capture: spatial.capture || { session_id: "UNKNOWN" },
  };
}

function renderTemplate(templateRoot, name, viewModel) {
  const templatePath = path.join(templateRoot, name);
  const html = fs.readFileSync(templatePath, "utf8");
  return Handlebars.compile(html)(viewModel);
}

async function htmlToPdf(html, pdfPath) {
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", right: "15mm", bottom: "15mm", left: "15mm" },
    });
  } finally {
    await browser.close();
  }
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Minimal XLSX (Office Open XML) without external deps — one sheet. */
function writeSummaryXlsx(filePath, viewModel) {
  const rows = [
    ["Field", "Value"],
    ["vehicle_id", viewModel.report.id],
    ["vin", viewModel.vehicle.vin],
    ["make_model", `${viewModel.vehicle.make} ${viewModel.vehicle.model}`],
    ["gvwr_lbs", viewModel.vehicle.gvwr],
    ["odometer_miles", viewModel.vehicle.odometer],
    ["suitability_rating", viewModel.assessment.suitability_rating],
    ["capture_session_id", viewModel.capture.session_id],
    ["source_hash", viewModel.report.source_hash],
    ["has_missing_data", viewModel.report.has_missing_data],
  ];
  for (const p of viewModel.pathways) {
    rows.push([`pathway:${p.option}`, `${p.architecture} | ${p.est_range} | ${p.status}`]);
  }
  for (const z of viewModel.spatial_zones) {
    rows.push([`zone:${z.zone_id}`, `${z.measured_vol} gap=${z.tolerance_gap}`]);
  }

  const sheetRows = rows
    .map(
      (r, i) =>
        `<row r="${i + 1}"><c r="A${i + 1}" t="inlineStr"><is><t>${escapeXml(r[0])}</t></is></c>` +
        `<c r="B${i + 1}" t="inlineStr"><is><t>${escapeXml(r[1])}</t></is></c></row>`,
    )
    .join("");

  const sheetXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">` +
    `<sheetData>${sheetRows}</sheetData></worksheet>`;

  const workbookXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ` +
    `xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">` +
    `<sheets><sheet name="Summary" sheetId="1" r:id="rId1"/></sheets></workbook>`;

  const relsXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>` +
    `</Relationships>`;

  const wbRelsXml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">` +
    `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>` +
    `</Relationships>`;

  const contentTypes =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>` +
    `<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">` +
    `<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>` +
    `<Default Extension="xml" ContentType="application/xml"/>` +
    `<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>` +
    `<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>` +
    `</Types>`;

  // Build ZIP (store-only) manually
  const files = [
    { name: "[Content_Types].xml", data: Buffer.from(contentTypes, "utf8") },
    { name: "_rels/.rels", data: Buffer.from(relsXml, "utf8") },
    { name: "xl/workbook.xml", data: Buffer.from(workbookXml, "utf8") },
    { name: "xl/_rels/workbook.xml.rels", data: Buffer.from(wbRelsXml, "utf8") },
    { name: "xl/worksheets/sheet1.xml", data: Buffer.from(sheetXml, "utf8") },
  ];
  fs.writeFileSync(filePath, buildZipStore(files));
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return ~c >>> 0;
}

function buildZipStore(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const f of files) {
    const nameBuf = Buffer.from(f.name, "utf8");
    const data = f.data;
    const crc = crc32(data);
    const local = Buffer.alloc(30 + nameBuf.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(0, 8); // store
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);
    nameBuf.copy(local, 30);

    const central = Buffer.alloc(46 + nameBuf.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    nameBuf.copy(central, 46);

    localParts.push(local, data);
    centralParts.push(central);
    offset += local.length + data.length;
  }

  const centralDir = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, centralDir, end]);
}

const TEMPLATE_FOR_TYPE = {
  client: "client_template.html",
  internal: "engineering_template.html",
  photosheet: "photosheet_template.html",
};

const FILE_SUFFIX = {
  client: "client-report.pdf",
  internal: "internal-report.pdf",
  photosheet: "photosheet.pdf",
};

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    process.exit(0);
  }

  const vehicleDir = path.join(args.dataRoot, args.vehicle);
  const manifestPath = path.join(vehicleDir, "VEHICLE_MANIFEST.json");
  const spatialPath = path.join(vehicleDir, "SPATIAL_EVIDENCE.json");

  if (!fs.existsSync(manifestPath) || !fs.existsSync(spatialPath)) {
    throw new Error(
      `Missing canonical inputs under ${vehicleDir} (need VEHICLE_MANIFEST.json + SPATIAL_EVIDENCE.json)`,
    );
  }

  const manifestBuf = fs.readFileSync(manifestPath);
  const spatialBuf = fs.readFileSync(spatialPath);
  const sourceHash = sha256Buffer(Buffer.concat([manifestBuf, Buffer.from("\n"), spatialBuf]));

  const manifest = JSON.parse(manifestBuf.toString("utf8"));
  const spatial = JSON.parse(spatialBuf.toString("utf8"));
  const { hasMissing } = validateCanonical(manifest, spatial, args);

  if (hasMissing && args.types.includes("client") && !args.forceClientDraft && !args.allowIncomplete) {
    console.warn(
      "Missing-data registers present: client PDF will be marked draft. Pass --force-client-draft to acknowledge.",
    );
  }

  const baseView = buildViewModel(args.vehicle, manifest, spatial, sourceHash, hasMissing);
  fs.mkdirSync(args.outDir, { recursive: true });

  const artifacts = [];

  if (args.format.includes("pdf")) {
    for (const type of args.types) {
      const templateName = TEMPLATE_FOR_TYPE[type];
      if (!templateName) throw new Error(`Unknown report type: ${type}`);
      const view = {
        ...baseView,
        report: {
          ...baseView.report,
          id: `${args.vehicle}-${type}-${baseView.report.timestamp.replace(/[:.]/g, "")}`,
        },
      };
      const html = renderTemplate(args.templateRoot, templateName, view);
      const pdfName = `${args.vehicle}-${FILE_SUFFIX[type]}`;
      const pdfPath = path.join(args.outDir, pdfName);
      await htmlToPdf(html, pdfPath);
      const digest = sha256File(pdfPath);
      artifacts.push({ file: pdfName, sha256: digest, type: `pdf:${type}` });
      console.log(`Wrote ${pdfPath}`);
      console.log(`  sha256 ${digest}`);
    }
  }

  if (args.format.includes("xlsx")) {
    const xlsxName = `${args.vehicle}-summary.xlsx`;
    const xlsxPath = path.join(args.outDir, xlsxName);
    writeSummaryXlsx(xlsxPath, baseView);
    const digest = sha256File(xlsxPath);
    artifacts.push({ file: xlsxName, sha256: digest, type: "xlsx:summary" });
    console.log(`Wrote ${xlsxPath}`);
    console.log(`  sha256 ${digest}`);
  }

  const manifestOut = {
    schema_version: "1.0.0",
    vehicle_id: args.vehicle,
    generated_at: baseView.report.timestamp,
    source_hash: sourceHash,
    inputs: [
      { file: "VEHICLE_MANIFEST.json", sha256: sha256Buffer(manifestBuf) },
      { file: "SPATIAL_EVIDENCE.json", sha256: sha256Buffer(spatialBuf) },
    ],
    has_missing_data: hasMissing,
    artifacts,
    non_claims: [
      "DRAFT until operator attestation closes related evidence gates",
      "Not a certification or safety approval",
    ],
  };

  const manifestName = `${args.vehicle}-report-manifest.json`;
  const manifestOutPath = path.join(args.outDir, manifestName);
  fs.writeFileSync(manifestOutPath, `${JSON.stringify(manifestOut, null, 2)}\n`);
  console.log(`Wrote ${manifestOutPath}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
