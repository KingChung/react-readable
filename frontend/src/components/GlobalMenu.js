import React, { Component } from 'react'
import { Menu, Icon, Modal, Form, Select, Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectMenu, requestCategories, createPost } from '../actions';
import { withRouter } from 'react-router-dom';

class GlobalMenu extends Component {
  state = {
    open: false
  }
  componentDidMount() {
    this.props.dispatch(requestCategories())
    this.selectMenu(this.props.activeItem)
    this.setState({
      newPostCategory: this.props.activeItem
    })
  }
  handleItemClick = (e, { name, path }) => {
    this.selectMenu(name)
    this.props.history.push(path)
  }
  selectMenu(name) {
    this.props.dispatch(selectMenu(name))
  }
  handleAddPost = () => {
    let title = this.titleInput.value,
      body = this.bodyInput.value,
      author = this.authorInput.value,
      category = this.categoryInput.value
    this.props.dispatch(createPost({
      title,
      body,
      author,
      category
    }))
    this.setState({open: false})
  }
  handleOpenModal = () => {
    this.setState({open: true})
  }
  render() {
    const { activeItem } = this.props.globalMenu
    return (
      <div>
        <Menu pointing secondary>
          {
            this.props.menuItems.map((item, index) => (
              <Menu.Item key={index} name={item.name} path={'/' + item.path} active={activeItem === item.name} onClick={this.handleItemClick} />
            ))
          }
          <Menu.Item position="right" onClick={this.handleOpenModal}>
            <Icon name="plus" /> Add Post
          </Menu.Item>
          <Modal open={this.state.open} dimmer="blurring" style={{ margin: '0 auto', marginTop: 0 }}>
            <Modal.Header>Add a Post</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleAddPost}>
                <div className="field">
                  <div className="ui input">
                    <input placeholder="Your Name" type="text" ref={input => this.authorInput = input} />
                  </div>
                </div>
                <div className="field">
                  <div className="ui input">
                    <select ref={input => this.categoryInput = input} placeholder='Select Post Category' defaultValue={activeItem}>
                      {
                        this.props.postOptions.map((po) => (
                          <option key={po.key} value={po.value}>{po.text}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="field">
                  <div className="ui input">
                    <input placeholder="Title" type="text" ref={input => this.titleInput = input} />
                  </div>
                </div>
                <div className="field">
                  <textarea placeholder="Comment" ref={input => this.bodyInput = input}></textarea>
                </div>
                <Button content='Submit' labelPosition='left' icon='edit' primary />
              </Form>
            </Modal.Content>
          </Modal>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { globalMenu, categories } = state
  return {
    globalMenu,
    menuItems: [{ name: 'all', path: '' }].concat(categories.map((cate) => {
      const { name } = cate
      return { name, path: name }
    })),
    postOptions: categories.map((cate, i) => ({
      key: i,
      text: cate.name,
      value: cate.name,
    }))
  }
}

export default withRouter(connect(mapStateToProps)(GlobalMenu))