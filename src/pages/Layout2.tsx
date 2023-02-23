
import { Outlet, Link, NavLink } from "react-router-dom";
const Layout2 = () => {
    return  (
        <div>
            <nav className="navbar  navbar-expand-lg navbar-light bg-gray-100 border-bottom">
                <div className="container">
                    <Link className="navbar-brand" to="/notes">Note Book</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/notes"> Notes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/items"> Items</NavLink>
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
  
export default Layout2;