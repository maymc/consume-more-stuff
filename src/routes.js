import React, { Component } from 'react';
import { Route, Router, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './Dashboard.jsx';
import Home from './Home/Home.js';
import Callback from './Callback/Callback.js';
import Auth from './Auth/Auth.js';
import history from './history.js';
import PostsBoard from './components/PostsBoard/PostsBoard.jsx';
import LoginForm from './components/forms/LoginForm.jsx';
import SignupForm from './components/forms/SignupForm.jsx';
import PostDetail from './components/PostDetail/PostDetail.jsx';

import ProfileData from './components/UserProfile/UserProfile.jsx';
import DraftPosts from './components/UserProfile/DraftPosts/DraftPost.jsx';
import DraftComments from './components/UserProfile/DraftComments/DraftComments.jsx';
import AddAccountCredit from './components/UserProfile/AddAccountCredit/AddAccountCredit.jsx';

import Header from './components/Header/Header.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';

import NewRequest from './components/forms/NewRequest.jsx';
import EditDraftPostForm from './components/forms/EditDraftPostForm.jsx';

import Footer from './components/Footer/Footer.jsx';
import NotFound from './components/Error/404.jsx';
import Dashboard from './Dashboard.jsx';
import { Dashboard2s } from './components/UserProfile/DashboardLinks/DashboardLinks.jsx';

import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/reducers.js';

const auth = new Auth();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated()
      ? <PostsBoard auth={auth} {...props} />
      : <Redirect to='/login' />
  )} />
)

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const store = createStore(
  reducers,
  compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>

          <Header auth={auth} props={store} />

          <Switch>

          <Route exact path="/" render={(props) => ( !auth.isAuthenticated() ? 
          (<PostsBoard auth={auth} {...props} /> ) : (<Redirect to="/dashboard" />))}/>

          <Route path="/dashboard" render={(props) => ( auth.isAuthenticated() ? 
          (<Dashboard auth={auth} {...props} /> ) : (<Redirect to="/" />))}/>
          {/* {Redirect to login here} */}

          {/* <Route path="/dashboard" render={(props) => <Dashboard auth={auth} {...props} />} /> */}

          <Route path="/signup" component={SignupForm} />

          <PrivateRoute path="/home" render={(props) => <Home auth={auth} {...props} />}/>

          <Route path="/post/:id" render={(props) => ( !auth.isAuthenticated() ? 
          (<PostDetail auth={auth} {...props} /> ) : (<Redirect to="/dashboard" />))}/>
          {/* <Route path='/post/:id' component={PostDetail} /> */}

          <Route path='/dashboard/post/:id' component={PostDetail} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />

          <Route path="/user/profile" component={UserProfile} />

          <Route path="/new-request" component={NewRequest} />

          <Route path="/dashboard2s" component={Dashboard2s} />

          <Route path='/edit/draftpost/:id' component={EditDraftPostForm} />

          <Route component={NotFound}/>

          <Route path={`/user/profile/:id/data`} render={(props) => <ProfileData {...props} />} />

          <Route path={`/user/profile/:id/draftposts`} render={(props) => <DraftPosts {...props} />} />

          <Route path={`/user/profile/:id/draftcomments`} render={(props) => <DraftComments {...props} />} />

          <Route path={`/user/profile/:id/accountcredit`} render={(props) => <AddAccountCredit {...props} />} />

          </Switch>

          <Footer />
          
        </div>
      </Provider>
    </Router>
  );
}


{/* <Route exact path="/" render={(props) => <PostsBoard {...this.props} />} /> */ }
{/* <Route path="/login" component={LoginForm} />
<Route path="/signup" component={SignupForm} /> */}