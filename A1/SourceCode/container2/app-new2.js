const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 6001;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { file, product } = req.body;


    const filePath = `./data/${file}`;
    const recordsOfCsv = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            recordsOfCsv.push(row);
        })
        .on('end', () => {
            if (!recordsOfCsv.length || !recordsOfCsv[0].product || !recordsOfCsv[0].amount) {
                return res.status(500).json({ file, error: 'Input file not in CSV format.' });
            }

            const sum = recordsOfCsv.reduce((accum, record) => {
                if (record.product === product) {
                    accum += parseInt(record.amount, 10);
                }
                return accum;
            }, 0);

            return res.json({ file, sum });
        })
        .on('error', () => {
            return res.status(500).json({ file, error: 'Error parsing CSV file.' });
        });
});

app.listen(port, () => {
    console.log(`Container 2 listening at http://localhost:${port}`);
});
