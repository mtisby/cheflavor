const container = document.querySelector("#menu");
container.classList.add('flexCol');

// create menu display
for (var menuSection of Object.keys(menu)) {
    const menuSectionDiv = document.createElement("div");
    menuSectionDiv.classList.add("menuSectionDiv")
    const sectionHeader = document.createElement("h1");
    sectionHeader.classList.add('menuHeader');
    sectionHeader.innerHTML = menuSection;
    menuSectionDiv.appendChild(sectionHeader);
    const sectionItemsDiv = document.createElement("div");
    sectionItemsDiv.classList.add('flexRow');

    for (var menuItem of Object.keys(menu[menuSection])) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add('menuItemDiv', 'border');

        const itemHeader = document.createElement("h1");
        itemHeader.classList.add('menuItemTitle');
        itemHeader.innerHTML = menu[menuSection][menuItem]['title'];

        if (menu[menuSection][menuItem]['img'] != '') {
            const itemImg = document.createElement('img');
            itemImg.classList.add('squarePicture');
            itemImg.setAttribute('src', menu[menuSection][menuItem]['img']);
            itemDiv.appendChild(itemImg);
        }
        

        const itemDescript = document.createElement("p");
        itemDescript.innerHTML = menu[menuSection][menuItem]['description'];
    
        const itemPrice = document.createElement("p");
        itemPrice.innerHTML = menu[menuSection][menuItem]['price'];

        

        itemDiv.appendChild(itemHeader);
        itemDiv.appendChild(itemDescript);
        itemDiv.appendChild(itemPrice);

        itemDiv.classList.add('flexCol');

        sectionItemsDiv.appendChild(itemDiv);
    }

    menuSectionDiv.appendChild(sectionItemsDiv);
    container.appendChild(menuSectionDiv);
}

const pdfVerDiv = document.querySelector("#pdfVersion");
pdfVerDiv.classList.add('flexCol')
const newHeader = document.createElement("h1");
newHeader.innerHTML = "look at the pdf version here!";

pdfVerDiv.appendChild(newHeader);

const menuForm = document.createElement("form");
menuForm.setAttribute('method', 'get');
menuForm.setAttribute('action', './images/menuImg.png');

const menuFormButton = document.createElement("button");
menuFormButton.innerHTML = "click here";

menuForm.classList.add('projectButtons');
menuForm.appendChild(menuFormButton);

pdfVerDiv.appendChild(menuForm);