const XLSX = require('xlsx');

function formatFinancials(jsonData){
    const keyMap = {
        A: jsonData[0]["A"],
        B: jsonData[0]["B"],
        C: jsonData[0]["C"],
        D: jsonData[0]["D"]
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
        }
    });
    return formattedData;
}

function formatGoals(jsonData){
    const keyMap = {
        A: jsonData[0]["A"],
        B: jsonData[0]["B"],
        C: jsonData[0]["C"],
        D: jsonData[0]["D"]
    };
    jsonData.shift();

    const formattedData = jsonData.map((row) => {
        const formattedRow = {};
        Object.keys(row).forEach((key) => {
        const formattedKey = keyMap[key] || key;
        formattedRow[formattedKey] = row[key];
        });
        return formattedRow;
    });
    return formattedData;
}

function formatExcel(){
    const workbook = XLSX.readFile('./accounting.xlsx');
    const revenues = XLSX.utils.sheet_to_json(workbook.Sheets["Revenues"], { header: 'A' });
    const expenses = XLSX.utils.sheet_to_json(workbook.Sheets["Expenses"], { header: 'A' });
    const goals = XLSX.utils.sheet_to_json(workbook.Sheets["Goals"], { header: 'A' });
    return [formatFinancials(revenues), formatFinancials(expenses), formatGoals(goals)];
}

module.exports = {
    formatExcel
}