const quizQuestions = [
    {
      question: 'Who was the first USA president?',
      answers: [
        { name: 'Washington', isAnswer: true },
        { name: 'Truman', isAnswer: false },
        { name: 'Willson', isAnswer: false },
        { name: 'Rusvelt', isAnswer: false },
      ],
    },
    {
      question: 'When did Constantinople fall?',
      answers: [
        { name: '1253', isAnswer: false },
        { name: '1353', isAnswer: false },
        { name: '1453', isAnswer: true },
        { name: '1553', isAnswer: false },
      ],
    },
    {
      question: 'In which year did the France revolution begin?',
      answers: [
        { name: '1889', isAnswer: false },
        { name: '1789', isAnswer: true },
        { name: '1798', isAnswer: false },
        { name: '1898', isAnswer: false },
      ],
    },
    {
      question: 'Who said:Veni,Vedi,Vici?',
      answers: [
        { name: 'Neron', isAnswer: false },
        { name: 'Julius', isAnswer: true },
        { name: 'Justiniane', isAnswer: false },
        { name: 'Antonius', isAnswer: false },
      ],
    },
    {
      question: 'Who killed Austria-Hungary prince Franz Ferdinand?',
      answers: [
        { name: 'Stalin', isAnswer: false },
        { name: 'Milos obilic', isAnswer: false },
        { name: 'Paulius', isAnswer: false },
        { name: 'Gavrilo princip', isAnswer: true },
      ],
    },
    {
      question: 'In which year did the battle of Didgori take place?',
      answers: [
        { name: '1221', isAnswer: false },
        { name: '1122', isAnswer: false },
        { name: '1121', isAnswer: true },
        { name: '1222', isAnswer: false },
      ],
    },
    {
      question: 'What years did the Korean war take place?',
      answers: [
        { name: '1945-48', isAnswer: false },
        { name: '1950-53', isAnswer: true },
        { name: '1941-44', isAnswer: false },
        { name: '1989-91', isAnswer: false },
      ],
    },
    {
      question: 'In which year did the II World War begin?',
      answers: [
        { name: '1939', isAnswer: true },
        { name: '1941', isAnswer: false },
        { name: '1914', isAnswer: false },
        { name: '1991', isAnswer: false },
      ],
    },
    {
      question: 'In which year did the first world war begin?',
      answers: [
        { name: '1914', isAnswer: true },
        { name: '1918', isAnswer: false },
        { name: '1941', isAnswer: false },
        { name: '1916', isAnswer: false },
      ],
    },
    {
      question: 'What is the probability tha you will answer this question correctly?',
      answers: [
        { name: '25%', isAnswer: false },
        { name: '50%', isAnswer: true },
        { name: '25%', isAnswer: false },
        { name: '75%', isAnswer: false },
      ],
    },
  ];
  
  const state = {
    question: 0,
    isTrue: 'n/a',
    canSubmit: true,
    answer: '',
    answerIndex: -1,
    correctAnswers: 0,
  };
  
  const questionDOM = document.querySelector('.question');
  const answerContainers = Array.from(
    document.querySelectorAll('.answer-container')
  );
  const answersContainer = document.querySelector('.answers-container');
  const submitBtn = document.querySelector('.submit');
  const nextBtn = document.querySelector('.next');
  const cancelBtn = document.querySelector('.cancel');
  const start = document.querySelector('.start');
  const startBtn = document.querySelector('.start-btn');
  const tryAgain = document.querySelector('.try-again');
  const tryAgainBtn = document.querySelector('.try-again-btn');
  const modal = document.querySelector('.modal');
  const score = document.querySelector('.score');
  
  const resetBc = () => {
    answerContainers.map((container) => {
      container.classList.remove('bc-blue');
      container.classList.remove('bc-red');
      container.classList.remove('bc-green');
      container.firstElementChild.checked = false;
    });
  };
  
  const loadQuestion = (i) => {
    submitBtn.classList.remove('display-none');
    nextBtn.classList.add('display-none');
    answersContainer.classList.remove('not-clickable');
  
    resetBc();
  
    const question = quizQuestions[i];
  
    questionDOM.textContent = question.question;
  
    Array.from(answerContainers).map((container, index) => {
      container.lastElementChild.textContent = question.answers[index].name;
      container.addEventListener('click', (e) => {
        resetBc();
        container.classList.add('bc-blue');
        container.firstElementChild.checked = true;
        state.answer = container.lastElementChild.textContent;
        state.answerIndex = index;
      });
    });
  };
  
  const submit = () => {
    const question = quizQuestions[state.question];
  
    if (!state.answer) {
      alert('answer needed');
      return;
    }
  
    question.answers.map((answer, index) => {
      if (answer.isAnswer === true) {
        answerContainers[index].classList.add('bc-green');
        state.correctAnswers++;
        if (index !== state.answerIndex) {
          answerContainers[state.answerIndex].classList.add('bc-red');
        }
      }
    });
  
    state.question++;
  
    answersContainer.classList.add('not-clickable');
    submitBtn.classList.add('display-none');
    nextBtn.classList.remove('display-none');
  };
  
  submitBtn.addEventListener('click', submit);
  nextBtn.addEventListener('click', () => {
    if (state.question === quizQuestions.length) {
      score.textContent = state.correctAnswers;
      modal.classList.remove('display-none');
      tryAgain.classList.remove('display-none');
      return;
    }
    loadQuestion(state.question);
  });
  
  startBtn.addEventListener('click', () => {
    start.classList.add('display-none');
    modal.classList.add('display-none');
    loadQuestion(state.question);
  });
  
  tryAgainBtn.addEventListener('click', () => {
    state.question = 0;
    tryAgain.classList.add('display-none');
    modal.classList.add('display-none');
    loadQuestion(state.question);
  });
  
  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('display-none');
    start.classList.remove('display-none');
    state.question = 0;
  });