
import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return  (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="">Todo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/"> Home<span className="visually-hidden">(current)</span></Link>
                        </li>
                      
                        <li className="nav-item dropdown">
                        {/* eslint-disable-next-line */}
                        <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/issues">Issues</Link>
                        </div>
                        </li>
                        
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-sm-2" type="search" placeholder="Search"/>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>
            <div className="py-5">
                <Outlet />
            </div>
        </div>
      
    );
};
  
export default Layout;