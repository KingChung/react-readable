import React, { Component } from 'react'
import { Menu, Icon, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { requestCategories, sortPosts } from '../actions';
import { selectMenu, togglePostModal, selectSorter } from '../actions/ui'
import { withRouter } from 'react-router-dom';

class GlobalMenu extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(requestCategories()).then(() => {
      dispatch(selectMenu(this.props.activeCategory))
    })
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.activeCategory !== nextProps.activeCategory) {
      this.props.dispatch(selectSorter(''))
    }
  }
  handleItemClick = (e, { name, path }) => {
    this.props.history.push(path)
  }
  handleOpenModal = (openOrNot, e) => {
    e.preventDefault()
    this.props.dispatch(togglePostModal(openOrNot))
  }
  handleSorter = (e, data) => {
    this.props.dispatch(selectSorter(data.value))
    this.props.dispatch(sortPosts(data.value))
  }
  render() {
    const { activeCategory, condition } = this.props
    return (
      <div>
        <Menu pointing secondary>
          {
            this.props.menuItems.map((item, index) => (
              <Menu.Item key={index} name={item.name} path={'/' + item.path} active={activeCategory === item.name} onClick={this.handleItemClick} />
            ))
          }
          <Menu.Menu position="right">
            <Dropdown item text={`Sort by: ${condition}`} icon="sort">
              <Dropdown.Menu>
                <Dropdown.Item value="timestamp" onClick={this.handleSorter}><Icon name="time" color="green" />timestamp</Dropdown.Item>
                <Dropdown.Item value="voteScore" onClick={this.handleSorter}><Icon name="like" color="red" />voteScore</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item onClick={this.handleOpenModal.bind(this, true)}>
              <Icon name="plus" /> Add Post
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { categories, ui } = state
  return {
    condition: ui.globalMenu.condition || '',
    menuItems: [{ name: 'all', path: '' }].concat(categories.map((cate) => {
      const { name } = cate
      return { name, path: name }
    }))
  }
}

export default withRouter(connect(mapStateToProps)(GlobalMenu))