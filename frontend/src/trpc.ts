import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "../../server/src/server";

export const trpc = createTRPCReact<AppRouter>();

export const client = trpc.createClient({
  links: [httpBatchLink({ url: import.meta.env.VITE_SERVER_URL })],
});
