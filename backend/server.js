const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const { homeRouter } = require("./routes/home");
const { productRouter } = require('./routes/products');
const { remarksRouter } = require('./routes/remarks');
const { chatRouter } = require('./routes/chat');

const app = express();

app.use(cors())

mongoose
  .connect("mongodb://localhost/showroom", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to mongodb.."))
  .catch((err) => console.log(`Error in connecting to mongodb ${err}`));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("I am root");
});

app.use("/accounts", homeRouter);
app.use('/products', productRouter)
app.use('/remarks', remarksRouter)
app.use('/chat', chatRouter)

const port = 5000 || process.env.port;
app.listen(port, () => {
  console.log("Server is running at port " + port);
});
