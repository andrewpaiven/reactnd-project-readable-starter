/**
 * Created by apaivaer on 22/12/2017.
 */
import * as PostsAPI from "../api/postsAPI"

// Action Consts
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'
export const RECEIVE_POSTS_BY_CATEGORY = 'RECEIVE_POSTS_BY_CATEGORY'
export const DISPLAY_POST_DETAILS = 'DISPLAY_POST_DETAILS'


// Receive all posts
export const receiveAllPosts = posts =>  ({
    type: RECEIVE_ALL_POSTS,
    posts,
    category: 'All Posts',
})

export const fetchPosts = () => dispatch => (
    PostsAPI.getAll()
        .then(posts => dispatch(receiveAllPosts(posts)))
)

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

