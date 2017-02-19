"use strict";

var _index = require("C:\\Users\\kellyZhang\\Desktop\\work\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\redbox-react\\lib\\index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("C:\\Users\\kellyZhang\\Desktop\\work\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\react-transform-catch-errors\\lib\\index.js");

var _index4 = _interopRequireDefault(_index3);

var _react2 = require("react");

var _react3 = _interopRequireDefault(_react2);

var _index5 = require("C:\\Users\\kellyZhang\\Desktop\\work\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\react-transform-hmr\\lib\\index.js");

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Input = require("./Input.jsx");

var _Input2 = _interopRequireDefault(_Input);

var _reactBootstrap = require("react-bootstrap");

require("./base.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
    Manage: {
        displayName: "Manage"
    }
};

var _CUsersKellyZhangDesktopWorkDeveloperNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
    filename: "C:/Users/kellyZhang/Desktop/work/\u6253\u5206\u8F6F\u4EF6/developer/manage.jsx",
    components: _components,
    locals: [module],
    imports: [_react3.default]
});

var _CUsersKellyZhangDesktopWorkDeveloperNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
    filename: "C:/Users/kellyZhang/Desktop/work/\u6253\u5206\u8F6F\u4EF6/developer/manage.jsx",
    components: _components,
    locals: [],
    imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
    return function (Component) {
        return _CUsersKellyZhangDesktopWorkDeveloperNode_modulesReactTransformHmrLibIndexJs2(_CUsersKellyZhangDesktopWorkDeveloperNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
    };
}

//打分端初始化数据
var Init = {
    list: [{ name: "1队", scores: 0, color: "#000000" }, { name: "2队", scores: 0, color: "#000000" }, { name: "3队", scores: 0, color: "#000000" }, { name: "4队", scores: 0, color: "#000000" }, { name: "5队", scores: 0, color: "#000000" }, { name: "6队", scores: 0, color: "#000000" }, { name: "7队", scores: 0, color: "#000000" }, { name: "8队", scores: 0, color: "#000000" }, { name: "9队", scores: 0, color: "#000000" }, { name: "10队", scores: 0, color: "#000000" }, { name: "11队", scores: 0, color: "#000000" }, { name: "12队", scores: 0, color: "#000000" }],
    maxScores: 100,
    title: "比赛打分系统",
    sort: 0
};

