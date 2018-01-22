/**
 * Created by apaivaer on 19/12/2017.
 */
import React, { Component } from 'react';
import Voter from './PostVoter.js'
import { connect } from 'react-redux'
import { displayPostDetails } from '../actions/PostsActions'
import { Link } from 'react-router-dom'


class Post extends Component {

    processTime = (unixTime) => {
        let timeStamp = new Date(unixTime);
        let timeStampString = `${timeStamp.getDate()}\\${timeStamp.getMonth()}\\${timeStamp.getYear()} @ ${timeStamp.toISOString().slice(-13, -5)}`
        return timeStampString
    }

    render() {
        return(
            <div className="postDiv">
                <h1 className="postTitle" onClick={()=>this.props.displayPostDetail(this.props.id)}>
                    <Link to={`/postDetail/${this.props.id}`} className="postTitle" style={{'text-decoration':'none','color':'inherit'}}> {`${this.props.title}`}</Link>
                </h1>
                <h2 className="postAuthor">{`by ${this.props.author}`}</h2>
                <Voter postId={this.props.id} voteScore={this.props.voteScore}/>
                <p className="postContent">{`${this.props.body}`}</p>
                <span className="postTimeStampAndCategory">{`Posted in ${this.props.category} on ${this.processTime(this.props.timestamp)}`}</span>
                <button className="postEdit">Edit Post</button>
                <button className="postDelete">Delete Post</button>
            </div>

        )
    }
}

const mapDispatchToProps = () => dispatch => ({
    displayPostDetail: (id) => dispatch(displayPostDetails(id))
})

export default connect(null,mapDispatchToProps)(Post)
