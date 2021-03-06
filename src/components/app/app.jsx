import React from "react";
import PropTypes from "prop-types";
import {Router as BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import browserHistory from '../../browser-history';
import {Routes, cities} from '../../const';

import Header from '../header/header';
import MainPage from '../main-page/main-page';
import FavouritesPage from '../favourites-page/favourites-page';
import AuthorizationPage from '../authorization-page/authorization-page';
import Property from '../property/property';
import NotFound from '../not-found/not-found';
import Footer from '../footer/footer';
import PrivateRoute from "../private-route/private-route";


const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={Routes.ROOT} exact>
          <Redirect to={`${Routes.CITIES}/${cities.Amsterdam}`}/>
        </Route>
        <Route path={Routes.LOGIN} exact>
          <div className="page page--gray page--login">
            <Header/>
            <AuthorizationPage/>
          </div>
        </Route>
        <PrivateRoute path={Routes.FAVORITES} exact render={() => (
          <div className="page">
            <Header/>
            <FavouritesPage/>
            <Footer/>
          </div>
        )}/>
        <Route path={`${Routes.CITIES}/:city`} exact render={(properties) => (
          <div className="page page--gray page--main">
            <Header/>
            <MainPage city={properties.match.params.city}/>
          </div>
        )}>
        </Route>
        <Route path={`${Routes.OFFER}/:id`} exact render={(properties) => (
          <div className="page">
            <Header/>
            <Property offerId={properties.match.params.id} isSigned={true}/>
          </div>
        )}>
        </Route>
        <Route path={[Routes.NOT_FOUND, ``]}>
          <div className="page page--gray">
            <Header/>
            <NotFound/>
            <Footer/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  match: PropTypes.object,
};

export default App;
