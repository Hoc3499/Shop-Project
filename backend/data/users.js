import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Bum",
    email: "bum@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Bem",
    email: "bem@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;