import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Welcome from './components/auth/Welcome';
import ToDoList from './components/todolist/Todolist';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
   <Router>
    <Routes>
     <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
     <Route path="/register" element={<Register />} />
     <Route
              path="/"
              element={isAuthenticated ? <ToDoList setIsAuthenticated={setIsAuthenticated}/> : <Welcome />}
            />
     <Route path="*" element={<Navigate to="/" />} />
    </Routes>
   </Router>
  );
};

export default App;
