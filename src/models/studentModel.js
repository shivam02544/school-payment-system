import { Schema, model, models } from "mongoose";
const studentSchema = new Schema({
  name: String,
  fatherName: String,
  motherName: String,
  class: String,
  rollNo: String,
  dob: String,
  mobileNumber: String,
  aadharNumber: String,
  village: String,
  district: String,
  tuitionFee: String,
  transportFee: String,
  otherFee: String,
  examFee: String,
});
const StudentSchema =
  models.StudentSchema || model("StudentSchema", studentSchema);
export default StudentSchema;
