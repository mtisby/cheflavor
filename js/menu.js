const container = document.querySelector("#menu");
container.classList.add('flexCol');
// menu items
const menu = {
    salads: {
        boston: {
            title: "Boston Salad",
            img: './images/menuItems/boston.jpg',
            description: "grilled chicken, bacon, candied pecans, goat cheese, tarragon mustard vinaigrette",
            price: 14
        },
        mediterranean: {
            title: "Mediterranean Salad",
            img: './images/menuItems/mediSalad.jpg',
            description: "quinoa, cucumber, tomato, feta, olives, lemon oregano vinaigrette",
            price: 13
        }
    },
    flatbreads: {
        grilledVeg: {
            title: "Grilled Veg Flatbread",
            img: '',
            description: "",
            price: 14
        },
        chickenPesto: {
            title: "Chicken Pesto Flatbread",
            img: '',
            description: "",
            price: 14
        }
    },
    appetizers: {
        pretzels: {
            title: "Pretzels With Beer Cheese",
            img: './images/menuItems/pretzels.jpg',
            description: "",
            price: 12
        },
        hummusPlate: {
            title: "Humus, Pita, Veg, Tapenade",
            img: './images/menuItems/hummus.jpg',
            description: "",
            price: 12
        },
        crabCake: {
            title: "Crab Cake, Coleslaw, Aioli",
            img: './images/menuItems/crabCakes.jpg',
            description: "",
            price: 17
        },
        brie: {
            title: "Baked Brie and Berry Compote",
            img: './images/menuItems/brie.jpeg',
            description: "",
            price: 14
        }
    },
    specialties: {
        tacos: {
            title: "Street Tacos (3)",
            img: './images/menuItems/tacos.jpg',
            description: "blackened mahi street tacos",
            price: 14
        },
        charcuterie: {
            title: "Charcuterie Board",
            img: './images/menuItems/charcuterie.jpg',
            description: "",
            price: 22
        }
    },
    sandwiches: {
        ruben: {
            title: "Classic Reuben",
            img: './images/menuItems/ruben.jpg',
            description: "pastrami, swiss cheese, sauerkraut, special sauce on New York rye",
            price: 16
        },
        ablt: {
            title: "Smoked Turkey ABLT",
            img: './images/menuItems/turkey.jpg',
            description: "turkey, avocado, bacon, lettuce, tomato and garlic aioli on toasted sourdough",
            price: 14
        },
        grilledCheese: {
            title: "Grilled Cheese",
            img: './images/menuItems/grilledCheese.jpg',
            description: "cheddar, gruyere, provolone, garlic aioli on a toasted cibatta roll",
            price: 13
        },
        muffuletta: {
            title: "Italian Muffuletta",
            img: './images/menuItems/italian.jpg',
            description: "5 meats, mortadella, capicola, ham, pepperoni, genoa salami, fresh mozzarella, pepper relish, and garlic aioli",
            price: 17
        },
        pulledPork: {
            title: "Oak Smoked Pulled Pork",
            img: './images/menuItems/pulledPork.jpg',
            description: "Cheflavor BBQ sauce on brioche bun",
            price: 16
        }
    },
    burgers: {
        burgerOne: {
            title: "3 Piggy Burger",
            img: './images/menuItems/threePiggy.jpg',
            description: "angus beef, bbq pork, bacon, kielbasa, cheddar cheese, lettuce, tomato, grilled onions, special sauce & garlic aioli on a brioche bun",
            price: 19
        },
        burgerFour: {
            title: "Patty Melt",
            img: './images/menuItems/pattyMelt.jpg',
            description: "angus beef, swiss cheese, grilled onions, siracha aioli on a toasted sourdough",
            price: 15
        },
        burgerFive: {
            title: "Cheeseburger",
            img: './images/menuItems/cheeseBurger.jpg',
            description: "angus beef, cheddar cheese, lettuce, tomato, grilled onions, special sauce and garlic aioli on a brioche bun",
            price: 15
        },
        burgerSix: {
            title: "Western Burger",
            img: './images/menuItems/westernBurger.jpg',
            description: "angus beef, bacon, onion rings, cheddar cheese, lettuce, tomato, BBQ sauce and garlic aioli on a brioche bun",
            price: 17
        }
    }
}

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