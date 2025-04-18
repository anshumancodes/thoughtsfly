import express from 'express';
import cors from "cors"
import cookieparser from "cookie-parser";
import bodyparser from "body-parser";


const app = express();

app.use(express.json());
app.use(cors(
    {   origin:"*",
        credentials: true ,
        methods: ['GET', 'POST', 'OPTIONS'], // Allowed methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }
));
app.use(cookieparser());
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true ,limit: '120kb' }));
app.use(bodyparser.json());

// standard GET route
app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Hello from thoughtsfly api!',
      version: "1.0.0",
      routes: [
        "/api/v1/user",
        "/api/v1/thought",
        "/api/v1/comment",
        "/api/v1/like",
        "/api/v1/bookmark",
      ]
    });
  });


// user routes
import userRouter from "./routes/user.router.js";
app.use("/api/v1/user", userRouter);
// post routes
import postRouter from "./routes/post.router.js"
app.use("/api/v1/post", postRouter);
// 






export default app;
