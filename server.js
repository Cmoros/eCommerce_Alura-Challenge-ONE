import jsonServer from "json-server";
import config from "./config.js";
import fs from "fs/promises";

const server = jsonServer.create();
const router = jsonServer.router(config.dbPath);
const middlewares = jsonServer.defaults();

server.use

server.get("/", async (req, res) => {
  const index = await fs.readFile("./index.html", "utf-8");
  res.status(200).end(index);
});

server.use(middlewares);
server.use(router);


server.listen(config.PORT_DB);