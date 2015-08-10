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
            item: flux.store('NewsfeedStore').getCurrentItem()
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
        var title = item.get('title');
        var mins = item.getDurationInMinutes();
        var liked = item.get('liked');
        var likes = item.get('likes');
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
