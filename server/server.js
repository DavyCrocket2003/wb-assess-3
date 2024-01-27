import express from "express"
import session from "express-session"
import cors from "cors"
import morgan from "morgan"


// Set up express instance
const app = express()

// Set up middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.static("client"))
app.use(
  session({
    secret: "q9!f8Ti",
    saveUninitialized: true,
    resave: false,
  })
)

// Import handlers
import handlerFunctions from "./controller.js"

// Start up the server
app.listen(7777, () => console.log("Server live on http://localhost:7777"))








//***Endpoints***//

//Get cars
app.get("/cars", handlerFunctions.getCars)


//Add car
app.post("/addCar", handlerFunctions.addCar)


//Delete car
app.delete("/deleteCar/:id", (req, res) => {
    console.log(req.params)
    handlerFunctions.deleteCar(req, res)
})


//Car vote
app.put("/updateCar/:id", handlerFunctions.updateCar)




