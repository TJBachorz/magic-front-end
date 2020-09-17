console.log("working")

let userId
const baseCardURL = "http://localhost:3000/magic_cards/"
const baseUserURL = "http://localhost:3000/users"
const likesURL = "http://localhost:3000/likes"

fetch(baseCardURL)
    .then(res => res.json())
    .then(renderCards)

function renderCards(cards) {
    const $main = document.querySelector('main')
    cards.forEach(card => {
        const magicCard = document.createElement('div')
        magicCard.classList.add(`card-${card.id}`, "card")
        $main.append(magicCard)
        renderCardName(card, magicCard)
        renderLikeButton(card, magicCard)
        renderCardImage(card, magicCard)
        renderXButton(card, magicCard)
    })
}

function renderCardName(card, magicCard) {
    const name = document.createElement('h2')
    name.textContent = card.name
    magicCard.append(name)
}

function renderCardImage(card, magicCard) {
    const img = document.createElement('img')
    img.src = card.imageUrl
    img.onerror = function() {img.src = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg"}
    magicCard.append(img)
}

function renderLikeButton(card, magicCard) {
    const button = document.createElement('button')
    button.classList.add(`${card.id}`, "like-button", "hidden")
    button.textContent = "LIKE"
    magicCard.append(button)
    button.addEventListener('click', (createLike))
}

function renderXButton(card, magicCard) {
    const button = document.createElement('button')
    button.classList.add(`${card.id}`, "delete")
    button.textContent = "X"
    magicCard.append(button)
    button.addEventListener('click', deleteCard)
}


const $newUserForm = document.querySelector('#new-user-form')
$newUserForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData($newUserForm)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')
    const user = {username, email, password}
    fetchCall(baseUserURL, "POST", {user})
        .then(res => res.json())
        .then(showNewUser)
})

function showNewUser(user) {
    const section = document.querySelector('.new-user')
    if (user.errors) {
        removeWarning(section)
        const warning = document.createElement('p')
        warning.classList.add('warning')
        let error = findError(user.errors)
        warning.textContent = error
        warning.style.color = "red"
        section.prepend(warning)
    } else {
        removeWarning(section)
        const form = document.querySelector('#new-user-form')
        section.removeChild(form)
        const h1 = document.createElement('h1')
        h1.textContent = `Welcome ${user.username}`
        section.append(h1)
        removeHiddenFromLikes()
        userId = user.id
    }
}

function deleteCard(event) {
    const button = event.target
    const id = button.classList[0]
    fetch(`${baseCardURL}${id}`, {
        method: "DELETE"
    })
    const card = document.querySelector(`.card-${id}`)
    card.remove()
}

function removeWarning(section) {
    const warning = section.querySelector('.warning')
    if (warning) {
        warning.remove()
    }
}

function findError(errors) {
    const errorMessages = Object.values(errors)
    return errorMessages[0]
    // if (Object.value(errors.username) {
    //     return errors.username[0]
    // } else if (errors.email) {
    //     return errors.email[0]
    // } else {
    //     return errors.password[0]
    // }
}

function createLike(event) {
    console.log("like")
    // const button = event.target
    // button.classList.add('liked')
    // fetchCall(likesURL, "POST",  {
        
    //     body: JSON.stringify({
    //         user_id: 
    //         magic_card_id:
    //     })
    // })
}

function removeHiddenFromLikes() {
    const likes = document.querySelectorAll('.like-button')
    likes.forEach(like => {
        like.classList.remove("hidden")
    })
}

function fetchCall(url, method, bodyData) {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    const body = JSON.stringify(bodyData)
    return fetch(url, {method, headers, body})
}
