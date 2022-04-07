import React from 'react';
import './appGame.css';
import { Link } from 'react-router-dom';

function Chance(model) {
  if (model.model.hasChance) {
    return  <div className='line' id='remain'>
                <span className='chance'>Remaining Chances:</span>
                <span className='chance'>{model.model.chance}</span>
            </div>;
  } else {
        return;
    }
}

function ShowPrompt(model) {
  let level = "";
  if (model.model.gameType === 1) {
    level = "Easy";
  } else if (model.model.gameType === 2) {
    level = "Medium";
  } else {
    level = "Hard";
  }
  if (model.model.gameType === 1) {
    const promptList = model.model.promptList;
    const listItems = promptList.map((item,index) => <span onClick={() => model.itemClick(index,model.that)} key={index}>{item}</span>);
    return <div className='line'>
                <div className='example'>
                    <div className='chance'>Level: {level}</div>
                    <div className='word-length'>
                        <span className='chance'>Word Length:</span>
                        <span className='chance'>{model.model.wordList.length}</span>
                    </div>
                    <div className='list'>
                        {listItems}
                    </div>
                </div>
            </div>;
  } else {
        return <div className='line'>
                    <div className='example'>
                        <div className='chance'>Level: {level}</div>
                        <div className='word-length'>
                            <span className='chance'>Word Length:</span>
                            <span className='chance'>{model.model.wordList.length}</span>
                        </div>
                    </div>
                </div>;
    }
}

function ShowResult(model) {
  if (model.model.isOver) {
    if (model.model.result) {
      return <div className='line'>
                <p className='answer-success'>Congratulations! Would you like to try again?</p>
            </div>;
    } else {
        var word = model.model.inputWord.split('');
        if (word.length === model.model.wordList.length) {
            if (model.model.chance === 0 && model.model.type !== 1) {
            return <div className='line'>
                        <p className='answer-error'>Sorry, the word is {model.model.gameWord}</p>
                    </div>;
            } else {
                return <div className='line'>
                            <p className='answer-error'>Sorry, it's not the word. Try another one.</p>
                        </div>;
              }
        } else if (word.length < model.model.wordList.length) {
            return <div className='line'>
                        <p className='answer-error'>Oops, the input is too short</p>
                </div>;
          } else {
            return <div className='line'>
                        <p className='answer-error'>Oops, the input is too long</p>
                </div>;
          }
      }
  } else {
        return;
    }
}

function SelectWord(item) {
  item = item.item;
  if (item.none) {
    return <span className='none'>-</span>;
  } else {
    if (item.done) {
      return <span className='done'>{item.word}</span>;
    } else {
      return <span className='error'>{item.word}</span>;
    }
  }
}

function ShowWordResult(model) {
  if(model.model.isOver){
    const inputList = model.model.inputList;
    const listItems = inputList.map((item,index) => <SelectWord item={item} key={index} />);
    return <div className='line'>
                <div className='words'>
                {listItems}
                </div>
           </div>;
  } else {
    return;
  }
}
/**
 * app game
 */
 class AppGame extends React.Component {
    constructor(props) {
        super(props);
        var href = window.location.href;
        var type = href.substring(href.lastIndexOf("/")+1);
        props.reloadWord(parseInt(type));
    }
    reloadWord = () => {
        this.props.reloadWord(this.props.GameModel.gameType);
    };
    onInputChange = (event) => {
        this.props.inputChange(event.target.value);
    };
    inputSubmit = () => {
        if (this.props.GameModel.hasChance) {
            if (this.props.GameModel.chance > 0) {
                this.props.inputSubmit();
            }
        } else {
            this.props.inputSubmit();
        }
    };
    itemClick = function(index,that){
        console.log(index);
        //change input value
        that.props.inputChange(that.props.GameModel.promptList[index]);
    };
    render(){
        //click
        return (
        <div className="box">
            <div className='header'>
                <h1>Wordle</h1>
            </div>
            <Chance model={this.props.GameModel} />
            <ShowPrompt model={this.props.GameModel} itemClick={this.itemClick} that={this} />
            <div className='line'>
                <input value={this.props.GameModel.inputWord} onChange={this.onInputChange} className='form-control' type='text' placeholder='Please Enter Word' />
            </div>
            <div className='line'>
                <button className='btn btn-primary event' onClick={this.inputSubmit}>Submit</button>
            </div>
            <ShowWordResult model={this.props.GameModel} />
            <ShowResult model={this.props.GameModel} />
            <div className='line'>
                <button className='btn btn-primary event' onClick={this.reloadWord}>Reset and Play Again</button>
            </div>
            <div className='line'>
                <Link className='btn btn-link back' to="/">Back</Link>
            </div>
        </div>);
    }
 }

 export default AppGame;