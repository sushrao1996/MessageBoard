const express = require("express");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

let messages = [
  { user: "Sush", text: "Hi", added: new Date() },
  { user: "Rama", text: "Welcome", added: new Date() }
];

app.get("/", (req, res) => {
  let htmlResponse = `<h1>Message Board</h1>
  <a href="/newmessage">Add New Message</a>`;
  messages.forEach(msg => {
    htmlResponse += `
    <div>
    <h2>${msg.user}</h2>
    <p>Message: ${msg.text}</p>
    <p>Delivered on: ${msg.added}</p>
    </div>
    `;
  });
  res.send(htmlResponse);
});

app.get("/newmessage", (req, res) => {
  let userinput = `
  <h1>New Message</h1>
    <form method="post" action="/newmessage">

      <label for="user">Name</label>
      <input type="text" name="user" />

      <label for="messageText">Your Message</label>
      <input type="text" name="messageText" />

      <input type="submit" value="Submit" />
    </form>
  `;
  res.send(userinput);
});

app.post("/newmessage", (req, res) => {
  messages.push({
    user: req.body.user,
    text: req.body.messageText,
    added: new Date()
  });
  res.redirect("/");
});
const server = app.listen("8081", (req, res) => {
  console.log(`Server is running on port ${server.address().port}.`);
});
