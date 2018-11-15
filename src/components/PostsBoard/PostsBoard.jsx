import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './PostsBoard.css';
import { connect } from 'react-redux';
import Posts from './posts/posts.jsx';
import { getAllPosts, getPostandCommentsById } from '../../actions/actions.js';

class PostsBoard extends Component {
  constructor(props) {
    super(props);
  }

  getPostandCommentsById = (props) => {
    this.props.dispatch(
      getPostandCommentsById(props),
    )
  }

  render() {
    const { items } = this.props

    return (
      <div className="postsBoard">

        <div id="postings-section">

          <div id="postings-section-title">All Postings</div>
          
            <Posts items={items} getPostandCommentsById={this.getPostandCommentsById} />

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(PostsBoard);