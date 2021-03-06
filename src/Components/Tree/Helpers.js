import React, {useState, useEffect, useRef} from 'react'
import ResizeObserver from 'resize-observer-polyfill'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

function useMeasure() {
  const ref = React.useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
      return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds]
}

export {usePrevious, useMeasure};