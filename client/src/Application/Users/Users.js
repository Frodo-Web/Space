import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/users')
            if (response.status === 200) {
                response = await response.json();
                setUsers(response)
                console.log(response);
            }
            else {
                console.log('Fetch Users: response status !== 200');
            }
            
        }
        catch(e) {
            console.log("fetchUsers() has been failed!")
            console.log(e)
        }
    };
    return (
        <div className='users'>
            <table className='users-table'>
                <thead>
                    <tr>
                        <td>User ID</td>
                        <td>First name</td>
                        <td>Last name</td>
                    </tr>
                </thead>
                <tbody>
                    {(users) ? users.map(user =>
                        <tr>
                            <td>{user._id}</td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                        </tr>
                    ) : ''}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" align="right">Users count:</td>
                        <td align="center">{(users) ? users.length : '0'}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Users;