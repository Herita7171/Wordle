const INPUT_CHANGE = 'react-redux-ducks/game/INPUT_CHANGE';
const INPUT_SUBMIT = 'react-redux-ducks/game/INPUT_SUBMIT';
const RELOAD_WORD = 'react-redux-ducks/game/RELOAD_WORD';

//game word data
const easyWord = ['faith','clown','lunch','space','earth','agree','begin','daily','glass','habit','image','jelly','labor','mayor'
,'naive','ocean','panda','quick','ranch','tasty'];

const nomalWord = ['abroad','breath','coffee','debate','empire','famous','gender','health','island','league','manner','native','origin','planet'
,'reason','scheme','tennis','unique','vision','window'];

const hardWord = ['believe','capable','battery','cherish','popular','perfect','country','actress','decrypt','empower','factory','genuine','glutens','harvest'
,'honesty','include','ladybug','lenient','monitor','network'];

function randomArray(arr, count) {
  let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

function randomIndex(arr) {
  return Math.round(Math.random() * arr.length * 10) % arr.length;
}

export function inputSubmit(value) {
  return {
    type: INPUT_SUBMIT,
    value
  };
}

export function inputChange(value) {
  return {
    type: INPUT_CHANGE,
    value
  }
}

export function reloadWord(value) {
  return {
    type: RELOAD_WORD,
    value
  }
}

const initialState = {
  //input word
  inputWord: '',
  inputList: [],
  //true word
  gameWord:'',
  wordList:[],
  //check
  result:false,
  promptList:[],
  gameType:0,
  chance:0,
  hasChance:false,
  isOver:false,
  promptWordList:[]
};

export default function reducer(state = initialState, action) {
  
  switch (action.type){
  case INPUT_SUBMIT:
    //convert text to
    let game_hasChance = state.hasChance;
    let game_chance = state.chance;
    let game_promptWordList = state.promptWordList;
    let arr = state.inputWord.split('');
    let wordLength = arr.length;
    let gameWordLength = state.wordList.length;
    let list = [];
    let result = true;
    for (let i = 0; i < state.wordList.length; i++) {
      let word_result = false;
      if (arr.length > i) {
        list.push({
          word:arr[i],
          done:arr[i] === state.wordList[i] ? true : false,
          none:false
        });
        word_result = arr[i] === state.wordList[i] ? true : false;
      } else {
        list.push({
          word:'',
          done:false,
          none:true
        });
        word_result = false;
      }
      if (result) {
        if (!word_result) {
          result = word_result;
        }
      }
    }
    if (wordLength === gameWordLength) {
      if (game_hasChance) {
        if (game_chance > 0) {
          game_chance--;
        } else {
          result = false;
        }
      }
      
      if (!result && state.gameType !== 1) {
        let index = randomIndex(state.wordList);
        game_promptWordList[index].word = state.wordList[index];
      }
    }
    return Object.assign(
      {},
      state,
      {
        inputList: list,
        inputWord: state.inputWord,
        gameWord: state.gameWord,
        wordList: state.wordList,
        result: result,
        promptList:state.promptList,
        gameType:state.gameType,
        chance:game_chance,
        hasChance:state.hasChance,
        isOver:true,
        promptWordList:game_promptWordList
      }
    );
  case RELOAD_WORD:
    //get a new word
    let word = "";
    let hasChance = false;
    let chance = 0;
    let promptList = [];
    let promptWordList = [];
    if (action.value === 1) {
      promptList = randomArray(easyWord,7);
      word = randomArray(promptList,1)[0];
    } else if (action.value === 2) {
      word = randomArray(nomalWord,1)[0];
      chance = 6;
      hasChance = true;
    } else {
      word = randomArray(hardWord,1)[0];
      chance = 5;
      hasChance = true;
    }
    let wordArr = word.split("");
    wordArr.forEach(()=>{
      promptWordList.push({
        word:"-"
      });
    });
    return Object.assign(
      {},
      state,
      {
        inputList: [],
        inputWord:'',
        gameWord: word,
        wordList: wordArr,
        result: false,
        promptList:promptList,
        gameType:action.value,
        chance:chance,
        hasChance:hasChance,
        isOver:false,
        promptWordList:promptWordList
      }
    );
  case INPUT_CHANGE:
    return Object.assign(
      {},
      state,
      {
        inputList: state.inputList,
        inputWord:action.value,
        gameWord: state.gameWord,
        wordList: state.wordList,
        result: false,
        promptList:state.promptList,
        gameType:state.gameType,
        chance:state.chance,
        hasChance:state.hasChance,
        isOver:false,
        promptWordList:state.promptWordList
      }
    );
  default:
    return state;
  }
}