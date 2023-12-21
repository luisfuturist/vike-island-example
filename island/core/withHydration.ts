import integrations from "./integrations";

function withHydration(component: any, options?: any): any {
  const framework = (globalThis as any)["__framework"];
  const integration = integrations.find(
    (integration) => integration.name === framework
  );
  if (!integration) return component;

  const withHydration = integration.withHydration;
  if (!withHydration) return component;

  return withHydration(component, options);
}

export default withHydration;
