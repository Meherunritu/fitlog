export const API_BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];
const list = (value) =>
  Array.isArray(value)
    ? value.map(String)
    : String(value || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
const numeric = (value, fallback = 0) =>
  Number.parseFloat(String(value ?? "").replace(/[^\d.]/g, "")) || fallback;
export function normalizeWorkout(w) {
  const id = w.id ?? w._id;
  const name = w.name ?? w.title ?? w.workout_name;
  if (id == null || !name) throw new Error("Unexpected workout data format");
  return {
    id: String(id),
    name: String(name),
    image: w.image ?? w.image_url ?? w.thumbnail ?? "/images/workout.webp",
    categories: list(w.categories ?? w.category ?? w.tags ?? w.muscle_groups),
    equipment: list(w.equipment).join(", ") || "Bodyweight",
    duration: numeric(w.duration ?? w.duration_minutes ?? w.durationMin),
    calories: numeric(w.calories ?? w.calories_burned ?? w.caloriesBurned),
    rating: numeric(w.rating),
    difficulty: w.difficulty || "Not specified",
    sets: w.sets ?? "—",
    reps: w.reps ?? "—",
    description: w.description || "",
    instructions: list(w.instructions ?? w.steps),
  };
}
export function unwrapWorkouts(data) {
  const rows = Array.isArray(data)
    ? data
    : (data.workouts ??
      data.exercises ??
      data.data?.workouts ??
      data.data?.exercises ??
      data.data);
  if (!Array.isArray(rows) || !rows.length)
    throw new Error("No workouts returned");
  return rows.map(normalizeWorkout);
}
export async function fetchWorkouts(signal) {
  for (const base of API_BASES) {
    try {
      const response = await fetch(base, {
        signal: AbortSignal.any([signal, AbortSignal.timeout(6500)]),
      });
      if (!response.ok) throw new Error("API unavailable");
      return unwrapWorkouts(await response.json());
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  throw new Error("Both workout APIs are temporarily unavailable.");
}
export function sortWorkouts(rows, by = "duration") {
  return [...rows].sort((a, b) =>
    by === "rating" ? b.rating - a.rating : a[by] - b[by],
  );
}
export function planTotals(rows) {
  return rows.reduce(
    (t, w) => ({
      exercises: t.exercises + 1,
      minutes: t.minutes + w.duration,
      calories: t.calories + w.calories,
    }),
    { exercises: 0, minutes: 0, calories: 0 },
  );
}
export function addPlanItem(plan, workout) {
  if (plan.some((w) => w.id === workout.id))
    return { plan, error: "This workout is already in your plan." };
  if (plan.filter((w) => !w.done).length >= 5)
    return {
      plan,
      error: "Five active lifts is the limit. Finish or remove one first.",
    };
  return { plan: [...plan, { ...workout, done: false }] };
}
export function validStoredRows(rows) {
  return Array.isArray(rows)
    ? rows.filter(
        (w) =>
          w &&
          typeof w.id === "string" &&
          typeof w.name === "string" &&
          Number.isFinite(w.duration) &&
          Number.isFinite(w.calories),
      )
    : [];
}
export async function fetchWorkout(id, signal) {
  for (const base of API_BASES) {
    try {
      const response = await fetch(`${base}/${encodeURIComponent(id)}`, {
        signal: AbortSignal.any([signal, AbortSignal.timeout(6500)]),
      });
      if (!response.ok) throw new Error("Workout unavailable");
      const json = await response.json();
      return normalizeWorkout(
        json.workout ?? json.exercise ?? json.data ?? json,
      );
    } catch (error) {
      if (signal.aborted) throw error;
    }
  }
  throw new Error("Workout details unavailable");
}
