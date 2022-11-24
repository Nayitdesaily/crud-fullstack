const { app } = require("./app.js");
const { db } = require("./utils/db");
const server = async () => {
  if (!db) {
    return (err) => console.log(err);
  }

  (await db).connection

  app.set("port", process.env.PORT || 3000);

  app.listen(app.get("port"), () => {
    console.log("server running", app.get("port"));
  });
};

server();
