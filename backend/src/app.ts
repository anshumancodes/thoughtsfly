import express from 'express';
import cors from "cors"
import cookieparser from "cookie-parser";
import bodyparser from "body-parser";


const app = express();

app.use(express.json());
app.use(cors(
    {
        credentials: true ,
        methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }
));
app.use(cookieparser());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true ,limit: '120kb' }));
app.use(bodyparser.json());





export default app;
