import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
