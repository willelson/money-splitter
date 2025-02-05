import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "../../server/src/server";

export const trpc = createTRPCReact<AppRouter>();

export const client = trpc.createClient({
  links: [httpBatchLink({ url: "http://localhost:3000/api" })],
});
