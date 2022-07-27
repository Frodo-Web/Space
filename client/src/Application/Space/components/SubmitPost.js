import React, { useState, memo } from 'react';
import { useNavigate } from "react-router-dom";


const initialFormData = Object.freeze({
    text: "",
});

const SubmitPost = ( { onPostUpdate } ) => {

    const [formData, updateFormData] = useState(initialFormData);
    const navigate = useNavigate();

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
                onPostUpdate();
          //      navigate(0);
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

    console.log('SubmitPost.js renders');
    return (
        <div className='submit-post'>
            <form onSubmit={handleSubmit}>
                <textarea name='text' type="text" placeholder='Hello...' minlength="1" onChange={handleChange} />
                <button className='post-button' type="submit">Post</button>
            </form>
        </div>
    )
}

export default memo(SubmitPost);