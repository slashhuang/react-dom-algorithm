/**
 * Created by slashhuang on 16/1/18.
 */

import  React from 'react';
var WithDefaultKeys = React.createClass({
    render: function() {
        return <div>
            {
                this.props.collection.map(function(item, i) {
                    return <input
                        defaultValue={item}/>

                })
            }
        </div>

    }
});

var WithUniqueRandomKeys = React.createClass({
    render: function() {
        return <div >
            {
                this.props.collection.map(function(item) {
                    return <input
                        defaultValue={item}
                        key={Math.random()}/>
                })
            })
            }
        </div>
    }
});

var WithUniqueConstantKeys = React.createClass({
    render: function () {
        return <div >{
            this.props.collection.map(function (item) {
                return<input
                    defaultValue={item}
                    key={item}/>
            })
        }</div>
    }
});

var Main = React.createClass({
    getInitialState: function() {
        return {collection: []};
    },
    componentDidMount: function() {
        this._add();
    },
    _add: function() {
        var item = Date.now();
        this.setState({
            collection: [item].concat(this.state.collection),
            lastAddedItem: item
        });
    },
    _changeLast: function() {
        [].forEach.call(document.querySelectorAll('.column'), function(column) {
            column.querySelector('input:first-child').value += 'test︎';
        });
    },
    render: function() {
        return (<div >
            <button onClick={this._add}>'Add item</button>
            <button onClick={this._changeLast}> 'Change last item DOM value'</button>
            <p>
                {this.state.lastAddedItem }+ ' added'
            </p>
            <div className='column'>
                <strong> Default keys
                    {<WithDefaultKeys collection={this.state.collection}/>}
                </strong>
            </div>

            <div className='column'>
                <strong>'Unique random keys'{
                    <WithUniqueRandomKeys collection={this.state.collection}/>
                }
                </strong>

            </div>

            <div className='column'>
                <strong>'Unique constant keys'){
                    <WithUniqueConstantKeys collection={this.state.collection}/>
                }</strong>
            </div>
        </div>)
    },
});

React.render(<Main/>, document.getElementById('root'));