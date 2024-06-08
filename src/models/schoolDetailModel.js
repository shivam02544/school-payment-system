import { Schema, model, models } from "mongoose";
const schoolDetails = new Schema({
  billGeneratedMonth: {
    type: Number,
  },
});
const SchoolDetail =
  models.schoolDetails || model("schoolDetails", schoolDetails);
export default SchoolDetail;
