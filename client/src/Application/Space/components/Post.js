import React from 'react';
import './Post.css';


const Post = ( { post } ) => {
    const date = new Date(post.time);

    console.log("Post.js renders");
    return (
        <div className='post'>
            <div className='name'>
                {`${post.from.firstname} ${post.from.lastname}`}
            </div>
            <div className='local-time'>
                {`Posted at ${date.toLocaleString()}`}
            </div>
            <div className='text'>
                {`${post.text}`}
            </div>
        </div>
    )
};

export default Post;