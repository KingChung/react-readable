import React, { Component } from 'react'
import TabMenu from '../../components/TabMenu'
import { REQUEST_CATEGORIES, requestCategories, requestPosts } from '../../actions';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import FeedList from '../../components/FeedList';


class App extends Component {
  state = {
    activeCategory: '',
    isLoading: false,
    isEmpty: true
  }
  componentDidMount() {
    const { requestCategories, requestPosts } = this.props
    this.setState({isLoading: true, isEmpty: true})
    requestCategories()
      .then((...args) => {
        const activeCategory = this.props.tabCategories[0]
        this.setState({ activeCategory })
        requestPosts(activeCategory).then(() => {
          this.setState({
            isLoading: false,
            isEmpty: ! this.props.posts.length
          })
        })
      })
  }
  handleTabChange = (tab) => {
    this.setState({isLoading: true, isEmpty: true})
    this.props.requestPosts(tab).then(() => {
      this.setState({
        isLoading: false,
        isEmpty: ! this.props.posts.length
      })
    })
  }
  fetch
  render() {
    const { isLoading, isEmpty } = this.state
    return (
      <div>
        <TabMenu tabs={this.props.tabCategories} onTabChange={this.handleTabChange} />
        <Tab.Pane loading={ isLoading ? true : false }>
          {isEmpty
            ? <div>No Feeds.</div>
            : <FeedList posts={this.props.posts} />
          }
        </Tab.Pane>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, posts } = state
  return {
    tabCategories: categories.map(cate => cate.name),
    posts
  }
}


export default connect(mapStateToProps, {
  requestCategories,
  requestPosts
})(App);
