import { SELECT_MENU, TOGGLE_POSTMODAL, FETCH_CATEGORY_LIST} from '../actions/ui'

const initGlobalMenu = {
    activeCategory: ''
}

const initPostModal = {
    open: false
}

const initCategoryList = {
    isLoading: false
}

const initUIState = {
    postModal: {...initPostModal},
    globalMenu: {...initGlobalMenu},
    categoryList: {...initCategoryList}
}
export default (state = initUIState, action) => {
    switch (action.type) {
        case SELECT_MENU:
            const { activeCategory } = action
            return {
                ...state,
                globalMenu: {
                    ...state.globalMenu,
                    activeCategory
                }
            }
        case TOGGLE_POSTMODAL:
            const { open, post } = action
            return {
                ...state,
                postModal: {
                    ...state.postModal,
                    open,
                    post
                },
            }
        case FETCH_CATEGORY_LIST: 
            const { isLoading } = action
            return {
                ...state,
                categoryList: {
                    ...state.categoryList,
                    isLoading
                },
            }
        default:
            return state
    }
}