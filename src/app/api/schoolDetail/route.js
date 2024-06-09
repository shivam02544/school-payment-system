import { connectDb } from "@/helper/connectDB";
import SchoolDetail from "@/models/schoolDetailModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();
  const schoolDetail = await SchoolDetail.findOne();
  const response = NextResponse.json({
    month: schoolDetail.billGeneratedMonth,
  });
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");
  return response;
};
