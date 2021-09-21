// get container element
const navigation = document.querySelector("#naviagtion");
navigation.classList.add('navigation');
const logoURL = logo = "./images/logo.png";

const logoImg = document.createElement("img");
logoImg.src = logoURL;
logoImg.classList.add('logoImg');
navigation.appendChild(logoImg);

const nestedDiv = document.createElement("div");
nestedDiv.classList.add('nestedDiv');
const ul = document.createElement("ul");
const dictOfLi = {
    home: "./index.html",
    contactUs: "./contactus.html",
    menu: "./menu.html",
    events: "./cheFlavorEvents.html"
}

const listOfLiKeys = Object.keys(dictOfLi);
createLi(listOfLiKeys);

function makeNavText(linkName) {
    const liLink = document.createElement("a");
    liLink.classList.add('text-decoration');
    liLink.href = dictOfLi[item];
    liLink.innerHTML = linkName;

    const li = document.createElement("li");
    li.appendChild(liLink);
    li.classList.add('liStyles');
    ul.appendChild(li)
}

function createLi(listOfLiKeys) {
    for (item of listOfLiKeys) {
        if (item === listOfLiKeys[1]) {
            makeNavText( "contact us")

        } else {
          makeNavText(item)
        }
    } 
}

nestedDiv.appendChild(ul);
navigation.appendChild(nestedDiv);