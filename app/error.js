"use client";
export default function Error({ reset }) {
  return (
    <section className="container empty">
      <h1>LET'S TRY THAT AGAIN.</h1>
      <p>Something interrupted this page.</p>
      <button className="btn primary" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
