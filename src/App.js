import React, { Component, lazy, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/BurgerBuilder/Checkout/Checkout';
import { Route, Switch, Redirect } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const Auth = lazy(() => import('./containers/Auth/Auth'));
const Checkout = lazy(() =>
  import('./containers/BurgerBuilder/Checkout/Checkout')
);
const Orders = lazy(() => import('./containers/Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Suspense fallback>
        <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/auth' component={Auth} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback>
          <Switch>
            <Route path='/' exact component={BurgerBuilder} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Redirect to='/' />
          </Switch>
        </Suspense>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
