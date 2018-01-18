/**
 * Created by apaivaer on 20/12/2017.
 */
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
                postList: action.posts
        }

        case RECEIVE_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }

        case VOTE_POST_UP:
            Object.assign({},state, {
                ...state,
            })
            return state
        default:
            return state

        //Return new state
        return state
    }
}

export default reducer
