const startButton = document.getElementById(('start-btn'))
const nextButton = document.getElementById(('next-btn'))
const showButton = document.getElementById(('show-data-btn'))
const endButton = document.getElementById(('end-btn'))
const switchButton = document.getElementById('switch-btn')
const arrows = document.getElementById('arrows')
var gridwrapper = document.getElementsByClassName('gridwrapper')


const questionContainerElement = document.getElementById('question-container')
const infoContainerElement = document.getElementById('info-container')
const ageandgenderContainerElement = document.getElementById('age-and-gender')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultElement = document.getElementById('totalresult')
const submitButton = document.getElementById('submit-btn')

var test3 = infoContainerElement.innerHTML

let QuestionIndex
let isPartTwo = false;
let isPartThree = false;
let endquiz = false;
let switched = false;
var classItems = new Array;
var letters = ['A','B','C','D','E']
let results = {
  "Onempcorrectanswers": 0,
  "Onetfcorrectanswers": 0,
  "Onecorrectanswers": 0,
  "Twompcorrectanswers": 0,
  "Twotfcorrectanswers": 0,
  "Twocorrectanswers": 0,
  "Threempcorrectanswers": 0,
  "Threetfcorrectanswers": 0,
  "Threecorrectanswers": 0
};
startButton.addEventListener('click', start)
showButton.addEventListener('click', showData)
nextButton.addEventListener('click', () => {
  QuestionIndex++
  nextQuestion()
})
endButton.addEventListener('click', endQuiz)
switchButton.addEventListener('click', switchData)

function showInfo() {
  infoContainerElement.innerText = info
}

function showInfo2() {
  clearall()
  infoContainerElement.classList.remove('hide')
  infoContainerElement.innerText = info2
}

function showInfo3() {
  clearall()
  infoContainerElement.classList.remove('hide')
  infoContainerElement.innerText = info3
}

function showData() {
  if (isPartTwo) {
    showButton.classList.add('hide')
    infoContainerElement.innerText = ' '
    Plotly.newPlot(infoContainerElement, data2)
    startButton.classList.remove('hide')
    switchButton.classList.remove('hide')
  }
  else if (isPartThree) {
    showButton.classList.add('hide')
    infoContainerElement.innerHTML = test3
    const resetbtn = document.getElementById('myown-btn')
    resetbtn.addEventListener('click', resetgrid)
    arrows.classList.remove('hide')
    test3prep()
    //Code to activate my ting goes here
    startButton.classList.remove('hide')
  } else {
    showButton.classList.add('hide')
    ageandgenderContainerElement.classList.add('hide')
    infoContainerElement.innerText = data
    startButton.classList.remove('hide')
  }
}

function start() {

    if (isPartThree) {
      arrows.classList.add('hide')
    }
    startButton.classList.add('hide')
    switchButton.classList.add('hide')
    infoContainerElement.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    QuestionIndex = 0
    nextQuestion()
}

function nextQuestion() {
  clear()
  if (isPartTwo) {
    showQuestion(questions2[QuestionIndex])
  }
  else if (isPartThree) {
    showQuestion(questions3[QuestionIndex])
  } else {
    showQuestion(questions1[QuestionIndex])
  }
}

function showQuestion(question) { //shows the next question in array
  questionElement.innerText = question.question //display the question
  question.answers.forEach((answer) => { // for each question in our array
    const button = document.createElement('button') // cycle through each question array and append the buttons
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct // adding a data attribute
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function selectAnswer(x) {
  const selectedButton = x.target
  const correct = selectedButton.dataset.correct


  if (correct) {
    if (isPartThree == true && isPartTwo == false) {
      if (QuestionIndex < 4) {
        results.Threempcorrectanswers++;
      }
      else {
        results.Threetfcorrectanswers++;
      }
    }

    if (isPartTwo == true && isPartThree == false) {
      if (QuestionIndex < 4) {
        results.Twompcorrectanswers++;
      }
      else {
        results.Twotfcorrectanswers++;
      }
    }
    if (isPartTwo == false && isPartThree == false) {
      if (QuestionIndex < 4) {
        results.Onempcorrectanswers++;
      }
      else {
        results.Onetfcorrectanswers++;
      }
    }
    selectedButton.classList.add('correct')
  }
  else {
    selectedButton.classList.add('wrong')
  }

  if (questions1.length > QuestionIndex + 1) {    //when we get to the end of the questions 1
    nextButton.classList.remove('hide')
  }
  else if (questions2.length > QuestionIndex + 1) {
    nextButton.classList.remove('hide')
  }
  else if (questions3.length > QuestionIndex + 1) {
    nextButton.classList.remove('hide')
  }
  else {
    if (isPartThree) {
      endquiz = true;
      infoContainerElement.innerText = ' '
      endButton.classList.remove('hide')
    }
    else if (isPartTwo) {
      isPartTwo = false;
      isPartThree = true;
      infoContainerElement.innerText = ' '
      endButton.classList.remove('hide')
    } else {
      isPartTwo = true;
      infoContainerElement.innerText = ' '
      endButton.classList.remove('hide')
    }
  }
}

function endQuiz() {
  if (endquiz) {
    clearall()
    infoContainerElement.classList.remove('hide')
    infoContainerElement.innerText = info4
    results.Onecorrectanswers = results.Onempcorrectanswers + results.Onetfcorrectanswers
    results.Twocorrectanswers = results.Twompcorrectanswers + results.Twotfcorrectanswers
    results.Threecorrectanswers = results.Threempcorrectanswers + results.Threetfcorrectanswers
    resultElement.value = results.Onempcorrectanswers + "," + results.Onetfcorrectanswers + "," + results.Onecorrectanswers + "," + results.Twompcorrectanswers + "," + results.Twotfcorrectanswers + "," + results.Twocorrectanswers + "," + results.Threempcorrectanswers + "," + results.Threetfcorrectanswers + "," + results.Threecorrectanswers
    endButton.classList.add('hide')
    ageandgenderContainerElement.classList.remove('hide')
    submitButton.classList.remove('hide')
  }
  else if (isPartTwo) {
    showInfo2()
    showButton.classList.remove('hide')
    endButton.classList.add('hide')
  } else {
    showInfo3()
    showButton.classList.remove('hide')
    endButton.classList.add('hide')
  }
}

function switchData() {
  if (switched) {
    Plotly.newPlot(infoContainerElement, data2)
    switched = false;
  }

  else {
    Plotly.newPlot(infoContainerElement, data3, layout)
    switched = true;
  }
}

function clearall() {
  questionContainerElement.classList.add('hide')
}

function clear() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)
  }
}

