import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap";
import { Context } from '../context/context';


export default function SystemManager() {
  const { users, SetUsers } = useContext(Context);

  const DeleteUser = (event) => {
    let filteredUsers = users.filter(u => u.username != event.target.id);
    SetUsers(filteredUsers);
  }

  return (
    <>
      <div className="container">
        <h2 className='text-center my-5'>System Manager</h2>
        <Link to="/Login"><button type="button" className="btn btn-outline-danger my-4">Log out</button></Link>
        {
          users.length < 1 ?
            (<h3 className='text-center text-danger'>No users were found</h3>) :
            (
              <table className="table">
                <thead>
                  <tr className=''>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((u, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="profile-image--manager rounded-circle mx-">
                                <img src={u.image} alt="" className="img-fluid" />
                              </div>
                              <div className="username ms-2">{u.username}</div>
                            </div>
                          </td>
                          <td className="align-middle">{u.firstName} {u.lastName}</td>
                          <td className="align-middle">{u.email}</td>
                          <td className="align-middle">{u.city} {u.street} {u.streetNumber}</td>
                          <td className="align-middle">
                            <Link to={`/EditProfile/${u.username}`}><button type="button" className="btn btn-primary me-2">Edit</button></Link>
                            <button type="button" id={u.username} onClick={DeleteUser} className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            )
        }
      </div>

    </>
  )
}