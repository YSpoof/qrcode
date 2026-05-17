export interface Qr {
  id: number;
  type: "string";
  content: string;
  imageB64: string;
  createdAt: Date;
}

export const qrTypeNameMap: Record<Qr["type"], string> = {
  string: "Texto",
};

export interface WorkerRequestMessage {
  content: string;
  redundancy: "L" | "M" | "H";
  size: number;
  type: Qr["type"];
}

export interface WorkerResponseMessage {
  type: "error" | "result";
  result: string;
}

export interface Toast {
  id: number;
  message: string;
  type: "info" | "success" | "warning" | "error";
  duration: number;
}
