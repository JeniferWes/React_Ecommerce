import { useState, useEffect } from "react";

const Myprofile = () =>{
    let[user, setUser]=useState( {} );

    const getInfo=()=>{
        let id=localStorage.getItem("token");
        let url="http://localhost:1234/account/"+id;
        fetch(url)
        .then(response=>response.json())
        .then(info=>{
            setUser(info);
        })
        console.log(user);
    }
   

    useEffect(()=>{
        getInfo();
    },[]);


    return(
        <div className="container mt-5">
           <div className="row">
            <div className="col-xl-4"></div>
            <div className="col-xl-4 p-4 shadow-lg rounded">
                <h3 className="text-center mb-4 text-primary">My Profile</h3>
                <p>Full Name: {user.fullname}</p>
                <p>e-Mail id: {user.email}</p>
                <p>Password: {user.password}</p>
                <p>User Type: {user.type}</p>
            </div>
            <div className="col-xl-4"></div>
           </div>
        </div>
    )
}

export default Myprofile;

