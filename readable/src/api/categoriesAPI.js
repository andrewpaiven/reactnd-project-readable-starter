/**
 * Created by apaivaer on 20/12/2017.
 */

const api="http://localhost:3001"

const headers = {
    'Authorization': '123456'
}

export const getAll = () => (
    fetch(`${api}/categories/`, {headers})
        .then(res => res.json())
        .then((data) => data.categories)
)