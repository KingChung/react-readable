import { SCORETYPE_COMMENT, SCORETYPE_POST, UPDATE_VOTE_STATE } from '../actions/vote'

const initVoteState = {
    [SCORETYPE_POST]: {},
    [SCORETYPE_COMMENT]: {}
}
export default (state = initVoteState, action) => {
    switch (action.type) {
        case UPDATE_VOTE_STATE:
            return {
                ...state,
                [action.scoreType]: {
                    ...state[action.scoreType],
                    [action.id]: action.voteState
                }
            }
        default:
            return state
    }
}