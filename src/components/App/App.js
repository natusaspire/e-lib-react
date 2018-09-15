import React from 'react';

import './App.sass';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Footer from '@/components/Footer';

const App = () => (
  <div className="wrapper">
    <div className="wrapper__header wrapper__header--fixed">
      <Header />
    </div>
    <div className="wrapper__main wrapper__main--grey">
      <Main />
    </div>
    <div className="wrapper__footer">
      <Footer />
    </div>
  </div>
);

export default App;
