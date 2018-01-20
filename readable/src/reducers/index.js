/**
 * Created by apaivaer on 20/12/2017.
 */
import _ from 'lodash'
import { RECEIVE_ALL_POSTS, RECEIVE_POSTS_BY_CATEGORY, DISPLAY_POST_DETAILS, VOTE_POST_UP, VOTE_POST_DOWN } from "../actions/PostsActions"
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
                postList: _.mapKeys(action.posts,'id'),
                categoryFilter: action.category
        }

        case RECEIVE_ALL_CATEGORIES:
            return {
                ...state,
                categories: _.mapKeys(action.categories,'name')
            }

        case RECEIVE_POSTS_BY_CATEGORY:
            return {
                ...state,
                postList: _.mapKeys(action.posts,'id'),
                categoryFilter: action.category
            }

        case DISPLAY_POST_DETAILS:
            return {
                ...state,
                postDetail: state.postList[action.id]
            }

        case VOTE_POST_UP:
            return {
                ...state,
               postList: {
                   ...state.postList,
                   [action.post.id]: action.post
               }
            }

        case VOTE_POST_DOWN:
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
