/**
 * Created by apaivaer on 22/12/2017.
 */
import * as PostsAPI from "../api/postsAPI"

// Action Consts - Posts
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
export const DISPLAY_POST_DETAILS = 'DISPLAY_POST_DETAILS'
export const GET_NEW_POST = 'GET_NEW_POST'
export const DELETE_POST = 'DELETE_POST'
export const POST_CONTROL = 'POST_CONTROL'
export const EDIT_POST = 'EDIT_POST'
export const POSTS_SORT_BY_FILTER = 'POSTS_SORT_BY_FILTER'
export const GET_POST = 'GET_POST'

// Posts actions

    // Receive all posts
    export const receiveAllPosts = posts =>  ({
        type: RECEIVE_ALL_POSTS,
        posts,
        category: 'All Posts',
    })

    export const fetchAllPosts = () => dispatch => (
        PostsAPI.getAll()
            .then(posts => dispatch(receiveAllPosts(posts)))
    )

    // New post
    export const getNewPost = post => ({
        type: GET_NEW_POST,
        post
    })

    export const newPost = (id,timestamp,title,body,author,category) => dispatch => {
        PostsAPI.newPost(id,timestamp,title,body,author,category)
            .then(post => dispatch(getNewPost(post)))
    }

    // Receive posts by category
    export const receivePostsByCategory = (category,posts) => ({
        type: RECEIVE_POSTS_BY_CATEGORY,
        posts,
        category
    })

    export const fetchPostsByCategory = (category) => dispatch => {
        if(category) {
            PostsAPI.getByCategory(category)
                .then(posts => dispatch(receivePostsByCategory(category, posts)))
        }
        else {
            PostsAPI.getAll()
                .then(posts => dispatch(receiveAllPosts(posts)))
        }
    }

    // Delete Post
    export const deletePostAction = post => ({
        type: DELETE_POST,
        post
    })

    export const deletePost = id => dispatch => {
        PostsAPI.deletePost(id)
            .then(post=>dispatch(deletePostAction(post)))
    }

    // UpVote
    export const voteUpPostAction = (post) => ({
        type: VOTE_POST_UP,
        post
    })

    export const voteUpPost = (id) => dispatch => {
        PostsAPI.upVote(id)
            .then(post => dispatch(voteUpPostAction(post)))
    }

    //Down Vote
    export const voteDownPostAction = (post) => ({
        type: VOTE_POST_DOWN,
        post
    })

    export const voteDownPost = (id) => dispatch => {
        PostsAPI.downVote(id)
            .then(post => dispatch(voteDownPostAction(post)))
    }

    //Post Details
    export const displayPostDetails = (id) => ({
        type: DISPLAY_POST_DETAILS,
        id
    })

    //Open post control
    export const openPostControl = (showModal,postTitle,postAuthor,postBody,postCategory,postId,mode) => ({
        type: POST_CONTROL,
        showModal,
        postTitle,
        postAuthor,
        postBody,
        postCategory,
        postId,
        mode,
    })

    //Edit post
    export const editPostAction = (post)  => ({
        type: EDIT_POST,
        post
    })

    export const editPost = (id,title,body) => dispatch => {
        PostsAPI.editPost(id,title,body)
            .then(post=>(dispatch(editPostAction(post))))
    }

    //SortBy
    export const postsSortByFilter = filter => ({
        type: POSTS_SORT_BY_FILTER,
        filter
    })

    //Get post
    export const getPostAction = post => ({
        type: GET_POST,
        post
    })

    export const getPost = id => dispatch => {
        PostsAPI.getPost(id)
            .then(post=>dispatch(getPostAction(post)))
    }





