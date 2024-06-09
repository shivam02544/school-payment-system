import SchoolDetail from "@/models/schoolDetailModel";
import { connectDb } from "./connectDB";

export const getBillMonth = async () => {
  await connectDb();
  const schoolDetail = await SchoolDetail.findOne({}, "billGeneratedMonth");
  return schoolDetail.billGeneratedMonth;
};
