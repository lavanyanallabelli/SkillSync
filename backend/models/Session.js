import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    skill: { type: String, required: true },
    tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", SessionSchema);
export default Session;
