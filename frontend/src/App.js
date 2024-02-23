
import {Routes,Route } from 'react-router-dom';
import './App.css';
import Landingpage from './Screens/Landingpage/Landingpage';
import MyNotes from './Screens/MyNotes/MyNotes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginScreen from './Screens/Login/LoginScreen';
import RegisterScreen from './Screens/Register/RegisterScreen';

const App=()=> {
  return (  
    <div className="App">
      <Header/>
      <main style={{minHeight:'93vh'}}>
     

    <Routes>
    <Route path="/" element={<Landingpage/>}/>
    <Route path="/login" element={<LoginScreen/>}/>
    <Route path="/register" element={<RegisterScreen/>}/>
    <Route path="/mynotes" element={<MyNotes/>}/>
    </Routes>



      </main>
      <Footer/>
    </div>
  );
}

export default App;
