const footer = document.querySelector('#footer');

const footerSections = {
    map: {
        elements: { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.871722030648!2d-117.10029638559233!3d33.478690380765855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80db81e1e5f2b74d%3A0x66a991ef27a14b5d!2s32119%20Temecula%20Pkwy%2C%20Temecula%2C%20CA%2092592!5e0!3m2!1sen!2sus!4v1627506884820!5m2!1sen!2sus"},
        classes: ["map"]
    },
    hours: {
        elements: {
            h1: "Hours",
            p: ["Monday: CLOSED", "Tuesday: 4PM-8PM", "Wednesday: 4PM-8PM", "Thursday: 4PM TO 8PM", "Friday & Saturday: 4PM TO 9PM", "Sunday: 12 - 5PM "]
        },
        classes: ["hours"]
    },
    contactUs: {
        elements: {
            h1: "Contact Us",
            p: ["Phone: +1(951)-972-4935", "Email: taste@chef​lavor.com"]
        },
        classes: ["contactUs"]
    },
    socials: {
        elements: {
            h1: "Social Media",
            a1:{
                href: "https://www.facebook.com/Tastecheflavor/",
                text: "Instagram"
            },
            a2:{
                href: "https://www.facebook.com/Tastecheflavor/",
                text: "Facebook"
            }
        },
        classes: ["socials"]
    }
}

            /////                 /////

            /////    Functions    /////

            /////                 /////

function makeIframe(value, footerDivObj) {
    const iframe = document.createElement('iframe');
    iframe.src = value;
    footerDivObj.append(iframe);
}

function makeH1(value, footerDivObj) {
    const h1 = document.createElement('h1');
    h1.innerHTML = value;
    footerDivObj.append(h1);
}

function makeP(value, footerDivObj) {
    const p = document.createElement('p');
    p.innerHTML = value;
    footerDivObj.append(p);
}

function makeElements(key, dictValues, footerDivObj) {

    if (key === elementKeys[0]) {
        if (typeof dictValues === "string") {
            makeIframe(dictValues, footerDivObj);
        } else if (typeof dictValues === "object") {
            for (var x of dictValues) {
                makeIframe(x, footerDivObj);
            }
        }
        
    } else if (key === elementKeys[1]) {
        if (typeof dictValues === "string") {
            makeH1(dictValues, footerDivObj);
        } else if (typeof dictValues === 'object') {
            for (var x of dictValues) {
                makeH1(x, footerDivObj);
            }
        }

    } else if (key === elementKeys[2]) {
        if (typeof dictValues === "string") {
            makeP(dictValues, footerDivObj);
        } else if (typeof dictValues === 'object') {
            for (var x of dictValues) {
                makeP(x, footerDivObj);
            }
        }
    
    } else if (key.includes(elementKeys[3][0])===true) {
        const p = document.createElement('p');

        const aValues = Object.keys(dictValues);
        const a = document.createElement('a');
        a.href = dictValues[aValues[0]];
        a.innerHTML = dictValues[aValues[1]];
        p.append(a);

        footerDivObj.append(p);
    }
}

function getAllElements(footerSectionsList) {
    const elementsLi = [];
    for (var section of footerSectionsList) {
        const sectionHeaders = Object.keys(footerSections[section]);
        for (var dictKey of sectionHeaders) {
            const sectionElements = Object.keys(footerSections[section][dictKey]);
            for (var elementKey of sectionElements) {
                if (elementKey != 0 && elementsLi.includes(elementKey) === false) {
                    elementsLi.push(elementKey);
                }
            }
        }
    }

    return elementsLi;
}

const footerSectionsList = Object.keys(footerSections);
const elementKeys = getAllElements(footerSectionsList);

// for every section of the footer
for (var section of footerSectionsList) {

    // create the div and add that div's class list
    const footerDivObj = document.createElement('div');
    footerDivObj.classList.add(section);

    // create a list of keys for the nested dictionary 
    const sectionHeaders = Object.keys(footerSections[section]);

    // iterate through all of the keys within that list
    for (var dictKey of sectionHeaders) {
        // if the dictkey is the keyword element then call the 
        // make element function and make the element
        if (dictKey === sectionHeaders[0]) {
            const keys = Object.keys(footerSections[section][dictKey]);
            for (var key of keys) {
                dictValues = footerSections[section][dictKey][key];
                makeElements(key, dictValues, footerDivObj);
            }
        } else if (dictKey === sectionHeaders[0]) {
            //
        }
    }
    
    footer.appendChild(footerDivObj);
   
}

