import React, { Component } from 'react'
import TabMenu from '../../components/TabMenu'
import { requestCategories, requestPosts, votePost, sortPosts } from '../../actions';
import { connect } from 'react-redux';
import { Form, Grid, Tab } from 'semantic-ui-react';
import FeedList from '../../components/FeedList';


class App extends Component {
  state = {
    activeCategory: '',
    isLoading: false,
    isEmpty: true
  }
  componentDidMount() {
    const { requestCategories, requestPosts } = this.props
    this.setState({ isLoading: true, isEmpty: true })
    requestCategories()
      .then((...args) => {
        const activeCategory = this.props.tabs[0]
        this.setState({ activeCategory })
        requestPosts(activeCategory).then(() => {
          this.setState({
            isLoading: false,
            isEmpty: !this.props.posts.length
          })
        })
      })
  }
  handleTabChange = (tab) => {
    this.setState({ isLoading: true, isEmpty: true })
    this.props.requestPosts(tab).then(() => {
      this.setState({
        isLoading: false,
        isEmpty: !this.props.posts.length
      })
    })
  }
  handlePostLike = (postId, isLike) => {
    this.props.votePost(postId, isLike)
  }
  handleSorter = e => {
    this.props.sortPosts(e.target.value)
  }
  render() {
    const { isLoading, isEmpty } = this.state
    return (
      <Grid container columns={1}>
        <Grid.Row>
          <Grid.Column>
            <h3 className="ui header no-anchor">Sort by:</h3>
            <select onChange={this.handleSorter}>
              <option value="">Default</option>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Timestamp</option>
            </select>
            <TabMenu tabs={this.props.tabs} onTabChange={this.handleTabChange} />
            <Tab.Pane loading={isLoading ? true : false}>
              {isEmpty
                ? <div>No Feeds.</div>
                : <FeedList posts={this.props.posts} handleFeedLike={this.handlePostLike} />
              }
            </Tab.Pane>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, posts } = state
  return {
    tabs: categories.map(cate => cate.name),
    posts
  }
}


export default connect(mapStateToProps, {
  requestCategories,
  requestPosts,
  votePost,
  sortPosts: (criteria) => (dispatch) => {
    return dispatch(sortPosts(criteria))
  }
})(App)