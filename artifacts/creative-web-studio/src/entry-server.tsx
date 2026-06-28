import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import App from "./App";

function makeStaticHook(path: string) {
  return () => [path, () => {}] as [string, (to: string) => void];
}

export function render(path: string) {
  const context: { helmet?: HelmetServerState | null } = {};
  const hook = makeStaticHook(path);

  const html = renderToString(
    <HelmetProvider context={context}>
      <Router hook={hook}>
        <App />
      </Router>
    </HelmetProvider>
  );

  return { html, helmet: context.helmet };
}
