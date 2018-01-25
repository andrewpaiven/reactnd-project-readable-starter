/**
 * Created by apaivaer on 20/12/2017.
 */
import _ from 'lodash'
import {
    RECEIVE_ALL_POSTS,
    RECEIVE_POSTS_BY_CATEGORY,
    DISPLAY_POST_DETAILS,
    VOTE_POST_UP,
    VOTE_POST_DOWN,
    RECEIVE_POST_COMMENTS,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN,
    POST_COMMENT,
    GET_NEW_POST,
    DELETE_POST,
    POST_CONTROL,
    EDIT_POST,
    DELETE_COMMENT,
    OPEN_COMMENT_EDITOR,
    EDIT_COMMENT
} from "../actions/PostsActions"
import { RECEIVE_ALL_CATEGORIES } from "../actions/CategoriesActions"
const initialState = {
    postList: [],
    categories: [],
    postControl: {
        showModal: false
    },
    commentControl: {
        showModal: false
    }
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

        case GET_NEW_POST:
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post
                },
                postControl: {
                    showModal: false
                }
            }

        case VOTE_POST_UP:
            if(state.postDetail && state.postDetail.id === action.post.id) {
                return {
                    ...state,
                    postList: {
                        ...state.postList,
                        [action.post.id]: action.post
                    },
                    postDetail: action.post
                }
            }
            return {
                ...state,
               postList: {
                   ...state.postList,
                   [action.post.id]: action.post
               }
            }

        case VOTE_POST_DOWN:
            if(state.postDetail && state.postDetail.id === action.post.id) {
                return {
                    ...state,
                    postList: {
                        ...state.postList,
                        [action.post.id]: action.post
                    },
                    postDetail: action.post
                }
            }
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post
                }
            }

        case DELETE_POST:
            let postList = {
                ...state.postList
            }
            delete postList[action.post.id]

            return {
                ...state,
                postList: postList
            }

        case RECEIVE_POST_COMMENTS:
            return {
                ...state,
                postDetailComments: _.mapKeys(action.comments,'id')
            }

        case VOTE_COMMENT_UP:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment
                }
            }

        case VOTE_COMMENT_DOWN:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment
                }
            }

        case POST_COMMENT:
            let commentCount = state.postDetail.commentCount + 1
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment
                },
                postDetail: {
                    ...state.postDetail,
                    commentCount: commentCount
                }
            }

        case DELETE_COMMENT: {
            let commentCount = state.postDetail.commentCount - 1
            let postDetailComments = state.postDetailComments
            delete postDetailComments[action.comment.id]
            return {
                ...state,
                postDetailComments,
                postDetail: {
                    ...state.postDetail,
                    commentCount: commentCount
                }
            }
        }


        case OPEN_COMMENT_EDITOR:
            return {
                ...state,
                commentControl: {
                    showModal: action.showModal,
                    author: action.author,
                    body: action.body,
                    id: action.id
                }
            }

        case POST_CONTROL:
            return {
                ...state,
                postControl: {
                    ...state.postControl,
                    'showModal': action.showModal,
                    'postTitle': action.postTitle,
                    'postAuthor': action.postAuthor,
                    'postBody': action.postBody,
                    'postCategory': action.postCategory,
                    'postId': action.postId,
                    'mode': action.mode
                }
            }

        case EDIT_POST:
            return {
                ...state,
                postList: {
                    ...state.postList,
                    [action.post.id]: action.post
                },
                postControl: {
                  showModal: false
                },
                postDetail: action.post

            }

        case EDIT_COMMENT:
            return {
                ...state,
                postDetailComments: {
                    ...state.postDetailComments,
                    [action.comment.id]: action.comment
                }
            }

        default:
            return state

    }
}

export default reducer
