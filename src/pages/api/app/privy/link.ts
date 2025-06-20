"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import { PrivyClient } from "@privy-io/server-auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID || !process.env.PRIVY_SECRET) {
      return res.status(400).json({ message: "Not configured" });
    }

    const privyClient = new PrivyClient(
      process.env.NEXT_PUBLIC_PRIVY_APP_ID,
      process.env.PRIVY_SECRET
    );

    // Or from header if sent that way
    const idToken =
      (req.headers["privy-id-token"] as string) ??
      (req.body.id_token as string);

    if (!idToken) {
      return res.status(401).json({ message: "Missing privy id_token" });
    }

    // Parse and verify the token
    const privyUser = await privyClient.getUser({ idToken });

    return res.status(200).json({
      user: privyUser,
    });
  } catch (error) {
    console.error("Error linking privy user:", error);
    return res
      .status(400)
      .json({ message: "Failed to link privy user", error: error });
  }
}
