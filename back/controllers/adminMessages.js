module.exports = function(app) {
  const fs = require("fs");

  const messages = "../routing/src/db/messages.json";

  app.get("/db/messages", (req, res) => {
    fs.readFile(messages, function(err, data) {
      let json = JSON.parse(data);
      res.json(json);
    });
  });

  //delete message

  app.post("/admin/messages/delete", (req, res) => {
    const { id } = req.body;
    fs.readFile(messages, function(err, data) {
      let json = JSON.parse(data);
      json.splice(json.findIndex(message => message.id == id), 1);
      fs.writeFile(messages, JSON.stringify(json), function(err) {
        if (err) res.json(json);
        res.json(json);
      });
    });
  });
};
