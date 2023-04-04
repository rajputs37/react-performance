import React, { useEffect, useState } from "react";

function useMemoDelayed<T>(
  fn: () => T | Promise<T>,
  deps: any[] = [],
  defaultValue?: T
): T | undefined {
  const [computedValue, setComputedValue] = useState<T | undefined>(
    defaultValue
  );

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
