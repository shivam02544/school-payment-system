import { connectDb } from "@/helper/connectDB";
import SchoolDetail from "@/models/schoolDetailModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();
  const schoolDetail = await SchoolDetail.findOne();
  return NextResponse.json(schoolDetail);
};
