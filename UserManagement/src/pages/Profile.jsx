import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from '../context/context';

export default function Profile({ }) {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const { LoadUserById, users } = useContext(Context);

  useEffect(() => {
    const user = LoadUserById(username);
    setUser(user);
    console.log(users);
  },);

  return (
    <>
      <div className="container p-4 card">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-image mx-auto mb-4">
              <img src={user.image} alt="" className="img-fluid rounded-circle" />
            </div>
          </div>
          <div className="col-md-8 centered-text">
            <div className="profile-details">
              <div className="profile-name">
                <h6 className='text-profile-info'>Hi, Welcome to your Profile</h6>
                <h3>{user.username}</h3>
              </div>
              <hr />
              <div className="user-information">
                <div className="row">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-profile-info">{user.firstName} {user.lastName}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-profile-info">{user.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>City</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-profile-info">{user.city}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Street</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-profile-info">{user.street} {user.streetNumber}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Date Of Birth</label>
                  </div>
                  <div className="col-md-6">
                    <p className="text-profile-info">{user.birthDate}</p>
                  </div>
                </div>
              </div>
              <div className=" mt-4">
                <Link to={`/EditProfile/${username}`}><button type="button" className="btn btn-primary ml-3 btn--edit-page ">Edit Profile</button></Link>
                <Link to="/Login" ><button type="button" className="edit-btn btn btn-danger btn--edit-page ">Sign Out</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}