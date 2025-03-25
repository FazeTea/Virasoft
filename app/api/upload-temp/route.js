import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parsing
  },
};

function convertToNodeRequest(req) {
  const readableStream = Readable.from(req.body);
  const nodeReq = Object.create(readableStream);
  nodeReq.headers = Object.fromEntries(req.headers.entries()); // Convert Headers to plain object
  return nodeReq;
}

export async function POST(req) {
  const tempDir = path.join(process.cwd(), "public/temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const form = formidable({
    uploadDir: tempDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB max file size
  });

  try {
    const nodeReq = convertToNodeRequest(req);

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(nodeReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    if (!files.file || !files.file[0]) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const file = files.file[0]; // Access the first file
    if (!file.newFilename) {
      return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }

    const fileName = path.basename(file.newFilename);
    const filePath = `temp/${fileName}`;

    return NextResponse.json({ imageUrl: filePath }, { status: 200 });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
