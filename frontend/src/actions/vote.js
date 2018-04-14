
import { receiveComment, receivePost } from './index'

//Vote Score
const VOTE_LIKE = 'upVote'
const VOTE_UNLIKE = 'downVote'
export const SCORETYPE_POST = 'posts'
export const SCORETYPE_COMMENT = 'comments'

const getReceiver = (type) => {
    switch (type) {
        case SCORETYPE_POST:
            return receivePost
        case SCORETYPE_COMMENT:
            return receiveComment
        default:
            throw new Error('Receiver invalid')
    }
}

const requestApi = (resource) => {
    return (id, params) => (dispatch) => {
        return fetch(`http://127.0.0.1:3001/${resource}/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': 'as-guest',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(res => res.json())
            .then(json => dispatch(getReceiver(resource)(json)))
    }
}

export const updateVote = (voteScore, upOrDown) => (dispatch) => {
    const { type, id } = voteScore
    dispatch(updateVoteState(type, id, upOrDown))
    return dispatch(requestApi(type)(id, {
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