var React = require('react');
var Fluxxor = require('fluxxor');
var TransitionGroup = require('timeout-transition-group');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var classNs = require('classnames');

var Newsfeed = module.exports = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('NewsfeedStore')],

    getStateFromFlux: function() {
        var flux = this.getFlux();

        if (this.state && this.state.item && this.state.item.get('id') == flux.store('NewsfeedStore').getCurrentItem().get('id')) {
            return {}
        }
        setTimeout(this.setItem.bind(this, flux.store('NewsfeedStore').getCurrentItem()), 200)
        return {
            inToggle: true,
            locked: flux.store('NewsfeedStore').lockCycle
        };
    },

    setItem: function(item) {
        this.setState({
            item: item,
            inToggle: false
        })
    },

    render: function() {
        var item = this.state.item;
        var newsfeed = item == null ? this.renderNothing() : this.renderItem();
        var containerClassSet = classNs('gotr-newsfeed-container', {
            'gotr-newsfeed-hide': this.state.inToggle
        })

        debugger;

        return <div className={containerClassSet}>
            {newsfeed}
        </div>;
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
        var liked = item.get('liked');
        var likes = item.get('likes');
//        var task = item.get('task');
//        var liked = task.get('liked');
//        var likes = task.get('likes');

        return <div key={item.id} className={"gotr-newsfeed " + (this.state.locked ? 'gotr-newsfeed-locked' : '')}>
            <div className="gotr-newsfeed-item gotr-newsfeed-item-pic">
                <img className="gotr-newsfeed-item-pic" src={pic}/>
            </div>
            <div className="gotr-newsfeed-item gotr-newsfeed-item-line">
                <div className="gotr-newsfeed-item-line-text">
                    {text}
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

    renderTask: function () {
        var item = this.state.item;
        var task = item.get('task');
        var title = task.get('title');
        var mins = task.getDurationInMinutes();
        var liked = item.get('liked');
        var likes = item.get('likes');
        var user = item.get('user');
        var fullName = user.get('full_name');
        var pic = user.get('picture');

        return <div key={item.id} className={"gotr-newsfeed " + (this.state.locked ? 'gotr-newsfeed-locked' : '')}>
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
