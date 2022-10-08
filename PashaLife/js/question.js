let questions = [
    {
        title: "what is that?",
        answers: ["me", "you", "we"],
        corrAnsw: 1
    }, {
        title: "What is the Insureance?",
        answers: ["Making money", "Spending money", "pass"],
        corrAnsw: 2
    },
    {
        title: "what is a Computer?",
        answers: ["phone", "car", "item"],
        corrAnsw: 0
    }
]
let titleOfQuestion = document.getElementById('titleOfQuestion');
let answers = document.getElementById('answers');
let currentIndex = 0;
let currentPointOfCurrentGame = 0;

showQuestion();



function showQuestion() {
    if (questions.length != 0 && currentIndex != questions.length) {
        let myQuestion = questions[currentIndex];
        titleOfQuestion.innerHTML = myQuestion.title;
        if (myQuestion.answers.length != 0) {
            answers.innerHTML = '';
            for (let i in myQuestion.answers) {

                let answerBtn = document.createElement('div');
                answerBtn.className = "button";
                answerBtn.innerHTML = `<input type="radio" class="answerOption" data-index="${i}" id="a${i}" name="check-substitution-2" />
              <label class="btn btn-default answerContent" for="a${i}">${myQuestion.answers[i]}</label>`;
                answers.append(answerBtn)

            }

        }
        let answerOptions = document.getElementsByClassName('answerOption');
        for (let i of answerOptions) {
            i.addEventListener('click', checkAnswer);

        }
        function checkAnswer() {

            //if the answer is true ..........................................
            if (this.getAttribute('data-index') == myQuestion.corrAnsw) {
                this.nextElementSibling.className = "green";
                blockOptions();
                calculatePoint(1);
                currentPointOfCurrentGame++;
                currentIndex++;
                setTimeout(showQuestion, 1000);
            }



            //if the answer is uncorrect ....................................
            else {
                this.nextElementSibling.style.background = "rgb(195, 5, 5)";
                blockOptions();
                currentIndex++;
                setTimeout(showQuestion, 1000);

            }
        }
        function blockOptions() {
            for (let j of answerOptions) {
                j.disabled = true

            }
        }
    }
    else if (currentIndex == questions.length) {
        titleOfQuestion.innerHTML = "Over!";
        answers.innerHTML = `<div><h4>Your Point is  ${currentPointOfCurrentGame}</h4>
        <a href="dashboard.html" class="backToDash"><i class="fa-solid fa-arrow-left-long"></i>&nbsp;Back</a></div>
        `;
    }



}

