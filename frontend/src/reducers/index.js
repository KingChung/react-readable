import { combineReducers } from 'redux'
import { RECEIVE_CATEGORIES, SELECT_MENU } from '../actions';

const categories = (state = [], action) => {
    switch(action.type) {
        case RECEIVE_CATEGORIES: 
            return action.categories
        default:
            return state
    }
}

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
export default combineReducers({
    categories,
    globalMenu
})