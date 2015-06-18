var React = require('react');
var Fluxxor = require('fluxxor');

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

        if (item == null) {
            return this.renderNothing();
        } else {
            return this.renderItem();
        }
    },

    renderNothing: function() {
        return <div/>;
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

        return <div className="gotr-newsfeed-container">
            <div className="gotr-newsfeed">
                <div className="gotr-newsfeed-left">
                    <div className="gotr-newsfeed-item">
                        <img className="gotr-newsfeed-item-pic" src={pic}/>
                        <span className="gotr-newsfeed-item-line">{fullName} completed <b>{title}</b> in <b>{mins} minutes</b></span>
                    </div>
                </div>

                <div className="gotr-newsfeed-right">
                    <div className="gotr-newsfeed-item">
                        <button className="gotr-newsfeed-like">
                            <img src="/thumbs-up.svg"/>
                            <span>&nbsp;{likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>;
    }
});
