/**
 * Created by apaivaer on 20/12/2017.
 */
import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import _ from 'lodash'

class PostList extends Component {
    render() {
        return(
            <div className="postList">
                {this.props.postList.length === 0 &&  <div className="postDiv">
                    <h2>No posts to display ! :( </h2>
                </div>}
                {_.orderBy(this.props.postList,this.props.postsSortByFilter,this.props.postsSortByOrder).map((post)=>(
                    <div className="postDiv">
                        <Post
                            id={post.id}
                            title={post.title}
                            author={post.author}
                            body={post.body}
                            category={post.category}
                            timestamp={post.timestamp}
                            voteScore={post.voteScore}
                            deleted={post.deleted}
                            commentCount={post.commentCount}
                            />
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