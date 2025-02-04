import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { AppRouter } from "../../server/src/server";

export const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/api" })],
});
