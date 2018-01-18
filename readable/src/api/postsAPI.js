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

export const upVote = (id) => {

    const postData = {
        option: 'upVote'
    }

    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    })
        .then(res=>res.json())
}

export const downVote = (id) => {

    const postData = {
        option: "downVote"
    }

    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(postData)
    })

}