const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
 const UserRoutes = require('./Routes/UserRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');




const app = express();
dotenv.config();


const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
// Enable CORS for all routes
app.use(cors()); 




app.get('/', (req, res) => {
    res.send('API is running..');
});
app.get('/api/notes/:id', (req, res) => { // Fix: Added a colon before 'id'
    const note = notes.find((n) => n._id === req.params.id);
    res.send(note);
});
app.use('/api/user', UserRoutes );
app.use(notFound)
app.use(errorHandler)





app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});
