import type { Qr } from "$lib/types";
import { Dexie, type EntityTable } from "dexie";

const db = new Dexie("QREncode") as Dexie & {
  qrs: EntityTable<
    Qr,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  qrs: "++id, type, content, imageB64, createdAt", // primary key "id" (for the runtime!)
});

export { db };
