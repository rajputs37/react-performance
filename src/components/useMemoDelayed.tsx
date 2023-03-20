import { useEffect, useState } from "react";

const useMemoDelayed = (fn:Function,dependencies:any[] = [],defaultValue:any =null) => {
    const [computedValue,setComputedValue] = useState(defaultValue)

    useEffect(()=>{
        setComputedValue(fn())
    },dependencies)

    return computedValue;
}
export default useMemoDelayed