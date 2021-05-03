import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import welcomePage from "./pages/WelcomePage";
import customerPage from "./pages/CustomerPage";
import farmerPage from "./pages/FarmerPage";
import supplierPage from "./pages/SupplierPage";

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
