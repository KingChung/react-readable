export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const fetchCategories = () => (dispatch) => {
    return fetch('http://127.0.0.1:3001/categories', {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveCategories(json)))
}

export const receiveCategories = ({ categories }) => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const requestCategories = () => (dispatch) => {
    return dispatch(fetchCategories())
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FRESH_POST = 'FRESH_POST'
export const SORT_POSTS = 'SORT_POSTS'

const fetchPosts = (category) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/${category}/posts`, {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receivePosts(json)))
}

const updatePost = (postId, params) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest', 
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(json => dispatch(freshPost(json)))
}

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const sortPosts = (criteria) => ({
    type: SORT_POSTS,
    criteria
})

export const freshPost = (post) => ({
    type: FRESH_POST,
    post
})

export const requestPosts = (category) => (dispatch) => {
    return dispatch(fetchPosts(category))
}

const VOTEPOST_LIKE = 'upVote'
const VOTEPOST_UNLIKE = 'downVote'
export const votePost = (postId, isLike) => (dispatch) => {
    return dispatch(updatePost(postId, {
        option:isLike ? VOTEPOST_LIKE : VOTEPOST_UNLIKE
    }))
}



