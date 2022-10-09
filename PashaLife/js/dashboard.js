
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

function setStorageFunc(a) {
    if (localStorage.getItem("User") === null) {
        localStorage.setItem("User", a);
    }
    else {
        localStorage.setItem("User", a);

    }

}

function getStorage(a) {
    if (localStorage.getItem(a) !== null) {
        return localStorage.getItem(a)
    }
}
function showPoint() {
    totalPointSpan.innerHTML = localStorage.getItem("totalPoint")

}
function getUserData() {
    const login = "http://172.16.68.220:8099/user/getUser";

    fetch(login, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + getStorage("User"),
            // "Content-Type": "form-data",
        }
    })
        .then((response) => response.json())
        .then((data) => {
            if (document.getElementById('nameOfUser')) { document.getElementById('nameOfUser').innerHTML = data.object.firstName }
            document.getElementById('myBtn').innerHTML = data.object.firstName
            document.getElementById('totalPoint').innerHTML = data.object.point;
            localStorage.setItem('totalPoint', data.object.point);
            localStorage.setItem('UserData', JSON.stringify(data.object))
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
getUserData()