import React from 'react';
import { Link } from 'react-router-dom';
import './appIndex.css';
/**
 * app home
 */
 class AppIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isShow: false};
  }

  toInfo = () =>{
    this.context.router.history.push(`/info`);
  }

  toShow = () =>{
    this.setState({
      isShow:true
    });
  }

  toHide = () =>{
    this.setState({
      isShow:false
    });
  }

  render(){
    return (
    <div className="box">
      <div className='header'>
        <h1>Welcome to Wordle!</h1>
      </div>
      <div className='line'>
        <button className='btn btn-primary' id='start-game' onClick={this.toShow}>Start Game</button>
      </div>
      <div className='line'>
        <Link className='btn btn-primary' to="/info" style={{ padding: 5 }}>Game Info</Link>
      </div>
      <div className='model' style={{display:this.state.isShow ? 'block' : 'none'}}>
        <div className='model-shade'></div>
        <div className='model-dialog'>
          <h4>Choose Game Difficulty</h4>
          <div className='model-box'>
            <div className='model-line'>
              <Link className='btn btn-primary level' to="/game/1" style={{ padding: 5 }}>Easy</Link>
            </div>
            <div className='model-line'>
              <Link className='btn btn-primary level' to="/game/2" style={{ padding: 5 }}>Medium</Link>
            </div>
            <div className='model-line'>
              <Link className='btn btn-primary level' to="/game/3" style={{ padding: 5 }}>Hard</Link>
            </div>
            <div className='model-line'>
              <button className='btn btn-primary level' onClick={this.toHide}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
 }

 export default AppIndex;