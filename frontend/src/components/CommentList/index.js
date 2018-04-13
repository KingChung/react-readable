import React, { Component } from 'react'
import { Button, Comment, Form, Header, Label, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import VoteScore from '../../components/VoteScore'
import { requestComments, createComment, deleteComment } from '../../actions'
import { hexToReverse, strToHex } from '../../utils/colorHelpers'
import Moment from 'react-moment'
import './index.css'

class CommentList extends Component {
    componentDidMount() {
        this.props.dispatch(requestComments(this.props.postId))
    }
    handleReply = () => {
        const { postId } = this.props
        let author = this.authorInput.value,
            body = this.bodyInput.value
        this.props.dispatch(createComment({
            postId,
            author,
            body
        }))
        this.authorInput.value = ''
        this.bodyInput.value = ''
    }
    handleDeleteComment = (commentId) => {
        this.props.dispatch(deleteComment(commentId))
    }
    render() {
        const { comments } = this.props
        return (
            <Comment.Group threaded>
                <Header as='h4' dividing>Comments</Header>
                {
                    comments.map((comment, i) => {
                        const userColor = strToHex(comment.author)
                        return (
                        <Comment key={i}>
                            <Comment.Avatar as={() => (
                                <div className="avatar"><Label style={{ background: userColor, color: hexToReverse(userColor) }} size="huge" circular>{comment.author[0].toUpperCase()}</Label></div>
                            )} />
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.author}</Comment.Author>
                                <Comment.Metadata>
                                    <Moment fromNow>{new Date(comment.timestamp)}</Moment>
                                </Comment.Metadata>
                                <Comment.Text>{comment.body}</Comment.Text>
                                <Comment.Actions>
                                    <VoteScore isLiked={comment.isLiked} score={comment.voteScore} />
                                    <Comment.Action className="trash" onClick={(e) => {
                                        this.handleDeleteComment(comment.id)
                                    }}>
                                        <Icon name="trash" /> Delete
                                    </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    )})
                }
                
                <Form reply onSubmit={this.handleReply}>
                    <div className="field">
                        <div className="ui input">
                            <input placeholder="Your Name" type="text" ref={input => this.authorInput = input} />
                        </div>
                    </div>
                    <div className="field">
                        <textarea placeholder="Comment" ref={input => this.bodyInput = input}></textarea>
                    </div>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
            </Comment.Group>
        )
    }
}
const mapStateToProps = (state) => {
    const { comments, scoreState } = state
    return {
        comments: Object.values(comments).map((comment) => ({
          ...comment,
          isLiked: scoreState[comment.id]
        }))
    }
}
export default connect(mapStateToProps)(CommentList)