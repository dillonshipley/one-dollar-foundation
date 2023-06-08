const express = require('express')
const cors = require('cors');
const XLSX = require('xlsx');

const app = express()
app.use(cors());

const workbook = XLSX.readFile('./accounting.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });

const keyMap = {
  A: jsonData[0]["A"],
  B: jsonData[0]["B"],
  C: jsonData[0]["C"]
};
jsonData.shift();

//format the row so that the first row of data serves as the key
const formattedData = jsonData.map((row) => {
  const formattedRow = {};
  Object.keys(row).forEach((key) => {
    const formattedKey = keyMap[key] || key;
    formattedRow[formattedKey] = row[key];
  });
  return formattedRow;
});

formattedData.forEach((row, index) => {
        const value = row['Date'];
        if (typeof value === 'number' && value % 1 === 0 && value >= 1) {
            const date = new Date((value - 1) * 24 * 60 * 60 * 1000); // Convert Excel date to milliseconds
            const wrong_year = date.getFullYear();
            const new_date = new Date(date);
            new_date.setFullYear(wrong_year - 70);
            row['Date'] = new_date.toLocaleDateString(); // Convert to formatted date string (e.g., "mm/dd/yyyy")
            // Alternatively, you can use: row['A'] = date.toISOString(); for ISO 8601 format
        }
    });
console.log(formattedData);

app.get('/', (request, response) => {
    response.send(formattedData)
})

app.get('/api/people', (request, response) => {
    response.json(people)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})