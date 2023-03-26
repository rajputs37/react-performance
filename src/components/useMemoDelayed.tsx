import React, { useEffect, useState } from "react";

function useMemoDelayed<T>(fn: () => T, deps?: any[], defaultValue?: any): T {
  const [computedValue, setComputedValue] = useState<T>(defaultValue);
  useEffect(() => {
    setComputedValue(fn());
  }, deps);

  return computedValue;
}

export default useMemoDelayed;
