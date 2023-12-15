import { PageContext } from "vike/types";
import { getComponentFramework } from "../island/core/component/utils";
import { PageShell } from "./PageShell";

async function agnosticRenderPageToString(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');
  
  const framework = getComponentFramework(Page);

  const handlers = {
    vue: async () => {
      const { renderToString: vueRenderToString } = await import(
        "vue/server-renderer"
      );
      const { createSSRApp } = await import("vue");
      const app = createSSRApp(Page, pageProps);
      return await vueRenderToString(app);
    },
    react: async () => {
      const { renderToString: reactRenderToString } = await import(
        "react-dom/server"
      );
      return reactRenderToString(
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      );
    },
  };
  const handler = handlers[framework];

  if (!handler) {
    throw new Error("No render handler available for " + framework);
  }

  return await handler();
}

export default agnosticRenderPageToString;
