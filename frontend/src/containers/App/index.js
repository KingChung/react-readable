import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Route } from 'react-router-dom';
import CategoryList from '../../components/CategoryList/index';
import { withRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div id="app">
        <Grid container columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Route exact path="/" render={({match}) => (<CategoryList category="all" />)} />
              <Route path="/:category" render={({match}) => (<CategoryList category={match.params.category} />)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    )
  }
}

//@TODO Why should this place use `withRouter`?
export default withRouter(App)