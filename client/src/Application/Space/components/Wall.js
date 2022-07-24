import React, { useState, useEffect } from 'react';
import './Wall.css';
import Post from './Post';


const initialFormData = Object.freeze({
    text: "",
});

const Wall = () => {

    const [formData, updateFormData] = useState(initialFormData);
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        fetchWall();
    }, [])

    const fetchWall = async () => {
        try {
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + '/space/wall-get', {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
                setPosts(response);
            } else {
                console.log('Fetch Wall: response status !== 200');
                setPosts([ { message: 'Fetch Wall: Something went wrong...' } ]);
            }

        }
        catch (e) {
            console.log("fetchWall() has been failed!");
            console.log(e);
        }
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            const response = await fetch(BASE_URL + '/space/wall-post', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const jsonResponse = await response.json();
            if (response.status === 200) {
                console.log(jsonResponse);
                fetchWall();
            } else {
                console.log(jsonResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() })
    }

    return (
        <div className='wall'>
            <div className='submit-post'>
                <form onSubmit={handleSubmit}>
                    <textarea name='text' type="text" placeholder='Hello...' minlength="1" onChange={handleChange} />
                    <button className='post-button' type="submit">Post</button>
                </form>
            </div>
            <div className='wall-posts'>
                {posts && posts.map((post) => <Post post={post} />)}
            </div>
        </div>
    )
}

export default Wall;