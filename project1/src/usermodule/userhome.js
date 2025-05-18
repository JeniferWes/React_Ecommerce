
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import useLogout from "../logout";
import Myorder from "./myorder";
import Myprofile from "./userprofile";
import MyHome from "../publicmodule/home";
import MyCart from "../publicmodule/cart";

const UserModule = ()=>{
    return(
        <HashRouter>
            <nav className="bg-purple">
                <Link to="/" className="toplink"> <i className="fa fa-home"></i> Shopping</Link>
                <Link to="/mycart" className="toplink"> <i className="fa fa-shopping-cart"></i> My Cart</Link>

                <Link to="/profile" className="toplink"> <i className="fa fa-edit"></i> My Profile</Link>
                <Link to="/order" className="toplink"> <i className="fa fa-headset"></i> My Order</Link>
                <Link className="toplink"> <i className="fa fa-user"></i> {localStorage.getItem("name")}</Link>
                <Link className="toplink" onClick={useLogout}> <i className="fa fa-power-off"></i> Logout</Link>
            </nav>

            <Routes>
                <Route exact path="/" element={<MyHome/>}/>
                <Route exact path="/order" element={<Myorder/>}/>
                <Route exact path="/mycart" element={<MyCart/>}/>
                <Route exact path="/profile" element={<Myprofile/>}/>
            </Routes>
        </HashRouter>
    )
}
export default UserModule;

