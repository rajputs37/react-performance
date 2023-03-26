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
  
  // The component App will not get wait for data to get loaded, instead it will use just its defaultValue or the first time
  // and as soon as the expensive function is completed, the component is re-rendered with new data
 
  return <>
    <ComponentX data={data} />
    <ComponentY />
    <ComponentZ />
  </>
}
```
