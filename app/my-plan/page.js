import { Suspense } from "react";
import { Plan } from "../../components/plan";
export const metadata = { title: "My Plan — FitLog" };
export default function Page() {
  return (
    <Suspense
      fallback={<div className="container page">Loading workouts…</div>}
    >
      <Plan />
    </Suspense>
  );
}
