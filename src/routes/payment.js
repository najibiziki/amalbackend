import express from "express";
import { previewPayment, createPayment } from "../services/paymentService.js";

const router = express.Router();

router.post("/preview", async (req, res) => {
  try {
    const { amount } = req.body;

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const result = await previewPayment({
      amount: numericAmount,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Payment preview error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { amount, firstName, lastName, email, cvv, pan, expiryDate } =
      req.body;

    if (!amount || !firstName || !lastName || !pan || !cvv || !expiryDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment information",
      });
    }

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const notificationUrl = `${process.env.FRONTEND_URL}/api/payment/webhook`;

    const result = await createPayment({
      amount: numericAmount,
      firstName,
      lastName,
      email,
      cvv,
      pan,
      expiryDate,
      notificationUrl,
    });

    return res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Payment creation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
