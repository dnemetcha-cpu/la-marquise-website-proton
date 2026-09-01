import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Marquise — Restaurant & Lounge",
    short_name: "La Marquise",
    description: "Restaurant & lounge in Bonapriso, Douala.",
    theme_color: "#5a1820",
    background_color: "#f5f0e9",
    display: "standalone",
    orientation: "portrait",
    start_url: "/",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
