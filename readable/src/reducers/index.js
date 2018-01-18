/**
 * Created by apaivaer on 20/12/2017.
 */
import _ from 'lodash'
import { RECEIVE_ALL_POSTS, VOTE_POST_UP } from "../actions/PostsActions"
import { RECEIVE_ALL_CATEGORIES } from "../actions/CategoriesActions"
const initialState = {
    postList: [],
    categories: []
}

function reducer(state = initialState,action) {

    switch(action.type) {

        case RECEIVE_ALL_POSTS:
            return {
                ...state,
                postList: _.mapKeys(action.posts,'id')
        }

        case RECEIVE_ALL_CATEGORIES:
            return {
                ...state,
                categories: _.mapKeys(action.categories,'name')
            }

        case VOTE_POST_UP:

            //TODO FIND A SMART WAY TO SIMPLIFY THIS !
            let x = _.values(state.postList)
            let y = [...x,action.post]
            let z = _.mapKeys(y,'id')
            let postList = { postList: z}
            return {
                ...state,
               ['postList']: z

            }

        default:
            return state

        //Return new state
        return state
    }
}

export default reducer
