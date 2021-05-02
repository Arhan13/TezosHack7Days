import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import welcomePage from "./pages/welcomePage";
import customerPage from "./pages/customerPage";
import farmerPage from "./pages/farmerPage";
import supplierPage from "./pages/supplierPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={welcomePage} />
        <Route exact path='/customer' component={customerPage} />
        <Route exact path='/farmer' component={farmerPage} />
        <Route exact path='/supplier' component={supplierPage} />
      </Switch>
    </Router>
  );
}

export default App;
