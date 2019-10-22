import Group from "./model";
import { Meetup } from "../meetups";

export const createGroup = async (req, res) => {
  const { name, description, category } = req.body;
  //name
  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Name of group must be provided." });
  } else if (typeof name != "string") {
    return res
      .status(400)
      .json({ error: true, message: "Type of name must be a string." });
  } else if (name.length < 5) {
    return res.status(400).json({
      error: true,
      message: "Lenght of name must be at least 5 characters."
    });
  }
  //description
  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "description of group must be provided." });
  } else if (typeof description != "string") {
    return res
      .status(400)
      .json({ error: true, message: "Type of description must be a string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Lenght of description must be at least 10 characters."
    });
  }
  //category
  if (!category) {
    return res
      .status(400)
      .json({ error: true, message: "category of group must be provided." });
  } else if (typeof category != "string") {
    return res
      .status(400)
      .json({ error: true, message: "Type of category must be a string." });
  } else if (category.length < 2) {
    return res.status(400).json({
      error: true,
      message: "Lenght of category must be at least 2 characters."
    });
  }

  const group = new Group({ name, description, category });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (error) {
    return res
      .status(400)
      .json({ error: true, message: "Error when creating group." });
  }
};

export const createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;
  //title
  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "title of meetup must be provided." });
  } else if (typeof title != "string") {
    return res
      .status(400)
      .json({ error: true, message: "Type of title must be a string." });
  } else if (title.length < 5) {
    return res.status(400).json({
      error: true,
      message: "Lenght of title must be at least 5 characters."
    });
  }

  //description
  if (!description) {
    return res.status(400).json({
      error: true,
      message: "description of meetup must be provided."
    });
  } else if (typeof description != "string") {
    return res
      .status(400)
      .json({ error: true, message: "Type of description must be a string." });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: "Lenght of description must be at least 10 characters."
    });
  }

  //group id
  if (!groupId) {
    return res.status(400).json({
      error: true,
      message: "group id must be provided."
    });
  }

  try {
    const { meetup, group } = await Group.addMeetup(groupId, {
      title,
      description
    });

    return res.status(201).json({ error: false, meetup, group });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "meetup can not be created."
    });
  }
};

export const getAllGroups = async (req, res) => {
  try {
    return res.status(200).json({ groups: await Group.find({}) });
  } catch (err) {
    return res
      .status(err.status)
      .json({ error: true, message: "error with groups" });
  }
};

export const getGroupMeetups = async (req, res) => {
  const { groupId } = req.params;

  //group id
  if (!groupId) {
    return res.status(400).json({
      error: true,
      message: "group id must be provided."
    });
  }

  const group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({
      error: true,
      message: "Group is not exist."
    });
  }

  try {
    return res.status(200).json({
      error: false,
      meetups: await Meetup.find({ group: groupId }).populate("group", "name")
    });
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: "Can not fetch Meetups to this group."
    });
  }
};
