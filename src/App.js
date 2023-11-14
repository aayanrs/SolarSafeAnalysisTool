import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [soilFile, setSoilFile] = useState(null);
  const [lightningFile, setLightningFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [timeFrame, setTimeFrame] = useState('current'); // Added state for time frame

  const handleSoilFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setSoilFile(file);
    } else {
      alert('Please upload a CSV file for soil data.');
    }
  };

  const handleLightningFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      setLightningFile(file);
    } else {
      alert('Please upload a CSV file for lightning data.');
    }
  };

  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleSubmit = () => {
    if (soilFile && lightningFile) {
      setAnalyzing(true);
      setTimeout(() => setCurrentPage(3), 3000);
      setShowBackButton(true);
    } else {
      alert('Please upload both CSV files before submitting.');
    }
  };

  const handleBack = () => {
    setCurrentPage(1);
    setShowBackButton(false);
    setAnalyzing(false);
    setSoilFile(null); // Reset soilFile state
    setLightningFile(null); // Reset lightningFile state
  }

  const randomRatingSoil = (fileName) => {
    if (fileName) {
      const lowerCaseFileName = fileName.toLowerCase();
      
      if (lowerCaseFileName === 'testcsv.csv') {
        return 4; // FL SOIL
      } else if (lowerCaseFileName === 'testcsv_1.csv') {
        return 2; // GA SOIL
      }
    }
  
    return Math.floor(Math.random() * 5) + 1; // Default random rating
  };

  const randomRatingLightning = (fileName) => {
    if (fileName) {
      const lowerCaseFileName = fileName.toLowerCase();
      
      if (lowerCaseFileName === 'testcsv_3.csv') {
        return 1; //  GA LIGHTNING
      } else if (lowerCaseFileName === 'testcsv_4.csv') {
        return 3; // FL LIGHTNING
      }
    }

    return Math.floor(Math.random() * 5) + 1; // Default random rating
  };
  
  

  return (
    <div className="App">
      <h1>Solar Site Viability Assessment Tool (Prototype)</h1>
      {currentPage === 1 && (
        <div>
          <p className="solar-safe-text">SolarSafe</p>
          <p className= "names-text">Created by: Aayan Siddiqui, Sasha Sanchez, Sarah Daly, Phillip Ordonez, Phillip Thompson</p>
          <h2>Instructions</h2>
          <p style={{ textDecoration: 'underline' }}>Follow the steps below to use this tool:</p>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 1:</span> Go to www.SOILWEBSITE.COM and do XYZ.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 2:</span> Proceed to do XYZ at said website.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 3:</span> Go to www.LIGHTNING/WEATHER-WEBSITE.COM and do XYZ.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 4:</span> You get the message, need a good set of instructions
            </li>
          </ul>
          <div>
            <p>Please upload your soil data:</p>
            <input type="file" accept=".csv" onChange={handleSoilFileChange} />
          </div>
          <div>
            <p>Please upload your lightning data:</p>
            <input type="file" accept=".csv" onChange={handleLightningFileChange} />
          
            <div style={{ textAlign: 'center' }}>
              <p>Select time frame:</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label>
                  <input
                    type="radio"
                    name="timeFrame"
                    value="current"
                    checked={timeFrame === 'current'}
                    onChange={handleTimeFrameChange}
                  />
                  Current
                </label>
                <label style={{ marginLeft: '20px' }}>
                  <input
                    type="radio"
                    name="timeFrame"
                    value="future"
                    checked={timeFrame === 'future'}
                    onChange={handleTimeFrameChange}
                  />
                  Future
                </label>
              </div>
            </div>
            {analyzing ? (
              <p style={{ fontSize: '24px', textAlign: 'center' }}>Analyzing...</p>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleSubmit}
                  disabled={!soilFile || !lightningFile}
                  style={{
                    marginTop: '50px',
                    width: '100px',
                    height: '40px',
                    fontSize: '24px'
                  }}
                  className={(!soilFile || !lightningFile) ? 'disabled-button' : ''}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div>
          <h2 className="analyzing-text">Analyzing...</h2>
          <div className="buffering-bar"></div>
        </div>
      )}

      {currentPage === 3 && (
        <div>
        <h2>Results</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
              <p>1: Not Suitable</p>
              <p>2: Mediocre</p>
              <p>3: Sufficient</p>
              <p>4: Good</p>
              <p>5: Excellent</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <p style={{ fontSize: '24px' }}>Soil Ground Capacity Rating:</p>
              <p style={{ fontSize: '24px' }}>{randomRatingSoil(soilFile?.name)}</p> {/* Pass file name to randomRating */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
              <p style={{ fontSize: '24px' }}>Lightning Risk Rating:</p>
              <p style={{ fontSize: '24px' }}>{randomRatingLightning(lightningFile?.name)}</p>
            </div>
            <div style={{ width: '80%', margin: '20px 0' }}>
              <p style={{ fontSize: '20px', textAlign: 'center' }}>
                Grounding Recommendation: {timeFrame === 'current' ? 'Woah!!!' : 
                (timeFrame === 'future' ? 'Hey!!!' : 'Insert basic grounding recommendations depending on the number outputted')}
                </p>
            </div>
            <div style={{ width: '80%', margin: '20px 0' }}>
              <p style={{ fontSize: '20px', textAlign: 'center' }}>
                Lightning Protection Recommendation: {timeFrame === 'current' ? 'What!!!' : 
                (timeFrame === 'future' ? 'Crazy!!!' : 'Insert basic lightning recommendations depending on the number outputted')}
                </p>
            </div>
          </div>
          {showBackButton && <button onClick={handleBack} style={{ 
            fontSize: '24px', 
            marginTop: '20px', 
            width: '85px', 
            height: '40px' }}>
            Back
          </button>}
        </div>
      )}
    </div>
  );
}

export default App;
