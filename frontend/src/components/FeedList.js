import React, { Component } from 'react'
import { Feed, Label, Icon } from 'semantic-ui-react'
import VoteScore from '../components/VoteScore';
import Moment from 'react-moment'
import 'moment-timezone'
import { hexToReverse, strToHex } from '../utils/colorHelpers';
import { Link } from 'react-router-dom';

export default class FeedList extends Component {
    state = {
        collapsedItems: {}
    }
    render() {
        return (
            <Feed>
                {
                    this.props.posts.map((post, i) => {
                        const userColor = strToHex(post.author)
                        return (
                            <Feed.Event key={i}>
                                <Feed.Label>
                                    <Label style={{ background: userColor, color: hexToReverse(userColor) }} size="huge" circular>{post.author[0].toUpperCase()}</Label>
                                </Feed.Label>
                                <Feed.Content>
                                    <Feed.Summary>
                                        <Feed.User>{post.author}</Feed.User> {post.title}
                                        <Feed.Date>
                                            <Moment fromNow>{new Date(post.timestamp)}</Moment>
                                        </Feed.Date>
                                    </Feed.Summary>
                                    <Feed.Extra text>
                                        {post.body}
                                    </Feed.Extra>
                                    <Feed.Meta>
                                        <VoteScore isLiked={post.isLiked} score={post.voteScore} handleVoteScore={(isLike) => {
                                            this.props.handleFeedLike(post.id, isLike)
                                        }}/>
                                        <Feed.Like as='span'>
                                            <Link to={`/post/${post.id}`}>
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
        )
    }
}