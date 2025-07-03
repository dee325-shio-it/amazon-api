const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

// Payment route
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  // const total = parseInt(req.query.total, 10);

  if (total > 0) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Amazon Server Running on PORT: ${PORT}`);
});

// Server listen
// app.listen(5001, (err) =>
//   const PORT = process.env.PORT || 5001;
// app.listen(PORT, (err) => {

//   {
//   if (err) throw err;
// console.log("Amazon Server Running on PORT: 5001,  http://localhost:5001");
// console.log(`Amazon Server Running on PORT: ${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// // GET route
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Success!" });
// });
// // payment/create?total=300

// // POST route for Stripe payment intent
// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.query.total);

//   if (total > 0) {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });

//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//         amount: total, //  this will show 300 if total=300
//       });
//     } catch (err) {
//       res.status(500).json({ error: "Stripe payment creation failed" });
//     }
//   } else {
//     res.status(403).json({
//       message: "Total must be greater than 0",
//     });
//   }
// });

// // Server start
// console.log("Using port 5001");
// app.listen(5001, (err) => {
//   if (err) throw err;
//   console.log("Amazon Server Running on PORT: 5001");
//   console.log("http://localhost:5001");
// });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_KEY);
// const app = express();

// app.use(cors({ origin: true }));
// app.use(express.json());

// // Simple GET route for health check
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Success!" });
// });

// // POST /payment/create?total=300
// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.query.total, 10);

//   if (total > 0) {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd",
//       });
//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//         amount: total,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(403).json({
//       message: "total must be greater than 0",
//     });
//   }
// });

// Start server
// const PORT = 5000;
// app.listen(PORT, (err) => {
//   if (err) throw err;
//   console.log(`Amazon server running on PORT: ${PORT}`);
// });
