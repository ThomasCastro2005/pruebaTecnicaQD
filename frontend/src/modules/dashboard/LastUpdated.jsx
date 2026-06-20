'use client';

import { useState, useEffect } from 'react';

export default function LastUpdated({ lastUpdated }) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    if (!lastUpdated) return;

    const update = () => {
      const diff = Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      setSecondsAgo(diff);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (!lastUpdated) return null;

  return (
    <div className="last-updated">
      Last updated: {secondsAgo === 0 ? 'just now' : `${secondsAgo}s ago`}
    </div>
  );
}
