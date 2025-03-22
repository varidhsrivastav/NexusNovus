import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  // @ts-ignore
  apiVersion: "2024-12-18.acacia",
  appInfo: {
    name: "NexusNovus",
    version: "0.1.0",
  },
});
