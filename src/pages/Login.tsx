import { useEffect, useState } from "react";
import AppButton from "./Components/AppButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, selectAuthentication } from "../features/auth/authSlice";
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_STATUS } from "../helpers/constants";

const Login =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const location = useLocation()
    const authenticated = useAppSelector(selectAuthentication)
    const isSigningUp = useAppSelector((state)=> state.auth.isSigningUp)

    useEffect(()=>{
        if (authenticated) {
            const redirectpath = location.state?.path || '/todos'
            navigate(redirectpath)
        }
    },[authenticated])
   
    const confirmLogin =()=>{
        const data = {
          email:email,
          password: password
        };
        dispatch(loginUser(data))
    }

    return(
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card mt-6">
                    <div className="card-body">
                        <h3>Login</h3>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)}
                             className="form-control" name="email" type="email" />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="">Password</label>
                            <input
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                            className="form-control" name="password" type="password" />
                        </div>
                        <div className="form-group mt-4">
                            <AppButton callBackFun={confirmLogin} showLoader={isSigningUp===APP_STATUS.PENDING} className="btn btn-primary" text="Login"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;