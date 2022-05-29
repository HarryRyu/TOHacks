import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import './App.css';
import Album from './components/Template'
import Login from './components/Login'
import Register from './components/Register'
// import Session from './components/Session'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/session" element={<Session />} /> */}
        <Route path ="/room" element={<Album />} />
      </Routes>
    </Router>
  );
}

export default App;
