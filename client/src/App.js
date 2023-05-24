import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DetailsRecipe from './Components/Details/DetailsRecipe.jsx';
import CreateRecipe from './Components/Create/CreateRecipe.jsx';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import NavBar from './Components/Navbar/Navbar.jsx';
import Home from './Components/Home/Home.jsx';
import './App.css';
import Error404 from "./Components/Error404/Error404.jsx";
import About from './Components/About/About.jsx';

function App() {
  return (
    <>
      <Route path='/home' component={NavBar}/>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home/recipe/:id' component={DetailsRecipe} />
        <Route exact path='/home' component={Home} />
        <Route path='/home/update/:id' component={CreateRecipe} />
        <Route path='/home/create' component={CreateRecipe} />
        <Route path='/home/about' component={About} />
        <Route exact path='*' component={Error404} />
      </Switch>
    </>
  );
}

export default App;
