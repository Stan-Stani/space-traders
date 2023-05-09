import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { FluentProvider, webDarkTheme, webLightTheme } from "@fluentui/react-components"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme} id="fluent-provider">
      <App  />
    </FluentProvider>
  </React.StrictMode>
)