const info = "Welcome to the Interactive Data Visualisation Experiment, the test consists of three parts. In the first part you will be introducted to written data and you must attempt to recall as much key information and then you will be assessed on your memory recall"
const info2 = "Well done on completing the first part of the experiment. In this section you will have an Interactive Visualisation with which you can interact to help you as visual aid for recalling informatin. The style of questions will be asked in the same way"
const info3 = "Welcome to the third part of the experiment. In this section you will have an Interactive Visualisation similar to the previous test. The style of the questions will be asked in the same way"
const info4 = "Thank you for participating in this experiment"
const data = "Alan is CEO, Will is Vice President, and he has two Associates Ben and Vanessa. \nSmith and Abel are Senior Partners. \nMichael is General Manager, and Jasmine is his Junior Manager. \nVince is our IT Specialist"
data2 = [{
      type: "treemap",
      labels: ["Nicole - CEO", "Henry - Name Partner", "Ashley - Name Partner", "Harry - Senior Partner", "Ryan - Junior Partner", "Bruce- Junior Partner", "Nicole - Associate", "Brenda - Associate", "Emily - Paralegal"],
      parents: ["", "Nicole - CEO", "Nicole - CEO", "Henry - Name Partner", "Ashley - Name Partner", "Ashley - Name Partner", "Henry - Name Partner", "Bruce- Junior Partner", "Ryan - Junior Partner"]
}]
data3 = [{

  type: "sunburst",

  labels: ["Nicole - CEO", "Henry - Name Partner", "Ashley - Name Partner", "Harry - Senior Partner", "Ryan - Junior Partner", "Bruce- Junior Partner", "Nicole - Associate", "Brenda - Associate", "Emily - Paralegal"],

  parents: ["", "Nicole - CEO", "Nicole - CEO", "Henry - Name Partner", "Ashley - Name Partner", "Ashley - Name Partner", "Henry - Name Partner", "Bruce- Junior Partner", "Ryan - Junior Partner"],

  values:  [20, 15, 17, 10, 10, 14, 13, 12, 11],

  outsidetextfont: {size: 20, color: "#377eb8"},

  leaf: {opacity: 0.4},

  marker: {line: {width: 2}},

}];
var layout = {
   margin: {l: 0, r: 50, b: 0, t: 0},
   width: 1550,
   height: 500
}
            //test3//

function test3prep() {
  for (var y = 0; y < letters.length; y++) {
    for (var x = 0; x < 8; x++) {
       var temp = document.getElementsByClassName(letters[y] + (x + 1))
       if (temp.length !== 0) {
         classItems.push(temp)
         for (i = 0; i < temp.length; i++) {
           myarg = letters[y] + (x + 1)
           temp[i].addEventListener('click',newParent)
         }
       }
    }
  }
}

function newParent() {
  var elements = []
  myId = this.id //main location of the selection
  myIdRow = myId.replace(/[0-9]/g, '')
  myParent = this.classList[2] //parent of the selection
  // Reference All Classes with that name
  //classItems[x][0].id = our grid id
    //classItems[x][0].classList = our class array
  //classItemx[x] = array with all tags that have that class
  elements.push(myId)
  for (x = 1; x < classItems.length; x++) {
    parentId = classItems[x][0].classList[2]
    parentId = parentId.substring(1)
    if (parentId == myId) {
      elements.push(classItems[x][0].id)
    }
    for (i = 0; i < elements.length; i++) {
      if (parentId == elements[i] && !elements.includes(classItems[x][0].id)) {
          elements.push(classItems[x][0].id)
        }
      }
    }
  for (a = 0; a < classItems.length; a++) {
    if (!elements.includes(classItems[a][0].id)) {
      for (b = 0; b < classItems[a].length; b++) {
        classItems[a][b].classList.add('hideitem')
      }
    }
  }
}

