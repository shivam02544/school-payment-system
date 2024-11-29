import { connectDb } from "@/helper/connectDB";
import StudentSchema from "@/models/studentModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let pageId = searchParams.get("pageId");
    await connectDb();
    const datas = await StudentSchema.findOne({ pageId: pageId });

    return NextResponse.json(datas);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(request) {
  try {
    await connectDb();
    const { id, pageId } = await request.json();
    await StudentSchema.updateOne({ _id: id }, { $set: { pageId: pageId } });
    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
}
