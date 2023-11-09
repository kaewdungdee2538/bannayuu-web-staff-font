import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
// @mui
import { IconButton } from '@mui/material';
// components
import LogoExcel from '../LogoExcel';

const ExcelJs = require('exceljs');

// draf header
// const header_arr = [{ name: 'รายงาน', value: reportname }, { name: 'วันที่', value: '21' }, { name: 'ถึง', value: '23' }];

// draf table
// const tableExcel = {
//     name: 'MyTable',
//     ref: 'A1',
//     headerRow: true,
//     totalsRow: true,
//     style: {
//         // theme: 'None',
//         showRowStripes: true
//     },
//     columns: [
//         { name: 'Date', totalsRowLabel: 'Totals:', filterButton: true },
//         { name: 'Amount', totalsRowFunction: 'sum', filterButton: false }
//     ],
//     rows: [
//         [new Date('2019-07-20'), 70.1],
//         [new Date('2019-07-21'), 70.6],
//         [new Date('2019-07-22'), 70.1]
//     ]
// }

ExcelExportWithExcelJs.propTypes = {
    fileName: PropTypes.string,
    sheetName: PropTypes.string,
    headers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string
        })
    ),
    table: PropTypes.shape({
        name: PropTypes.string,
        ref: PropTypes.string,
        headerRow: PropTypes.bool,
        totalsRow: PropTypes.bool,
        style: PropTypes.shape({
            theme: PropTypes.string,
            showRowStripes: PropTypes.bool
        }),
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                filterButton: PropTypes.bool,
                totalsRowLabel: PropTypes.string,
                totalsRowFunction: PropTypes.oneOf([
                    'none',
                    'average',
                    'countNums',
                    'count',
                    'max',
                    'min',
                    'stdDev',
                    'var',
                    'sum',
                    'custom'
                ]),
                totalsRowFormula: PropTypes.string
            })
        ),
        rows: PropTypes.array
    })
};
function ExcelExportWithExcelJs({ fileName, sheetName, headers, table }) {
    const currentDateText = moment().format('DDMMyyyy_HHmmss');

    const file_name = fileName ? `${fileName} ${currentDateText}.xlsx` : `download_${currentDateText}.xlsx`;
    const sheet_name = sheetName ? sheetName : 'Sheet1';
    const columns_count = table?.columns?.length || 0;

    const exportExcelFile = async () => {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet(sheet_name);

        // set table
        sheet.addTable(table ? table : null);

        // Autofit column widths
        let column_index = 0;
        sheet.columns.forEach((column) => {
            const lengths = column.values.map((v) => v.toString().length);
            const maxLength = Math.max(...lengths.filter((v) => typeof v === 'number'));
            if (column_index > 0) column.width = maxLength + 2;
            column_index++;
        });

        // set header
        if (headers && headers.length > 0) {
            headers.forEach((head, index) => {
                const rowIndex = index + 1;
                const row = sheet.getRow(rowIndex);
                row.getCell(1).value = head.name;
                row.getCell(2).value = head.value;
                const firstCell = row.getCell(2).address;
                const lastCell = row.getCell(columns_count).address;
                sheet.mergeCells(firstCell, lastCell);
            });
        }

        // set fill last row
        // const last_row = sheet.lastRow;
        // last_row.fill = {
            // type: 'pattern',
            // pattern: 'solid',
            // fgColor: { argb: '92D050' }
        // };

        // write to a new buffer
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = file_name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
    return (
        <>
            <IconButton onClick={exportExcelFile}>
                <LogoExcel sx={{ fontSize: 40 }} />
            </IconButton>
        </>
    );
}

export default ExcelExportWithExcelJs;
