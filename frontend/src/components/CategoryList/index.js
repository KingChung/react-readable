import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import FeedList from '../FeedList'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import GlobalMenu from '../../components/GlobalMenu';
import { requestPosts, votePost } from '../../actions';

class CategoryList extends Component {
  state = {
    isLoading: false,
    isEmpty: true
  }
  componentDidMount() {
    this.handleFetchPost(this.props.category)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.category !== nextProps.category) {
      this.handleFetchPost(nextProps.category)
    }
  }
  handleFetchPost(category) {
    this.setState({isLoading: true})
    this.props.dispatch(requestPosts(category)).then(() => {
      this.setState({
        isLoading: false,
        isEmpty: !this.props.posts.length
      })
    })
  }
  handlePostLike = (postId, isLike) => {
    this.props.dispatch(votePost(postId, isLike))
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
    const { category, posts } = this.props
    return (
        <div>
          <GlobalMenu activeItem={category} />
          <Segment loading={isLoading ? true : false}>
              {isEmpty
              ? <div>No Feeds.</div>
              : <FeedList posts={posts} handleFeedLike={this.handlePostLike} />
              }
          </Segment>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    const { posts, scoreState } = state
    return {
        posts: Object.values(posts).map((post) => ({
          ...post,
          isLiked: scoreState[post.id]
        }))
    }
}

export default withRouter(connect(mapStateToProps)(CategoryList))