import cars from './db.json' assert {'type': 'json'}

let globalId = cars.length




const handlerFunctions = {
    getCars: (req, res) => {
        res.send({
            message: "Here are all the cars",
            allCars: cars
        })
    },
    addCar: (req, res) => {
        const newCar = req.body.newCar
        const carPic = req.body.carPic
        const carId = ++globalId
        cars.push({
            id: carId,
            name: newCar,
            picture: carPic,
            votes: 0
        })
        res.send({
            message: `Car ${newCar} added successfully.`,
            allCars: cars
        })
    },
    deleteCar: (req, res) => {
        let carId = +req.params.id
        let carName
        for (let i=0; i<cars.length; i++) {
            if (cars[i].id === carId) {
                carName = cars[i].name
                cars.splice(i,1)
                break
            }
        }
        res.send({
            message: `Car ${carName} successfully deleted`,
            allCars: cars
        })
    },
    updateCar: (req, res) => {
        let carId = +req.params.id
        let voteType = req.body.voteType
        let carIdx = cars.findIndex(car => car.id===carId)
        let carName = cars[carIdx].name
        cars[carIdx].votes += (voteType==='upvote') ? 1 : -1
        res.send({
            message: `Car ${carName} vote tally updated`,
            allCars: cars
        })
    }
}










export default handlerFunctions