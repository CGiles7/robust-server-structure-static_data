const express = require("express");
const app = express();

const users = require("./data/users-data");
const states = require("./data/states-data");

// TODO: return an array of users from /users in form of { data: Array }
app.get("/users", (req, res) => {
  res.json({ data: users });
});

// TODO: return a single user by id from /users/:userId in form of { data: Object }
app.get("/users/:userId", (req, res, next) => {
  const { userId } = req.params;
  const foundUser = users.find((user) => user.id === Number(userId));

  if (foundUser) {
    res.json({ data: foundUser });
  } else {
    next(`User ID not found: ${userId}`);
  }
});

// TODO: return all states from /states in the form of { data: Array }
app.get("/states", (req, res) => {
  res.json({ data: states });
});

// TODO: Return a single state from /states/:stateCode in the form of { data: { stateCode: String, name: String } }
app.get("/states/:stateCode", (req, res, next) => {
  const { stateCode } = req.params;
  const stateName = states[stateCode];

  if (stateName) {
    res.json({ data: { stateCode: stateCode, name: stateName } });
  } else {
    next(`State code not found: ${stateCode}`);
  }
});

// TODO: add not-found handler
app.use((req, res, next) => {
  res.status(404).send(`Not found: ${req.originalUrl}`);
});

// TODO: Add error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error);
});

module.exports = app;

