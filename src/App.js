import React from 'react';
import List from './features/List';
import useDrones from '../src/hooks/useDrones';
import './App.css';

function App() {
  const drones = useDrones();
  //  drones.isFetching ? spinner : null
  return (
    <div className='App'>
      <List />
    </div>
  );
}

export default App;
