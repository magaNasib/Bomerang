
let totalPointSpan = document.getElementById('totalPoint');
calculatePoint()
function calculatePoint(a = 0) {
    if (localStorage.getItem("totalPoint") === null) {
        localStorage.setItem("totalPoint", a);
    }
    else {
        var currentPt = +(localStorage.getItem("totalPoint"));
        currentPt += a;
        localStorage.setItem("totalPoint", currentPt);

    }

    showPoint();
    return currentPt
}


function showPoint() {
    totalPointSpan.innerHTML = localStorage.getItem("totalPoint")

}