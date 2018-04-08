import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS } from '../actions';

const categories = (state = [], action) => {
    switch(action.type) {
        case RECEIVE_CATEGORIES: 
            return action.categories
    }
    return state
}

const posts = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts
        default:
            return state;
    }
}
export default combineReducers({
    posts,
    categories
})