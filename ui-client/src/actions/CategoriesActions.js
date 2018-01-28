import * as CategoriesAPI from "../api/categoriesAPI"

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES'

// Receive all posts
export const receiveAllCategories = categories =>  ({
    type: RECEIVE_ALL_CATEGORIES,
    categories
})

export const fetchCategories = () => dispatch => (
    CategoriesAPI.getAll()
        .then(categories => dispatch(receiveAllCategories(categories)))
)

