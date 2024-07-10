import express from "express";
import { router } from "./infra/router";


const PORT = process.env.PORT ?? 3001;

const app = express();
app.use(express.json())
app.use(router)

app.listen(PORT, () => console.log(`Server product is running on PORT ${PORT}`))