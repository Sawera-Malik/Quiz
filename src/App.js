
import './App.css';
import Login from './components/Login';
import {  BrowserRouter as  Router, Routes,Route } from 'react-router-dom';
import Questions from './components/Questions';
import Admin from './components/Admin';

function App() {
  return (
    <div className="App">
    
<Router>
<Routes>
<Route path='/' element={<Login />} />
<Route path='/question' element={<Questions/>} />
<Route path='/admin' element={<Admin/>} />
    
</Routes>
</Router>

    </div>
  );
}

export default App;
