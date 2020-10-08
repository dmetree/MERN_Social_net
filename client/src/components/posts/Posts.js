import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'

const Posts = ({ getPosts, post:{posts, loading}}) => {

    useEffect(() => {
        getPosts();
    },[getPosts])

    return loading ? <Spinner/> : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">Welcome to the community</p>
          {/* Post form  */}
          <div className="posts">
              {posts.map(post => (
                  <PostItem key={post._id} post={post}/>
              ))}
          </div>
        </Fragment>
    )
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts})(Posts)
