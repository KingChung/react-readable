import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Segment, Feed, Icon, Label, Header } from 'semantic-ui-react'
import VoteScore from '../VoteScore'
import Moment from 'react-moment'
import { hexToReverse, strToHex } from '../../utils/colorHelpers';
import { requestPost } from '../../actions';
import { updateVote, SCORETYPE_POST } from '../../actions/vote';
import { Link } from 'react-router-dom'
import CommentList from '../CommentList/index';


class Post extends Component {
    componentDidMount() {
        this.props.dispatch(requestPost(this.props.postId))
    }
    handlePostLike = (postId, isLike) => {
        this.props.dispatch(updateVote({
            type: SCORETYPE_POST,
            id: postId
        }, isLike))
    }
    render() {
        const { postId, posts, voteState } = this.props
        const post = posts[postId] || {}
        const userColor = strToHex(post.author)
        return (
            <div>
                <Link to="/" style={{marginTop: 15, display: 'block'}}>
                    <Icon name='arrow left' /> back
                </Link>
                <Segment>
                    {post.id &&
                        <div>
                            <Header as='h3' dividing>{post.title}</Header>
                            <Feed>
                                <Feed.Event>
                                    <Feed.Label>
                                        <Label style={{ background: userColor, color: hexToReverse(userColor) }} size="huge" circular>{post.author[0].toUpperCase()}</Label>
                                    </Feed.Label>
                                    <Feed.Content>
                                        <Feed.Summary>
                                            <Feed.User>{post.author}</Feed.User>
                                            <Feed.Date>
                                                <Moment fromNow>{new Date(post.timestamp)}</Moment>
                                            </Feed.Date>
                                        </Feed.Summary>
                                        <Feed.Extra text>
                                            {post.body}
                                        </Feed.Extra>
                                        <Feed.Meta>
                                            <VoteScore isLiked={voteState[SCORETYPE_POST][post.id]} score={post.voteScore} handleVoteScore={(isLike) => {
                                                this.handlePostLike(post.id, isLike)
                                            }} />
                                            <Feed.Like as='span'>
                                                <Icon name='comments' color="teal" />
                                                {post.commentCount} Comments
                                        </Feed.Like>
                                        </Feed.Meta>
                                    </Feed.Content>
                                </Feed.Event>
                            </Feed>
                            <CommentList postId={post.id} />
                        </div>
                    }
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts, voteState, comments } = state
    return {
        voteState,
        posts: Object.values(posts).reduce((posts, post) => {
            posts[post.id] = {
                ...post,
                commentCount: Object.values(comments).length
            }
            return posts
        }, {})
    }
}

export default withRouter(connect(mapStateToProps)(Post))