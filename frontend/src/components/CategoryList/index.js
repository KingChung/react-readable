import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import FeedList from '../FeedList'
import { fetchPosts, votePost } from '../../utils/apiHelper';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import GlobalMenu from '../../components/GlobalMenu';

class CategoryList extends Component {
  state = {
    isLoading: false,
    isEmpty: true,
    posts: []
  }
  componentDidMount() {
    this.handleFetchPosts(this.props.category)
  }
  componentWillReceiveProps(nextProps) {
    this.handleFetchPosts(nextProps.category)
  }
  handleFetchPosts(category) {
    this.setState({ isLoading: true, isEmpty: true })
    fetchPosts(category).then((posts) => {
      this.setState({
        isLoading: false,
        isEmpty: ! posts.length,
        posts
      })
    })
  }
  handlePostLike = (postId, isLike) => {
    const { posts } = this.state
    votePost(postId, isLike).then((post) => {
      this.setState({
        posts: posts.reduce((posts, oldPost) => {
          posts.push(oldPost.id === post.id ? Object.assign(oldPost, post) : oldPost)
          return posts
      }, [])
      })
    })
  }
  handleSorter = (e) => {
    const criteria = e.target.value
    const { posts } = this.state
    this.setState({
      posts: posts.sort((a, b) => {
        if(a[criteria] && b[criteria]) {
            return a[criteria] - b[criteria]
        }
        return 0
      })
    })
  }
  render() {
    const { isLoading, isEmpty } = this.state
    return (
        <div>
          <GlobalMenu activeItem={this.props.category} />
          <Segment loading={isLoading ? true : false}>
              {isEmpty
              ? <div>No Feeds.</div>
              : <FeedList posts={this.state.posts} handleFeedLike={this.handlePostLike} />
              }
          </Segment>
        </div>
    )
  }
}

export default withRouter(connect()(CategoryList))