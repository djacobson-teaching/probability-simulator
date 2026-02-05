document.getElementById("run").addEventListener("click", runSimulation);

let chart = null;

function runSimulation() {
  const trials = Number(document.getElementById("trials").value);

  let heads = 0;
  let tails = 0;

  for (let i = 0; i < trials; i++) {
    Math.random() < 0.5 ? heads++ : tails++;
  }

  drawChart([heads, tails], trials);
}

function drawChart(data, trials) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
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
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
