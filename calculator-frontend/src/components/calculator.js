import React,{Component} from 'react';
import './calculator.css';
import axios from 'axios';


class Calculator extends Component{
	
	constructor(props){
	  super(props)
		this.state={
			inputText:"",
			calculatedText:"",
			errors:null
		};
		this.inputTextHandle = this.inputTextHandle.bind(this);
		this.evaluateText = this.evaluateText.bind(this);
		this.clearTextHandle = this.clearTextHandle.bind(this);
		this.onChangeInputTextHandle = this.onChangeInputTextHandle.bind(this);
		this.onChangeCalculatedTextHandle = this.onChangeCalculatedTextHandle.bind(this);
	}


	// Evaluates the text
	evaluateText = (e) =>{
		const textToBeEvaluated = this.state.inputText;
		const data = {'text':textToBeEvaluated};
		console.log(data);
		axios.post("http://localhost:3301/evaluate",data).then((response)=>{
			const status = response.data.isSuccess;
			if(status){
				this.setState({
					calculatedText : response.data.answer
				});
			}else{
				this.setState({
					errors:"Invalid Expression!!!"
				});
			}
		}).catch(function(error){
			this.setState({
				errors:"Invalid Expression!!!"
			});
		});
		
	}


	// takes input for buttons clicked
	inputTextHandle =(e)=>{
		const input = String(e.target.innerHTML);
		var {inputText} = this.state;
		inputText=inputText+input;
		this.setState({
			inputText:inputText
		});
	}

	clearTextHandle =(e)=>{
		this.setState({
			inputText:"",
			calculatedText:"",
			errors:null
		});
	}

	onChangeInputTextHandle =(e)=>{
		const text = e.target.value;
		this.setState({
			inputText:text
		});
	}

	onChangeCalculatedTextHandle =(e)=>{
		this.setState({
			calculatedText:e.target.value
		});
	}

	render(){
		//<input type="text" className="w-100 form-row remove-bg-input mt-2 mb-0" onChange={this.onChangeCalculatedTextHandle} value={this.state.calculatedText} style={{height:'50px',fontSize:'30px',textAlign:'center',color:'#F0FFF0'}}/>
		var alert_info = null;
		const {errors} = this.state;
		if(errors){
			alert_info = <div className="alert alert-info" role="alert">
							{errors}
		  				</div>
		}
		return (
	<div>
		{alert_info}
	  <div className="row justify-content-center mt-5">
  	  <div className="col-md-4 text-area-color rounded">
   
      	<p className="mt-2 mb-0"style={{height:'50px',width:'100%',fontSize:'30px',textAlign:'center',color:'#F0FFF0'}}>{this.state.calculatedText}</p>
    	<input type="text" className="w-100 form-row remove-bg-input" onChange={this.onChangeInputTextHandle} value={this.state.inputText} style={{height:'30px',fontSize:'16px',textAlign:'right',color:'#778899'}} placeholder="3+4" />
    <hr/>

    <div className="row row-color">
      <div className="col-md-3">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>+</button>
      </div>
      <div className="col-md-3">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>-</button>
      </div>
      <div className="col-md-3">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>*</button>
      </div>
      <div className="col-md-3">
        <button className="btn  btn-block calculator-btn" onClick={this.inputTextHandle}>/</button>
      </div>
    </div>

    <div className="row row-color">
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>7</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>8</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>9</button>
      </div>
    </div>

    <div className="row row-color">
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>4</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>5</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>6</button>
      </div>
    </div>

    <div className="row row-color">
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>1</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>2</button>
      </div>
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>3</button>
      </div>
    </div>

    <div className="row row-color">
      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.inputTextHandle}>0</button>
      </div>

      <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.evaluateText}>=</button>
      </div>

	  <div className="col-md-4">
        <button className="btn btn-block calculator-btn" onClick={this.clearTextHandle}>CLR</button>
      </div>

    </div>
  </div>
</div>
</div>
		);
	}
}

export default Calculator;