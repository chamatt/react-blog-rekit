import React, { Component } from 'react';
import { Header, Footer } from "./";
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import {BlogContainer, AddPost, EditPost} from "../common/"

export default class App extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-app">
        <Header />
          <main className="container conteudo">
            <Switch>
              <Route path="/" exact={true} component={BlogContainer} />
              <Route path="/new" component={AddPost} />
              <Route path="/edit/:id" component={EditPost} />
            </Switch>
          </main>
        <Footer />
      </div>
    );
  }
}
