var React = require('react');
var Fluxxor = require('fluxxor');
var TransitionGroup = require('timeout-transition-group');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Newsfeed = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('NewsfeedStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();


        return {
            item: flux.store('NewsfeedStore').getCurrentItem(),
            locked: flux.store('NewsfeedStore').lockCycle
        };
    },

    render: function() {
        var item = this.state.item;
        var newsfeed = item == null ? this.renderNothing() : this.renderItem();

        return <TransitionGroup
            enterTimeout={1000}
            leaveTimeout={1000}
            transitionLeave={false}
            component="div"
            className="gotr-newsfeed-container"
            transitionName="gotr-newsfeed">
            {newsfeed}
        </TransitionGroup>;
    },

    renderNothing: function() {
        return <div key="nothing" className="gotr-newsfeed"/>;
    },
    renderItem: function() {
        var item = this.state.item;
        if (item.get('type') === 'first_task') {
            return this.renderText();
        } else if (item.get('type') === 'task') {
            return this.renderTask();
        } else if (item.get('type') === 'notification') {
            return this.renderText();
        }
    },

    renderText: function () {
        var item = this.state.item;
        var user = item.get('user');
        var fullName = user.get('full_name');
        var pic = user.get('picture');
        var text = item.get('text');

        return <div key={item.id} className={"gotr-newsfeed " + this.state.locked ? 'gotr-newsfeed-locked' : ''}>
            <div className="gotr-newsfeed-item gotr-newsfeed-item-pic">
                <img className="gotr-newsfeed-item-pic" src={pic}/>
            </div>
            <div className="gotr-newsfeed-item gotr-newsfeed-item-line">
                <div className="gotr-newsfeed-item-line-text">
                    {text}
                </div>
            </div>
        </div>;
    },

    renderTask: function () {
        var item = this.state.item;
        var task = item.get('task');
        var title = task.get('title');
        var mins = task.getDurationInMinutes();
        var liked = task.get('liked');
        var likes = task.get('likes');
        var user = item.get('user');
        var fullName = user.get('full_name');
        var pic = user.get('picture');

        return <div key={item.id} className="gotr-newsfeed">
            <div className="gotr-newsfeed-item gotr-newsfeed-item-pic">
                <img className="gotr-newsfeed-item-pic" src={pic}/>
            </div>

            <div className="gotr-newsfeed-item gotr-newsfeed-item-line">
                <div className="gotr-newsfeed-item-line-text">
                    {fullName} completed <b>{title}</b> in <b>{mins} minutes</b>
                </div>
            </div>

            <div className="gotr-newsfeed-item gotr-newsfeed-item-right">
                <button className="gotr-newsfeed-like" onClick={this.handleLike}>
                    <img src={liked ? '/thumbs-up-green.svg' : '/thumbs-up.svg'}/>
                    <span>&nbsp;{likes}</span>
                </button>
            </div>
        </div>;
    },

    handleLike: function() {
        var flux = this.getFlux();
        var item = this.state.item;

        flux.actions.likeSharedItem(item);
    }
});
