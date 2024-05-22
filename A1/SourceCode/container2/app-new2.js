const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 6001;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { file, product } = req.body;


    const filePath = `./data/${file}`;
    const records = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            records.push(row);
        })
        .on('end', () => {
            if (!records.length || !records[0].product || !records[0].amount) {
                return res.status(500).json({ file, error: 'Input file not in CSV format.' });
            }

            const sum = records.reduce((acc, record) => {
                if (record.product === product) {
                    acc += parseInt(record.amount, 10);
                }
                return acc;
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



// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');

// const app = express();
// app.use(express.json());

// const PORT = 6001;

// app.post('/calculate', (req, res) => {
//     const { file, product } = req.body;
//     // const filePath = path.join('./data', file);
//     const filePath = `./data/${file}`;

//     console.log("filePath in cont 2", filePath);
//     let sum = 0;
//     let isValidCSV = true;

//     const validLine = (line) => {
//         const parts = line.split(',');
//         return parts.length === 2 && !isNaN(parseInt(parts[1], 10));
//     };

//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).json({ file, error: 'Error reading the file.' });
//         }

//         const lines = data.split('\n');
//         for (let i = 1; i < lines.length; i++) {  // Start from 1 to skip header
//             if (!validLine(lines[i])) {
//                 isValidCSV = false;
//                 break;
//             }
//         }

//         if (!isValidCSV) {
//             console.log("not valoid csv");
//             return res.status(400).json({ file, error: 'Input file not in CSV format.' });
//         }

//         fs.d(filePath)
//             .pipe(csv())
//             .on('data', (row) => {
//                 if (row.product === product) {
//                     sum += parseInt(row.amount, 10);
//                 }
//             })
//             .on('end', () => {
//                 res.json({ file, sum });
//             })
//             .on('error', () => {
//                 console.log("err in cotainer2 -- Input file not in CSV format.",);
//                 res.status(400).json({ file, error: 'Input file not in CSV format.' });
//             });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Container 2 is listening on port ${PORT}`);
// });
