import { Link } from "react-router-dom"

const ErrorPage =()=>{
    return (<>
        <h1>Page not foud</h1>
        <Link to="/">Home</Link>
    </>)
}

export default ErrorPage;