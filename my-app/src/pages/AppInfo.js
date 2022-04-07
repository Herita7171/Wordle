import React from 'react';
import { Link } from 'react-router-dom';
import './appInfo.css';
/**
 * app info
 */
 class AppInfo extends React.Component {
  render(){
    return (
      <div className='box'>
        <div className='nav'>
          <div className='back'>
            <Link to="/">Back</Link>
          </div>
        </div>
        <h2 className='page-header'>Game Info</h2>
        <div className='line'>
          <p>In Wordle, the game secretly chooses a random word that the you will try to guess within a certain number of attempts.  
            Both the length of the word and the number of attempts are based on the difficulty you select. After selecting a difficulty level, 
            you will have a prompt to input a word that is the length defined by the difficulty level. </p>
        </div>
        <div className='line'>
          <p>If you input the correct word, 
            you will see a congratulations at the top of the screen.  
            If you input a wrong word, you will be given some clues based on the location of 
            the letters in the word. For instance, say the correct word is
             “faces” but the you submit “early”, then you see “<span className='color-yellow'>E</span><span className='color-green'>A</span><span className='color-brown'>RLY</span>”.  In this situation, the one E is 
             in the word but not in the correct spot, as indicated by the yellow; the A is in the word AND in the 
             correct spot, so this is marked by the green.</p>
        </div>
      </div>
    );
  }
 }

 export default AppInfo;