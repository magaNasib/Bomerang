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
        alert("Congrtlations!!! You have got a discount. Your Promo code : 7HSNX6")
    }
}