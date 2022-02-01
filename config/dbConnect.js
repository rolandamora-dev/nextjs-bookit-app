import mongoose from 'mongoose';

const dbConnect = () => {
	if (mongoose.connection.readyState >= 1) {
		return;
	}
	//'mongodb+srv://roam:roam123>@roamsoftware.0cvfe.mongodb.net/bookit?retryWrites=true&w=majority'

	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
			// useCreateIndex: true,
		})
		.then(() => console.log('Connected to DB'));
};

export default dbConnect;
