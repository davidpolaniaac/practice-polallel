import { Data, Result } from "./types";
import { generateData, getData, time } from "./util";
import { parallel, parallelAll, parallelAllRequired, parallelBatches, rxAsyncParallelAll, rxParallel } from "polallel";

async function promiseAll(): Promise<void> {
  const data: Data[] = generateData(20);
  const promises: Promise<Result>[] = data.map(async (item) => getData(item));
  const result = await Promise.all(promises);
  console.log(result.length);
}

async function polallelAll(): Promise<void> {
  const data: Data[] = generateData(5);
  const result = await parallelAll(data, getData, 2);
  console.log(result);
}

async function batch() {
  const data: Data[] = generateData(40);
  const result = await parallelBatches(data, getData, 10);
  console.log(result);
}

async function polallelRx() {
  const data: Data[] = generateData(40);
  rxParallel(data, getData, 10).subscribe((result) => {
    console.log(result);
  });
}

async function normal() {
  const data: Data[] = generateData(10);
  for (const elem of data) {
    const result = await getData(elem);
  }
  console.log(data.length);
}

async function main() {
  try {
    await time(normal);
    await time(promiseAll);
    await time(polallelAll);
    await time(polallelRx);
  } catch (err) {
    console.log("main", err);
  }
}

main();
