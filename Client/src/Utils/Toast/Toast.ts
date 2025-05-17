import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toast_fy(data: any) {
  const message = data?.msg;

  if (message && typeof message === "object") {
    const { type, content } = message;
    if (type === "success") toast.success(content);
    else if (type === "error") toast.error(content);
    else if (type === "info") toast.info(content);
  }
}
