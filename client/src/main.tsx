import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const transparentPixel =
  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

document.addEventListener(
  "error",
  (event) => {
    const image = event.target;
    if (
      image instanceof HTMLImageElement &&
      image.src.includes("/manus-storage/") &&
      !image.classList.contains("asset-fallback")
    ) {
      image.classList.add("asset-fallback");
      image.alt = "";
      image.src = transparentPixel;
    }
  },
  true,
);

createRoot(document.getElementById("root")!).render(<App />);
