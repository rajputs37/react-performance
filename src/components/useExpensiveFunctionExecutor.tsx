import { useEffect, useState, useCallback } from "react";

function useExpensiveCompute<R>(
  fn: () => R | Promise<R>,
  deps: any[] = []
): { data: R | undefined; error: any } {
  const [data, setData] = useState<R | undefined>();

  const [executionError, setError] = useState<any>();

  const runAsyncTask = async () => {
    const script = `data:text/javascript;charset=UTF-8,onmessage=(()=>({data})=>postMessage((${fn.toString()})(data)))(postMessage);`;
    console.log("script", script);
    const worker = new Worker(script);
    worker.postMessage("");
    worker.onmessage = ({ data }) => {
      setData(data);
      worker.terminate();
    };
    worker.onerror = (error) => {
      setError(error);
      worker.terminate();
    };
  };

  useEffect(() => {
    runAsyncTask();
  }, deps);

  return { data, error: executionError };
}

export default useExpensiveCompute;

function expensiveCompute<R>(fn: () => R | Promise<R>): Promise<R> | R {
  return new Promise((resolve, reject) => {
    try {
      const script = `data:text/javascript;charset=UTF-8,onmessage=(()=>({data})=>postMessage((${fn.toString()})(data)))(postMessage);`;

      const worker = new Worker(script);
      worker.postMessage("");
      worker.onmessage = ({ data }) => {
        resolve(data);
        worker.terminate();
      };
    } catch (e) {
      reject(e);
    }
  });
}

export { expensiveCompute };
