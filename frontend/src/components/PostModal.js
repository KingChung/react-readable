import React, { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import connect from 'react-redux/lib/connect/connect'
import { updatePost, createPost } from '../actions';
import { togglePostModal } from '../actions/ui';
class PostModal extends Component {
    handleOpenModal = (open) => {
        this.props.dispatch(togglePostModal(open))
    }
    handleSubmitModal = () => {
        let output = {}

        if(!this.props.postModal.post) {
            output = {
                author: this.authorInput.value,
                category: this.categoryInput.value
            }
            this.authorInput.value = ''
            this.categoryInput.value = ''
        }
        
        output = {
            ...output,
            title: this.titleInput.value,
            body: this.bodyInput.value
        }

        this.handleUpdatePost(output)

        this.titleInput.value = ''
        this.bodyInput.value = ''
    }
    handleUpdatePost = (post) => {
        const { dispatch } = this.props
        if(this.props.editMode) {
            dispatch(updatePost(post))
        } else {
            dispatch(createPost(post))
        }
        this.props.dispatch(togglePostModal(false))
    }
    render() {
        let { post } = this.props.postModal
        post = post || {}
        const isEditMode = post.id
        return (
            <Modal dimmer="blurring" style={{ margin: '0 auto', marginTop: 0 }} open={this.props.postModal.open}>
                <Modal.Header>Add a Post</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmitModal.bind(this)}>
                        {!isEditMode && <div className="field">
                            <div className="ui input">
                                <input placeholder="Your Name" type="text" ref={input => this.authorInput = input} defaultValue={post.author}/>
                            </div>
                        </div>}
                        {!isEditMode && <div className="field">
                            <div className="ui input">
                                <select ref={input => this.categoryInput = input} placeholder='Select Post Category' defaultValue={post.category || this.props.globalMenu.activeCategory}>
                                    {
                                        this.props.categoryOptions.map((po) => (
                                            <option key={po.key} value={po.value}>{po.text}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>}
                        <div className="field">
                            <div className="ui input">
                                <input placeholder="Title" type="text" ref={input => this.titleInput = input} defaultValue={post.title}/>
                            </div>
                        </div>
                        <div className="field">
                            <textarea placeholder="Comment" ref={input => this.bodyInput = input} defaultValue={post.body}></textarea>
                        </div>
                        <Button content='Submit' labelPosition='left' icon='checkmark' primary />
                        <Button content='Cancel' labelPosition='left' icon="remove" color='grey' onClick={this.handleOpenModal.bind(this, false)} />
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    const { categories, ui } = state
    const { postModal, globalMenu } = ui
    return {
        postModal,
        globalMenu,
        editMode: postModal.post,
        categoryOptions: categories.map((cate, i) => ({
            key: i,
            text: cate.name,
            value: cate.name,
        }))
    }
}
export default connect(mapStateToProps)(PostModal)