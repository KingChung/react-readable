import uuidCreator from '../utils/uuidCreator'

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

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
const __requestComments = (postId) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}/comments`, {
        method: 'GET',
        headers: { 
            'Authorization': 'as-guest'
         }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveComments(json)))
}
export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})
export const receiveComment = (comment) => ({
    type: RECEIVE_COMMENT,
    comment
})
export const requestComments = (postId) => (dispatch) => {
    return dispatch(__requestComments(postId))
}

const __createComment = (comment) => (dispatch) => {
    comment.parentId = comment.postId
    return fetch(`http://127.0.0.1:3001/comments`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            ...comment,
            timestamp: +new Date(),
            id: uuidCreator('comment'),
        })
    })
        .then(res => res.json())
        .then(json => dispatch(receiveComment(json)))
}
const __deleteComment = (commentId) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': 'as-guest',
            'Content-Type' : 'application/json'
        }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveComment(json)))
}
export const createComment = (comment) => (dispatch) => {
    return dispatch(__createComment(comment))
}
export const deleteComment = (commentId) => (dispatch) => {
    return dispatch(__deleteComment(commentId))
}

// UI State
export const SELECT_MENU = 'SELECT_MENU'
export const selectMenu = (item) => ({
    type: SELECT_MENU,
    activeItem: item
})



