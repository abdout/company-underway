import mongoose, { Schema } from "mongoose";

const optionSchema = new Schema({
  label: String,
  value: String,
});

const voltageOptionSchema = new Schema({
  lvSwgr: [optionSchema],
  lvTrafo: [optionSchema],
  lvCable: [optionSchema],
  lvRmu: [optionSchema],
  mvSwgr: [optionSchema],
  mvTrafo: [optionSchema],
  mvCable: [optionSchema],
  mvRmu: [optionSchema],
  hvSwgr: [optionSchema],
  hvTrafo: [optionSchema],
  hvCable: [optionSchema],
  hvRmu: [optionSchema],
  evSwgr: [optionSchema],
  evTrafo: [optionSchema],
  evCable: [optionSchema],
  evRmu: [optionSchema],
});

const projectSchema = new Schema(
  {
    customer: String,
    description: String,
    location: String,
    consultant: String,
    client: String,
    status: String,
    voltages: { LV: Boolean, MV: Boolean, HV: Boolean, EV: Boolean },
    lvOptions: voltageOptionSchema,
    mvOptions: voltageOptionSchema,
    hvOptions: voltageOptionSchema,
    evOptions: voltageOptionSchema,
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;