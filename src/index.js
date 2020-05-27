import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './movie';
function App() {
  return (
    <div className="App">
      <Movie/>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
