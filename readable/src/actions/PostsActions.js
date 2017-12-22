/**
 * Created by apaivaer on 22/12/2017.
 */
import * as PostsAPI from "../api/postsAPI"

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'

export const receiveAllPosts = posts =>  ({
    type: RECEIVE_ALL_POSTS,
    posts
})

export const fetchPosts = () => dispatch => (
    PostsAPI.getAll()
        .then(posts => dispatch(receiveAllPosts(posts)))
)



