import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const tempDir = path.join(process.cwd(), "public/temp");

    // Check if the temp directory exists
    if (fs.existsSync(tempDir)) {
      // Read all files in the temp directory
      const files = fs.readdirSync(tempDir);

      // Delete each file
      files.forEach((file) => {
        const filePath = path.join(tempDir, file);
        fs.unlinkSync(filePath); // Delete file
      });
    }

    return NextResponse.json({ message: "Temp folder cleared successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error clearing temp folder:", error);
    return NextResponse.json({ error: "Failed to clear temp folder" }, { status: 500 });
  }
}
