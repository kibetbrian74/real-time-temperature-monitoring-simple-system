import { Handler } from '@netlify/functions';

// Semi-random smooth simulation (with a memory for continuity)
let t = Math.random() * Math.PI * 2;

function getSimTemperature() {
  t += 0.07 + (Math.random() - 0.5) * 0.04;
  const base = 25 + 4 * Math.sin(t);
  const noise = (Math.random() - 0.5) * 0.9;
  return parseFloat((base + noise).toFixed(2));
}

export const handler: Handler = async () => {
  const temperature = getSimTemperature();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ temperature }),
  };
};
