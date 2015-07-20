var React = require('react');
var classNs = require('classnames');

// This is the logic behind the tab bar seen
// below the task area.
//
// For example:
//
//     <Tabs tabs=[{title: 'Tab 1', content: <div>...</div>}, ...]/>;
//
// TODO: add propTypes

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
                key={tab.title}
                tab={tab}>
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
        var tab = this.props.tab;

        var className = classNs('gotr-tab', {
            'gotr-tab-active': this.props.active
        });

        return <div className={className} {...this.props}>
            <span className="gotr-tab-title">{tab.title}</span>
            {tab.extra}
        </div>;
    }
});
