/**
 * Created by apaivaer on 20/12/2017.
 */
import { VOTE_UP, VOTE_DOWN } from "../actions/VoteAction"
import { RECEIVE_ALL_POSTS,receiveAllPosts } from "../actions/PostsActions"

const initialState = {
    postList: [],
    categories: []

}


function reducer(state = initialState,action) {

    let newState = {

    }

    console.log('Calling reducer with action ' + action.posts)

    switch(action.type) {

        case RECEIVE_ALL_POSTS:
            Object.assign(newState,state,{
                postList: action.posts
            })
            return newState
            break
        default:

            return state


        //Return new state
        return state
    }
}

export default reducer
