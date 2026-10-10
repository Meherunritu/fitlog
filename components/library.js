"use client";
import { useState } from "react";
import { ArrowDown, Search, RefreshCw } from "lucide-react";
import { useFit } from "./fit-provider";
import { WorkoutCard, Loading, Empty } from "./ui";
export function Library() {
  const { workouts, loading, source, retry } = useFit();
  const [query, setQuery] = useState("");
  const filtered = workouts.filter((w) =>
    `${w.name} ${w.categories.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            WORKOUT LIBRARY
          </p>
          <h1>
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>
          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <a className="btn primary" href="#library">
            BROWSE WORKOUTS <ArrowDown size={18} />
          </a>
        </div>
        <div className="hero-art">
          <img
            src="/images/hero.webp"
            alt="Anatomical illustration of an athlete training on a preacher curl machine"
            fetchPriority="high"
          />
        </div>
      </section>
      <section id="library" className="container library">
        <div className="section-heading">
          <div>
            <h2>THE LIBRARY</h2>
            <p>Twelve lifts covering every major muscle group.</p>
          </div>
          <label className="search">
            <Search size={17} />
            <input
              aria-label="Search workouts by name or tag"
              placeholder="Search workouts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        {!loading && source !== "live" && (
          <div className="api-note" role="status">
            <span>
              {source === "sample"
                ? "Live API unavailable — showing 12 offline sample workouts."
                : "Live API unavailable — showing your last cached workout data."}
            </span>
            <button onClick={retry}>
              <RefreshCw size={14} /> Retry live API
            </button>
          </div>
        )}
        {loading ? (
          <Loading cards />
        ) : filtered.length ? (
          <div className="workout-grid">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        ) : (
          <Empty search />
        )}
      </section>
    </>
  );
}
