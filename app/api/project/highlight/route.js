import dbConnect from "../../../lib/projectmodel";
import ProjectModel from "../../../lib/projectmodel";
import { NextResponse } from "next/server";

const escpos = require('escpos');
escpos.Network = require('escpos-network');

export async function GET() {
  await dbConnect();
  try {
    const device  = new escpos.Network('192.168.1.182', 9100);
    // const device  = new escpos.Network('66.181.177.160', 9100);
    const printer = new escpos.Printer(device);

    device.open(function(error){
        if (error) {
            return console.error('Connection Error:', error);
        }

        printer
            .align('ct')                // Center
            .style('B')                 // Bold text
            .size(2, 2)                 // Double Width & Height
            .text('HELLO WORLD')        // Big Text
            .size(1, 1)                 // Normal Text
            .text('Printing with Image') // Small Text
            .feed(5)                    // 🔥 Add 5 empty lines after image
            .cut()
            .close();
    });

    // Query to find documents where Highlight is true, sorted by `createdAt` in descending order
    const data = await ProjectModel.find({ Highlight: true }).select("title link thumbnail").sort({ createdAt: -1 }); // Sort by createdAt descending

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
