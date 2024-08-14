import React, { useState } from 'react';
import './App.css';

function App() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([0]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const MAX_VALUE = 150;
  const MIN_VALUE = 0;

  const updateNum = (newNum) => {
    if (newNum < MIN_VALUE || newNum > MAX_VALUE) return;
    setNum(newNum);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newNum);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const add = () => updateNum(num + 1);
  const subtract = () => updateNum(num - 1);
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setNum(history[historyIndex - 1]);
    }
  };
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setNum(history[historyIndex + 1]);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Number Manipulation App</h1>
      <div className="controls">
        <button onClick={subtract} disabled={num <= MIN_VALUE}>-</button>
        <button onClick={add} disabled={num >= MAX_VALUE}>+</button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(num / MAX_VALUE) * 100}%` }}
        />
      </div>
      <div className="undo-redo-controls">
        <button onClick={undo} disabled={historyIndex === 0}>Undo</button>
        <button onClick={redo} disabled={historyIndex === history.length - 1}>Redo</button>
      </div>
    </div>
  );
}

export default App;
