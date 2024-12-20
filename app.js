const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

const postsRouter = require("./router/posts");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("root");
  // throw new Error("Errore simulato");
  res.send("Ciao mondo!");
});

app.use("/posts", postsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
