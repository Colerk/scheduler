import { renderHook, act } from "@testing-library/react-hooks";
import React, { useState } from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode)}
    else { 
      setHistory(prev => [...prev, newMode])
      setMode(newMode)
    }
  }

  const back = (prev) => {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1])
    }
  }



  return {mode, transition, back}

}
