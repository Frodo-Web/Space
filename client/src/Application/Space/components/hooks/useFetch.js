import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

function useFetch(bottomPostTime) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    console.log('inside useFetch');

    const getMorePosts = useCallback(async () => {
        console.log('Inside useFetch getMorePosts');
        try {
            await setLoading(true);
            await setError(false);
            const BASE_URL = process.env.REACT_APP_BASE_URL;
            let response = await fetch(BASE_URL + `/space/wall-get?bottomPostTime=${bottomPostTime}`, {
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json'
                },
            });
            if (response.status === 200) {
                response = await response.json();
                console.log(`getMorePosts response: ${response}`);
                await setPosts((prev) => [...prev, ...response]);
                setLoading(false);
            } else if (response.status === 403) {
                navigate('/');
            } else {
                console.log('useFetch: response status !== 200');
            }

        } catch (err) {
            setError(err);
        }
    }, [bottomPostTime]);

    useEffect(() => {
        getMorePosts();
        console.log('Inside useFectch useEffect');
    }, [getMorePosts, bottomPostTime]);

    return { loading, error, posts };
}

export default useFetch;