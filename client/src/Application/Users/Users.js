import React, { useEffect, useState } from 'react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [info, setInfo] = useState(null);
    useEffect(() => {
        fetchUsers();
    }, [])
    const fetchUsers = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/users', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
                setUsers(response)
            }
            else if (response.status === 403 ) {
                setInfo('You need to LogIn to see the table');
            } 
            else if (response.status === 401) {
                setInfo('Invalid token');
            } else {
                console.log('Fetch Users: response status !== 200');
            }
            
        }
        catch(e) {
            console.log("fetchUsers() has been failed!")
            console.log(e)
        }
    };
    console.log("User.js renders");
    return (
        <>
            {(users !== null)
                ?
                <div className='users'>
                    <table className='users-table' style={(users !== null ? { visibility: 'visible' } : { visibility: 'hidden' })} >
                        <thead>
                            <tr>
                                <td>User ID</td>
                                <td>First name</td>
                                <td>Last name</td>
                                <td>Registered At</td>
                            </tr>
                        </thead>
                        <tbody>
                            {(users) ? users.map(user =>
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.registeredAt}</td>
                                </tr>
                            ) : ''}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" align="right">Users count:</td>
                                <td colspan="2" align="left">{(users) ? users.length : '0'}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                :
                null
            }
            {(info !== null ? <h2 className='users info'>{info}</h2> : null)}
        </>
    )
}

export default Users;