const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/travelDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const Travel = require('./models/Travel');

app.get('/api/travels', async (req, res) => {
    try {
        const travels = await Travel.find();
        res.json(travels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new travel
app.post('/api/travels', async (req, res) => {
    const travel = new Travel(req.body);
    try {
        const newTravel = await travel.save();
        res.status(201).json(newTravel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/travels/:id', async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.id);
        if (!travel) {
            return res.status(404).json({ message: 'Travel not found' });
        }
        Object.assign(travel, req.body);
        const updatedTravel = await travel.save();
        res.json(updatedTravel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/travels/:id', async (req, res) => {
    try {
        const travel = await Travel.findById(req.params.id);
        if (!travel) {
            return res.status(404).json({ message: 'Travel not found' });
        }
        await travel.remove();
        res.json({ message: 'Travel deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});