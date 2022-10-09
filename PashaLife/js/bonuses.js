let discountBtns = document.getElementsByClassName('discountBtn');
for (let i of discountBtns) {
    i.addEventListener('click', bookDiscount)
}
function bookDiscount() {
    let value = +(this.previousElementSibling.getAttribute('data-value'));
    if (calculatePoint(-value) < 0) {
        calculatePoint(value)
        alert("Low bonus balance :(");

    }
    else {
        alert("Congrtlations!!! You have got a discount. Your Promo code : 7HSNX6");
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
                // console.log(data);
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
        },
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("myBtn").innerHTML = data.object.firstName;
            document.getElementById("totalPoint").innerHTML = data.object.point;
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
getUserData();