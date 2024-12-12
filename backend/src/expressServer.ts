import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import listRoutes from './routes/listRoutes';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

dotenv.config();
const app = express();
const allowedOrigins = [
	process.env.CORS_URL,
];

app.use(cors({
	origin: function(origin, callback) {
	  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
	  }
		else {
			callback(new Error('Not allowed by CORS'));
	  }
	},
	methods: 'GET, POST, PUT, DELETE, PATCH',
	credentials: true,
}));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', listRoutes);
app.use('/api', taskRoutes);
app.use('/', authRoutes);

const port = process.env.EXPRESS_PORT;

export const startServer = () => {
	app.listen(port, () => console.log(`Server running on port ${port}`));
};

export default app;