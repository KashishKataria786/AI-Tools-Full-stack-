import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {connectDB} from './config/database.js'
import postRoutes from './routes/postRoutes.js'
import fileUpload from 'express-fileupload';
import morgan from 'morgan'
import helmet from 'helmet'
import colors from 'colors'
import dalleRoutes from './routes/dalleRoutes.js'
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
  origin:"*",
  credentials:true,
}));

app.use(express.json({limit: '50mb'}))
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use('/api/v1/', postRoutes);
app.use('/api/v1/', dalleRoutes);

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from DALL.E!',
    });
  });

await connectDB();

  if(process.env.NODE_ENV!=='production'){
        try {
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`.bgBlue));
    } catch (error) {
      console.log(error);
    }
  }

  export default app;