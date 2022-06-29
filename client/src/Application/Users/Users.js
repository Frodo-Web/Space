import React, { useEffect, useState } from 'react';

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
        </div>
    )
}

export default Users;