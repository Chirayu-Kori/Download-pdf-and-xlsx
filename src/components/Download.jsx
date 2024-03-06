import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadUrl = `https://dev101.broadnet.me:9090/download/pricing-list`;

const Download = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setAccessToken(storedToken);
  }, []);

  const downloadExcel = (jsonData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Pricing-List", 14, 22);

    const tableData = data.map((item) => [
      item.cost,
      item.country,
      item.currency,
      item.mcc,
      item.mnc,
      item.operator,
      item.remarks,
      item.username,
    ]);

    tableData.unshift([
      "Cost",
      "Country",
      "Currency",
      "MCC",
      "MNC",
      "Operator",
      "Remarks",
      "Username",
    ]);

    doc.autoTable({
      head: tableData.splice(0, 1),
      body: tableData,
      margin: { top: 30 },
    });
    doc.save("pricing-list.pdf");
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(downloadUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      downloadExcel(response.data, "dataXLSX");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get(downloadUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      generatePDF(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex flex-col items-center py-10">
      <div className="bg-green-500 px-10 py-6 rounded-xl">
        <p className="font-medium text-white">Login successful!</p>
      </div>
      <div className="flex flex-row space-x-4">
        <button
          onClick={handleDownloadExcel}
          disabled={!accessToken}
          className="w-60 h-12 rounded-md bg-blue-600 text-white mt-10 hover:scale-105 hover:bg-blue-500 active:bg-blue-700"
        >
          Download Excel File
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={!accessToken}
          className="w-60 h-12 rounded-md bg-blue-600 text-white mt-10 hover:scale-105 hover:bg-blue-500 active:bg-blue-700"
        >
          Download PDF File
        </button>
      </div>
    </div>
  );
};

export default Download;
