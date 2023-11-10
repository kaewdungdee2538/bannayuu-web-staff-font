import React from "react";
import { ExcelExportWithExcelJs } from "../../../components/Excel";

function generateDataSet(values) {
    console.log(values)
  const rowItems = values
    ? values.map((item, index) => {
        return [
          index + 1,
          item.home_code,
          item.home_address.toString(),
          item.status,
        ];
      })
    : [];

  const tableExcel = {
    name: "TablePaymentTransaction",
    ref: "A3",
    headerRow: true,
    totalsRow: true,
    style: {
      theme: "TableStyleMedium12",
      showRowStripes: true,
    },
    columns: [
      { name: "No" },
      { name: "รหัสบ้านเลขที่", filterButton: true },
      { name: "บ้านเลขที่", filterButton: true },
      { name: "สถานะ", filterButton: true },
    ],

    rows: [...rowItems],
  };
  return tableExcel;
}

function Excel({ headers, values }) {
  const reportname =
    headers && headers.reportName ? headers.reportName : "รายงาน";
  const header_arr = [{ name: "รายงาน", value: reportname }];

  const multiDataSet = generateDataSet(values);
  return (
    <ExcelExportWithExcelJs
      fileName={`${reportname}`}
      table={multiDataSet}
      headers={header_arr}
    />
  );
}

export default Excel;

//     const datestart = headers ? `${headers.dateStart}` : '-';
//     const dateend = headers ? `${headers.dateEnd}` : '-';
//     const textsearch = headers && headers.searchText ? `${headers.searchText}` : null;
