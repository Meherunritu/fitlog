import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "./globals.css";
import { FitProvider } from "../components/fit-provider";
import { Shell } from "../components/shell";
export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Train with intent. Log every set. Explore workouts and build your daily training plan.",
};
export default function Layout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <FitProvider>
          <Shell>{children}</Shell>
        </FitProvider>
      </body>
    </html>
  );
}
