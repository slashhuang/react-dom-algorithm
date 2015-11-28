/**
 * Created by slashhuang on 15/11/25.
 */

var InnerComponent = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        debugger;
        var bool = this.props.value !== nextProps.value;
        return  bool
    },
    render: function() {
        return <div>{this.props.value}</div>;
    }
});
var ReRender = React.createClass({
    getInitialState: function() {
        return { value:  'bar' };
    },

    onClick: function() {
        debugger;
        var value = this.state.value;
        value += 'bar'; // ANTI-PATTERN!
        this.setState({ value: value });
    },

    render: function() {
        return (
            <div>
                <InnerComponent value={this.state.value} />
                <a onClick={this.onClick}>Click me</a>
            </div>
        );
    }
});

    React.render(<ReRender />,
        document.getElementById('root'), function() {console.log('=====================');});
