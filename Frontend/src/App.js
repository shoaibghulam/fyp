import './App.css';
import Main  from './layout/dashboard/Main';
import Login from './view/dashboard/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './view/dashboard/Home';
import Model from './view/dashboard/Model';
import Data from './view/dashboard/Data';
import Users from './view/dashboard/Users';
import Settings from './view/dashboard/Settings';
import Register from './view/users/Register';
import UserLogin from './view/users/UserLogin';
import Panel from './layout/users/Panel';
import UserHome from './view/users/UserHome';
import AgencySettings from './view/dashboard/AgencySettings';


// import Footer from './components/Footer';

function App() {
  return (
    <Router>
  
    <Switch>

     <Main exact path="/" comp={Home}/>
     <Main  path="/modal" comp={Model}/>
     <Main  path="/locations" comp={Data}/>
     <Main  path="/users" comp={Users}/>
     <Main  path="/settings" comp={Settings}/>
    
      <Route  path='/adminlogin'>
      <Login  />
      </Route> 
    
    
      <Route  path='/login'>
      <UserLogin  />
      </Route> 
    
      <Route  path='/register'>
      <Register  />
      </Route> 
     

     {/* user panel dashboard start */}
     <Panel path="/panel" comp={UserHome} />
     <Panel path="/agencysettings" comp={AgencySettings} />
     {/* user panel dashboard end */}
    </Switch>
    {/* <Footer /> */}
  </Router>
  );
}

export default App;
