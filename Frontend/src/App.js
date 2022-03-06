import React,{useEffect,useState} from 'react';
import './App.css';
import Main  from './layout/dashboard/Main';
import Login from './view/dashboard/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './view/dashboard/Admin';
import Model from './view/dashboard/Model';
import Data from './view/dashboard/Data';
import Users from './view/dashboard/Users';
import Settings from './view/dashboard/Settings';
import Register from './view/users/Register';
import UserLogin from './view/users/UserLogin';
import Panel from './layout/users/Panel';
import UserHome from './view/users/UserHome';
import AgencySettings from './view/users/AgencySettings';
import Home from './view/home/Home';
import Loader from './components/Loader';
import Welcome from './view/home/Welcome';
import Verify from './view/home/Verify';
import Category from './view/home/Category';
import UserRoute from './layout/dashboard/UserRoute';
import Order from './view/home/Order';
import VendorOrders from './view/users/VendorOrders';
import Orders from './view/dashboard/Orders';



// import Footer from './components/Footer';

function App() {
  const [loader,setLoader]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false)

    },6000)
  },[])
//  alert(location.coordinates.lat)
 
  return (
    <Router>
     {loader ? <Loader /> :null }  
    <Switch>
    
    <Route exact path='/'>
      <Welcome />
      </Route> 
      {/* User Route start */}
      <UserRoute path="/category" exact component={Category} />
      <UserRoute path="/map" exact component={Home} />
      <UserRoute path="/order_now" exact component={Order} />
      {/* User Route end */}
      <Route path="/verify/:token/:id" exact component={Verify} />

     <Main exact path="/admin" comp={Admin}/>
     <Main exact path="/orders" comp={Orders}/>
     <Main  path="/modal" comp={Model}/>
     <Main  path="/locations" comp={Data}/>
     <Main  path="/users" comp={Users}/>
     <Main  path="/settings" comp={Settings}/>
    
      <Route  path='/adminlogin'>
      <Login  />
      </Route> 
    
    
      <Route  path='/vendor_login'>
      <UserLogin  />
      </Route> 
    
      <Route  path='/register'>
      <Register  />
      </Route> 
     

     {/* user panel dashboard start */}
     <Panel path="/panel" comp={VendorOrders} />
     <Panel path="/products" comp={UserHome} />
     <Panel path="/agencysettings" comp={AgencySettings} />
     {/* user panel dashboard end */}
    </Switch>
    {/* <Footer /> */}
  </Router>
  );
}

export default App;
