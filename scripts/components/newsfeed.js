var React = require('react');
var Fluxxor = require('fluxxor');
var TransitionGroup = require('react/addons').addons.CSSTransitionGroup;

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
            <div className="gotr-newsfeed-left">
                <div className="gotr-newsfeed-item">
                    <img className="gotr-newsfeed-item-pic" src={pic}/>
                    <span className="gotr-newsfeed-item-line">{fullName} completed <b>{title}</b> in <b>{mins} minutes</b></span>
                </div>
            </div>

            <div className="gotr-newsfeed-right">
                <div className="gotr-newsfeed-item">
                    <button className="gotr-newsfeed-like" onClick={this.handleLike}>
                        <img src={liked ? '/thumbs-up-green.svg' : '/thumbs-up.svg'}/>
                        <span>&nbsp;{likes}</span>
                    </button>
                </div>
            </div>
        </div>;
    },

    handleLike: function() {
        var flux = this.getFlux();
        var item = this.state.item;

        flux.actions.likeSharedItem(item);
    }
});
