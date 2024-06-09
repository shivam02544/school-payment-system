import { connectDb } from "@/helper/connectDB";
import SchoolDetail from "@/models/schoolDetailModel";
import StudentSchema from "@/models/studentModel";
import StudentPaymentBillSchema from "@/models/studentPaymentModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDb();
    const studentBills = await StudentPaymentBillSchema.find();
    const allStudents = await StudentSchema.find();

    const billMap = new Map(
      studentBills.map((bill) => [bill.studentID.toString(), bill])
    );

    const mergedData = allStudents.map((student) => {
      const studentBill = billMap.get(student._id.toString());
      return {
        name: student.name,
        fatherName: student.fatherName,
        class: student.class,
        village: student.village,
        tuitionFee: studentBill ? studentBill.tuitionFee : null,
        transportFee: studentBill ? studentBill.transportFee : null,
        examFee: studentBill ? studentBill.examFee : null,
        lastRemainingFee: studentBill ? studentBill.lastRemainingFee : null,
        otherFee: studentBill ? studentBill.otherFee : null,
        dueFee: studentBill ? studentBill.dueFee : null,
        isExamFeeAdded: studentBill ? studentBill.isExamFeeAdded : null,
      };
    });

    return NextResponse.json(mergedData);
  } catch (error) {
    console.error("Error fetching student data:", error);
    return NextResponse.json(
      { error: "Failed to fetch student data." },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDb();
    const body = await request.json();
    const allBills = await StudentPaymentBillSchema.find();

    await Promise.all(
      allBills.map(async (bill) => {
        bill.otherFee = body.otherFee;
        bill.lastRemainingFee = bill.dueFee;
        bill.dueFee =
          bill.lastRemainingFee +
          bill.tuitionFee +
          bill.otherFee +
          bill.transportFee;

        if (body.examFee === "yes") {
          bill.dueFee += bill.examFee;
          bill.isExamFeeAdded = true;
        } else {
          bill.isExamFeeAdded = false;
        }

        bill.currentMonthPaidBill = 0;
        await bill.save();

        const studentDetail = await StudentSchema.findById(bill.studentID);
        studentDetail.otherFee = bill.dueFee;
        await studentDetail.save();
      })
    );

    let schoolDetail = await SchoolDetail.findOne();
    if (schoolDetail) {
      schoolDetail.billGeneratedMonth = new Date().getMonth();
    } else {
      schoolDetail = new SchoolDetail({
        billGeneratedMonth: new Date().getMonth(),
      });
    }
    await schoolDetail.save();

    return NextResponse.json({
      msg: "Bill generated successfully. You may see the students' bill after clicking on Show Bill button.",
    });
  } catch (error) {
    console.error("Error generating bill:", error);
    return NextResponse.json(
      { error: "Failed to generate bill." },
      { status: 500 }
    );
  }
};
