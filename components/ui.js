"use client";
import { Clock3, Flame, Star, ArrowUpRight, Dumbbell } from "lucide-react";
import Link from "next/link";
export const detailHref = (w) => `/workout/?id=${encodeURIComponent(w.id)}`;
export function WorkoutImage({ workout, className = "" }) {
  return (
    <img
      className={className}
      src={workout.image || "/images/workout.webp"}
      alt={
        workout.sample
          ? "Workout illustration from the supplied design"
          : workout.name
      }
      loading="lazy"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/images/workout.webp";
      }}
    />
  );
}
export function Stats({ workout: w }) {
  return (
    <div className="stats-line">
      <span>
        <Clock3 />
        {w.duration} min
      </span>
      <span>
        <Flame />
        {w.calories} kcal
      </span>
      <span className="rating">
        <Star />
        {w.rating.toFixed(1)}
      </span>
    </div>
  );
}
export function Tags({ workout }) {
  return (
    <div className="tags">
      {workout.categories.map((c) => (
        <span className="badge" key={c}>
          {c}
        </span>
      ))}
    </div>
  );
}
export function WorkoutCard({ workout: w }) {
  return (
    <Link className="workout-card card" href={detailHref(w)}>
      <div className="card-image">
        <WorkoutImage workout={w} />
        <span className="open-icon">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="card-copy">
        <Tags workout={w} />
        <h3>{w.name}</h3>
        <p className="equipment">{w.equipment}</p>
        <Stats workout={w} />
      </div>
    </Link>
  );
}
export function Loading({ cards = false }) {
  return (
    <div role="status" aria-live="polite">
      <p className="loading-copy">
        <span className="loading loading-spinner loading-sm" /> Loading
        workouts…
      </p>
      {cards && (
        <div className="workout-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div className="skeleton skeleton-card" key={n} />
          ))}
        </div>
      )}
    </div>
  );
}
export function Empty({ search = false }) {
  return (
    <div className="empty">
      <Dumbbell size={44} />
      <h2>{search ? "NO MATCHING WORKOUTS" : "NOTHING HERE YET"}</h2>
      <p>
        {search
          ? "Try a different workout name or muscle group."
          : "Browse the library and add a lift to get today moving."}
      </p>
      {!search && (
        <Link className="btn primary" href="/">
          Go to workouts <ArrowUpRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function Sort({ value, onChange }) {
  return (
    <label className="sort-label">
      Sort By{" "}
      <select
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="duration">Duration</option>
        <option value="calories">Calories</option>
        <option value="rating">Rating</option>
      </select>
    </label>
  );
}
