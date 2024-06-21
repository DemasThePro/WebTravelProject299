import express from "express"
import cors from "cors"
import travelRoutes from "./routes/travels.js"
import userRoutes from "./routes/users.js"


const app = express();
const PORT = 8081;


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use( cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
  

app.get("/", (req, res) =>{
    res.send("Dobrodošli na Travel App!");
});

app.use("/travels", travelRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () =>{
    console.log(`Server se ne pokreće! ${PORT}`);
});