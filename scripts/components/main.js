var React = require('react');
var Fluxxor = require('fluxxor');

var Nav = require('./navbar');
var Grid = require('./grid');
var Timer = require('./timer');
var TaskArea = require('./taskarea');
var Anltcs = require('./anltcs');
var Tabs = require('./tabs');
var TaskList = require('./task-list');
var Archive = require('./archive');
var Newsfeed = require('./newsfeed');
var Toaster = require('./toaster');

var FluxMixin = Fluxxor.FluxMixin(React);

// This is the code for the main component of the app.
// It tries to be high-level and declarative. Though
// we should probably extract the navbar part out.
//
// Most of the structure of this was dictated by the
// existing structure of the Angular code, which is
// why most of the elements used here are simplistic
// wrappers around divs with classes.

var Main = module.exports = React.createClass({
    mixins: [FluxMixin],

    getInitialState: function() {
        return {
            activeTabIndex: 0
        };
    },

    updateActiveTabIndex: function(index) {
        this.setState({
            activeTabIndex: index
        });
    },

    render: function() {
        var activeTabIndex = this.state.activeTabIndex;
        var pic = gotrUser.get('picture');

        var tabs = [
            {title: 'Today', content: <TaskList/>},
            {title: 'Archive', content: <Archive/>}
        ];

        return <div>
            <Nav>
                <Nav.Left>
                    <Nav.Item>
                        <span><img src="logo.svg" /></span>
                    </Nav.Item>
                </Nav.Left>

                <Nav.Right>
                    <Nav.Item>
                        <a href="#">
                            <img className="gotr-navbar-item-pic" src={pic} />
                        </a>
                    </Nav.Item>
                    <Nav.Item><a className="gotr-navbar-item-logout" href="#" onClick={this.logout}>Logout</a></Nav.Item>
                </Nav.Right>
            </Nav>

            <Newsfeed/>

            <Grid.Hero>
                <Grid.Row>
                    <Grid.Right>
                        <Timer/>
                    </Grid.Right>

                    <Grid.Left>
                        <TaskArea/>
                    </Grid.Left>
                </Grid.Row>
            </Grid.Hero>

            <Grid.Wing>
                <Grid.Row>
                    <Grid.Right><Anltcs/></Grid.Right>

                    <Grid.Left>
                        <Tabs
                            active={activeTabIndex}
                            tabs={tabs}
                            onNewTabIndex={this.updateActiveTabIndex}
                        />
                    </Grid.Left>
                </Grid.Row>
            </Grid.Wing>

            <Toaster/>
        </div>;
    },

    // See User#logout
    logout: function(event) {
        event.preventDefault();

        window.gotrUser.logout();
    }
});
