import { useDispatch } from "react-redux"
import "./style.css"
import { appLogout } from "../../store/slices/authSlice";

const Navbar = () =>{

    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(appLogout());
    };


    return (
        <div className="navbar-container">
        <div className="navbar-left-items">
        <h2>Cloud Home</h2>
        </div>
        <div className="navbar-right-items">
        <button onClick={handleLogout}>Logout</button>
        </div>
        
        </div>
    )
}

export default Navbar