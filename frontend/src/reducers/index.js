import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, SELECT_MENU, RECEIVE_POSTS, UPDATE_POST, UPDATE_SCORE_STATE } from '../actions';

const initMenu = {
    activeItem: ''
}
const globalMenu = (state = initMenu, action) => {
    switch(action.type) {
        case SELECT_MENU:
            const { activeItem } = action
            return {
                ...state,
                activeItem
            }
        default:
            return state
    }
}

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
            return action.posts.reduce((posts, post) => {
                posts[post.id] = {...post}
                return posts
            }, {})
        case UPDATE_POST:
            const { post } = action
            return {
                ...state,
                [post.id]: post
            }
        default:
            return state
    }
}

const scoreState = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SCORE_STATE:
            return {
                ...state,
                [action.id]: action.scoreState
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    categories,
    globalMenu,
    scoreState
})