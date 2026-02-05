import React, { useState } from "https://esm.sh/react@18";

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

      <label className="block mb-2 font-semibold">Number of Trials</label>
      <input
        type="number"
        value={trials}
        onChange={(e) => setTrials(Number(e.target.value))}
        min="1"
        max="200000"
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

/* Chart.js rendering */
function renderChart(data, trials) {
  const ctx = document.getElementById("probChart");

  if (window.probChart) {
    window.probChart.destroy();
  }

  window.probChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Heads", "Tails"],
      datasets: [
        {
          label: "Experimental Results",
          data: data,
          backgroundColor: ["#6366f1", "#8b5cf6"],
        },
        {
          label: "Theoretical (Expected)",
          data: [trials / 2, trials / 2],
          backgroundColor: ["#c7d2fe", "#ddd6fe"],
        },
      ],
    },
  });
}

/* Mount React App */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ProbabilityApp />);
