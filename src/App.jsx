import React from 'react';
import Layout from './components/Layout/Layout'

const App = () => {
  return (
    <>
    <h1 className="text-3xl font-bold underline">Coming Soon</h1>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index  />
        <Route path="about"  />
        <Route path="contact"  />
      </Route>
    </Routes>
    </>
  );
};

export default App;