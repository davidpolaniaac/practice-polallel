import { Data, Result } from "types";

export function generateData(count: number): Data[] {
  const promises: Data[] = [];
  for (let i = 0; i < count; i++) {
    const delay = Math.floor(Math.random() * 10) + 1;
    const fail = Math.random() > 0.5;
    const url: string = `https://hub.dummyapis.com/delay?seconds=${delay}`;
    promises.push({ url, fail: false, num: i });
  }
  return promises;
}

export async function getData(data: Data): Promise<Result> {
  const { url, fail } = data;
  try {
    const response = await fetch(url);
    if (!response.ok || fail) {
      throw new Error("Failed to get data");
    }
    const result = await response.text();
    return { data, response: result };
  } catch (err) {
    throw err;
  }
}

export async function time(fn: Function): Promise<void> {
  console.log(`Running ${fn.name}`);
  const start = performance.now();
  try {
    await fn();
  } catch (error) {
    console.log("time", error);
  }

  const end = performance.now();
  const timeTaken = (end - start) / 1000;
  console.log(`Time taken: ${timeTaken} seconds`);
  console.log(`End ${fn.name}`);
  console.log(`-----------------------------------`);
}
