import React from 'react'
import { Feed, Label } from 'semantic-ui-react'
import VoteScore from '../components/VoteScore';
import Moment from 'react-moment'
import 'moment-timezone'
import { hexToReverse, strToHex } from '../utils/colorHelpers';

const FeedList = (props) => (
    <Feed>
        {
            props.posts.map((post, i) => {
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
                                <VoteScore score={post.voteScore} handleVoteScore={(isLike) => {
                                    props.handleFeedLike(post.id, isLike)
                                }}/>
                            </Feed.Meta>
                        </Feed.Content>
                    </Feed.Event>
                )
            })
        }
    </Feed>
)

export default FeedList