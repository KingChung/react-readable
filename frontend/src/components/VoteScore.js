import React from 'react'
import { Button, Icon, Label } from 'semantic-ui-react'

const VoteScore = (props) => (
  <div>
    <Button as='div' labelPosition='right'>
      <Button color='red'>
        <Icon name='heart' />
        Like
      </Button>
      <Label as='a' basic color='red' pointing='left'>{props.score}</Label>
    </Button>
  </div>
)

export default VoteScore