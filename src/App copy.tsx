import React, { useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Layout from './pages/Layout';
import TodosList from './pages/TodosList';
import Login from './pages/Login';
import ErrorPage from './pages/Error';
import { getUserProfile, selectAuthentication, selectprofileLoadingStatus } from './features/auth/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router-dom';
import { APP_STATUS } from './helpers/constants';
import IssuesList from './pages/IssuesList';

function App() {
  const profileLoadingStatus = useAppSelector(selectprofileLoadingStatus);
  // useEffect(() => {
  //   dispatch(getUserProfile());
  // }, []);
  // useEffect(() => {
  //   if (authenticated ==false) {
  //     navigate("/login")
  //   }
  // }, [authenticated]);

  if (profileLoadingStatus == APP_STATUS.PENDING) {
    return (
      <div className='d-flex justify-content-center pt-7'>
        <div className="spinner-border"></div>
      </div>
    );
  }else{
    return (
        <Routes>
          <Route path='login'  element={<Login />} />
          <Route element={<Layout />}>
            <Route  path='/' index element={<TodosList />} />
            <Route  path='todos'  element={<TodosList />} />
            <Route path='issues'  element={<IssuesList />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
  }

 
}

export default App;


const ProtectedRoute = ({ children }:{children: React.ReactNode}) => {
  const authenticated = useAppSelector(selectAuthentication)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  // if (!user) {
  //   return <Navigate to='/' />;
  // }
  return children;
};


const loadingComponent = ()=>{
  return(
    <div className='d-flex justify-content-center pt-7'>
      <div className="spinner-border"></div>
    </div>
  );
}




