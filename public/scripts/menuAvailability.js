const button = document.querySelector('#toggleAvailability');
const menuImg = document.querySelector('#menuImg');


button.addEventListener('click', function onOpen(e) {
    const menuDiv = e.target.parentElement.classList;
    const formId = e.target.parentElement.children[1]

    if (menuDiv.contains("available")) {
        e.target.parentElement.classList.add('itemUnavailableClassDiv')
        e.target.parentElement.classList.remove('available')
        button.innerHTML = 'Make Available';
        formId.value = "unavailable";
        
        unavailableList.push(indextoRemove)
    } else {
        e.target.parentElement.classList.remove('itemUnavailableClassDiv')
        e.target.parentElement.classList.add('available')
        button.innerHTML = 'Temporarily Unavailable';
        formId.value = "available";
    }
});

