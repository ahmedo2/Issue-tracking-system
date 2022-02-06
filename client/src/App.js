import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";

function App() {
  return (
    <div className="App" >
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Main} />
          <Route exact path="/dashboard" component={UserDashboard} />
          <Route exact path="/usertix" component={UserTicketMain} />
        </Router>
    </Provider>
    </div>
  );
}

export default App;