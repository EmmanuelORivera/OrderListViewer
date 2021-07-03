import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home';
import Order from './Pages/Order';
import MainWrapper from './Components/Utilities/MainWrapper';
function App() {
  return (
    <Router>
      <Header />
      <MainWrapper>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/order/:id' component={Order} exact />
        </Switch>
      </MainWrapper>
    </Router>
  );
}

export default App;
