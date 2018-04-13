import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Route, withRouter, Switch } from 'react-router-dom';
import CategoryList from '../../components/CategoryList/index';
import Post from '../../components/Post/index';


class App extends Component {
  render() {
    return (
      <div id="app">
        <Grid container columns={1}>
          <Grid.Row>
            <Grid.Column>
              <Switch>
                <Route exact path="/" render={({ match }) => (<CategoryList category="all" />)} />
                <Route exact path="/:category/:postId" render={({ match }) => (<Post postId={match.params.postId} />)} />
                <Route path="/:category" render={({ match }) => (<CategoryList category={match.params.category} />)} />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    )
  }
}

export default withRouter(App)