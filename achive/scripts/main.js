let myImage = document.querySelector('img');
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');


myImage.onclick = function () {
    let mySrc = myImage.getAttribute('src');
    if (mySrc === 'https://agroflora.ru/wp-content/uploads/2015/09/belyj-grib.jpg') {
        myImage.setAttribute('src', 'https://www.artmedika-nsk.ru/public/storage/projects/artmedika/page/glavnaja/bloemen-geel-blauw-2048x25601.jpg');
    } else {
        myImage.setAttribute('src', 'https://agroflora.ru/wp-content/uploads/2015/09/belyj-grib.jpg');
    }
}

function setUserName() {
    let userName = prompt('Please enter your name!');
    userName = checkName(userName);
    function checkName(userName) {
        while (!userName || userName.trim().length < 2) {
            userName = prompt('Please enter your name!');
        }
        return userName;
    }

    localStorage.setItem('name', userName);
    myHeading.textContent = 'Hello, ' + userName;
}

if (!localStorage.getItem('name')) {

    setUserName();
} else {
    let saveUserName = localStorage.getItem('name');
    myHeading.textContent = 'Hello, ' + saveUserName;
}

myButton.onclick = function () {
    setUserName();
}