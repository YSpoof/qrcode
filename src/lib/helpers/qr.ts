import { db } from "$lib/services/db";
import type { Qr } from "$lib/types";
import { liveQuery } from "dexie";

const addQr = async (qr: Omit<Qr, "id">) => {
  try {
    return await db.qrs.add(qr);
  } catch (error) {
    console.log("Error adding QR code to the database:", error);
    return null;
  }
};

const getAllQrs = liveQuery(() => db.qrs.orderBy("createdAt").reverse().toArray());

const normalizeCreatedAt = (value: Qr["createdAt"]): Date =>
  value instanceof Date ? value : new Date(value);

const sortDescByCreatedAt = (qrs: Qr[]) =>
  qrs.sort(
    (a, b) => normalizeCreatedAt(b.createdAt).getTime() - normalizeCreatedAt(a.createdAt).getTime(),
  );

const getQrsByDateRange = async (startDate?: Date, endDate?: Date): Promise<Qr[]> => {
  try {
    const allQrs = await db.qrs.toArray();
    const startMs = startDate?.getTime();
    const endMs = endDate?.getTime();

    const filtered = allQrs.filter((qr) => {
      const createdAtMs = normalizeCreatedAt(qr.createdAt).getTime();
      if (startMs != null && createdAtMs < startMs) return false;
      if (endMs != null && createdAtMs > endMs) return false;
      return true;
    });

    return sortDescByCreatedAt(filtered);
  } catch (error) {
    console.log("Error searching QR codes by date:", error);
    return [];
  }
};

const removeQr = async (id: number) => {
  try {
    await db.qrs.delete(id);
    return true;
  } catch (error) {
    console.log("Error removing QR code from the database:", error);
    return false;
  }
};

const removeAllQrs = async () => {
  try {
    await db.qrs.clear();
    return true;
  } catch (error) {
    console.log("Error clearing all QR codes from the database:", error);
    return false;
  }
};

export const qrHelper = {
  addQr,
  getAllQrs,
  getQrsByDateRange,
  removeQr,
  removeAllQrs,
};
