/**
 * Created by slashhuang on 15/11/25.
 */

var InnerComponent = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        //当props存储引用类型的数据时，没有进行深对比，无法触发重新渲染
        //如果不加shouldComponentUpdate，它会调用react自己的shallowEqual进行比较，还是会触发重新渲染。两者的判断方式是不同的
        //增加shouldComponentUpdate，可以提高react的性能
        var bool = this.props.value !== nextProps.value;
        alert('shouldComponentUpdate returns '+bool);
        return  bool
    },
    render: function() {
        var renderData = this.props.value;
        if(typeof renderData=='object'){
            renderData=renderData.test
        }
        return <div>{renderData}</div>;
    }
});
var ReRender = React.createClass({
    getInitialState: function() {
        return {
            value:  'test value',
            obj:{test:'test obj'}
        };
    },

    valClick: function() {
        //debugger;
        var value = this.state.value;
        value += 'value'; // ANTI-PATTERN!
        this.setState({ value: value });
    },
    objClick: function() {
        debugger;
        var obj = this.state.obj;
        obj.test+= 'test obj '; // ANTI-PATTERN!
        this.setState({ obj: obj });
    },
    //button1   点击的结果alert 第一次为true(判断组件1的时候)
    // 第二次为false(判断组件2的时候)
    //button2  点击的结果alert 第一次为false(判断组件1的时候)
    // 第二次为false(判断组件2的时候)
    render: function() {
        return (
            <div>
                <button onClick={
                     this.valClick
                }>[测试props为非引用的数据类型]Click me</button>
                <InnerComponent value={this.state.value} data-componnet={1}/>
                <button onClick={this.objClick}>[测试props为引用数据类型]Click me</button>
                <InnerComponent value={this.state.obj} data-componnet={2} />
            </div>
        );
    }
});

    React.render(<ReRender />,
        document.getElementById('root'), function() {console.log('=====================');});
