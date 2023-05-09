// ! Global Variables
const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
const toyCollection = document.getElementById("toy-collection")
const TOY_URL = "http://localhost:3000/toys"

const getAllToys = () => {
  fetch(TOY_URL)
  .then(response => response.json())
  .then(toysArray => {
    toysArray.forEach(toyData => {
      renderToyCard(toyData)
      // renderToyCardHTML(toyData)
    })
    // renderToyCard(toysArray[0])
    // renderToyCard(toysArray[1])
  })
}

const renderToyCard = cardData => {
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")

  div.className = "card"
  h2.innerText = cardData.name
  img.className = "toy-avatar"
  img.src = cardData.image
  p.textContent = `${cardData.likes} Like(s)`
  // p.innerText = cardData.likes + " Like(s)"
  button.className = "like-btn"
  button.id = cardData.id
  button.textContent = "Like ❤️"

  div.append(h2, img, p, button)
  toyCollection.append(div)
}

const renderToyCardHTML = cardData => {
  const toyCardHTML = 
  `<div class="card">
    <h2>${cardData.name}</h2>
    <img src=${cardData.image} class="toy-avatar" />
    <p>${cardData.likes} Likes</p>
    <button class="like-btn" id=${cardData.id}>Like ❤️</button>
  </div>`

  toyCollection.innerHTML += toyCardHTML
}

// ! EVENT HANDLERS
const handleSubmit = e => {
  e.preventDefault()
  // const inputName = e.target.name.value
  // const inputImage = e.target.image.value
  // * EQUALS TO
  const inputName = e.target[0].value
  const inputImage = e.target[1].value
  // debugger
  const newToyObj = {
    id: Math.random(10, 100),
    name: inputName,
    image: inputImage,
    likes: 0
  }
  renderToyCard(newToyObj)

}

const init = () => {
  getAllToys()
  let addToy = false
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
		addToy = !addToy
		if (addToy) {
			toyFormContainer.style.display = "block"
		} else {
			toyFormContainer.style.display = "none"
		}
	})
  toyFormContainer.querySelector("form").addEventListener("submit", handleSubmit)
}

init()