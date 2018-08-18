const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));

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

app.listen(4567);
