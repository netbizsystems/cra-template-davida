
import { useState, useEffect } from 'react';

export default function useProgressBar (progressDuration = 150) {
  const [progress, setProgress] = useState(0);
  // used to restart the progress
  const startProgress = () => setProgress(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 100;
        }
        return Math.min(oldProgress + 15, 100);
      });
    }, progressDuration);
    return () => clearInterval(timer);

  }, [progress, progressDuration]);

  return { progress, startProgress };
};
