/**
 * Dialog Component Demo for tingle
 * @author minjie
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

let Button = require('tingle-button');
let Dialog = require('../src');


class Demo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true,
            content: '测测测测'
        }
    }

    handleAlert() {
        Dialog.alert({
            title: '测试',
            children: '我是测试我是测试我是测试我是测试我是测试',
            onConfirm() {
                console.log('alert confirm');
            }
        });
    }

    handleTitle() {
        Dialog.alert({
            children: '我是测试内容我是测试内容',
            onConfirm() {
                console.log('no title confirm');
            }
        });
    }

    handleMultiLines() {
        Dialog.alert({
            title: '测试',
            children: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('multi lines confirm');
            }
        });
    }

    handleConfirm() {
        Dialog.confirm({
            title: '测试',
            children: '我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内容我是测试内',
            onConfirm() {
                console.log('confirm confirm');
            },
            onCancel() {
                console.log('confirm cancel');
            }
        });
    }

    handlePage() {
        this.refs.mainDialog.show();
    }

    handleMultiLayer() {
        this.refs.popDialog.show();
    }

    _onChange(e) {
        e.preventDefault();
        this.setState({content: e.target.value});
    }

    render() {
        let t = this;
        let buttons = [{
                children: '取消',
                callback() {
                    console.log('page cancel');
                }
            },{
                children:  '异步',
                callback() {
                    setTimeout( function () {
                        t.refs.mainDialog.hide()
                    }, 2000);
                    return false;
                }
             },{
                children: '确定',
                callback() {
                    console.log('page confirm');
                },
                primary: true
            }];
        let popButton = [{
            children: '测试',
            callback: function () {
                console.log('pop button');
            },
            primary: true
        }];

        return (
            <div className="demoWrap">
                <Button className="demo" onClick={this.handleAlert.bind(this)}>alert</Button>
                <Button className="demo" onClick={this.handleConfirm.bind(this)}>confirm</Button>
                <Button className="demo" onClick={this.handleTitle.bind(this)}>no title</Button>
                <Button className="demo" onClick={this.handleMultiLines.bind(this)}>multi lines</Button>
                <Button className="demo" onClick={this.handlePage.bind(this)}>page</Button>
                <Button className="demo" onClick={this.handleMultiLayer.bind(this)}>multi layer</Button>
                <Dialog ref="mainDialog" title="页面上" buttons={buttons}>
                    <input onChange={this._onChange.bind(this)} value={this.state.content}/>
                </Dialog>
                <Dialog width={300} top={'55%'} ref="popDialog" buttons={popButton}>
                    <div onClick={this.handleTitle.bind(this)}>
                        点我出第二层
                    </div>
                </Dialog>
            </div>
        );
    }
}
module.exports = Demo;
