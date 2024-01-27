console.log("Hi world")


//Function to create and display a car card
const carDisplay = document.querySelector("#carDisplay")
const createCarCard = (carObj) => {
    let newCarCard = document.createElement('section')
    newCarCard.className = 'carCard'
    newCarCard.innerHTML = `
        <img src="${carObj.picture}" />
        <p>${carObj.name}</p>

        <section>
            <button onclick="updateCar(${carObj.id}, 'downvote')">-</button>
            Popularity: ${carObj.votes}
            <button onclick="updateCar(${carObj.id}, 'upvote')">+</button>
        </section>

        <br>

        <button onclick="deleteCar(${carObj.id})" style="margin-bottom: 20px">Delete Me!</button>
    `
    carDisplay.appendChild(newCarCard)
}

//Function to display an array of cars
const displayAllCars = (carArray) => {
    for (let carObj of carArray) {
        createCarCard(carObj)
    }
}

//Function that gets and displays all the cards
const getAllCars = () => {
    axios.get('/cars').then((res) => {
        displayAllCars(res.data.allCars)
    })
}

//Function to add a car based on user input and submit button
const carNameInput = document.querySelector('#car')
const carPicInput = document.querySelector("#carPic")
const submitButton = document.querySelector("#addCar")
submitButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    const newCar = carNameInput.value
    const carPic = carPicInput.value
    const carObj = {
        newCar: newCar,
        carPic: carPic
    }
    axios.post("/addCar", carObj).then((res) => {
        carNameInput.value = ''
        carPicInput.value = ''
        carDisplay.innerHTML = ''
        displayAllCars(res.data.allCars)
    })
})

//Function to delete a car when called with car id
const deleteCar = (carId) => {
    axios.delete(`/deleteCar/${carId}`).then((res) => {
        carDisplay.innerHTML = ''
        displayAllCars(res.data.allCars)
        console.log(res)
    })
}

//Function to pass upvotes and downvotes to server
const updateCar = (carId, voteType) => {
    axios.put(`/updateCar/${carId}`, {voteType: voteType}).then((res) => {
        carDisplay.innerHTML = ''
        displayAllCars(res.data.allCars)
    })
}











getAllCars()



