let questions = []
let titleOfQuestion = document.getElementById('titleOfQuestion');
let answers = document.getElementById('answers');
let currentIndex = 0;
let currentPointOfCurrentGame = 0;
getAllQuestions()
function getAllQuestions() {
    const login = "http://172.16.68.220:8099/question/getAllQuestion";
    fetch(login, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + getStorage("User"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            for (let i of data.object) {
                let myObj = {
                    title: i.question,
                    answers: [...i.answers],
                    corrAnsw: i.rightAnswerIndex
                }
                questions.push(myObj)
                console.log(i)
            }
            if (data.error) {
                alert("Error..."); /*displays error message*/
            } else {
            }
        })
        .then(() => {

            showQuestion();
        })
        .catch((err) => {
            console.log(err);
        });
}
// setTimeout(() => {

//     showQuestion();
// }, 1000)



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
        let myCurrentPoint = localStorage.getItem('totalPoint');
        const login = "http://172.16.68.220:8099/user";

        let myInfo = JSON.parse(localStorage.getItem('UserData'));
        fetch(login, {
            method: "PUT",
            headers: {
                Accept: "application/json, text/plain, */*",
                // "Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                Authorization: "Bearer" + " " + getStorage("User"),

                // "Content-Type": "form-data",
            },
            body: JSON.stringify({
                id: myInfo.id,
                firstName: myInfo.firstName,
                lastName: myInfo.lastName,
                point: localStorage.getItem('totalPoint')

            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    alert("Error..."); /*displays error message*/
                } else {
                    // window.location.replace('dashboard.html')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }



}



function getStorage(a) {
    if (localStorage.getItem(a) !== null) {
        return localStorage.getItem(a)
    }
}