import { apiUpdateComment, apiUpdatePost } from './index.js'

//Vote Score
const VOTE_LIKE = 'upVote'
const VOTE_UNLIKE = 'downVote'
export const SCORETYPE_POST = 'post'
export const SCORETYPE_COMMENT = 'comment'

const getVoteAPI = (type) => {
    switch (type) {
        case SCORETYPE_POST:
            return apiUpdatePost
        case SCORETYPE_COMMENT:
            return apiUpdateComment
        default:
            throw new Error('Vote API does not exsit')
    }
}
export const updateVote = (voteScore, upOrDown) => (dispatch) => {
    const { type, id } = voteScore
    dispatch(updateVoteState(type, id, upOrDown))
    return dispatch(getVoteAPI(type)(id, {
        option: upOrDown ? VOTE_LIKE : VOTE_UNLIKE
    }))
}

export const UPDATE_VOTE_STATE = 'UPDATE_VOTE_STATE'
export const updateVoteState = (scoreType, id, voteState) => ({
    type: UPDATE_VOTE_STATE,
    id,
    voteState,
    scoreType
})