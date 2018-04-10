export const fetchPosts = (category = 'all') => {
    let api = category === 'all' ? 'posts' : `${category}/posts`;
    return fetch(`http://127.0.0.1:3001/${api}`, {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
}

export const VOTEPOST_LIKE = 'upVote'
export const VOTEPOST_UNLIKE = 'downVote'
export const votePost = (postId, likeOrUnlike) => {
    return updatePost(postId, {
        option: likeOrUnlike ? VOTEPOST_LIKE : VOTEPOST_UNLIKE
    })
}

export const updatePost = (postId, params) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest', 
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
}