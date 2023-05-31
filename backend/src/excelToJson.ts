export default class ExcelToJson{

    pathing(){
        const fs = require('fs');
        var path = require('path');

        path = __dirname;
        const directoryPath = path.resolve(path, '..');

        // Read the contents of the directory
            fs.readdir(directoryPath, (err: string, files: string[]) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            // Iterate over the files
            files.forEach((file: string) => {
            // Get the full path of each file
            const filePath = path.join(directoryPath, file);
                // Check if it's a file (not a directory)
                if (fs.statSync(filePath).isFile()) {
                    console.log(file);
                }
            });
        });
    }

    constructor(){
        //Import the required modules
        const XLSX = require('xlsx');
        const fs = require('fs');
        console.log(__dirname);
        
        this.pathing();

        const excelFilePath = '../public/accounting.xlsx';
        const workbook = XLSX.readFile(excelFilePath);
        const sheetName = 'Revenues'; // or use sheet index like 0 for the first sheet
        
        // Get the worksheet
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert the worksheet to JSON
        var jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Write the JSON data to a file
        const jsonFilePath = '../public/accounting.json';
        
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
        
        console.log('Excel to JSON conversion complete.');
    }
}
