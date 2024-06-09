import { connectDb } from "@/helper/connectDB";
import SchoolDetail from "@/models/schoolDetailModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();
  const schoolDetail = await SchoolDetail.findOne({}, "billGeneratedMonth");
  const response = NextResponse.json(
    {
      month: schoolDetail.billGeneratedMonth,
    },
    { status: 200 }
  );
  return response;
};
