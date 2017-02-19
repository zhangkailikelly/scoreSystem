"use strict";

var _index = require("C:\\Users\\kellyZhang\\Desktop\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\redbox-react\\lib\\index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("C:\\Users\\kellyZhang\\Desktop\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\react-transform-catch-errors\\lib\\index.js");

var _index4 = _interopRequireDefault(_index3);

var _react2 = require("react");

var _react3 = _interopRequireDefault(_react2);

var _index5 = require("C:\\Users\\kellyZhang\\Desktop\\\u6253\u5206\u8F6F\u4EF6\\developer\\node_modules\\react-transform-hmr\\lib\\index.js");

var _index6 = _interopRequireDefault(_index5);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _recharts = require("recharts");

require("../\u6253\u5206/public/lineCss.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
	Users: {
		displayName: "Users"
	}
};

var _CUsersKellyZhangDesktopDeveloperNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	filename: "C:/Users/kellyZhang/Desktop/\u6253\u5206\u8F6F\u4EF6/developer/users.jsx",
	components: _components,
	locals: [module],
	imports: [_react3.default]
});

var _CUsersKellyZhangDesktopDeveloperNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	filename: "C:/Users/kellyZhang/Desktop/\u6253\u5206\u8F6F\u4EF6/developer/users.jsx",
	components: _components,
	locals: [],
	imports: [_react3.default, _index2.default]
});

function _wrapComponent(id) {
	return function (Component) {
		return _CUsersKellyZhangDesktopDeveloperNode_modulesReactTransformHmrLibIndexJs2(_CUsersKellyZhangDesktopDeveloperNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	};
}

var timer;
var arrs = [{ name: "中1中1中1中1中1", color: "red", socers: 10 }, { name: "中1中1中1中1中1", color: "green", socers: 12 }, { name: "中1中1中1中1中1", color: "black", socers: 30 }, { name: "中1中1中1中1中1", color: "blue", socers: 20 }, { name: "中1中1中1中1中1", color: "orange", socers: 13 }, { name: "中1中1中1中1中1", color: "pink", socers: 14 }, { name: "中1中1中1中1中1", color: "#ccc", socers: 24 }, { name: "中1中1中1中1中1", color: "#666", socers: 26 }, { name: "中1中1中1中1中1", color: "#222", socers: 15 }, { name: "中1中1中1中1中1", color: "#ffd345", socers: 18 }, { name: "中1中1中1中1中1", color: "#111", socers: 21 }, { name: "中1中1中1中1中1", color: "#777", socers: 27 }];

var Users = _wrapComponent("Users")(function (_React$Component) {
	_inherits(Users, _React$Component);

	function Users() {
		_classCallCheck(this, Users);

		return _possibleConstructorReturn(this, (Users.__proto__ || Object.getPrototypeOf(Users)).apply(this, arguments));
	}

	_createClass(Users, [{
		key: "componentWillMount",
		value: function componentWillMount() {}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			function size(arr) {
				//屏幕宽高
				var h = $(window).height();
				var w = $(window).width();
				//柱状图宽高
				h = h * 0.6;
				w = 0.8 * w;
				//左侧数字宽高
				var left = -0.02 * w;
				//设置柱状图高度
				$("#mains").height(h).css({ marginLeft: -0.5 * w, marginTop: -0.5 * h });
				//设置左侧数值栏样式
				$('.side').width(30).height(1).css("left", "-30px");
				$('.side').eq(0).css("top", 0);
				$('.side').eq(1).css("top", 0.25 * h);
				$('.side').eq(2).css("top", 0.5 * h);
				$('.side').eq(3).css("top", 0.75 * h);
				$('.side').eq(4).css("top", h);
				//设置柱子的位置,高度,柱子上方的数字显示
				var lines = $('.line');

				for (var i = 0; i < lines.length; i++) {
					$(lines[i]).css({ left: 100 / 48 + i * 2 * 100 / 24 + "%", backgroundColor: arr[i].color }).height(h * arr[i].socers / 40).find(".font").html(arr[i].socers);
					$(".name").eq(i).css("left", $(lines[i]).css("left")).html(arr[i].name);
				}
			}
			window.onresize = size;
			size(arrs);
			// var _this=this;
			// 	timer=setInterval(function(){
			// 		$.ajax({
			// 			url:"/update",
			// 			type:"get",
			// 			success:function(data){
			// 				if(data){
			// 					var objs=data
			// 					console.log(objs);
			// 					_this.setState({
			// 						data:objs
			// 					})
			// 				}
			// 			}
			//
			// 		})
			// 	},2000)
		}
	}, {
		key: "componentWillUnmount",
		value: function componentWillUnmount() {
			clearInterval(timer);
		}
	}, {
		key: "render",
		value: function render() {
			return _react3.default.createElement(
				"div",
				{ id: "mains" },
				_react3.default.createElement("div", { className: "side" }),
				_react3.default.createElement("div", { className: "side" }),
				_react3.default.createElement("div", { className: "side" }),
				_react3.default.createElement("div", { className: "side" }),
				_react3.default.createElement("div", { className: "side" }),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement(
					"div",
					{ className: "line" },
					_react3.default.createElement("div", { className: "font" })
				),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" }),
				_react3.default.createElement("div", { className: "name" })
			);
		}
	}]);

	return Users;
}(_react3.default.Component));

var root = document.getElementById("main");
_reactDom2.default.render(_react3.default.createElement(Users, null), root);

//# sourceMappingURL=users.js.map