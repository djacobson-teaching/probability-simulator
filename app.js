// Import React & ReactDOM from unpkg CDN
import React from "https://unpkg.com/react@18/umd/react.development.js";
import ReactDOM from "https://unpkg.com/react-dom@18/umd/react-dom.development.js";

const { useState } = React;

function ProbabilityApp() {
  const [trials, setTrials] = useState(1000);
  const [results, setResults] = useState([]);

  function runSimulation() {
    let heads = 0;
    let tails = 0;

    for (let i = 0; i < trials; i++) {
      Math.random() < 0.5 ? heads++ : tails++;
    }

    setResults([heads, tails]);
    renderChart([heads, tails], trials);
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-4">
        Probability Simulator
      </h1>

      <p className="mb-4 text-gray-700">
        Compare experimental vs. theoretical probabilities using real simulations.
      </p>

      <label className="block mb-2 font-semibold">Number of Trials</label>
      <input
        type="number"
        value={trials}
        min="1"
        max="200000"
        onChange={(e) => setTrials(Number(e.target.value))}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={runSimulation}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Run Simulation
      </button>

      <canvas id="probChart" className="mt-8"></canvas>
    </div>
  );
}

function renderChart(data, trials) {
  const canvas = document.getElementById("probChart");

  if (!canvas) return;

  if (window.probChart) {
    window.probChart.destroy();
  }

  window.probChart = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Heads", "Tails"],
      datasets: [
        {
          label: "Experimental Results",
          data,
          backgroundColor: ["#6366f1", "#8b5cf6"],
        },
        {
          label: "Expected (0.5 / 0.5)",
          data: [trials / 2, trials / 2],
          backgroundColor: ["#c7d2fe", "#ddd6fe"],
        },
      ],
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.createRoot(document.getElementById("root")).render(<ProbabilityApp />);
});
