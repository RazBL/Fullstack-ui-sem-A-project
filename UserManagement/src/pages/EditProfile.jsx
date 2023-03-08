import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../context/context'
import { useNavigate, Link, useParams } from "react-router-dom";


export default function EditProfile() {

    const { username } = useParams();
    const [confirmPassword, SetConfirmPassword] = useState();
    const [user, SetUser] = useState({});
    const [oldUserInfo, SetOldUserInfo] = useState({});
    const { EditUser, LoadUserById, adminLoggedIn, CheckIfValidCity, CheckIfUsernameExist, CheckIfEmailExist, CheckIfValidDate, InputTextOnly, CheckIfValidPassword, CheckValidEmail, ValidateStreet, cities, CheckIfValidUsername } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        SetUser(LoadUserById(username));
        SetOldUserInfo(LoadUserById(username));
        SetConfirmPassword(LoadUserById(username).password);
    }, [])

    const SaveImage = (file) => {
        let profilePicture = URL.createObjectURL(file);
        SetUser({ ...user, image: profilePicture });
    };


    const EditProfile = (event) => {
        event.preventDefault();

        if (oldUserInfo.username !== user.username) {
            if (CheckIfUsernameExist(user.username) || user.username.toLocaleLowerCase() === "admin") {
                alert("username already exists.");
                return;
            }
        }
        else if (oldUserInfo.email !== user.email) {
            if (CheckIfEmailExist(user.email)) {
                alert("email already exists.");
                return;
            }
        }

        if (confirmPassword !== user.password) {
            alert("Passwords do not match.");
        }
        else if (!InputTextOnly(user)) {
            alert("name only accept text as an input")
        }
        else if (CheckIfValidDate(user.birthDate) < 0 || CheckIfValidDate(user.birthDate) > 120) {
            alert("invalid Birth Date");
        }
        else if (user.streetNumber < 1) {
            alert("No negative numbers are allowed in a street number.")
        }
        else if (!CheckIfValidPassword(user.password)) {
            alert("Password most contain 7-12 letters with at least 1 uppercase and 1 unique")
        }
        else if (CheckIfValidUsername(user.username)) {
            alert("username most be less than 60 letters and only in english")
        }
        else if (!CheckValidEmail(user.email)) {
            alert("incorrect email.")
        }
        else if (!CheckIfValidCity(user.city)) {
            alert("please choose a city from one of the options.")
        }
        else if (!ValidateStreet(user.street)) {
            alert("street name can only be in hebrew")
        }
        else {
            EditUser(username, user);
            if (adminLoggedIn){
                navigate("/SystemManager");
            }
            else{
                navigate(`/Profile/${user.username}`);
            }
        }
    }
    

    return (
        <>
            <form className="card shadow container p-4" onSubmit={EditProfile}>
                <h2 className='text-center my-3 card-title'>Edit Profile</h2>
                <div className="card-body">
                    <div className="row my-3">
                        <label htmlFor="user-name-input" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-10">
                            <input type="text" id='user-name-input' className="form-control" required defaultValue={user.username || ""} onChange={(event) => SetUser({ ...user, username: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="password-input" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" id='password-input' className="form-control" required defaultValue={user.password || ""} onChange={(event) => SetUser({ ...user, password: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="confirm-password-input" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" id='confirm-password-input' className="form-control" required defaultValue={confirmPassword || ""} onChange={(event) => SetConfirmPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="image-input" className="col-sm-2 col-form-label">Picture</label>
                        <div className="col-sm-10">
                            <input type="file" accept=".jpeg, .jpg" id='image-input' className="form-control" onChange={(event) => SaveImage(event.target.files[0])} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="name-input" className="col-sm-2 col-form-label d-flex align-items-center justify-content-start">Name</label>
                        <span className="col-sm-10 d-flex align-items-center justify-content-between">
                            <input type="text" className="form-control name-input me-1" required placeholder="First Name" defaultValue={user.firstName || ""} onChange={(event) => SetUser({ ...user, firstName: event.target.value })} />
                            <input type="text" placeholder="Last Name" className="form-control ms-1" required defaultValue={user.lastName || ""} onChange={(event) => SetUser({ ...user, lastName: event.target.value })} />
                        </span>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="email-input" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" id='email-input' className="form-control" required defaultValue={user.email || ""} onChange={(event) => SetUser({ ...user, email: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="birth-date-input" className="col-sm-2 col-form-label">Birth Date</label>
                        <div className="col-sm-10">
                            <input type="date" id='birth-date-input' className="form-control" onChange={(event) => SetUser({ ...user, birthDate: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="city-input" className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-10">
                            <input type="text" id='city-input' className="form-control" list="cities" autoComplete="off" required defaultValue={user.city || ""} onChange={(event) => SetUser({ ...user, city: event.target.value })} />
                            <datalist id="cities">
                                {
                                    cities.map(city => <option value={city.שם_ישוב_לועזי} key={city._id} />)
                                }
                            </datalist>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="street-input" className="col-sm-2 col-form-label">Street</label>
                        <div className="col-sm-10">
                            <input type="text" id='street-input' className="form-control" required defaultValue={user.street || ""} onChange={(event) => SetUser({ ...user, street: event.target.value })} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="street-number-input" className="col-sm-2 col-form-label">Street Number</label>
                        <div className="col-sm-10">
                            <input type="number" id='street-number-input' className="form-control" required defaultValue={user.streetNumber || ""} onChange={(event) => SetUser({ ...user, streetNumber: event.target.value })} />
                        </div>
                    </div>
                    <div className="d-flex flex-sm-row flex-column  align-items-center justify-content-sm-end my-5">
                        {
                            adminLoggedIn ? <Link to={"/SystemManager"}>
                            <button className="btn btn-primary btn-lg btn--edit-page">Back</button>
                             </Link> :
                            <Link to={`/Profile/${username}`}>
                            <button className="btn btn-primary btn-lg btn--edit-page">Back to profile</button>
                            </Link>
                        }

                            <button className="edit-btn btn btn-primary btn-lg btn--edit-page" type='submit'>Edit</button>
                    </div>
                </div>
            </form>
        </>
    )
}
