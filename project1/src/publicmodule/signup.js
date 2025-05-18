// import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const CreateAccount = () => {
    let fullname = useRef("");
    let emailid = useRef("");
    let password = useRef("");
    // let [message, setMessage]=useState("Enter the details");

    // const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        const name = fullname.current.value.trim();
        const email = emailid.current.value.trim();
        const pass = password.current.value.trim();

        if (!name || !email || !pass) {
            alert("All fields are required!");
            return;
        }

        const newUser = {
            fullname: name,
            email: email,
            password: pass,
            type: "USER",
        };

        // POST request to JSON server
        fetch("http://localhost:1234/account", {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Signup successful!");
                    //navigate("/"); // This navigates to the login page

                    // Clear the input fields
                    fullname.current.value = "";
                    emailid.current.value = "";
                    password.current.value = "";

                } else {
                    alert("Signup failed. Try again.");
                }
            })
    }


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-xl-4"></div>
                <div className="col-xl-4">
                    <form onSubmit={handleSignup}>
                        <div className="card border-0 shadow-lg">

                            <div className="card-header bg-danger text-white">
                                <i className="fa fa-user-plus"></i> Sign Up
                            </div>

                            <div className="card-body">
                                <div className="mb-4">
                                    <p>Full Name</p>
                                    <input type="text" className="form-control" ref={fullname} />
                                </div>

                                <div className="mb-4">
                                    <p>Email</p>
                                    <input type="email" className="form-control" ref={emailid} />
                                </div>

                                <div className="mb-4">
                                    <p>Password</p>
                                    <input type="password" className="form-control" ref={password} />
                                </div>
                            </div>

                            <div className="card-footer text-center">
                                <button className="btn btn-info">Sign Up <i className="fa fa-arrow-right"></i></button>

                            </div>

                        </div>

                    </form>
                </div>
                <div className="col-xl-4"></div>

            </div>

        </div>
    );
}

export default CreateAccount;