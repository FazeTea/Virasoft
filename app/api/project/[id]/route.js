import dbConnect from "../../../lib/projectmodel";
import projectmodel from "../../../lib/projectmodel";
import { NextResponse } from "next/server";

// The `GET` function is executed when you make a request to this API
export async function GET(a, { params }) {
  // If `params` or `params.id` is undefined, return an error
  const { id } = await params; // Destructure the `id` from params

  await dbConnect(); // Connect to the database

  try {
    const data = await projectmodel.findById(id); // Fetch project by `id`
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
