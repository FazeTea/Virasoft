import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(request) {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}

export async function DELETE(req: Request) {
  try {
    let { fileId } = await req.json(); // Extract fileId from request body
    fileId = fileId?.split("#")[1];
    console.log({ fileId });

    if (!fileId) {
      return NextResponse.json({ error: "File ID is required" }, { status: 400 });
    }

    // Delete the image from ImageKit
    await imagekit.deleteFile(fileId);

    return NextResponse.json({ message: "Image deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}
