import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";

/**
 * Confirms the authenticated Clerk user owns the configured, verified admin
 * email. The browser never supplies an email or role to this check.
 */
export async function getTandaAdminUserId(
  req: Request,
  res: Response,
): Promise<string | null> {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Sign in to continue." });
    return null;
  }

  const allowedEmail = process.env.TANDA_ADMIN_EMAIL?.trim().toLowerCase();
  if (!allowedEmail) {
    req.log.error("TANDA_ADMIN_EMAIL is not configured");
    res.status(503).json({ error: "Logo management is not configured." });
    return null;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    const isApproved = user.emailAddresses.some(
      (address) =>
        address.emailAddress.trim().toLowerCase() === allowedEmail &&
        address.verification?.status === "verified",
    );
    if (!isApproved) {
      res.status(403).json({ error: "Administrator access is required." });
      return null;
    }
    return userId;
  } catch (error) {
    req.log.error({ err: error }, "Unable to verify logo administrator");
    res.status(503).json({ error: "Could not verify administrator access." });
    return null;
  }
}
