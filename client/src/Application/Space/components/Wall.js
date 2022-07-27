import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Wall.css';
import SubmitPost from './SubmitPost';
import Post from './Post';
import useFetch from './hooks/useFetch';

const Wall = () => {

    const [bottomPostTime, setBottomPostTime] = useState(1);
    const [onScroll, setOnScroll] = useState(false);
    const [onPost, setOnPost] = useState(false);
    const { loading, error, posts } = useFetch(bottomPostTime, onPost);

    const wallEnd = useRef(null);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            console.log('Intersecting');
            console.log(target);
            setOnScroll(prev => !prev);
        }
    }, []);
    useEffect(() => {
        console.log("I'm scrolling");
        if (posts.length > 0) setBottomPostTime(posts[posts.length - 1].time)
    }, [onScroll])
    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (wallEnd.current) observer.observe(wallEnd.current);
    }, [handleObserver]);

    const onPostUpdate = () => {
        setBottomPostTime(1);
        setOnPost(prev => !prev)
    }
    
    console.log("Wall.js renders");
    return (
        <div className='wall'>
            <SubmitPost onPostUpdate={onPostUpdate} />
            <div className='wall-posts'>
                {
                    posts &&
                    posts.map((post, index) => {
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