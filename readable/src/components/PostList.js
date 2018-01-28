/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Post from './Post'

class PostList extends Component {
    render() {
        return(
            <div className="postList">
                {this.props.postList.length === 0 &&  <div className="postDiv">
                    <h2>No posts to display ! :( </h2>
                </div>}
                {_.orderBy(this.props.postList,this.props.postsSortByFilter,this.props.postsSortByOrder).map((post)=>(
                    <div key={post.id} className="postDiv">
                        <Post post={post}/>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    postList: _.values(state.postList),
    postsSortByFilter: state.postsSortByFilter,
    postsSortByOrder: state.postsSortByOrder
})

export default connect(mapStateToProps,null)(PostList)