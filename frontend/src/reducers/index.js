import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, UPDATE_POST, RECEIVE_COMMENTS, RECEIVE_COMMENT, RECEIVE_POST, SORT_POSTS } from '../actions'
import ui from './ui'
import voteState from './vote'

// Data Struct
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
                if(!post.deleted) {
                    posts[post.id] = {...post}
                }
                return posts
            }, {})
        case UPDATE_POST:
            const { post } = action
            return {
                ...state,
                [post.id]: post
            }
        case RECEIVE_POST: 
            if(action.post.deleted) {
                return Object.values(state).reduce((posts, post) => {
                    if(post.id !== action.post.id) {
                        posts[post.id] = post
                    }
                    return posts
                }, {})
            } else {
                return {
                    ...state,
                    [action.post.id]: {
                        ...state[action.post.id],
                        ...action.post
                    }
                }
            }
        case SORT_POSTS:
            const { criteria  } = action
            const compare = typeof criteria === 'function' ? criteria : (a, b) => {
                return a[criteria] - b[criteria]
            }
            return Object.values(state).sort(compare).reduce((posts, post, index) => {
                posts[post.id] = post
                return posts
            }, {})
        default:
            return state
    }
}

const comments = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return action.comments.reduce((comments, comment) => {
                if(!comment.deleted) {
                    comments[comment.id] = {...comment}
                }
                return comments
            }, {})
        case RECEIVE_COMMENT:
            if(action.comment.deleted) {
                return Object.values(state).reduce((comments, comment) => {
                    if(comment.id !== action.comment.id) {
                        comments[comment.id] = comment
                    }
                    return comments
                }, {})
            } else {
                return {
                    ...state,
                    [action.comment.id]: {
                        ...state[action.comment.id],
                        ...action.comment
                    }
                }
            }
        default:
            return state
    }
}

export default combineReducers({
    ui,
    posts,
    categories,
    comments,
    voteState
})