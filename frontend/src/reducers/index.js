import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, FRESH_POST } from '../actions';

const categories = (state = [], action) => {
    switch(action.type) {
        case RECEIVE_CATEGORIES: 
            return action.categories
        default:
            return state
    }
}

const posts = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts
        case FRESH_POST:
            const { post } = action
            return state.reduce((posts, oldPost) => {
                posts.push(oldPost.id === post.id ? Object.assign(oldPost, post) : oldPost)
                return posts
            }, [])
        default:
            return state
    }
}
export default combineReducers({
    posts,
    categories
})