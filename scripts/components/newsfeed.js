var React = require('react');

var Newsfeed = module.exports = React.createClass({
    render: function() {
        var pic = gotrUser.get('picture');

        return <div className="gotr-newsfeed-container">
            <div className="gotr-newsfeed">
                <div className="gotr-newsfeed-left">
                    <div className="gotr-newsfeed-item">
                        <img className="gotr-newsfeed-item-pic" src={pic}/>
                        <span>You completed some <b>Something</b> in <b>45 minutes</b></span>
                    </div>
                </div>

                <div className="gotr-newsfeed-right">
                    <div className="gotr-newsfeed-item">
                        <button className="gotr-newsfeed-like">36</button>
                    </div>
                </div>
            </div>
        </div>;
    }
});
