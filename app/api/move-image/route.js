import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // Construct full paths for the temp file and final destination
    const tempFilePath = path.join(process.cwd(), "public", imageUrl.replace("/temp/", "temp/")); // Adjust for public folder
    const finalDir = path.join(process.cwd(), "public/projects");

    // Ensure the file exists before attempting to move it
    if (!fs.existsSync(tempFilePath)) {
      return NextResponse.json({ error: "File not found in temp directory" }, { status: 404 });
    }

    // Ensure final directory exists
    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }

    const finalFilePath = path.join(finalDir, path.basename(tempFilePath));

    // Move the file
    fs.renameSync(tempFilePath, finalFilePath);

    const finalUrl = `/projects/${path.basename(finalFilePath)}`;
    return NextResponse.json({ imageUrl: finalUrl }, { status: 200 });
  } catch (error) {
    console.error("Error moving file:", error);
    return NextResponse.json({ error: "Error moving file" }, { status: 500 });
  }
}
