import dbConnect from "../../lib/dbConnect";
import ProjectModel from "../../lib/projectmodel";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const data = await ProjectModel.find({});
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json(); // Parse JSON body
    console.log({ body });

    const data = await ProjectModel.create(body?.body);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const { body } = await req.json(); // Parse JSON body

    const { _id: id, ...updateFields } = body; // Extract `id` and update fields

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(id, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators
    });

    if (!updatedProject) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
export async function DELETE(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id);

    if (!deletedProject) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedProject }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
