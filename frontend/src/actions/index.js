export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const fetchCategories = () => (dispatch) => {
    return fetch('http://127.0.0.1:3001/categories', {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receiveCategories(json)))
}

export const receiveCategories = ({categories}) => ({
    type: RECEIVE_CATEGORIES,
    categories
})

export const requestCategories = () => (dispatch) => {
    return dispatch(fetchCategories())
}

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

const fetchPosts = (category) => (dispatch) => {
    return fetch(`http://127.0.0.1:3001/${category}/posts`, {
        headers: { 'Authorization': 'as-guest' }
    })
        .then(res => res.json())
        .then(json => dispatch(receivePosts(json)))
}

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const requestPosts = (category) => (dispatch) => {
    return dispatch(fetchPosts(category))
}
 


