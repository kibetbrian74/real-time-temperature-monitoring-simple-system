import Chart from 'chart.js/auto';

const ctx = document.getElementById('tempChart') as HTMLCanvasElement;
const tempValueEl = document.getElementById('temp-value');

const data = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Temperature (°C)',
      data: [] as number[],
      borderColor: '#4e54c8',
      backgroundColor: 'rgba(78,84,200,0.15)',
      tension: 0.3,
      fill: true,
      pointRadius: 2,
      borderWidth: 2,
    },
  ],
};

const tempChart = new Chart(ctx, {
  type: 'line',
  data,
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: false } },
      y: {
        title: { display: true, text: '°C' },
        suggestedMin: 10,
        suggestedMax: 40,
      },
    },
    animation: false,
  },
});

function addDataPoint(temp: number) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  data.labels.push(timeStr);
  data.datasets[0].data.push(temp);
  if (data.labels.length > 60) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }
  tempChart.update();
}

async function fetchAndUpdate() {
  try {
    const res = await fetch('/.netlify/functions/temperature');
    const body = await res.json();
    const temp = Number(body.temperature);
    if (tempValueEl) tempValueEl.textContent = temp.toFixed(1);
    addDataPoint(temp);
  } catch (e) {
    if (tempValueEl) tempValueEl.textContent = '--';
  }
}

fetchAndUpdate();
setInterval(fetchAndUpdate, 1000);
