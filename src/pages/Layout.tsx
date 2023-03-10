
import { Outlet, Link, NavLink } from "react-router-dom";
const Layout = () => {
    return  (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-light border-bottom">
                <div className="container">
                    <Link className="navbar-brand" to="">Todo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/"> Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/issues"> Issues</NavLink>
                        </li>  
                    </ul>
                  
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