function resetgrid() {
  for (a = 0; a < classItems.length; a++) {
    for (b = 0; b < classItems[a].length; b++) {
        classItems[a][b].classList.remove('hideitem')
    }
  }
}

            //test3//

const questions1 = [  //array of objects
  {
    question: 'How many associates does the firm have?',
    answers: [
      { text: 'One', correct: false},
      { text: 'Two', correct: true},
      { text: 'Three', correct: false},
      { text: 'Four', correct: false}
    ]
  },
  {
    question: 'Who is the IT Specialist?',
    answers: [
      { text: 'Olivia', correct: false},
      { text: 'Tom', correct: false},
      { text: 'Darren', correct: false},
      { text: 'Vince', correct: true}
    ]
  },
  {
    question: 'How many Partners are there?',
    answers: [
      { text: 'One', correct: false},
      { text: 'Two', correct: true},
      { text: 'Three', correct: false},
      { text: 'Four', correct: false}
    ]
  },
  {
    question: 'Who is the Junior Manager?',
    answers: [
      { text: 'Jasmine', correct: true},
      { text: 'Julia', correct: false},
      { text: 'Jessica', correct: false},
      { text: 'Kathy', correct: false}
    ]
  },
  {
    question: 'The two Associates are called Ben and Vanessa',
    answers: [
      { text: 'True', correct: true},
      { text: 'False', correct: false}
    ]
  },
  {
    question: 'There is only one Manager',
    answers: [
      { text: 'True', correct: false},
      { text: 'False', correct: true}
    ]
  },
  {
    question: 'The Vice President is called Will',
    answers: [
      { text: 'True', correct: true},
      { text: 'False', correct: false}
    ]
  }
]

const questions2 = [
  {
    question: 'What is the CEO called?',
    answers: [
      { text: 'Natasha', correct: false},
      { text: 'Nicole', correct: true},
      { text: 'Jennifer', correct: false},
      { text: 'Sarah', correct: false}
    ]
  },
  {
    question: 'How many Junior Partners does the firm have?',
    answers: [
      { text: 'One', correct: false},
      { text: 'Two', correct: true},
      { text: 'Three', correct: false},
      { text: 'Four', correct: false}
    ]
  },
  {
    question: 'What are the two Associates in the firm called?',
    answers: [
      { text: 'Anne and Rebecca', correct: false},
      { text: 'Laura and Rose', correct: false},
      { text: 'Brenda and Nicole', correct: true},
      { text: 'Gloria and Isabel', correct: false},
    ]
  },
  {
    question: 'What is the paralegal called?',
    answers: [
      { text: 'Dianne', correct: false},
      { text: 'Elsa', correct: false},
      { text: 'Katie', correct: false},
      { text: 'Emily', correct: true},
    ]
  },
  {
    question: 'The two Name Partners are called Ashley and Henry',
    answers: [
      { text: 'True', correct: true},
      { text: 'False', correct: false}
    ]
  },
  {
    question: 'There are two Junior Partners',
    answers: [
      { text: 'True', correct: true},
      { text: 'False', correct: false}
    ]
  },
  {
    question: 'The Associate under Henry is called Brenda',
    answers: [
      { text: 'True', correct: false},
      { text: 'False', correct: true}
    ]
  }
]

const questions3 = [
  {
    question: 'Who is the General Manager?',
    answers: [
      { text: 'Jeff', correct: false},
      { text: 'Greg', correct: false},
      { text: 'Vince', correct: false},
      { text: 'Gary', correct: true}
    ]
  },
  {
    question: 'Who is the IT Specialist?',
    answers: [
      { text: 'Alex', correct: false},
      { text: 'Ralph', correct: false},
      { text: 'Bill', correct: true},
      { text: 'Wesley', correct: false}
    ]
  },
  {
    question: 'Who is the Junior Manager?',
    answers: [
      { text: 'Lewis', correct: true},
      { text: 'Phillip', correct: false},
      { text: 'Jason', correct: false},
      { text: 'Sean', correct: false}
    ]
  },
  {
    question: 'Who is the CEO?',
    answers: [
      { text: 'Joseph', correct: true},
      { text: 'Brian', correct: false},
      { text: 'Victor', correct: false},
      { text: 'Jim', correct: false}
    ]
  },
  {
    question: 'The Team Leaders are called Melissa and Alex',
    answers: [
      { text: 'True', correct: true},
      { text: 'False', correct: false}
    ]
  },
  {
    question: 'There are two managers',
    answers: [
      { text: 'True', correct: false},
      { text: 'False', correct: true}
    ]
  },
  {
    question: 'The Senior Partner is called Grace',
    answers: [
      { text: 'True', correct: false},
      { text: 'False', correct: true}
    ]
  }
]
