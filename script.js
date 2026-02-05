document.getElementById("run").addEventListener("click", runSimulation);

let chart = null;

function runSimulation() {
  const trials = Number(document.getElementById("trials").value);

  let heads = 0;
  let tails = 0;

  for (let i = 0; i < trials; i++) {
    Math.random() < 0.5 ? heads++ : tails++;
  }

  const data = [heads, tails];

  drawChart(data, trials);
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
          backgroundColor: ["#6a44d8", "#8e5cf8"],
        },
        {
          label: "Expected (50/50)",
          data: [trials / 2, trials / 2],
          backgroundColor: ["#c5b3ff", "#e2d7ff"],
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
