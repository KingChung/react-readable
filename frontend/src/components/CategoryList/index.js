import React, { Component } from 'react'
import { Segment, Feed, Label, Icon } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import GlobalMenu from '../../components/GlobalMenu';
import { requestPosts, votePost } from '../../actions';
import './index.css';
import VoteScore from '../../components/VoteScore';
import Moment from 'react-moment'
import 'moment-timezone'
import { hexToReverse, strToHex } from '../../utils/colorHelpers';

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
    const { category } = this.props
    return (
        <div>
          <GlobalMenu activeItem={category} />
          <Segment loading={isLoading ? true : false}>
              {isEmpty
              ? <div>No Feeds.</div>
              : <Feed>
              {
                  this.props.posts.map((post, i) => {
                      const userColor = strToHex(post.author)
                      return (
                          <Feed.Event key={i} as="">
                              <Feed.Label>
                                  <Label style={{ background: userColor, color: hexToReverse(userColor) }} size="huge" circular>{post.author[0].toUpperCase()}</Label>
                              </Feed.Label>
                              <Feed.Content>
                                  <Feed.Summary>
                                      <Feed.User>{post.author}</Feed.User> <Link to={`/${post.category}/${post.id}`} className='title'>{post.title}</Link>
                                      <Feed.Date>
                                          <Moment fromNow>{new Date(post.timestamp)}</Moment>
                                      </Feed.Date>
                                  </Feed.Summary>
                                  <Feed.Extra text>
                                      {post.body}
                                  </Feed.Extra>
                                  <Feed.Meta>
                                      <VoteScore isLiked={post.isLiked} score={post.voteScore} handleVoteScore={(isLike) => {
                                          this.props.handlePostLike(post.id, isLike)
                                      }}/>
                                      <Feed.Like as='span'>
                                          <Link to={`/${post.category}/${post.id}`}>
                                              <Icon name='comments' color="teal" />
                                          </Link>
                                          {post.commentCount} Comments
                                      </Feed.Like>
                                  </Feed.Meta>
                              </Feed.Content>
                          </Feed.Event>
                      )
                  })
              }
          </Feed>
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