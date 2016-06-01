/**
 * Dialog Component for tingle
 * @author minjie
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');
let Layer = require('tingle-layer');
let Context = require('tingle-context');

class Dialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show,
            title: this.props.title,
            children: this.props.children,
            buttons: this.props.buttons
        }
    }

    show(options) {
        let state = this.state;
        let prop = options ? options : this.props;

        state.show = true;
        state.title = prop.title;
        state.children = prop.children;
        state.buttons = prop.buttons;

        this.setState(state);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({children : nextProps.children})
    }

    hide() {
        this.state.show = false;
        this.setState(this.state);
    }

    handleClick(callback) {

        if (callback() !== false) {
            this.hide();
        }
    }

    render() {
        let t = this;
        let btn = '';
        let {className, show, width, ...other} = t.props;
        let title = t.state.title;
        let buttons = t.state.buttons;
        let classSet = {
            'tDialog': true,
            [t.props.className]: !!t.props.className
        };

        let btnsCount = buttons.length;
        btn = buttons && buttons.map(function (item, i) {
            let callback = item.callback || Context.noop;
            return <div key={'tDialogButtonKey' + i}
                className={classnames("tFB1 tDialogButton tTE",
                    {
                        "tDialogPrimary": item.primary,
                        "tDialogSecondary": !item.primary,
                        "tDialogBRBL5": i===0||btnsCount===1,
                        "tDialogBRBR5": i===1||i===btnsCount-1
                    }
                )}
                onClick={t.handleClick.bind(t, callback)}>
                    {item.children}
            </div>
        });


        return (
            <Layer show={t.state.show} width={width || 270} {...other}>
                <div className={classnames(classSet)}>
                    {title ? <h1 className="tDialogTitle tFAC">{title}</h1> : ''}

                    <div className="tDialogContent">
                        {t.state.children}
                    </div>

                    <div className="tDialogOperation tTE tFBH tFAC">
                        {btn}
                    </div>
                </div>
            </Layer>
                )
        }
}

Dialog.defaultProps = {
    buttons: [{
        children: '确定',
        callback() {},
        primary: true
    }],
    mask: true,
    show: false,
    title: ''
};

// http://facebook.github.io/react/docs/reusable-components.html
Dialog.propTypes = {
    buttons: React.PropTypes.array,
    mask: React.PropTypes.bool,
    show: React.PropTypes.bool,
    title: React.PropTypes.string
};


var WRAPPER_ID = '__TingleGlobalDialog__';
var doc = document;

Dialog.global = null;

var show = function(options) {
    // 只有首次全局调用时，才会创建全局实例
    if (!Dialog.global) {
        var wrapper = doc.getElementById(WRAPPER_ID);
        var {...other} = options;

        if (!wrapper) {
            wrapper = doc.createElement('div');
            wrapper.id = WRAPPER_ID;
            doc.body.appendChild(wrapper);
        }
        Dialog.global = React.render(<Dialog {...other}  />, wrapper)
    };
    Dialog.global.show(options);
}

Dialog.alert = function(options) {
    options.buttons = [{
        children: options.confirmText || '确定',
        callback: options.onConfirm,
        primary: true
    }];
    show(options);
};

Dialog.confirm = function(options) {
    options.buttons = [{
        children: options.cancelText || '取消',
        callback: options.onCancel
    }, {
        children: options.confirmText || '确定',
        callback: options.onConfirm,
        primary: true
    }];
    show(options);
};

Dialog.displayName = 'Dialog';

module.exports = Dialog;
