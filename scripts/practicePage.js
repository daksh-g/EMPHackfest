function isLetter(char) {
  return char >= 'a' && char <= 'z';
}

export default async function practicePage(filePath) {
  const file = await fetch(filePath);
  const fileText = await file.text();
  const answers = fileText.toLowerCase().split('\n').map(line => line.trim());
  console.log(answers)
  
  const asl = document.querySelector('.asl');
  const input = document.querySelector('input');
  const result = document.querySelector('.result');
  let answer = '';
  
  function generateNewAnswer() {
    let newAnswer = answers[Math.floor(Math.random() * answers.length)];
    while(newAnswer == answer)
      newAnswer = answers[Math.floor(Math.random() * answers.length)];
    
    answer = newAnswer;
    
    asl.textContent = answer;
    input.maxLength = answer.length;
    input.readOnly = false;
    input.value = '';
    result.textContent = '';
  }
  
  generateNewAnswer();
  
  input.addEventListener('input', e => {
    const guess = e.target.value.toLowerCase();
    let aslText = "";
    let numCorrect = 0;
    let lettersCorrect = 0;
  
    for (let i = 0; i < answer.length; i++)
      if(i >= guess.length) {
        aslText += answer[i];
      } else if(answer[i] === guess[i]) {
        aslText += `<span style="color: green;">${answer[i]}</span>`;
        numCorrect++;
        if(isLetter(answer[i])) lettersCorrect++;
      } else {
        aslText += `<span style="color: red;">${answer[i]}</span>`;
      }
  
    asl.innerHTML = aslText;
  
    if(numCorrect == answer.length) {
      result.textContent = 'Correct!';
      result.style.color = 'green';
      input.readOnly = true;
      setTimeout(generateNewAnswer, 1000);
    } else if(lettersCorrect > 0) {
      result.textContent = `${lettersCorrect} letter${lettersCorrect == 1 ? '' : 's'} correct`;
      result.style.color = 'yellow';
    } else if(guess.length > 0) {
      result.textContent = answer.length == 1 ? 'Incorrect' : 'No letters correct';
      result.style.color = 'red';
    } else {
      result.textContent = '';
    }
  });
};
