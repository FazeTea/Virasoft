import dbConnect from "../../../lib/projectmodel";
import ProjectModel from "../../../lib/projectmodel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    // Query to find documents where Highlight is true, sorted by `createdAt` in descending order
    const data = await ProjectModel.find({ Highlight: true }).select("title link thumbnail").sort({ createdAt: -1 }); // Sort by createdAt descending

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
