import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from './../../actions/profile'
import Spinner from '../layout/Spinner'


const Dashboard = ({ getCurrentProfile, auth: { user }, profile }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        profile.loading && profile === null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                Welcome {user && user.name}
            </p>


            {profile !== null ? (
                <Fragment>
                    {/* <DashboardActions /> */}
                    {/* <Experience experience={profile.experience} /> */}
                    {/* <Education education={profile.education} /> */}

                    <div className="my-2">
                        <button className="btn btn-danger"
                        // onClick={() => deleteAccount()}
                        >
                            Delete My Account
                    </button>
                    </div>
                </Fragment>
            ) : (
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                )}
        </Fragment>

    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})



export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
