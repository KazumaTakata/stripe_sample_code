// const keyPublishable = process.env.PUBLISHABLE_KEY;
const keyPublishable = "pk_test_g7Ms2DsBHY35cWjejL9NK9Sh";
// const keySecret = process.env.SECRET_KEY;
const keySecret = "sk_test_tuIahCxwHn795ta50bFl70ik";

const express = require("express");
const app = express();
const stripe = require("stripe")(keySecret);
const bodyParser = require("body-parser");

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(express.static("statics"));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.render("customcheckout.pug", { keyPublishable: keyPublishable })
);

app.post("/charge", (req, res) => {
  let amount = 200;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "usd",
        customer: customer.id,
      })
    )
    .then(charge => res.render("charge.pug"));
});

app.listen(4569);
