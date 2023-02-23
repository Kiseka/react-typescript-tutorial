import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter ,Routes,Route, Outlet, useLocation, Navigate} from 'react-router-dom';
import Layout from './pages/Layout';
import TodosList from './pages/TodosList';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import { getUserProfile, selectAuthentication, selectprofileLoadingStatus } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router-dom';
import { APP_STATUS } from './helpers/constants';
import IssuesList from './pages/IssuesList';
import Layout2 from './pages/Layout2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login'  element={<Login />} />   
        <Route element={ <ProtectedRoute><Outlet/></ProtectedRoute>}>{/* auth middleware */}
          <Route element={<Layout />}>
                <Route index path='/'  element={ <TodosList /> } />
                <Route  path='/todos' index element={<TodosList />} />
                <Route path='issues'  element={<IssuesList />} />
          </Route>
          <Route element={<Layout2 />}>
                <Route index path='/notes'  element={<h1>My Notes</h1> } />
                <Route  path='/items' index element={<h1>My Items</h1> } />
          </Route>
        </Route>
        <Route path='/docs' element={ <h1>Documentation</h1> } />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

interface ProtectedRouteProps {
  children: React.ReactElement;
}


const ProtectedRoute = ({ children }:ProtectedRouteProps):React.ReactElement => {
  const profileLoadingStatus = useAppSelector(selectprofileLoadingStatus);
  const authenticated = useAppSelector(selectAuthentication)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  if (authenticated ==false) {
    return <Navigate to="/login" state={{ path:location.pathname }} />
  }
  
  return profileLoadingStatus === APP_STATUS.PENDING ? (
    loadingComponent()
  ) : (
    children
  );
};


const loadingComponent = ()=>{
  return(
    <div className='d-flex justify-content-center pt-7'>
      <div className="spinner-border"></div>
    </div>
  );
}




