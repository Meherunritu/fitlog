"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { useFit } from "./fit-provider";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="FitLog home">
      <Dumbbell size={27} />
      <span>FITLOG</span>
    </Link>
  );
}
export function Shell({ children }) {
  const path = usePathname();
  const { plan, saved } = useFit();
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav">
          <Brand />
          <nav aria-label="Main navigation">
            <Link
              href="/"
              className={path === "/" ? "active" : ""}
              aria-current={path === "/" ? "page" : undefined}
            >
              Workout
            </Link>
            <Link
              href="/my-plan/"
              className={path.startsWith("/my-plan") ? "active" : ""}
              aria-current={path.startsWith("/my-plan") ? "page" : undefined}
            >
              My Plan
            </Link>
          </nav>
          <div className="counters">
            <Link href="/my-plan/?tab=plan" className="counter filled">
              Plan <b>{plan.length}</b>
            </Link>
            <Link href="/my-plan/?tab=saved" className="counter">
              Saved <b>{saved.length}</b>
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="container footer-inner">
          <Brand />
          <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        </div>
      </footer>
    </>
  );
}
