const mongoose = require("mongoose");

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

const users = [
  {
    _id: userIds[0],
    firstName: "John",
    lastName: "A",
    title: "Software Engineer",
    userName: "Jabsolu",
    email: "john@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    gender: 'Male',
    age: "27",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Jeff",
    lastName: "Wa",
    title: "Data Engineer",
    userName: "jeffwa",
    email: "jeff@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    gender: 'Male',
    age: "24",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 1,
  },
];

const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1], // Corrected the index to [1]
    firstName: "Steve",
    lastName: "Ralph",
    title: "Senior Software Engineer", // Corrected "Softare" to "Software"
    text: "Some really long random description",
    increasePriority: new Map([
      [userIds[0], true],
      [userIds[1], true],
    ]),
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1], // Corrected the index to [1]
    firstName: "Whatcha",
    lastName: "Doing",
    title: "Senior Software Engineer", // Corrected "Softare" to "Software"
    text: "Another really long random description. This one is longer than the previous one.",
    increasePriority: new Map([
      [userIds[0], true],
      [userIds[1], true],
    ]),
    picturePath: "p6.jpeg", // Corrected "userPicturePath" to "picturePath"
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment",
      "and another random comment",
      "no more random comments",
      "I lied, one more random comment",
    ],
  },
];

module.exports = { users, posts };
