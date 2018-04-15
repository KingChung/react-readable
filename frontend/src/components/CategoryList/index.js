import React, { Component } from 'react'
import { Segment, Feed, Label, Icon } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import GlobalMenu from '../../components/GlobalMenu';
import { requestPosts, deletePost } from '../../actions';
import { togglePostModal, toggleCategoryListLoading } from '../../actions/ui';
import { updateVote, SCORETYPE_POST } from '../../actions/vote';
import './index.css';
import VoteScore from '../../components/VoteScore'
import PostModal from '../../components/PostModal'
import Moment from 'react-moment'
import 'moment-timezone'
import { hexToReverse, strToHex } from '../../utils/colorHelpers';

class CategoryList extends Component {
  componentDidMount() {
    this.handleFetchPost(this.props.category)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.category !== nextProps.category) {
      this.handleFetchPost(nextProps.category)
    }
  }
  handleFetchPost(category) {
    const { dispatch } = this.props
    dispatch(toggleCategoryListLoading(true))
    dispatch(requestPosts(category)).then(() => {
      dispatch(toggleCategoryListLoading(false))
    })
  }
  handlePostLike = (postId, isLike) => {
    this.props.dispatch(updateVote({
      id: postId,
      type: SCORETYPE_POST
    }, isLike))
  }
  handleOpenModal = (post) => {
    this.props.dispatch(togglePostModal(true, post))
  }
  handleDeletePost = (postId) => {
    this.props.dispatch(deletePost(postId))
  }
  render() {
    const { category, posts, isLoading } = this.props
    return (
        <div>
          <GlobalMenu activeCategory={category} />
          <PostModal activeCategory={this.props.activeCategory} />
          <Segment loading={isLoading ? true : false}>
              {!posts.length
              ? <div>No Feeds.</div>
              : <Feed>
              {
                  posts.map((post, i) => {
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
                                          this.handlePostLike(post.id, isLike)
                                      }}/>
                                      <Feed.Like as='span'>
                                          <Link to={`/${post.category}/${post.id}`}>
                                              <Icon name='comments' color="teal" />
                                          </Link>
                                          {post.commentCount} Comments
                                      </Feed.Like>
                                      <Feed.Like as='span' onClick={this.handleOpenModal.bind(this, post)}>
                                          <Icon name='edit' color="blue" /> Edit
                                      </Feed.Like>
                                      <Feed.Like as='span' onClick={() => {
                                        this.handleDeletePost(post.id)
                                      }}>
                                          <Icon name='trash' color="grey" /> Delete
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
    const { posts, voteState, ui } = state
    return {
        isLoading: ui.categoryList.isLoading,
        posts: Object.values(posts).map((post) => ({
          ...post,
          isLiked: voteState[SCORETYPE_POST][post.id]
        }))
    }
}

export default withRouter(connect(mapStateToProps)(CategoryList))