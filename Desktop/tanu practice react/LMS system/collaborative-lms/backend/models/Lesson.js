import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    content: String,
    videoUrl: String,
    resources: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Lesson", lessonSchema);
