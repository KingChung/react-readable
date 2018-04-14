export const SELECT_MENU = 'SELECT_MENU'
export const selectMenu = (activeCategory) => ({
    type: SELECT_MENU,
    activeCategory
})

export const TOGGLE_POSTMODAL = 'TOGGLE_POSTMODAL'
export const togglePostModal = (open, post) => ({
    type: TOGGLE_POSTMODAL,
    open,
    post
})

export const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST'
export const toggleCategoryListLoading = (isLoading) => ({
    type: FETCH_CATEGORY_LIST,
    isLoading
})

export const TOGGLE_COMMENTFORM = 'TOGGLE_COMMENTFORM'
export const toggleCommentForm = (open, comment) => ({
    type: TOGGLE_COMMENTFORM,
    open,
    comment
})