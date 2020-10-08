import React from 'react'
import PropTypes from 'prop-types'

const PostItem = ({post:{ _id }}) => {
    return (
        <div>
            I'm a post #{_id}
        </div>
    )
}

PostItem.propTypes = {

}

export default PostItem
