/**
 * Created by apaivaer on 20/12/2017.
 */
import { VOTE_UP, VOTE_DOWN } from "../actions/VoteAction"

function reducer(state,action) {

    let newState = []

    switch(action.type) {
        case VOTE_UP:
            //Find post corresponding to action passed

            //Increment 1 to voteCount
            break
        case VOTE_DOWN:
            //Find post corresponding to action passed

            //Decrement 1 to voteCount
            break
        default:
            return state

        //Return new state
        return state
    }
}

export default reducer
