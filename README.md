<h3 align="center">Use-Performance</h3>

<p align="center">
  Performance utilities for react front-end framework.
  <br>
</p>

## Installation

```
npm i use-performance
```

## useMemoDelayed

Problem with `useMemo` 

```
const App = () => {
  
  const data = useMemo(() => {
    // data is calculated by a very expensive function which might take more than 100ms.
    
    return someExpensiveFunction()
  },[])
  
  // The component App will not get rendered unless data is not calculated.
  // This will block the UI
  // Bad for user experience
  return <>
    <ComponentX data={data} />
    <ComponentY />
    <ComponentZ />
  </>
}
```

Solution using `useMemoDelayed` 

```
const App = () => {
  
  const data = useMemoDelayed(() => {
    return someExpensiveFunction()
  }, dependencyArray, dataDefaultValue)
  
  // The component App will not wait for data to get loaded, instead it will use just its defaultValue for the first time
  // and as soon as the expensive function is completed, the component is re-rendered with new data
 
  return <>
    <ComponentX data={data} />
    <ComponentY />
    <ComponentZ />
  </>
}
```


## expensiveCompute

When an expensive function is executed on the main thread, the performance of the React app decreases. We must execute the expensive function in a worker thread. Please follow the use of `expensiveCompute` function

```
import { expensiveCompute } from 'use-performance';

const data = await expensiveCompute(() => {
  const arrayToCompute = [];
  for(let i = 0; i < 10000; i++){
    arrayToCompute.push(i)
  }
  
  return arrayToCompute;
})
```
Please note that you cannot directly use any variable inside of the `expensiveCompute` function, which was declared outside the scope of the function.
Pass variables in the `expensiveCompute` function as shown below
```
const headings = ['one', 'two', 'three'];

const data = await expensiveCompute((input) => {
  const { headings } = input;
  const arrayToCompute = [];
  for(let i = 0; i < 10000; i++){
    arrayToCompute.push([...headings, i])
  }
  
  return arrayToCompute;
}, { headings })
```


