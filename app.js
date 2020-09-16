console.log("working")

const baseCardURL = "http://localhost:3000/magic_cards/"
const baseUserURL = "http://localhost:3000/users"

fetch(baseCardURL)
    .then(res => res.json())
    .then(renderCards)
    // .then(console.log)

function renderCards(cards) {
    const $main = document.querySelector('main')
    cards.forEach(card => {
        const magicCard = document.createElement('div')
        magicCard.classList.add(`card-${card.id}`)
        $main.append(magicCard)
        renderCardName(card, magicCard)
        renderCardImage(card, magicCard)
        renderButton(card, magicCard)
    })
    // const deleteButton = document.querySelector('button')
    // console.log(deleteButton)
    // button.addEventListener('click', deleteCard)
}

function renderCardName(card, magicCard) {
    const name = document.createElement('h2')
    name.textContent = card.name
    magicCard.append(name)
}

function renderCardImage(card, magicCard) {
    const img = document.createElement('img')
    img.src = card.imageUrl
    magicCard.append(img)
}

function renderButton(card, magicCard) {
    const button = document.createElement('button')
    button.classList.add(`${card.id}`)
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
    fetch(baseUserURL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: {
                username: username,
                email: email,
                password: password
            }
        })
    })
    .then(res => res.json())
    .then(showNewUser)
})

function showNewUser(user) {
    const usernameInput = document.querySelector('#username')
    const section = document.querySelector('.new-user')
    console.log(section.childNodes.length)
    if (user.username[0] == ["Username's length must be between 6 and 14 characters."] || ["${usernameInput.value} cannot be blank."] || [`tjbachorz has already been used.`]) {
        deletePTags(section)
        const warning = document.createElement('p')
        warning.textContent = user.username
        warning.style.color = "red"
        section.prepend(warning)
    } else {
        deletePTags(section)
        const form = document.querySelector('#new-user-form')
        section.removeChild(form)
        const h1 = document.createElement('h1')
        h1.textContent = `Welcome ${user.username}`
        section.append(h1)
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

function deletePTags(section) {
    if (section.childNodes.length > 3) {
        const p = document.querySelector('p')
        p.remove()
    }
}
