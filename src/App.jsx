import React, { Suspense } from 'react';
import './App.css';
import LoadingSpinner from './loadingSPinner';

const Game = React.lazy(() => import('./GameFolder/game'));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <div className='phaser-game'>
          <Game />
        </div>
      </Suspense>
    </>
  );
}

export default App;

