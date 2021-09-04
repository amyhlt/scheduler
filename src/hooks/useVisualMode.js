import { useState } from "react";
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    function transition(newMode, replace) {
        const newHistory = [...history];
        if (replace) {
            newHistory.pop();
            setHistory([...newHistory, newMode]);
            setMode(newMode);
        } else {
            setMode(newMode);
            setHistory([...newHistory, newMode]);
        }
    }
    function back() {
        if (history.length > 1) {
            setMode(history[history.length - 2]);
            setHistory(prevHistory => prevHistory.slice(0, prevHistory.length - 1));
        }
    }
    return { mode, transition, back };
}
  