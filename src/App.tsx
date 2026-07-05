import { useState } from 'react';
import { Route, Switch } from 'wouter';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import SectionDots from './components/SectionDots';
import Home from './pages/Home';
import NotFound from './pages/not-found';
import { useLenis } from './hooks/useLenis';

export default function App() {
  const [booted, setBooted] = useState(false);
  useLenis(booted);

  return (
    <>
      {!booted && <Loader onComplete={() => setBooted(true)} />}

      {booted && (
        <>
          <Cursor />
          <Nav />
          <SectionDots />
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </>
      )}
    </>
  );
}
