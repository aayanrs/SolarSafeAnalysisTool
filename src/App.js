import React, { useState } from 'react';
import teamLogo from './images/teamlogo.png'; // adjust the path and filename
import companyLogo from './images/nexteralogo.png';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [soilFile, setSoilFile] = useState(null);
  const [lightningFile, setLightningFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [timeFrame, setTimeFrame] = useState('current'); // Added state for time frame
  const [elevation, setElevation] = useState(''); // Added state for elevation
  const [area, setArea] = useState(''); // Added state for area
  const [solarPanels, setSolarPanels] = useState(''); // Added state for solar panels

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

  const handleElevationChange = (e) => {
    setElevation(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleSolarPanelsChange = (e) => {
    setSolarPanels(e.target.value);
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
    setSoilFile(null);
    setLightningFile(null);
    setElevation('');
    setArea('');
    setSolarPanels('');
  };

  const randomRatingSoil = (fileName) => {
    if (fileName) {
      const lowerCaseFileName = fileName.toLowerCase();
      
      if (lowerCaseFileName === 'soildata_fl_synthetic.csv') {
        return 4; // FL SOIL
      } else if (lowerCaseFileName === 'soildata_ga_synthetic.csv') {
        return 2; // GA SOIL
      }
    }
  
    return Math.floor(Math.random() * 5) + 1; // Default random rating
  };

  const randomRatingLightning = (fileName) => {
    if (fileName) {
      const lowerCaseFileName = fileName.toLowerCase();
      
      if (lowerCaseFileName === 'lightningdata_ga_synthetic.csv') {
        return 1; //  GA LIGHTNING
      } else if (lowerCaseFileName === 'lightningdata_fl_synthetic.csv') {
        return 3; // FL LIGHTNING
      }
    }

    return Math.floor(Math.random() * 5) + 1; // Default random rating
  };
  
  

  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={teamLogo}
          alt="Team Logo"
          style={{ flex: 1, maxWidth: '20%', height: 'auto', marginRight: '10px' }}
        />
        <h1 style={{ flex: 1, textAlign: 'center', marginTop: '-200px' }}>Solar Site Viability Assessment Tool (Prototype)</h1>
        <img
          src={companyLogo}
          alt="Company Logo"
          style={{ flex: 1, maxWidth: '20%', height: 'auto', marginLeft: '10px' }}
        />
      </div>
      {currentPage === 1 && (
        <div>
          <p className="solar-safe-text" style={{ marginTop: '-220px', marginBottom: '20px' }}>SolarSafe</p>
          <p className= "names-text">Created by: Aayan Siddiqui, Sasha Sanchez, Sarah Daly, Phillip Ordonez, Phillip Thompson</p>
          <h2>Instructions</h2>
          <p style={{ textDecoration: 'underline' }}>Follow the steps below to use this tool:</p>
          <ul style={{ listStyleType: 'none' }}>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>
                Step 1:</span> Go to <a href="https://soilgrids.org/" target="_blank" rel="noopener noreferrer">https://soilgrids.org/</a>.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 2:</span> Select a location by clicking on the map.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 3:</span> Select download and navigate to the WoSIS tab.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 4:</span>  Download CSV files for the specific latitudes and longitudes of interest for all the layers.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>Step 5:</span>  Upload the files below.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>
                Step 6:</span> Go to <a href="https://www.xweather.com/annual-lightning-report" target="_blank" 
                rel="noopener noreferrer">https://www.xweather.com/annual-lightning-report</a>.
            </li>
            <li style={{ marginBottom: '10px', paddingLeft: '20px' }}>
              <span style={{ textDecoration: 'underline' }}>
                Step 7:</span>  Extract ground flash density and peak current values for location, and upload as CSV.
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
              {/* ... (previous code) */}
              <p style={{ fontSize: '20px' }}>Elevation of your site (meters):</p>
              <input
                type="number"
                value={elevation}
                onChange={handleElevationChange}
                style={{ fontSize: '18px', width: '100px', height: '25px' }}
              />
              <p style={{ fontSize: '20px' }}>Area of your site (acres):</p>
              <input
                type="number"
                value={area}
                onChange={handleAreaChange}
                style={{ fontSize: '18px', width: '100px', height: '25px' }}
              />
              <p style={{ fontSize: '20px' }}>Estimated amount of solar panels on site:</p>
              <input
                type="number"
                value={solarPanels}
                onChange={handleSolarPanelsChange}
                style={{ fontSize: '18px', width: '100px', height: '25px' }}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <p>Select time frame:</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label style={{ fontSize: '22px' }}>
                  <input
                    type="radio"
                    name="timeFrame"
                    value="current"
                    checked={timeFrame === 'current'}
                    onChange={handleTimeFrameChange}
                  />
                  Current
                </label>
                <label style={{ marginLeft: '20px', fontSize: '22px' }}>
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
                    marginTop: '30px',
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
                Grounding Recommendation: {timeFrame === 'current' ? 'The site features a limited grounding capacity, posing challenges in effectively dissipating electrical currents. It is not good for grounding.' : 
                (timeFrame === 'future' ? 'The site demonstrates a high electrical grounding ability, allowing for dissipation of electrical currents. It is good for grounding.'
                 : 'Insert basic grounding recommendations depending on the number outputted')}
                </p>
            </div>
            <div style={{ width: '80%', margin: '20px 0' }}>
              <p style={{ fontSize: '20px', textAlign: 'center' }}>
                Lightning Protection Recommendation: 
                {timeFrame === 'current' ? ' Locate strike termination devices (including air terminals, masts, and overhead ground wires) adjacent to the solar panels in such a manner as to place the solar panels in a zone of protection '
                 : 
                (timeFrame === 'future' ? ' Direct mounting of strike termination devices to each solar array rack. This includes the implementation of air terminals mounted on conducting solar array racks, metallic frames that border each panel, loop conductors, and optional ground electrodes. ' 
                : 'Insert basic lightning recommendations depending on the number outputted')}
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
