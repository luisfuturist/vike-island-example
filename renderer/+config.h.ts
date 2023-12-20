import type { Config } from "vike/types";

export default {
  clientRouting: false,

  passToClient: ["pageProps", "urlPathname"],
  meta: {
    Page: {
      env: {
        client: false,
        server: true,
      },
    },
    factories: {
      env: {
        server: true,
        client: true,
      }
    }
  },
} satisfies Config;
