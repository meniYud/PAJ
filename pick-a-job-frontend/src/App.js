import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'; 
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './components/Dashboard/Dashboard.component';
import './App.css';


const App = () => {
  return (
    <Router>
        <Header />
        <main>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/dashboard' component={DashboardScreen} exact />
        </main>
        <Footer />
    </Router>
  );
}

export default App;
