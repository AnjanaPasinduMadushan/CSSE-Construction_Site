import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { getAllConstructionSites } from '../../api/services/siteService';
import { PieChart } from '@mui/x-charts/PieChart';
import html2pdf from 'html2pdf.js';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Button } from '@mui/material';

function GenerateReport() {
  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllConstructionSites(),
  });

  const [selectedMonth, setSelectedMonth] = useState(1); // Default to month 1

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    // Handle side effects when the selectedMonth changes (e.g., fetching data)
  }, [selectedMonth]);

  const filteredData = data
    ? data.filter((site) => {
        const startDate = new Date(site.startDate);
        return startDate.getMonth() + 1 === selectedMonth;
      })
    : [];

  const provinceCount = filteredData.reduce((acc, site) => {
    const { province } = site;
    if (!acc[province]) {
      acc[province] = 0;
    }
    acc[province]++;
    return acc;
  }, {});

  const pieChartData = Object.keys(provinceCount).map((province, index) => ({
    id: index,
    value: provinceCount[province],
    label: province,
  }));

  const totalSites = filteredData.length;

  const provincePercentages = Object.keys(provinceCount).map((province) => ({
    province,
    percentage: ((provinceCount[province] / totalSites) * 100).toFixed(2),
  }));

  const pdfOptions = {
    margin: 10,
    filename: 'report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  };

  const reportRef = useRef(null);

  const handleDownloadPDF = () => {
    const pdfOptions = {
      margin: 10,
      filename: 'report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Use the html2pdf library to convert the content to PDF
    html2pdf().from(reportRef.current).set(pdfOptions).outputPdf(pdf => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = pdfOptions.filename;
      link.click();
    });
  };

  return (
    <div style={{marginLeft:"10%"}}>
      <h1 style={{ marginTop: '5%' }}>View Report</h1>
      <select
      style={{
        marginTop: '2%',
        marginLeft: '2%',
        borderRadius: '20px',
        width: "10vw",
        height: "5vh",
        fontSize: "1.5rem",
      }}
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <Button variant="contained" startIcon={<AssessmentIcon />} style={{  marginLeft:"5%", backgroundColor: "#ffcd38", color: "black", borderRadius: "20px" }} onClick={handleDownloadPDF}>Download as PDF</Button>
      <div style={{ marginTop: '2%', width:"80vw",display:"flex" }}>
      <PieChart
      sx={{
        // width: '80%',
        // height: '70vh',
        // marginLeft: '2%',
        marginTop: '2%',
        justifyContent: 'space-between',
      }}
        series={[
          {
            data: pieChartData,
          },
        ]}
        width={1000}
        height={800}
      />
      <table
      style={{
        marginTop: '2%',
        // marginLeft: '2%',
        borderRadius: '20px',
        width: "10vw",
        height: "5vh",
        fontSize: "1.5rem",
      }}
      >
        <thead>
          <tr>
            <th>Province</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {provincePercentages.map((item, index) => (
            <tr key={index}>
              <td>{item.province}</td>
              <td>{item.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  );
}

export default GenerateReport;
