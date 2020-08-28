import axios from 'axios';
import * as a from './types';
import { setAlert } from './alert';

// get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me')

    dispatch({
      type: a.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}


// Get all profiles
export const getProfiles = () => async dispatch => {

  dispatch({type: a.CLEAR_PROFILE}); // Prevent flashing of a past user profile?
  try {
    const res = await axios.get('api/profile')

    dispatchEvent({
      type: a.GET_PROFILES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get profile by id
export const getProfileById = (userId) => async dispatch => {

  try {
    const res = await axios.get(`api/profile/user/${userId}`)

    dispatchEvent({
      type: a.GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}


// Get profile by id
export const getGithubRepos = (username) => async dispatch => {

  try {
    const res = await axios.get(`api/profile/github/${username}`)

    dispatchEvent({
      type: a.GET_REPOS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}



// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post('api/profile', formData);

    dispatch({
      type: a.GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    // }

    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('api/profile/experience', formData);

    dispatch({
      type: a.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};



// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('api/profile/education', formData);

    dispatch({
      type: a.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//  Delete Experience
export const deleteExperience = (id) => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/experience/${id}`)

    dispatch({
      type: a.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experiene Removed', 'success'));
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//  Delete Education
export const deleteEducation = (id) => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/education/${id}`)

    dispatch({
      type: a.UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: a.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}


//  Delete Profile & Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure?')) {
    try {
      const res = await axios.delete('api/profile')

      dispatch({
        type: a.CLEAR_PROFILE
      })
      dispatch({
        type: a.ACCOUNT_DELETED
      })
      

      dispatch(setAlert('Account Deleted'));
    } catch (err) {
      dispatch({
        type: a.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
}