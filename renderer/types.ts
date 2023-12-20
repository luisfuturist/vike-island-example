import { Factory } from "~/island/core/types";

declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      pageProps?: PageProps;
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
          description?: string;
        };
      };
      config: Config;
    }
    interface Config {
      factories?: Record<string, Factory>
    }
  }
}

export type Page = (pageProps: PageProps) => React.ReactElement;
export type PageProps = Record<string, unknown>;
