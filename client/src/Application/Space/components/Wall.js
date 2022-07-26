import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Wall.css';
import SubmitPost from './SubmitPost';
import Post from './Post';
import useFetch from './hooks/useFetch';

const Wall = () => {

    //   const [posts, setPosts] = useState(null);
    const [bottomPostTime, setBottomPostTime] = useState(1);
    const [scrollCount, setScrollCount] = useState(0);
    //   const { loading, error, list } = useFetch(bottomPostTime);
    const { loading, error, posts } = useFetch(bottomPostTime);

    const wallEnd = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            console.log('Intersecting');
            console.log(target);
            setScrollCount(prev => prev + 1);
            //         if (posts.length > 0) console.log(posts[posts.length - 1].time);
            //         if (posts.length > 0) setBottomPostTime(posts[posts.length - 1].time);
        }
    }, []);
    useEffect(() => {
        console.log("I'm scrolling");
        if (posts.length > 0) setBottomPostTime(posts[posts.length - 1].time)
    }, [scrollCount])
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (wallEnd.current) observer.observe(wallEnd.current);
    }, [handleObserver]);

    console.log(`bottomPostTime: ${bottomPostTime}`)
    
    /*
    useEffect(() => {
        if (posts.length > 0) {
            console.log(posts[posts.length - 1].time);
            setBottomPostTime(posts[posts.length - 1].time);
        };
    }, [posts]);
*/

/*
    const memoizedCallback = useCallback(() => fetchWall(), []);
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
                setPosts([{ message: 'Fetch Wall: Something went wrong...' }]);
            }

        }
        catch (e) {
            console.log("fetchWall() has been failed!");
            console.log(e);
        }
    };
*/
    console.log("Wall.js renders");
    return (
        <div className='wall'>
            {/* <SubmitPost fetchWall={memoizedCallback} /> */}
            <SubmitPost />
            <div className='wall-posts'>
                {
                    posts &&
                    posts.map((post, index) => {
                        //   if(index + 1 < posts.length) return <Post post={post} />
                        //   if(index + 1 === posts.length) return <Post ref={wallEnd} post={post} />
                        return <Post post={post} />
                    })
                }
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
                <div className='wall-end' ref={wallEnd}></div>
            </div>
        </div>
    )
}

export default Wall;