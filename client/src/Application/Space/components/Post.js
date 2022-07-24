import React from 'react';

const Post = ({ post }) => {
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(post.time);
    return (
        <div class='post'>
            <div class='name'>
                {`${post.from.firstname} ${post.from.lastname}`}
            </div>
            <div>
                {`Posted at ${date.toLocaleString()}`}
            </div>
            <div class='text'>
                {`${post.text}`}
            </div>
        </div>
    )
}

export default Post;