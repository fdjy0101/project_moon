import React from 'react';
import { Route, Link } from 'react-router-dom';

import Index from './pages/Index';
import style from './App.scss'
const App = () => {
  return (
    <div>
      {/* <Link to="/">Index</Link>*/}
      <Route path="/" exact={true} component={Index} />
    </div>
  )
}
export default App;
