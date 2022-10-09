let form_login = document.getElementById("form_login");
let email_id = document.getElementById("email_id");
let password = document.getElementById("password");

form_login.addEventListener("submit", (a) => {
    a.preventDefault();
    const login = "http://172.16.68.220:8099/user/login";

    fetch(login, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json",

            // "Content-Type": "form-data",
        },
        body: JSON.stringify({
            username: email_id.value,
            password: password.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            setStorageFunc(data.object.accessToken, "User");
            if (data.error) {
                alert("Error Password or Username"); /*displays error message*/
            } else {
                window.location.replace('dashboard.html')
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

function setStorageFunc(a, b) {

    localStorage.setItem(b, a);



}

function getStorage(a) {
    if (localStorage.getItem(a) !== null) {
        return localStorage.getItem(a)
    }
}