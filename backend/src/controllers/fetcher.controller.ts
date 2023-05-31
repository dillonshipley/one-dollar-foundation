// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import { get } from '@loopback/rest';
import ExcelToJson from '../excelToJson';
import * as XLSX from 'xlsx';
import { Console } from 'console';
import path from 'path';
import fs from 'fs'

//Import the required modules

const directoryPath = path.resolve(__dirname, '../../');
console.log(directoryPath);

fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const folders: string[] = files
    .filter((file: fs.Dirent) => file.isDirectory())
    .map((folder: fs.Dirent) => folder.name);

  console.log('Folders in the directory:', folders);
});

const excelFilePath = '../../public/accounting.xlsx';
const workbook = XLSX.readFile(excelFilePath);
const sheetName = 'Revenues'; // or use sheet index like 0 for the first sheet

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

// Get the worksheet
const worksheet = workbook.Sheets[sheetName];

// Convert the worksheet to JSON
var jsonData = XLSX.utils.sheet_to_json(worksheet);

// Write the JSON data to a file
const jsonFilePath = '../public/accounting.json';

fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

console.log('Excel to JSON conversion complete.');


export class FetcherController {


  @get('/hello1')
  hello(): string {
    return 'Hello world!';
  }
}

