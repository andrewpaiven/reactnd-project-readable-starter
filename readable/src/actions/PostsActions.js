/**
 * Created by apaivaer on 22/12/2017.
 */
import * as PostsAPI from "../api/postsAPI"

// Action Consts
export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const VOTE_POST_UP = 'VOTE_POST_UP'
export const VOTE_POST_DOWN = 'VOTE_POST_DOWN'


// Receive all posts
export const receiveAllPosts = posts =>  ({
    type: RECEIVE_ALL_POSTS,
    posts
})

export const fetchPosts = () => dispatch => (
    PostsAPI.getAll()
        .then(posts => dispatch(receiveAllPosts(posts)))
)

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
    type: VOTE_POST_DOWN
})

export const voteDownPost = (id) => dispatch => {
    PostsAPI.downVote(id)
        .then(post => dispatch(voteDownPostAction(post)))
}