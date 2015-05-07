var React = require('react');
var Nav = require('./navbar');
var Grid = require('./grid');
var Timer = require('./timer');
var TaskArea = require('./taskarea');
var Anltcs = require('./anltcs');
var Tabs = require('./tabs');
var TaskList = require('./task-list');

var Main = module.exports = React.createClass({
    render: function() {
        var tasks = [{
            id: 'asdf',
            title: 'Start researching ideas for new project',
            duration: 20 * 60 * 60 * 1000,
            completed: false
        }, {
            id: 'fdsa',
            title: 'Produce full set of wireframes',
            duration: 30 * 60 * 60 * 1000,
            completed: false
        }, {
            id: '123asdf',
            title: 'Post shot to dribbble',
            duration: 60 * 60 * 60 * 1000,
            completed: false
        }];

        return <div>
            <Nav>
                <Nav.Left>
                    <Nav.Item>
                        <a href=""><img src="images/logo.svg" /></a>
                    </Nav.Item>
                </Nav.Left>

                <Nav.Right>
                    <Nav.Item active><a href="">Timer</a></Nav.Item>
                    <Nav.Item><a href="">How To</a></Nav.Item>
                    <Nav.Item><a href="">Login</a></Nav.Item>
                </Nav.Right>
            </Nav>

            <Grid.Hero>
                <Grid.Row>
                    <Grid.Right><Timer/></Grid.Right>

                    <Grid.Left><TaskArea/></Grid.Left>
                </Grid.Row>
            </Grid.Hero>

            <Grid.Wing>
                <Grid.Row>
                    <Grid.Right><Anltcs/></Grid.Right>

                    <Grid.Left>
                        {/* TODO: clean this up */}
                        <Tabs>
                            <Tabs.Title active>Today</Tabs.Title>
                            <Tabs.Title>Blocker</Tabs.Title>
                            <Tabs.Title>Archive</Tabs.Title>
                        </Tabs>

                        <TaskList tasks={tasks}/>
                    </Grid.Left>
                </Grid.Row>
            </Grid.Wing>
        </div>;
    }
});
