import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const CHARI_API_KEY = process.env.CHARI_API_KEY;
const CHARI_BASE_URL =
  process.env.CHARI_BASE_URL || "https://sandbox.charimoney.com";

const MERCHANT_PHONE = process.env.CHARI_MERCHANT_PHONE;

const createRequestId = () => {
  return crypto.randomUUID();
};

const chariRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${CHARI_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Chari-Api-Key": CHARI_API_KEY,
      "C-Request-Id": createRequestId(),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Chari API error:", data);

    throw new Error(
      data?.message || data?.error || "Chari payment request failed",
    );
  }

  return data;
};

export const previewPayment = async ({ amount }) => {
  return await chariRequest(
    `/api/operations/merchant/payment/card/preview?phoneNumber=${encodeURIComponent(
      MERCHANT_PHONE,
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        amount,
      }),
    },
  );
};

export const createPayment = async ({
  amount,
  firstName,
  lastName,
  email,
  cvv,
  pan,
  expiryDate,
  notificationUrl,
}) => {
  return await chariRequest(
    `/api/operations/merchant/payment/card?phoneNumber=${encodeURIComponent(
      MERCHANT_PHONE,
    )}`,
    {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        amount,
        cvv,
        pan,
        expiryDate,

        keepAlive: false,

        "3dSecure": true,

        autoCapture: true,

        notificationUrl,

        email,
      }),
    },
  );
};
