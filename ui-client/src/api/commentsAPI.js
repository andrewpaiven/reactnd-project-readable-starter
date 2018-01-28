/**
 * Created by apaivaer on 21/01/2018.
 */

const api="http://localhost:3001"

const headers = {
    'Authorization': '123456',
    'Content-Type': 'application/json',
}

export const getAll = (postId) => (
    fetch(`${api}/posts/${postId}/comments`, {headers})
        .then(res => res.json())
)

export const postComment = (id,timestamp,body,author,parentId) => {

    const postData = {
        id: id,
        timestamp: timestamp,
        body: body,
        author: author,
        parentId: parentId
    }

    return fetch(`${api}/comments`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
        }).then(res=>res.json())

}

//Vote up a comment
export const upVote = (id) => {

    const postData = {
        option: 'upVote'
    }

    return fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then(res=>res.json())
}

//Vote down a comment
export const downVote = (id) => {

    const postData = {
        option: 'downVote'
    }

    return fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then(res=>res.json())
}

// Delete Comment
export const deleteComment = (id) => (
        fetch(`${api}/comments/${id}`,{
            method: 'DELETE',
            headers: headers
        }).then(res=>res.json())
)

// Edit comment
export const editComment = (id,timestamp,body) => {
    const postData = {
        timestamp: timestamp,
        body: body
    }
    return(
        fetch(`${api}/comments/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(postData)
        }).then(res => res.json())
    )
}



