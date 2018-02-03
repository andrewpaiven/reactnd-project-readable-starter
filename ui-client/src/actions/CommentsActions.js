/**
 * Created by apaivaer on 03/02/2018.
 */
import * as CommentsAPI from "../api/commentsAPI"

// Action Consts - Comments
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'
export const VOTE_COMMENT_UP = 'VOTE_COMMENT_UP'
export const VOTE_COMMENT_DOWN = 'VOTE_COMMENT_DOWN'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const OPEN_COMMENT_EDITOR = 'OPEN_COMMENT_EDITOR'
export const POST_COMMENT = 'POST_COMMENT'

// Comments Actions

//Receive post comments
export const receivePostComments = comments => ({
    type: RECEIVE_POST_COMMENTS,
    comments
})

export const fetchPostComments = (id) => dispatch => {
    CommentsAPI.getAll(id)
        .then(comments => dispatch(receivePostComments(comments)))
}

//Comment vote UP
export const voteUpCommentAction = comment => ({
    type: VOTE_COMMENT_UP,
    comment
})

export const voteUpComment = id => dispatch => {
    CommentsAPI.upVote(id)
        .then(comment => dispatch(voteUpCommentAction(comment)))
}

//Comment vote DOWN
export const voteDownCommentAction = comment => ({
    type: VOTE_COMMENT_DOWN,
    comment
})

export const voteDownComment = id => dispatch => {
    CommentsAPI.downVote(id)
        .then(comment => dispatch(voteDownCommentAction(comment)))
}

//Post comment
export const  postCommentAction = comment => ({
    type: POST_COMMENT,
    comment
})

export const postComment = (id,timestamp,body,author,parentId) => dispatch => {
    CommentsAPI.postComment(id,timestamp,body,author,parentId)
        .then((comment) => dispatch(postCommentAction(comment)))
}

//Delete comment
export const deleteCommentAction = comment => ({
    type: DELETE_COMMENT,
    comment
})

export const deleteComment = id => dispatch => {
    CommentsAPI.deleteComment(id)
        .then(comment => dispatch(deleteCommentAction(comment)))
}

//Edit comment
export const editCommentAction = comment => ({
    type: EDIT_COMMENT,
    comment
})

export const editComment = (id,timestamp,body) => dispatch => {
    CommentsAPI.editComment(id,timestamp,body)
        .then(comment => dispatch(editCommentAction(comment)))
}

//Open Comment Editor
export const openCommentEditorAction = (showModal,author,body,id) => ({
    type: OPEN_COMMENT_EDITOR,
    showModal,
    author,
    body,
    id
})
