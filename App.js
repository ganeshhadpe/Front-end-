import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    const response = await fetch('http://localhost:5000/api/stocks');
    const data = await response.json();
    setStockData(data);
  };

  const fetchCompanyPriceData = async (companyId) => {
    const response = await fetch(`http://localhost:5000/api/price/${companyId}`);
    const data = await response.json();
    setPriceData(data);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    fetchCompanyPriceData(company.id);
  };

  return (
    <div className="App">
      <h1>Stock Market Simulator</h1>
      <div className="company-list">
        {stockData.map((company) => (
          <div key={company.id} className="company-item" onClick={() => handleCompanyClick(company)}>
            <h3>{company.name}</h3>
            <p>Price: ${company.price}</p>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div className="company-details">
          <h2>{selectedCompany.name}</h2>
          <h3>Price Fluctuations</h3>
          <div className="chart-container">
            <canvas id="priceChart"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
