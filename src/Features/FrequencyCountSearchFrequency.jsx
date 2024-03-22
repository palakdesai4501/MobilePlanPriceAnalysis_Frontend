import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

const FrequencyCount = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [frequencyCountData, setFrequencyCountData] = useState({});
  const [searchFrequencyData, setSearchFrequencyData] = useState([]);

  const handleCountButtonClick = () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a word to count.'); // Display an alert if no word is entered
      return;
    }
    // Call the frequency count API
    axios.get(`http://localhost:9091/mobile-plans/frequencyCount/${searchQuery}`)
      .then(response => {
        setFrequencyCountData(response.data);
      })
      .catch(error => {
        console.error('Error fetching frequency count:', error);
      });
  };

  useEffect(() => {
    // If frequency count data is available, call the search frequency API
    if (Object.keys(frequencyCountData).length !== 0) {
      axios.get('http://localhost:9091/mobile-plans/searchFrequency')
        .then(response => {
          setSearchFrequencyData(response.data.searchFrequency);
        })
        .catch(error => {
          console.error('Error fetching search frequency:', error);
        });
    }
  }, [frequencyCountData]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
  <>
    <div className="text-white flex justify-center items-center m-8 text-3xl">
      Frequency Count & Search Frequency
    </div>
    <div className="flex flex-row justify-center items-center gap-4">
      <input
        type="text"
        className={`border border-gray-300 rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl`}
        placeholder="Enter a word"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button text="Count" style={{ width: '120px' }} onClick={handleCountButtonClick} />
    </div>
    {Object.keys(frequencyCountData).length !== 0 && (
      <div className="flex flex-col items-start mt-4">
        <div className="bg-white text-gray-800 rounded-md p-2 mb-2">
          <ul>
            {Object.entries(frequencyCountData).map(([url, count]) => (
              <li key={url}>{url}: {count}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-start">
          {searchFrequencyData.map(({ word, frequency }) => (
            <div key={word} className="bg-white text-gray-800 rounded-md p-2 mb-2 mr-2">
              <p>{word}: <span className="bg-blue-200 text-white rounded-full px-2">{frequency}</span></p>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
</div>);
}

export default FrequencyCount;