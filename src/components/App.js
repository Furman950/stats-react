import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../css/App.css';


import { Layout } from './Layout';
import { Home } from './Home';
import { UserDetails } from './UserDetails';
import { Quiz } from './Quiz';
import { Results } from './Results';
import { Forbidden } from './Forbidden';
import { AnovaResults } from './AnovaResults';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Dashboard } from './Dashboard';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/forbidden' component={Forbidden} />

        <Route path='/userInfo' component={UserDetails} />
        <Route path='/takeQuiz' component={Quiz} />
        <Route path='/results/:quizId' component={Results} />
        <Route path='/anovaResults' component={AnovaResults} />
        <Route path='/login' component={Login} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/dashboard' component={Dashboard} />
      </Layout>
    );
  }
}