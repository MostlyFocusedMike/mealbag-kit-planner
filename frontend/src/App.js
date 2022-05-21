import {useEffect} from 'react';

function App() {
  useEffect(() =>  {
    fetch('/api/v1/menus').then(r=>r.json()).then(console.log)
  }, [])
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
