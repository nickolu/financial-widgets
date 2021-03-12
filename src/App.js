import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BankHistoryPage } from "./pages/BankHistoryPage/BankHistoryPage.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/">
                        <BankHistoryPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
