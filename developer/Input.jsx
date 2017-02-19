import React from "react";
import {Button} from "react-bootstrap";
export default class Input extends React.Component{
	componentWillMount(){
		this.state={
			scores:this.props.scores,
			name:this.props.name,
			color:this.props.color,
			maxScores:this.props.maxScores
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			scores:nextProps.scores,
			name:nextProps.name,
			maxScores:nextProps.maxScores
		})
		this.refs.color.value=nextProps.color;

	}
	change(e){
		this.setState({
		name:e.target.value
	})
	}
	add(){
		if(Number(this.state.scores)<this.state.maxScores){
			var addScore=Number(this.state.scores)+5;
			this.setState({scores:addScore})
		}

	}
	reduce(){
		if(Number(this.state.scores)>4){
		var reduceScore=Number(this.state.scores)-5;
		this.setState({scores:reduceScore})
		}
	}
	render(){
	return	(
		<li style={{listStyle:"none",width:"550px",height:"65px",paddingLeft:"50px",float:"left"}}>
		<input type="text" onChange={this.change.bind(this)}  style={{width:"100px",textAlign:"center",borderStyle:"none"}}  placeholder="点击我输入队名" value={this.state.name}/>
		<Button onClick={this.reduce.bind(this)} style={{margin:"0 40px"}}>减分</Button>
		<span style={{display:"inline-block",width:"28px",textAlign:"center"}}>{this.state.scores}</span>分
		<Button style={{marginLeft:"40px"}} onClick={this.add.bind(this)} bsStyle="success">加分</Button>
		<input type="color" ref="color" defaultValue={this.state.color} style={{marginLeft:"20px"}}/>
		</li>)
	}
}