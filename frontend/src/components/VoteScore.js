import React from 'react'
import { Feed, Icon } from 'semantic-ui-react'

const VoteScore = (props) => (
  <Feed.Like onClick={(e) => {
    e.currentTarget.classList.toggle('active')
    props.handleVoteScore(e.currentTarget.classList.contains('active'))
}}>
    <Icon name='like' />
    {props.score} Likes
</Feed.Like>
)

export default VoteScore