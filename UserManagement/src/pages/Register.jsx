import React, { useState, useContext } from 'react'
import { Context } from '../context/context'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


export default function Register() {

    const navigate = useNavigate();
    const [confirmPassword, SetConfirmPassword] = useState("");
    const [user, SetUser] = useState({
        username: "",
        password: "",
        image: null,
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        city: "",
        street: "",
        streetNumber: ""
    });


    const { SetUsers, CheckIfValidCity, CheckIfUserExist, CheckIfValidDate, InputTextOnly, CheckIfValidPassword, CheckValidEmail, ValidateStreet, cities, CheckIfValidUsername } = useContext(Context);

    const SaveImage = (file) => {
        let profilePicture = URL.createObjectURL(file);
        SetUser({...user, image: profilePicture});
        console.log(profilePicture);
    };

    const RegisterUser = (event) => {
        event.preventDefault();


        if (confirmPassword !== user.password) {
            alert("Passwords do not match.");
        }
        else if (!InputTextOnly(user)) {
            alert("name only accept text as an input")
        }
        else if (CheckIfUserExist(user.email, user.username) != undefined || user.username.toLocaleLowerCase() === "admin") {
            alert("Email or usename already taken.");
        }
        else if (CheckIfValidDate(user.birthDate) < 0 || CheckIfValidDate(user.birthDate) > 120) {
            alert("invalid Birth Date");
        }
        else if (user.streetNumber < 1) {
            alert("No negative numbers are allowed in a street number.")
        }
        else if (!CheckIfValidPassword(user.password)) {
            alert("Password most contain 7-12 letters with at least 1 capital and 1 special")
        }
        else if (CheckIfValidUsername(user.username)) {
            alert("username most be less than 60 letters and only in english")
        }
        else if (!CheckValidEmail(user.email)) {
            alert("incorrect email.")
        }
        else if(!CheckIfValidCity(user.city)){
            alert("please choose a city from one of the options.")
        }
        else if (!ValidateStreet(user.street)) {
            alert("street name can only be in hebrew")
        }
        else {
            SetUsers((prev) => [...prev, user]);
            navigate("/Login");
        }
    }


    return (
        <>
            <form className="card shadow container p-4" onSubmit={RegisterUser}>
                <h2 className='text-center my-3 card-title'>SIGN UP</h2>
                <div className="card-body">
                    <div className="row my-3">
                        <label htmlFor="user-name-input" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" id='user-name-input' className="form-control" required onChange={(event) => SetUser({ ...user, username: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password-input" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" id='password-input' className="form-control" required onChange={(event) => SetUser({ ...user, password: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="confirm-password-input" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" id='confirm-password-input' className="form-control" required onChange={(event) => SetConfirmPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="image-input" className="col-sm-2 col-form-label">Picture</label>
                        <div className="col-sm-10">
                            <input type="file" accept=".jpeg, .jpg" id='image-input' className="form-control" required onChange={(event) => SaveImage(event.target.files[0])} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="name-input" className="col-sm-2 col-form-label d-flex align-items-center justify-content-start">Name</label>
                        <span className="col-sm-10 d-flex align-items-center justify-content-between">
                            <input type="text" className="form-control name-input me-1" placeholder="First Name" required onChange={(event) => SetUser({ ...user, firstName: event.target.value })} />
                            <input type="text" placeholder="Last Name" className="form-control ms-1" required onChange={(event) => SetUser({ ...user, lastName: event.target.value })} />
                        </span>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="email-input" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" id='email-input' className="form-control" required onChange={(event) => SetUser({ ...user, email: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="birth-date-input" className="col-sm-2 col-form-label">Birth Date</label>
                        <div className="col-sm-10">
                            <input type="date" id='birth-date-input' className="form-control" required onChange={(event) => SetUser({ ...user, birthDate: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="city-input" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input type="text" id='city-input' list="cities" className="form-control" autoComplete="off" required onChange={(event) => SetUser({ ...user, city: event.target.value })} />
                            <datalist id="cities">
                                {
                                   cities.map( city => <option value={city.שם_ישוב_לועזי}  key={city._id}/>)
                                }
                            </datalist>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="street-input" className="col-sm-2 col-form-label">Street</label>
                        <div className="col-sm-10">
                            <input type="text" id='street-input' className="form-control" required onChange={(event) => SetUser({ ...user, street: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="street-number-input" className="col-sm-2 col-form-label">Street Number</label>
                        <div className="col-sm-10">
                            <input type="number" id='street-number-input' className="form-control" required onChange={(event) => SetUser({ ...user, streetNumber: event.target.value })} />
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse my-3">
                        <button className="btn btn-primary btn-lg btn--edit-page mt-3" type='submit'>Sign up</button>
                    </div>
                    <div className='mt-5 text-center'> Already have an account? <Link to="/Login">Sign in</Link></div>
                </div>
            </form>
        </>
    )
}
