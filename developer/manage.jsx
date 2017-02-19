import React from "react";
import ReactDOM from "react-dom";
import Input from "./Input.jsx";
import {Button} from "react-bootstrap"
import "./base.css";
//打分端初始化数据
var Init = {
    list: [
        {name: "1队", scores: 0, color: "#000000"},
        {name: "2队", scores: 0, color: "#000000"},
        {name: "3队", scores: 0, color: "#000000"},
        {name: "4队", scores: 0, color: "#000000"},
        {name: "5队", scores: 0, color: "#000000"},
        {name: "6队", scores: 0, color: "#000000"},
        {name: "7队", scores: 0, color: "#000000"},
        {name: "8队", scores: 0, color: "#000000"},
        {name: "9队", scores: 0, color: "#000000"},
        {name: "10队", scores: 0, color: "#000000"},
        {name: "11队", scores: 0, color: "#000000"},
        {name: "12队", scores: 0, color: "#000000"}
    ],
    maxScores: 100,
    title: "比赛打分系统",
    sort: 0
};

class Manage extends React.Component {
    componentWillMount() {
        this.state = {
            // src: "",
            list: Init.list,
            maxScores: Init.maxScores,
            title: Init.title,
            win: 0

        }
    }

    componentDidMount() {
        //服务端数据同步
        var _this = this;
        $.ajax({
            url: "/update",
            type: "get",
            success: function (datas) {
                if (datas) {
                    var newObj = Object.assign({}, Init, datas)
                    _this.setState(newObj);//更新状态
                    _this.refs.title.value = newObj.title;
                    _this.refs.maxScores.value = newObj.maxScores;
                }
                else {
                    _this.refs.title.value = _this.state.title;
                    _this.refs.maxScores.value = _this.state.maxScores;
                    _this.reset(0);//初始化数据，颜色，title，队名，最高分数
                }
            }
        })
    }

    result(bool) {
        //只更新分数
        //与当前的状态进行合并
        var spans = $("ul>li>span");
        var newList = [];
        for (var i = 0; i < this.state.list.length; i++) {
            newList[i] = {};
            for (var key in this.state.list[i]) {
                if (key == "scores") {
                    newList[i][key] = $(spans[i]).html()
                } else {
                    newList[i][key] = this.state.list[i][key]
                }
            }
        }
        if (bool == 1) {
            //排序
            newList.sort(function (x, y) {
                return y.scores - x.scores
            })
        } else {
            bool = 0;
        }
        //更新状态
        this.setState({
            list: newList
        })
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
            success: function (data) {
                if (data) {
                    alert("数据更新成功")
                }
            }
        })
    }

    sort() {
        this.result(1);
    }

    reset(num) {
        //重置颜色，队名,最高分数，title
        var names = $("ul input[type=text]")//所有name
        var colors = $("ul input[type=color]")//所有color
        var arrs = [];//新的Init.list,Init.list为默认值
        for (var j = 0; j < names.length; j++) {
            arrs[j] = {};
            arrs[j].name = $(names[j]).val().trim() ? $(names[j]).val().trim() : Init.list[j].name
            arrs[j].color = $(colors[j]).val() ? $(colors[j]).val() : Init.list[j].color
            arrs[j].scores = 0
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
        var resetData = {data: JSON.stringify(newObj)};
        $.ajax({
            url: "/scores",
            data: resetData,
            type: "post",
            success: function (data) {
                if (data && num != 0) {
                    alert("重置成功")
                }
            }
        })
    }

    maxScores(e) {
        if (e.target.value < 5) {
            e.target.value = "";
        }
    }

    file() {
        var _this = this;
        if (this.refs.file.files && this.refs.file.files[0]) {
            var read = new FileReader();
            read.readAsDataURL(this.refs.file.files[0]);
            read.onload = function (e) {
                _this.setState({
                    src: e.target.result
                })
            }
        }

    }

    render() {
        return (<div style={{paddingBottom: "100px"}}>
            <h1 style={{textAlign: "left", paddingLeft: "125px"}}>比赛打分控制端</h1>
            <ul className="clear" style={{paddingTop: "50px"}}>
                {this.state.list.map((v, i)=> {
                    var obj = Object.assign({}, {key: i, maxScores: this.state.maxScores}, v);
                    return <Input {...obj}/>
                })}
            </ul>
            <div style={{width: "600px"}}>
                <input ref="title" defaultValue={this.state.title} type="text"
                       style={{marginLeft: "92px", textAlign: "center"}} placeholder="请输入显示端标题"/>
                <input ref="maxScores" defaultValue={this.state.maxScores} type="number"
                       onChange={this.maxScores.bind(this)}
                       style={{width: "120px", marginLeft: "133px", textAlign: "center"}} min="0"
                       placeholder="设定分数最大值"/>
                <Button style={{marginLeft: "92px", marginTop: "20px"}}
                        onClick={this.result.bind(this)}
                        bsStyle="success">更新分数</Button>
                <Button style={{marginLeft: "80px", marginTop: "20px"}}
                        onClick={this.sort.bind(this)}
                        bsStyle="success">更新分数并排序</Button>
                <Button style={{marginLeft: "80px", marginTop: "20px"}}
                        onClick={this.reset.bind(this)}
                        bsStyle="success">重 置</Button>
                {/*<form id='form' accept="image/*" encType="application">*/}
                    {/*<input type="file" ref="file"  onChange={this.file.bind(this)}/>*/}
                {/*</form>*/}
                {/*<img src={this.state.src} alt="" style={{width: "100px"}}/>*/}
            </div>
        </div>)
    }
}
var root = document.getElementById('main');

ReactDOM.render(<Manage/>, root);
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