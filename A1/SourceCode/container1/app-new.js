const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = 6000;
const CALCULATOR_URL = 'http://container2:6001/calculate';

app.post('/calculate', async (req, res) => {
    const { file, product } = req.body;

    if (!file) {
        return res.status(400).json({ file: null, error: 'Invalid JSON input.' });
    }

    // const filePath = path.join('./data', file);
    // console.log("filePath in", filePath);
    const filePath = `./data/${file}`;
    console.log("filePath in cont 1", filePath);

    if (!fs.existsSync(filePath)) {
        console.log("file not exist", filePath);

        return res.status(404).json({ file, error: 'File not found.' });
    }

    try {
        const response = await axios.post(CALCULATOR_URL, { file, product });
        return res.json(response.data);
    } catch (error) {
        console.log("err.rrrr", error);
        if (error.response) {
            // If the error is from the container2 response
            return res.status(error.response.status).json(error.response.data);
        } else {
            // If the error is a network error or other issue
            return res.status(500).json({ file, error: 'Internal Server Error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Container 1 is listening on port ${PORT}`);
});
