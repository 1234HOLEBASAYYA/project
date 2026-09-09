import React from 'react';
import { TripProvider } from './context/TripContext';
import { Layout } from './components/layout/Layout';

export function App() {
  return (
    <TripProvider>
      <Layout />
    </TripProvider>
  );
}

export default App;
