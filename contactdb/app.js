const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

app.post("/", (req, res) => {
  try {
    if (!validateEmail(req.body.email)) {
      console.log("Bad email : " + req.body.email);
      return res.status(400).json({ message: "Bad email" });
    }
    fs.appendFileSync(
      `./messages/${Date.now()}`,
      `
		Name		: ${req.body.name}
		Email		:	${req.body.email}
		Content	:	${req.body.content}
		`
    );
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error" });
  }
});

app.listen(3113);
