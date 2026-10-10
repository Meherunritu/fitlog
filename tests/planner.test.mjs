import test from "node:test";
import assert from "node:assert/strict";
import {
  addPlanItem,
  planTotals,
  sortWorkouts,
  unwrapWorkouts,
  validStoredRows,
} from "../lib/workouts.mjs";
import { sampleWorkouts } from "../lib/sample-workouts.mjs";
test("duplicate workout cannot change plan count", () => {
  const plan = [sampleWorkouts[0]];
  const result = addPlanItem(plan, sampleWorkouts[0]);
  assert.equal(result.plan.length, 1);
  assert.ok(result.error);
});
test("five active workouts block a sixth; completing one frees a slot", () => {
  const plan = sampleWorkouts.slice(0, 5);
  assert.ok(addPlanItem(plan, sampleWorkouts[5]).error);
  const done = plan.map((w, i) => ({ ...w, done: i === 0 }));
  assert.equal(addPlanItem(done, sampleWorkouts[5]).plan.length, 6);
});
test("live metrics update after removal", () => {
  const plan = sampleWorkouts.slice(0, 2);
  assert.deepEqual(planTotals(plan), {
    exercises: 2,
    minutes: 40,
    calories: 300,
  });
  assert.deepEqual(planTotals(plan.slice(1)), {
    exercises: 1,
    minutes: 15,
    calories: 120,
  });
  assert.deepEqual(planTotals([]), { exercises: 0, minutes: 0, calories: 0 });
});
test("duration/calories sort ascending and rating descending without mutation", () => {
  const original = sampleWorkouts.map((w) => w.id);
  for (const key of ["duration", "calories", "rating"]) {
    const sorted = sortWorkouts(sampleWorkouts, key);
    for (let i = 1; i < sorted.length; i++)
      assert.ok(
        key === "rating"
          ? sorted[i - 1][key] >= sorted[i][key]
          : sorted[i - 1][key] <= sorted[i][key],
      );
  }
  assert.deepEqual(
    sampleWorkouts.map((w) => w.id),
    original,
  );
});
test("API wrappers and numeric strings normalize", () => {
  const [w] = unwrapWorkouts({
    data: [
      {
        id: 9,
        name: "Example",
        category: ["Chest"],
        duration: "25 min",
        calories: "180 kcal",
        rating: "4.8",
        equipment: ["Barbell", "Bench"],
      },
    ],
  });
  assert.equal(w.id, "9");
  assert.equal(w.duration, 25);
  assert.equal(w.calories, 180);
  assert.equal(w.equipment, "Barbell, Bench");
  assert.throws(() => unwrapWorkouts({ error: "rate limited" }));
});
test("bad browser storage entries are discarded", () => {
  assert.deepEqual(validStoredRows([null, {}, "bad"]), []);
  assert.equal(validStoredRows(sampleWorkouts).length, 12);
});
