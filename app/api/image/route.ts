import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: "public_9YXxFL1IDFKBLBtp5gRvmjcGD1o="!,
  privateKey: "https://ik.imagekit.io/pkjype9ax/"!,
  urlEndpoint: "private_eOovu+p/mKenfCTkN9U3dJxTtpg="!,
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