var Manage = _wrapComponent("Manage")(function (_React$Component) {
    _inherits(Manage, _React$Component);

    function Manage() {
        _classCallCheck(this, Manage);

        return _possibleConstructorReturn(this, (Manage.__proto__ || Object.getPrototypeOf(Manage)).apply(this, arguments));
    }

    _createClass(Manage, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.state = {
                // src: "",
                list: Init.list,
                maxScores: Init.maxScores,
                title: Init.title,
                win: 0

            };
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            //服务端数据同步
            var _this = this;
            $.ajax({
                url: "/update",
                type: "get",
                success: function success(datas) {
                    if (datas) {
                        var newObj = Object.assign({}, Init, datas);
                        _this.setState(newObj); //更新状态
                        _this.refs.title.value = newObj.title;
                        _this.refs.maxScores.value = newObj.maxScores;
                    } else {
                        _this.refs.title.value = _this.state.title;
                        _this.refs.maxScores.value = _this.state.maxScores;
                        _this.reset(0); //初始化数据，颜色，title，队名，最高分数
                    }
                }
            });
        }
    }, {
        key: "result",
        value: function result(bool) {
            //只更新分数
            //与当前的状态进行合并
            var spans = $("ul>li>span");
            var newList = [];
            for (var i = 0; i < this.state.list.length; i++) {
                newList[i] = {};
                for (var key in this.state.list[i]) {
                    if (key == "scores") {
                        newList[i][key] = $(spans[i]).html();
                    } else {
                        newList[i][key] = this.state.list[i][key];
                    }
                }
            }
            if (bool == 1) {
                //排序
                newList.sort(function (x, y) {
                    return y.scores - x.scores;
                });
            } else {
                bool = 0;
            }
            //更新状态
            this.setState({
                list: newList
            });
            var updateScores = {
                data: JSON.stringify({
                    list: newList,
                    sort: bool,
                    win: bool,
                    title: this.state.title,
                    maxScores: this.state.maxScores
                })
            };
            $.ajax({
                url: "/scores",
                data: updateScores,
                type: "post",
                success: function success(data) {
                    if (data) {
                        alert("数据更新成功");
                    }
                }
            });
        }
    }, {
        key: "sort",
        value: function sort() {
            this.result(1);
        }
    }, {
        key: "reset",
        value: function reset(num) {
            //重置颜色，队名,最高分数，title
            var names = $("ul input[type=text]"); //所有name
            var colors = $("ul input[type=color]"); //所有color
            var arrs = []; //新的Init.list,Init.list为默认值
            for (var j = 0; j < names.length; j++) {
                arrs[j] = {};
                arrs[j].name = $(names[j]).val().trim() ? $(names[j]).val().trim() : Init.list[j].name;
                arrs[j].color = $(colors[j]).val() ? $(colors[j]).val() : Init.list[j].color;
                arrs[j].scores = 0;
            }
            //新的最大分数，title
            var obj = {};
            obj.list = arrs;
            obj.sort = 1;
            //小标题是否隐藏
            obj.win = 0;
            obj.src = this.state.src;
            obj.title = this.refs.title.value ? this.refs.title.value : Init.title;
            obj.maxScores = this.refs.maxScores.value ? this.refs.maxScores.value : Init.maxScores;
            var newObj = Object.assign({}, Init, obj);
            this.setState(newObj);
            this.refs.title.value = $(this.refs.title).val().trim() ? $(this.refs.title).val().trim() : Init.title;
            this.refs.maxScores.value = ($(this.refs.maxScores).val() + "").trim() ? ($(this.refs.maxScores).val() + "").trim() : Init.maxScores;
            var resetData = { data: JSON.stringify(newObj) };
            $.ajax({
                url: "/scores",
                data: resetData,
                type: "post",
                success: function success(data) {
                    if (data && num != 0) {
                        alert("重置成功");
                    }
                }
            });
        }
    }, {
        key: "maxScores",
        value: function maxScores(e) {
            if (e.target.value < 5) {
                e.target.value = "";
            }
        }
    }, {
        key: "file",
        value: function file() {
            var _this = this;
            if (this.refs.file.files && this.refs.file.files[0]) {
                var read = new FileReader();
                read.readAsDataURL(this.refs.file.files[0]);
                read.onload = function (e) {
                    _this.setState({
                        src: e.target.result
                    });
                };
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return _react3.default.createElement(
                "div",
                { style: { paddingBottom: "100px" } },
                _react3.default.createElement(
                    "h1",
                    { style: { textAlign: "left", paddingLeft: "125px" } },
                    "\u6BD4\u8D5B\u6253\u5206\u63A7\u5236\u7AEF"
                ),
                _react3.default.createElement(
                    "ul",
                    { className: "clear", style: { paddingTop: "50px" } },
                    this.state.list.map(function (v, i) {
                        var obj = Object.assign({}, { key: i, maxScores: _this3.state.maxScores }, v);
                        return _react3.default.createElement(_Input2.default, obj);
                    })
                ),
                _react3.default.createElement(
                    "div",
                    { style: { width: "600px" } },
                    _react3.default.createElement("input", { ref: "title", defaultValue: this.state.title, type: "text",
                        style: { marginLeft: "92px", textAlign: "center" }, placeholder: "\u8BF7\u8F93\u5165\u663E\u793A\u7AEF\u6807\u9898" }),
                    _react3.default.createElement("input", { ref: "maxScores", defaultValue: this.state.maxScores, type: "number",
                        onChange: this.maxScores.bind(this),
                        style: { width: "120px", marginLeft: "133px", textAlign: "center" }, min: "0",
                        placeholder: "\u8BBE\u5B9A\u5206\u6570\u6700\u5927\u503C" }),
                    _react3.default.createElement(
                        _reactBootstrap.Button,
                        { style: { marginLeft: "92px", marginTop: "20px" },
                            onClick: this.result.bind(this),
                            bsStyle: "success" },
                        "\u66F4\u65B0\u5206\u6570"
                    ),
                    _react3.default.createElement(
                        _reactBootstrap.Button,
                        { style: { marginLeft: "80px", marginTop: "20px" },
                            onClick: this.sort.bind(this),
                            bsStyle: "success" },
                        "\u66F4\u65B0\u5206\u6570\u5E76\u6392\u5E8F"
                    ),
                    _react3.default.createElement(
                        _reactBootstrap.Button,
                        { style: { marginLeft: "80px", marginTop: "20px" },
                            onClick: this.reset.bind(this),
                            bsStyle: "success" },
                        "\u91CD \u7F6E"
                    )
                )
            );
        }
    }]);

    return Manage;
}(_react3.default.Component));

var root = document.getElementById('main');

_reactDom2.default.render(_react3.default.createElement(Manage, null), root);
{/*
    API
    {data:{
    list:[{
    color:"16进制颜色值",
    name:"队名",
    socers:"分数"
    }],
    title:"标题",
    maxScores:0,
    sort:0/1,
    reset:underfined/1    }
    }
    
    */
}

//# sourceMappingURL=manage.js.map