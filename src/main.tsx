import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App.tsx";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Signal to prerenderer after React finishes rendering + Helmet updates <title>
// 2s delay ensures react-helmet-async has time to process all head tag updates
setTimeout(() => document.dispatchEvent(new Event("render-event")), 2000);
