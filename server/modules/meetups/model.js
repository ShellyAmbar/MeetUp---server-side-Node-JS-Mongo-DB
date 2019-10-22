import mongoose, { Schema } from "mongoose";

const MeetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, "Lenght of title must be at least 5 characters."]
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Lenght of title must be at least 10 characters."]
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "Group"
  }
});

export default mongoose.model("Meetup", MeetupSchema);
