console.log("working")

const baseCardURL = "http://localhost:3000/magic_cards"
const baseUserURL = "http://localhost:3000/users"

fetch(baseCardURL)
    .then(res => res.json())
    .then(renderCards)

function renderCards(cards) {
    const $main = document.querySelector('main')
    cards.forEach(card => {
        const magicCard = document.createElement('div')
        magicCard.classList.add(`card-${card.id}`)
        $main.append(magicCard)
        renderCardName(card, magicCard)
        renderCardImage(card, magicCard)
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
    magicCard.append(img)
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
    const section = document.querySelector('.new-user')
    const form = document.querySelector('#new-user-form')
    section.removeChild(form)
    const h1 = document.createElement('h1')
    h1.textContent = `Welcome ${user.username}`
    section.append(h1)
}

            
