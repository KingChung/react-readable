export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const __fetchCategories = () => (dispatch) => {
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
    return dispatch(__fetchCategories())
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPDATE_POST = 'UPDATE_POST'

const __fetchPosts = (category = 'all') => (dispatch) => {
    let api = category === 'all' ? 'posts' : `${category}/posts`;
    return fetch(`http://127.0.0.1:3001/${api}`, {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receivePosts(json)))
}

const __fetchPost = (id) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${id}`, {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receivePosts([json])))
}

const __requestPost = (postId, params) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest', 
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(json => dispatch(updatePost(json)))
}

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

export const requestPosts = (category) => (dispatch) => {
    return dispatch(__fetchPosts(category))
}

export const requestPost = (id) => (dispatch) => {
    return dispatch(__fetchPost(id))
}

const VOTEPOST_LIKE = 'upVote'
const VOTEPOST_UNLIKE = 'downVote'
export const votePost = (postId, isLike) => (dispatch) => {
    dispatch(updateScoreState(postId, isLike))
    return dispatch(__requestPost(postId, {
        option:isLike ? VOTEPOST_LIKE : VOTEPOST_UNLIKE
    }))
}

export const UPDATE_SCORE_STATE = 'UPDATE_SCORE_STATE'
export const updateScoreState = (id, scoreState) => ({
    type: UPDATE_SCORE_STATE,
    id,
    scoreState
})

// UI State
export const SELECT_MENU = 'SELECT_MENU'
export const selectMenu = (item) => ({
    type: SELECT_MENU,
    activeItem: item
})



