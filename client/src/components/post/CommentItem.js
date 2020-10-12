import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'
import Moment from 'react-moment'

const CommentItem = ({ comment: { _id, avatar, user, date, text, name }, postId, deleteComment, auth }) => {
    return (
        <div className='post bg-white p-1 my-1'>
            <div>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
                </p>
                {!auth.loading && user === auth.user._id && (
                    <button
                        onClick={() => deleteComment(postId, _id)}
                        type='button'
                        className='btn btn-danger'
                    >
                        X
                    </button>
                )}
            </div>
        </div>
    )
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)
