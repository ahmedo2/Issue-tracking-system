import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";
import UserTicketList from "./pages/UserTicketList";
import UserTicketDetail from "./pages/UserTicketDetail";
import UserContact from "./pages/UserContact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTicketMain from "./pages/AdminTicketMain";
import AdminTicketList from "./pages/AdminTicketList";
import AdminTicketDetail from "./pages/AdminTicketDetail";
import AdminMessagesList from "./pages/AdminMessagesList";
import AdminMessagesDetail from "./pages/AdminMessagesDetail";
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
            <UserRoute exact path="/user/dashboard" component={UserDashboard} />
            <UserRoute
              exact
              path="/user/ticketrequest"
              component={UserTicketMain}
            />
            <UserRoute
              exact
              path="/user/ticketlist"
              component={UserTicketList}
            />
            <UserRoute
              exact
              path="/user/ticketdetails"
              component={UserTicketDetail}
            />
            <UserRoute exact path="/user/contact" component={UserContact} />
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoute
              exact
              path="/admin/ticketrequest"
              component={AdminTicketMain}
            />
            <AdminRoute
              exact
              path="/admin/ticketlist"
              component={AdminTicketList}
            />
            <AdminRoute
              exact
              path="/admin/ticketdetails"
              component={AdminTicketDetail}
            />
            <AdminRoute
              exact
              path="/admin/messages"
              component={AdminMessagesList}
            />
            <AdminRoute
              exact
              path="/admin/messages/:id"
              component={AdminMessagesDetail}
            />
            {/* <UserRoute exact path="/user/contact" component={UserContact} /> */}
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
