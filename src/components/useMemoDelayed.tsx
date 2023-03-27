import React, { useEffect, useState } from "react";

function useMemoDelayed<T>(
  fn: () => T | Promise<T>,
  deps?: any[],
  defaultValue?: any
): T {
  const [computedValue, setComputedValue] = useState<T>(defaultValue);

  const runAsyncTask = async () => {
    const data = await Promise.resolve(fn());
    setComputedValue(data);
  };

  useEffect(() => {
    runAsyncTask();
  }, deps);

  return computedValue;
}

export default useMemoDelayed;
