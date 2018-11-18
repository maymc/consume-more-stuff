import axios from 'axios';

export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_MORE_CREDIT = 'ADD_MORE_CREDIT';
export const ADD_NEW_DRAFT_POST = 'ADD_NEW_DRAFT_POST';
export const GET_ALL_APPROVED_COMMENTS = 'GET_ALL_APPROVED_COMMENTS' //get all approved comments by id for a particular post
export const GET_PENDING_COMMENTS = 'GET_PENDING_COMMENTS' // get all pending comments needing approval for a post.
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const GET_COMMENTS_BY_POST_ID = 'GET_COMMENT_BY_POST_ID';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_DRAFTPOSTS_BY_USER_ID = 'GET_DRAFTPOSTS_BY_USER_ID';
export const GET_DRAFTCOMMENTS_BY_USER_ID = 'GET_DRAFTCOMMENTS_BY_USER_ID';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const GET_DRAFTPOST_BY_POST_ID = 'GET_DRAFTPOST_BY_POST_ID';
export const EDIT_DRAFT_POST = 'EDIT_DRAFT_POST';

export const getAllPosts = () => {
  return dispatch => {
    axios
      .get('/home')
      .then(response => {
        dispatch({
          type: GET_ALL_POSTS,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const getAll = (name) => {
  return dispatch => {
    let id = ''
    axios
      .get('/home')
      .then(response => {
        dispatch({
          type: GET_ALL_POSTS,
          payload: response.data
        })
        return axios.get(`/user-profile/email/${name}`)
      })
      .then(response => {
        id = response.data.id;
        return axios.get(`/user-profile/${id}`)
      })
      .then(response => {
        dispatch({
          type: GET_USER_BY_ID,
          payload: response.data
        })
        return axios.get(`/post-draft/${id}`)
      })
      .then(response => {
        dispatch({
          type: GET_DRAFTPOSTS_BY_USER_ID,
          payload: response.data
        })
        return axios.get(`/comment-draft/${id}`)
      })
      .then(response => {
        dispatch({
          type: GET_DRAFTCOMMENTS_BY_USER_ID,
          payload: response.data
        })
        return axios.get(`/type`)
      })
      .then(response => {
        dispatch({
          type: GET_ALL_TYPES,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const getPostandCommentsById = (id) => {
  return dispatch => {
    axios
      .get(`/post/${id}`)
      .then(response => {
        dispatch({
          type: GET_POST_BY_ID,
          payload: response.data
        })
        return axios.get(`/comments/${id}`)
      })
      .then(response => {
          dispatch({
            type: GET_COMMENTS_BY_POST_ID,
            payload: response.data
          })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

// export const getAllUserProfileData = (id) => {
//   return dispatch => [
//     axios
//       .get()
//   ]
// }

export const getTypeData = () => {
  return dispatch => {
    axios
    .get(`/type`)
    .then(response => {
      dispatch({
        type: GET_ALL_TYPES,
        payload: response.data
      })
    })
    .catch(err => {
      dispatch({
        type: "DISPLAY_ERROR_NOTIFICATION",
        err
      });
    });
  }
}

export const getTypeAndDraftPostData = (id, name) => {
  return dispatch => {
    axios
      .get('/type')
      .then(response => {
        dispatch({
          type: GET_ALL_TYPES,
          payload: response.data
        })
        return axios.get(`/post-draft/post/${id}`)
      })
      .then(response => {
        dispatch({
          type: GET_DRAFTPOST_BY_POST_ID,
          payload: response.data
        })
        return axios.get(`/user-profile/email/${name}`)
      })
      .then(response => {
        id = response.data.id;
        return axios.get(`/user-profile/${id}`)
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const addNewPost = (postfromNewRequest) => {
  console.log("\nCheck postFromNewRequest:", postfromNewRequest);

  return dispatch => {
    axios
      .post('/add-new-post', postfromNewRequest)
      .then(response => {
        console.log("response.data:", response.data)
        dispatch({
          type: ADD_NEW_POST,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const addNewDraftPost = (postfromNewRequest) => {

  return dispatch => {
    axios
      .post('/save-post', postfromNewRequest)
      .then(response => {
        dispatch({
          type: ADD_NEW_DRAFT_POST,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const addMoreCredit = (id, credit) => {
  return dispatch => {
    axios
      .put(`/add-more-credit/${id}`, credit)
      .then(response => {
        dispatch({
          type: ADD_MORE_CREDIT,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const addNewPostFromDraft = (id, body) => {
  console.log("LETS GO ADDING TO POST");
  return dispatch => {
    axios
      .post(`/post-draft/add-new-post/${id}`, body)
      .then(response => {
        dispatch({
          type: ADD_NEW_POST,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}

export const editDraftPost = (id, body) => {
  console.log("LETS GO EDITING DRAFT POST")
  return dispatch => {
    axios
      .put(`/post-draft/edit-post/${id}`, body)
      .then(response => {
        dispatch({
          type: EDIT_DRAFT_POST,
          payload: response.data
        })
      })
      .catch(err => {
        dispatch({
          type: "DISPLAY_ERROR_NOTIFICATION",
          err
        });
      });
  }
}
