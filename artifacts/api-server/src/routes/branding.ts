import {
  GetAdminBrandLogoResponse,
  GetBrandLogoResponse,
  RemoveBrandLogoResponse,
  UpdateBrandLogoBody,
  UpdateBrandLogoResponse,
} from "@workspace/api-zod";
import { db, tandaBrandingTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { Router, type IRouter, type Request, type Response } from "express";
import { ObjectStorageService } from "../lib/objectStorage";
import { getTandaAdminUserId } from "../middlewares/tandaAdmin";

const router: IRouter = Router();
const objectStorageService = new ObjectStorageService();
const SITE_ID = "site";
const MAX_LOGO_BYTES = 3 * 1024 * 1024;
const ALLOWED_LOGO_TYPES = new Set([
  "image/apng",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const UPLOAD_PATH_PATTERN = /^\/objects\/uploads\/[0-9a-f-]{36}$/i;

async function getCurrentLogo() {
  const [record] = await db
    .select()
    .from(tandaBrandingTable)
    .where(eq(tandaBrandingTable.id, SITE_ID))
    .limit(1);

  return record ?? null;
}

function logoResponse(
  record: Awaited<ReturnType<typeof getCurrentLogo>>,
) {
  const storageKey = record?.logoObjectPath?.replace(/^\/objects\//, "");
  return {
    logoUrl: storageKey ? `/api/storage/objects/${storageKey}` : null,
    filename: record?.logoFilename ?? null,
    contentType: record?.logoContentType ?? null,
    updatedAt: record?.updatedAt?.toISOString() ?? null,
  };
}

async function deleteStoredLogo(
  req: Request,
  objectPath: string | null | undefined,
): Promise<void> {
  if (!objectPath) return;
  try {
    const file = await objectStorageService.getObjectEntityFile(objectPath);
    await file.delete({ ignoreNotFound: true });
  } catch (error) {
    req.log.warn({ err: error }, "Unable to remove replaced logo file");
  }
}

router.get("/branding/logo", async (_req, res): Promise<void> => {
  const record = await getCurrentLogo();
  res.json(GetBrandLogoResponse.parse(logoResponse(record)));
});

router.get(
  "/branding/logo/admin",
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getTandaAdminUserId(req, res);
    if (!userId) return;
    const record = await getCurrentLogo();
    res.json(GetAdminBrandLogoResponse.parse(logoResponse(record)));
  },
);

router.put(
  "/branding/logo",
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getTandaAdminUserId(req, res);
    if (!userId) return;

    const parsed = UpdateBrandLogoBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid logo details." });
      return;
    }

    const { objectPath, filename, contentType } = parsed.data;
    const safeFilename = filename
      .replace(/[\\/]/g, "")
      .replace(/[\u0000-\u001f\u007f]/g, "")
      .trim()
      .slice(0, 255);
    const normalizedType = contentType.trim().toLowerCase();
    if (
      !UPLOAD_PATH_PATTERN.test(objectPath) ||
      !safeFilename ||
      !ALLOWED_LOGO_TYPES.has(normalizedType)
    ) {
      res.status(400).json({ error: "Upload a supported image file." });
      return;
    }

    let objectFile;
    try {
      objectFile = await objectStorageService.getObjectEntityFile(objectPath);
    } catch {
      res.status(400).json({ error: "The uploaded image could not be found." });
      return;
    }

    const [metadata] = await objectFile.getMetadata();
    const actualType = String(metadata.contentType ?? "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    const actualSize = Number(metadata.size ?? 0);
    if (
      actualType !== normalizedType ||
      actualSize < 1 ||
      actualSize > MAX_LOGO_BYTES
    ) {
      res.status(400).json({ error: "The uploaded image is invalid or too large." });
      return;
    }

    const oldRecord = await getCurrentLogo();
    await objectStorageService.trySetObjectEntityAclPolicy(objectPath, {
      owner: userId,
      visibility: "public",
    });

    const [updated] = await db
      .insert(tandaBrandingTable)
      .values({
        id: SITE_ID,
        logoObjectPath: objectPath,
        logoFilename: safeFilename,
        logoContentType: normalizedType,
      })
      .onConflictDoUpdate({
        target: tandaBrandingTable.id,
        set: {
          logoObjectPath: objectPath,
          logoFilename: safeFilename,
          logoContentType: normalizedType,
          updatedAt: new Date(),
        },
      })
      .returning();

    if (oldRecord?.logoObjectPath && oldRecord.logoObjectPath !== objectPath) {
      await deleteStoredLogo(req, oldRecord.logoObjectPath);
    }
    res.json(UpdateBrandLogoResponse.parse(logoResponse(updated ?? null)));
  },
);

router.delete(
  "/branding/logo",
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getTandaAdminUserId(req, res);
    if (!userId) return;

    const oldRecord = await getCurrentLogo();
    if (oldRecord) {
      await db
        .update(tandaBrandingTable)
        .set({
          logoObjectPath: null,
          logoFilename: null,
          logoContentType: null,
          updatedAt: new Date(),
        })
        .where(eq(tandaBrandingTable.id, SITE_ID));
      await deleteStoredLogo(req, oldRecord.logoObjectPath);
    }
    res.json(RemoveBrandLogoResponse.parse({ success: true }));
  },
);

export default router;
