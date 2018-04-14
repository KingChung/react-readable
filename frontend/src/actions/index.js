import uuidCreator from '../utils/uuidCreator'

// Category
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

// Post
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const RECEIVE_POST = 'RECEIVE_POST'

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

const __updatePost = (postId, params) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}`, {
        method: 'PUT',
        headers: { 
            'Authorization': 'as-guest', 
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(json => dispatch(receivePost(json)))
}

const __createPost = (post) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest', 
            'Content-Type' : 'application/json'
         },
        body: JSON.stringify(post)
    })
        .then(res => res.json())
        .then(json => dispatch(receivePost(json)))
}

const __deletePost = (postId) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}`, {
        method: 'DELETE',
        headers: { 
            'Authorization': 'as-guest'
        }
    })
        .then(res => res.json())
        .then(json => dispatch(receivePost(json)))
}

export const requestPosts = (category) => (dispatch) => {
    return dispatch(__fetchPosts(category))
}

export const requestPost = (id) => (dispatch) => {
    return dispatch(__fetchPost(id))
}

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export const updatePost = (post) => (dispatch) => {
    return dispatch(__updatePost(post.id, post))
}

export const deletePost = (postId) => (dispatch) => {
    return dispatch(__deletePost(postId))
}

export const createPost = (post) => (dispatch) => {
    return dispatch(__createPost({
        ...post,
        timestamp: +new Date(),
        id: uuidCreator('post'),
    }))
}

// Comment
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
const __fetchComments = (postId) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/posts/${postId}/comments`, {
        method: 'GET',
        headers: { 
            'Authorization': 'as-guest'
         }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveComments(json)))
}

const __createComment = (comment) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/comments`, {
        method: 'POST',
        headers: { 
            'Authorization': 'as-guest',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(comment)
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

const __updateComment = (commentId, params) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/comments/${commentId}`, {
        method: 'PUT',
        headers: { 
            'Authorization': 'as-guest',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(res => res.json())
        .then(json => dispatch(receiveComment(json)))
}

export const updateComment = (comment) => (dispatch) => {
    return dispatch(__updateComment(comment.id, {
        ...comment,
        timestamp: + new Date()
    }))
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
    return dispatch(__fetchComments(postId))
}

export const createComment = (comment) => (dispatch) => {
    return dispatch(__createComment({
        ...comment,
        timestamp: +new Date(),
        id: uuidCreator('comment')
    }))
}
export const deleteComment = (commentId) => (dispatch) => {
    return dispatch(__deleteComment(commentId))
}