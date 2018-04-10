import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectMenu, requestCategories } from '../actions';
import { withRouter } from 'react-router-dom';

class GlobalMenu extends Component {
  componentDidMount() {
    this.props.dispatch(requestCategories())
    console.log(this.props.activeItem);
    this.selectMenu(this.props.activeItem)
  }
  handleItemClick = (e, { name, path }) => {
    this.selectMenu(name)
    this.props.history.push(path)
  }
  selectMenu(name) {
    this.props.dispatch(selectMenu(name))
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
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { globalMenu, categories } = state
  return {
    globalMenu,
    menuItems: [{ name: 'home', path: '' }].concat(categories.map((cate) => {
      const { name } = cate
      return { name, path: name }
    })),
  }
}

export default withRouter(connect(mapStateToProps)(GlobalMenu))