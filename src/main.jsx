import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./layout/Layout";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowseRouter>
      <App />
    </BrowseRouter>
  </AuthProvider>,
);
