import { connectDb } from "@/helper/connectDB";
import StudentSchema from "@/models/studentModel";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const option = +searchParams.get("option");
    const search = searchParams.get("search");
    let student = [];
    await connectDb();
    switch (option) {
      case 0:
        student = await StudentSchema.find();
        if (student.length === 0) return NextResponse.json({ name: true });
        return NextResponse.json(student, { status: 200 });
      case 1:
        student = await StudentSchema.find({ name: search });
        if (student.length === 0) return NextResponse.json({ name: true });
        return NextResponse.json(student, { status: 200 });
      case 2:
        student = await StudentSchema.find({ fatherName: search });
        if (student.length === 0) return NextResponse.json({ name: true });
        return NextResponse.json(student, { status: 200 });
      case 3:
        student = await StudentSchema.find({ village: search });
        if (student.length === 0) return NextResponse.json({ name: true });
        return NextResponse.json(student, { status: 200 });
      case 4:
        student = await StudentSchema.find({ class: search });
        if (student.length === 0) return NextResponse.json({ name: true });
        return NextResponse.json(student, { status: 200 });
    }
  } catch (error) {
    console.log(error);
  }
};
export const POST = async (request) => {
  try {
    await connectDb();
    const body = await request.json();
    const student = new StudentSchema(body);
    await student.save();
    const studentBill = new StudentPaymentBillSchema({
      studentID: student._id,
      tuitionFee: student.tuitionFee,
      dueFee: student.otherFee,
      transportFee: student.transportFee,
      examFee: student.examFee,
      otherFee: 0,
      billPaymentDetail: [],
      billGeneratedMonth: new Date().getMonth() - 1,
    });
    await studentBill.save();
    return NextResponse.json({ msg: "Student data saved successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const PUT = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();
  await StudentSchema.findByIdAndUpdate(id, body);
  const studentBill = await StudentPaymentBillSchema.findOne({ studentID: id });
  studentBill.tuitionFee = body.tuitionFee;
  studentBill.transportFee = body.transportFee;
  studentBill.examFee = body.examFee;
  studentBill.dueFee = body.otherFee;
  await studentBill.save();
  return NextResponse.json({ msg: "Student record updated successfully." });
};

export const DELETE = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  await StudentSchema.findByIdAndDelete(id);
  await StudentPaymentBillSchema.findOneAndDelete({ studentID: id });
  return NextResponse.json({ msg: "Student record deleted successfully." });
};
