const quizData = [
    {
      question: 'jak Basia miala 12 lat, amelia byla od niej 2 razy mlodsza, Basia ma teraz 42 lata, ile ma Amelia?',
      options: ['21', '36', 'to zalezy czy amelia zyje'],
      answer: '36',
    },
    {
      question: 'oblicz delte: f(x) = -1/8(2x - 2) ^ 2 + 2 / 3',
      options: ['12', '10', '11', '13'],
      answer: '12',
    },
    {
      question: 'co jest wieksze, 12*111 czy -12*12^100',
      options: ['12*111 = -12*12^100', '12*111 < -12*12^100', '12*111 > -12*12^100'],
      answer: '12*111 > -12*12^100',
    },
    {
      question: 'Uzywajac tylko dodawania, dodaj osiem osemek, aby otrzymac liczbe 1000?',
      options: ['88 + 88 + 888 + 8', '888 + 88 + 8 + 88', '88 + 8 + 8 + 88 + 88', '888 + 88 + 8 + 8 + 8'],
      answer: '888 + 88 + 8 + 8 + 8',
    },
    {
      question: 'co jest ciezsze 1kg pior czy 1 kg kamieni',
      options: [
        'waza tyle samo',
        'piora sa ciezsze',
        'waza tyle samo',
        'kamienie ciezsze',
      ],
      answer: 'waza tyle samo',
    },
    {
      question: 'CHEMIA : jaki jest symbol chemiczny zlota',
      options: ['Au', 'Ag', 'Cu', 'Fe'],
      answer: 'Au',
    },
    {
      question: 'WIEDZA OGOLNA : kto namalowal mona lise',
      options: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
    },
    {
      question: 'ktora planeta jest nazywana czerwona planeta?',
      options: ['Mars', 'Wenus', 'Merkury', 'ziemia'],
      answer: 'Mars',
    },
    {
      question: 'ktory z tych dowodcow byl najnizszy',
      options: [
        'Napoleon Bonaparte',
        'Jozef Stalin',
        'Adolf H....',
      ],
      answer: 'Napoleon Bonaparte',
    },
    {
      question: 'ktory z tych materialow jest najostrzejszy',
      options: ['zloto', 'obsydian', 'stal', 'diament'],
      answer: 'diament',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `BRAWO, zdobyles ${score} na ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>pytanie:</strong> ${incorrectAnswers[i].question}<br>
          <strong>twoja odp:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>poprawna odp:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>zdobyles ${score} na ${quizData.length}!</p>
      <p>zle odpowiedzi:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();