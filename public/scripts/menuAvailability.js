const button = document.querySelector('#toggleAvailability');
const menuImg = document.querySelector('#menuImg');

const unavailableList = []

button.addEventListener('click', function onOpen(e) {
    const menuDiv = e.target.parentElement.classList;
    const indextoRemove = e.target.parentElement.children[0].id.slice(e.target.parentElement.children[0].id.length - 1)
    console.log(e)

    if (menuDiv.contains("available")) {
        e.target.parentElement.classList.add('itemUnavailableClassDiv')
        e.target.parentElement.classList.remove('available')
        button.innerHTML = 'Make Available';

        
        unavailableList.push(indextoRemove)
    } else {
        e.target.parentElement.classList.remove('itemUnavailableClassDiv')
        e.target.parentElement.classList.add('available')
        button.innerHTML = 'Temporarily Unavailable';

        if (unavailableList != '') {
            unavailableList.splice(unavailableList.indexOf(indextoRemove), 1)
        }
    }
});

