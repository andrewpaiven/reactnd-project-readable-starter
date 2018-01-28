/**
 * Created by apaivaer on 20/12/2017.
 */

const api="http://localhost:3001"

const headers = {
    'Authorization': '123456',
    'Content-Type': 'application/json',
}

export const getAll = () => (
    fetch(`${api}/posts/`, {headers})
        .then(res=>res.json())
)

export const getByCategory = (category) => (
    fetch(`${api}/${category}/posts`,{headers})
        .then(res=>res.json())
)

//Get post
export const getPost = id => (
    fetch(`${api}/posts/${id}`,{headers})
        .then(res=>res.json())
)

//New post
export const newPost = (id,timestamp,title,body,author,category) => {
    const postData = {
        id: id,
        timestamp: timestamp,
        title: title,
        body: body,
        author: author,
        category: category
    }
    return(
        fetch(`${api}/posts`,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData)
        }).then(res=>res.json())
    )
}

//Edit post
export const editPost = (id,title,body) => {
    const postData = {
        title: title,
        body: body
    }
    return(
        fetch(`${api}/posts/${id}`,{
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(postData)
        }).then(res=>res.json())
    )
}

// Delete Post
export const deletePost = (id) => {
    return (
        fetch(`${api}/posts/${id}`,{
        method: 'DELETE',
        headers: headers
    }).then(res=>res.json()))
}

//Votes
export const upVote = (id) => {

    const postData = {
        option: 'upVote'
    }

    return fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then(res=>res.json())
}

export const downVote = (id) => {

    const postData = {
        option: "downVote"
    }

    return fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    }).then(res=>res.json())

}