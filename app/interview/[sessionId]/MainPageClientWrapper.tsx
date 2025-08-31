'use client';

import MainPage from './main';

export default function   MainPageClientWrapper({ sessionId }: { sessionId: string }) {
  return <MainPage sessionId={sessionId} />;
}