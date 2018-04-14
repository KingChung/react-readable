import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { requestCategories } from '../actions';
import { selectMenu, togglePostModal } from '../actions/ui'
import { withRouter } from 'react-router-dom';
import PostModal from './PostModal';

class GlobalMenu extends Component {
  componentDidMount() {
    this.props.dispatch(requestCategories()).then(() => {
      this.props.dispatch(selectMenu(this.props.activeCategory))
    })
  }
  handleItemClick = (e, { name, path }) => {
    this.props.history.push(path)
  }
  handleOpenModal = (openOrNot, e) => {
    e.preventDefault()
    this.props.dispatch(togglePostModal(openOrNot))
  }
  render() {
    const { activeCategory } = this.props
    return (
      <div>
        <Menu pointing secondary>
          {
            this.props.menuItems.map((item, index) => (
              <Menu.Item key={index} name={item.name} path={'/' + item.path} active={activeCategory === item.name} onClick={this.handleItemClick} />
            ))
          }
          <Menu.Item position="right" onClick={this.handleOpenModal.bind(this, true)}>
            <Icon name="plus" /> Add Post
          </Menu.Item>
          <PostModal activeCategory={this.props.activeCategory} />
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories } = state
  return {
    menuItems: [{ name: 'all', path: '' }].concat(categories.map((cate) => {
      const { name } = cate
      return { name, path: name }
    }))
  }
}

export default withRouter(connect(mapStateToProps)(GlobalMenu))