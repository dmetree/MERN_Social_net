import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = ({ getProfiles, profile: {profiles, loading}}) => {

    useEffect(() => {
        getProfiles();
    },[])


    let showProfiles = <h4>No profiles found...</h4>

    if (profiles.length > 0){
        showProfiles = (
            profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
            ))
        )
    }


    return (
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h1>Developers</h1>
                <p>Browse and connect with developers</p>
                <div>
                    {showProfiles}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {getProfiles})(Profiles)
