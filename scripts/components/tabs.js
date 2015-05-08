var React = require('react');
var classNs = require('classnames');

var Tabs = module.exports = exports = React.createClass({
    render: function() {
        var active = this.props.active;
        var tabs = this.props.tabs;
        var newTabIndex = this.props.onNewTabIndex;

        return <div>
            <div className="gotr-tabs">
                {tabs.map(displayTitle)}
            </div>

            {tabs.map(displayContent)}
        </div>;

        function displayTitle(tab) {
            var index = tabs.indexOf(tab);

            return <Title
                active={index === active}
                onClick={click}
                key={tab.title}>
                {tab.title}
            </Title>;

            function click() {
                newTabIndex(index);
            }
        }

        function displayContent(tab) {
            var index = tabs.indexOf(tab);

            if (index === active) {
                return <div key={tab.title}>
                    {tab.content}
                </div>;
            }
        }
    }
});

var Title = React.createClass({
    render: function() {
        var className = classNs('gotr-tab-title', {
            'gotr-tab-title-active': this.props.active
        });

        return <div className={className} {...this.props}>
            {this.props.children}
        </div>;
    }
});
