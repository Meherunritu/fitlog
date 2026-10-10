"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchWorkouts,
  addPlanItem,
  validStoredRows,
} from "../lib/workouts.mjs";
import { sampleWorkouts } from "../lib/sample-workouts.mjs";
const Context = createContext(null);
export const useFit = () => useContext(Context);
export function FitProvider({ children }) {
  const [workouts, setWorkouts] = useState([]),
    [loading, setLoading] = useState(true),
    [source, setSource] = useState(""),
    [attempt, setAttempt] = useState(0);
  const [lists, setLists] = useState({ plan: [], saved: [] }),
    [ready, setReady] = useState(false);
  const current = useRef(lists);
  useEffect(() => {
    try {
      const old = JSON.parse(localStorage.getItem("fitlog-lists-v1") || "{}");
      const next = {
        plan: validStoredRows(old.plan),
        saved: validStoredRows(old.saved),
      };
      current.current = next;
      setLists(next);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchWorkouts(controller.signal)
      .then((rows) => {
        setWorkouts(rows);
        setSource("live");
        try {
          localStorage.setItem("fitlog-api-cache", JSON.stringify(rows));
        } catch {}
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        let cache = [];
        try {
          cache = validStoredRows(
            JSON.parse(localStorage.getItem("fitlog-api-cache") || "[]"),
          );
        } catch {}
        setWorkouts(cache.length ? cache : sampleWorkouts);
        setSource(cache.length ? "cache" : "sample");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);
  function commit(next, message) {
    current.current = next;
    setLists(next);
    try {
      localStorage.setItem("fitlog-lists-v1", JSON.stringify(next));
    } catch {
      toast.error(
        "Browser storage is unavailable. Changes last only for this visit.",
      );
    }
    toast.success(message);
  }
  function add(workout) {
    const result = addPlanItem(current.current.plan, workout);
    if (result.error) return toast.error(result.error);
    commit({ ...current.current, plan: result.plan }, "Added to today's plan");
  }
  function save(workout) {
    if (current.current.saved.some((w) => w.id === workout.id))
      return toast("Already saved for later");
    commit(
      { ...current.current, saved: [...current.current.saved, workout] },
      "Saved for later",
    );
  }
  function remove(id, tab) {
    commit(
      {
        ...current.current,
        [tab]: current.current[tab].filter((w) => w.id !== id),
      },
      tab === "plan" ? "Removed from your plan" : "Removed from saved workouts",
    );
  }
  function done(id) {
    const item = current.current.plan.find((w) => w.id === id);
    if (!item || item.done) return;
    commit(
      {
        ...current.current,
        plan: current.current.plan.map((w) =>
          w.id === id ? { ...w, done: true } : w,
        ),
      },
      "Workout complete. Strong work!",
    );
  }
  return (
    <Context.Provider
      value={{
        ...lists,
        ready,
        workouts,
        loading,
        source,
        retry: () => setAttempt((a) => a + 1),
        add,
        save,
        remove,
        done,
      }}
    >
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#20242b",
            color: "#fff",
            border: "1px solid #3b414b",
          },
          success: { iconTheme: { primary: "#ccff00", secondary: "#111" } },
        }}
      />
    </Context.Provider>
  );
}
