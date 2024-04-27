import React from 'react';
import style from './SignUpInput.module.css';

function SignUpInput(props) {
  // Function to format text based on the number of words
  const formatText = (text) => {
    const words = text.split(' '); // Split the text into words
    if (words.length > 1) {
      // Join the first word with the rest, putting the rest on a new line
      return words[0] + '\n' + words.slice(1).join(' ');
    }
    return text; // Return the original text if there's only one word
  };

  return (
    <div className={style.container1}>
        {/* Apply formatted text */}
        <p className={style.texte}>{formatText(props.text)}</p>
        <input type={props.type} className={style.input}
          value={props.value}
        />
    </div>
  );
}

export default SignUpInput;
