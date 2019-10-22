import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "The name must contain least 4 characters."]
    },
    description: {
      type: String,
      required: true,
      unique: false,
      minlength: [10, "The description  must contain least 10 characters."]
    },
    category: {
      type: String,
      required: true,
      unique: false,
      minlength: [2, "The description  must contain least 2 characters."]
    },
    meetups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Meetup"
      }
    ]
  },
  { timestamps: true }
);
/**
 * create a meetup and add it to array in a group
 */
GroupSchema.statics.addMeetup = async function(id, args) {
  const Meetup = mongoose.model("Meetup");

  // adding group-id and arguments to a new element of meetup
  //the group id in the meetup is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });

  //find the group we provided  by its id
  // and push to the meetups array the new meetup.
  const group = await this.findByIdAndUpdate(id, {
    $push: { meetups: meetup.id }
  });

  return {
    meetup: await meetup.save(),
    group
  };
};
export default mongoose.model("Group", GroupSchema);
