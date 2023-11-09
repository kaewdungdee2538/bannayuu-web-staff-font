import React from "react";
import { ExcelExportWithExcelJs } from "../../../components/Excel";

function generateDataSet(values) {
  const rowItems = values
    ? values.map((item, index) => {
        return [
          index + 1,
          item.villager_code,
          item.home_address.toString(),
          item.first_name,
          item.last_name,
          item.tel_number.toString(),
          item.status,
        ];
      })
    : [];

  const tableExcel = {
    name: "TablePaymentTransaction",
    ref: "A6",
    headerRow: true,
    totalsRow: true,
    style: {
      theme: "TableStyleMedium13",
      showRowStripes: true,
    },
    columns: [
      { name: "No" },
      { name: "รหัสลูกบ้าน", filterButton: true },
      { name: "บ้านเลขที่", filterButton: true },
      { name: "ชื่อ", filterButton: true },
      { name: "นามสกุล", filterButton: true },
      { name: "เบอร์โทรศัพท์", filterButton: true },
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
