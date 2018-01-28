/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { fetchCategories } from '../actions/CategoriesActions'
import { fetchPostsByCategory, fetchAllPosts } from '../actions/PostsActions'

class Menu extends Component {

    //React lifecycle methods
    componentDidMount() {
        this.props.fetchCategories()
    }

    render() {
        return (
        <div className="menuContainer">
            <ul className="menu">
                <li className="menuItem" style={{'font-family': 'Pacifico', 'font-size':'40px'}} onClick={()=>this.props.fetchAllPosts()}>
                    <Link style={{'font-family': 'Pacifico', 'font-size':'40px',textDecoration: 'none', color:'inherit'}} to="/">Readable</Link>
                </li>
                {this.props.categories.map((category)=>(
                    <li className="menuItem" onClick={()=>this.props.fetchPostsByCategory(category.name)}>
                        <Link className="menuItem" style={{textDecoration: 'none', color:'inherit'}} to={`/category/${category.name}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: _.values(state.categories),
})

const mapDispatchToProps = () => dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    fetchAllPosts: () => dispatch(fetchAllPosts())
})

export default connect(mapStateToProps,mapDispatchToProps)(Menu)