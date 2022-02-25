import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";
import UserTicketList from "./pages/UserTicketList";
import UserTicketDetail from "./pages/UserTicketDetail";
import Contact from "./pages/Contact";
import { loadUser } from "./actions/authAction";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    // store.dispatch(loadUserTickets())
  });
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" component={Main} />
            {/* <Route exact path="/dashboard" component={UserDashboard} /> */}
            <PrivateRoute
              exact
              path="/user/dashboard"
              component={UserDashboard}
            />
            <PrivateRoute
              exact
              path="/user/ticketrequest"
              component={UserTicketMain}
            />
            <PrivateRoute
              exact
              path="/user/ticketlist"
              component={UserTicketList}
            />
            <PrivateRoute
              exact
              path="/user/ticketdetails"
              component={UserTicketDetail}
            />
            <PrivateRoute exact path="/user/contact" component={Contact} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
