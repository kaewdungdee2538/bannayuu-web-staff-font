import React from "react";
import { ExcelExportWithExcelJs } from "../../../components/Excel";

function generateDataSet(values) {
  const rowItems = values
    ? values.map((item, index) => {
        return [
          index + 1,
          item.company_id.toString(),
          item.company_code,
          item.company_name,
          item.company_promotion,
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
      theme: "TableStyleMedium9",
      showRowStripes: true,
    },
    columns: [
      { name: "No" },
      { name: "ID โครงการ", filterButton: true },
      { name: "รหัสโครงการ", filterButton: true },
      { name: "ชื่อโครงการ", filterButton: true },
      { name: "ประเภท", filterButton: true },
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
