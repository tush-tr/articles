import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ArticleCreate from "./components/ArticleCreate";
import "./styles/custom.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
          <div className="container main-container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/article/create" component={ArticleCreate} />
            </Switch>
          </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
