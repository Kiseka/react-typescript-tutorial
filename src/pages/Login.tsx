const Login =()=>{
    return(
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card mt-6">
                    <div className="card-body">
                        <h3>Login</h3>
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input className="form-control" name="email" type="text" />
                        </div>
                        <div className="form-group mt-4">
                            <label htmlFor="">Password</label>
                            <input className="form-control" name="password" type="text" />
                        </div>
                        <div className="form-group mt-4">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;