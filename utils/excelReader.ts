import * as XLSX from 'xlsx';
import * as path from 'path';

export interface TestDataRow {
    username: string;
    password: string;
}

export class ExcelReader {
    static getSheetData(fileName: string, sheetName: string): TestDataRow[] {
        const filePath = path.resolve(process.cwd(), 'test-data', fileName);
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[sheetName];

        if (!sheet) {
            throw new Error(`Sheet ${sheetName} not found in file ${fileName}`);
        }

        return XLSX.utils.sheet_to_json(sheet);
    }
}
