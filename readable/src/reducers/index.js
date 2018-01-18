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
            return {
                ...state,
               postList: {
                   ...state.postList,
                   [action.post.id]: action.post
               }
            }

        default:
            return state

        //Return new state
        return state
    }
}

export default reducer
