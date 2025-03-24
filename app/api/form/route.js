import dbConnect from "../../lib/dbConnect";
import FormModel from "../../lib/formmodel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const data = await FormModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json(); // Parse JSON body

    const data = await FormModel.create(body?.body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
