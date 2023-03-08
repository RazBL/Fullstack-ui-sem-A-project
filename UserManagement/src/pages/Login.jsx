import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/context'


export default function Login() {

    const navigate = useNavigate();
    const { users, SetAuth, AdminLogin, CheckIfValidUsername, SetAdminLoggedIn} = useContext(Context);
    const [password, SetPassword] = useState("");
    const [username, SetUsername] = useState("");

    useEffect(() => {
        SetAdminLoggedIn(false);
    }, [])

    //to-do: make the error message as an html and add a manager profile redirect.
    const Login = (event) => {
        event.preventDefault();
        const foundMatch = users.find(user => password === user.password && username.toLocaleLowerCase() === user.username.toLocaleLowerCase());
        
        if (AdminLogin(username, password)) {
            SetAuth(true);
            SetAdminLoggedIn(true);
            navigate("/SystemManager");
        }
        else if (CheckIfValidUsername(username)) {
            alert("invalid username.");
        }
        else if (foundMatch != undefined) {
            SetAuth(true);
            navigate(`/Profile/${foundMatch.username}`);
        }
        else {
            alert(" Either this account doesn't exist or the password is incorrect. Please try again.");
        }
    }

    return (
        <>
            <form onSubmit={Login} className="card shadow container p-4">
                <h2 className='text-center mb-3 mt-3 card-title'>SIGN IN</h2>
                <div className="card-body">
                    <div className="row mb-3 mt-3">
                        <label htmlFor="user-name-input" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" id='user-name-input' required className="form-control" onChange={(event) => SetUsername(event.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password-input" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" id='password-input' required className="form-control" onChange={(event) => SetPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <button className="btn btn-primary btn-lg  mt-3 mb-3 btn--edit-page" type='submit'>Sign in</button>
                    </div>
                    <div className='mt-5 text-center'> Don't have an account? <Link to="/Register">Sign up</Link></div>
                </div>
            </form>
        </>
    )
}
