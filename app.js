// Import Preact
import { h, render } from "https://unpkg.com/preact@10.19.6/dist/preact.module.js";
import { useState } from "https://unpkg.com/preact@10.19.6/hooks/dist/hooks.module.js";

// UI Component
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
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 class="text-3xl font-bold text-indigo-600 mb-4">Probability Simulator</h1>

      <p class="mb-4 text-gray-700">
        Run random simulations and compare experimental vs theoretical probability.
      </p>

      <label class="block mb-2 font-semibold">Number of Trials</label>
      <input
        type="number"
        value={trials}
        min="1"
        max="200000"
        onInput={(e) => setTrials(Number(e.target.value))}
        class="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={runSimulation}
        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Run Simulation
      </button>

      <canvas id="probChart" class="mt-8"></canvas>
    </div>
  );
}

// Chart Renderer
function renderChart(data, trials) {
  const canvas = document.getElementById("probChart");

  if (!canvas) return;

  if (window.probChart) window.probChart.destroy();

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
          label: "Expected (50/50)",
          data: [trials / 2, trials / 2],
          backgroundColor: ["#c7d2fe", "#ddd6fe"],
        },
      ],
    },
  });
}

// Mount app
render(h(ProbabilityApp), document.getElementById("app"));
