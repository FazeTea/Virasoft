import fs from "fs";
import path from "path"; // Add this import
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    let { imageUrl } = body;
    imageUrl = imageUrl.replace("/temp/", "/projects/");

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // Construct the full file path
    const folder = imageUrl.startsWith("/temp/") ? "temp" : "projects";
    const filePath = path.join(process.cwd(), "public", imageUrl.replace(`/${folder}/`, `${folder}/`));

    // Log the directory contents for debugging
    const dirPath = path.join(process.cwd(), "public", folder);
    console.log(
      `${folder} directory contents before delete:`,
      fs.existsSync(dirPath) ? fs.readdirSync(dirPath) : "Directory not found"
    );

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
