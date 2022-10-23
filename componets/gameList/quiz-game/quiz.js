import './quiz.css';

export const getData = async (param) => {
  try {
    const data = await fetch(`http://localhost:3000/${param}`);
    const dataToJson = await data.json();
    return dataToJson;
  } catch (error) {
    return TemplateError(error);
  }
};

const TemplateError = (error) => `<div>${error}</div>`;

const printNextButton = (
  questionItem,
  questionContainer,
  divResultado
) => {
  const nextButton = document.createElement('button');
  nextButton.classList.add('next-button');
  nextButton.innerHTML = 'Next question';

  nextButton.addEventListener('click', () => {
    const nextQuestion = document.querySelector(
      `.question-${questionItem.id + 1}`
    );
    nextQuestion.classList.remove('hidden');
    questionContainer.classList.add('hidden');
  });
  divResultado.appendChild(nextButton);
};

const printResult = (failsCounter) => {
  alert(`Has fallado ${failsCounter} veces!`);
};

export const initQuiz = async () => {
  let failsCounter = 0;
  const app = document.getElementById('app');

  const quiz = document.createElement('div');
  quiz.classList.add('quiz-game-container');

  const dataQuestions = await getData('questions');

  const visibleCard = 1; //A esta variable le asigno el valor de la id de cada pregunta, para ir aumentando cuando clickes en 'siguiente' y pintar cada pregunta posteriormente

  dataQuestions.forEach((questionItem, questionIndex) => {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');
    questionContainer.classList.add(`question-${questionItem.id}`);

    if (questionIndex != 0) {
      questionContainer.classList.add('hidden');
    }

    const question = document.createElement('div');
    question.innerHTML = questionItem.question;
    questionContainer.appendChild(question);
    const divResultado = document.createElement('div');

    questionItem.answers.forEach((answer, index) => {
      const divInput = document.createElement('div');
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = questionItem.id;
      input.value = answer;
      input.id = `question-${questionItem.id}-answer-${index}`;
      const label = document.createElement('label');
      label.innerHTML = answer;
      label.setAttribute(
        'for',
        `question-${questionItem.id}-answer-${index}`
      );

      input.addEventListener('change', (event) => {
        if (event.target.value == questionItem.correctAnswer) {
          divResultado.innerHTML =
            '<div class="correct">Enhorabuena!! Has acertado</div>';

          if (questionIndex < dataQuestions.length - 1) {
            printNextButton(
              questionItem,
              questionContainer,
              divResultado
            );
          } else {
            printResult(failsCounter);
          }
        } else {
          divResultado.innerHTML =
            '<div class="fail">Has fallado! Inténtalo de nuevo</div>';
          failsCounter++;
        }
        questionContainer.appendChild(divResultado);
      });

      divInput.appendChild(input);
      divInput.appendChild(label);
      questionContainer.appendChild(divInput);
    });

    quiz.appendChild(questionContainer);
  });

  app.appendChild(quiz);
};
