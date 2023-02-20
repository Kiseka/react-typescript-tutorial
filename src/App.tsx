import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Layout from './pages/Layout';
import TodosList from './pages/TodosList';
import Login from './pages/Login';
import ErrorPage from './pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route element={<Layout />}>
          <Route path='todos' index element={<TodosList />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
