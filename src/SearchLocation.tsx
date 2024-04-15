import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

interface SearchLocationProps {
  onClose: () => void;
}

interface City {
  geoname_id: string;
  name: string;
  country: string;
  country_code: string;
  timezone: string;
  population: number;
  cou_name_en: string;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onClose }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2C%20cou_name_en%2C%20country_code%2C%20timezone%2C%20coordinates%2Cgeoname_id&limit=100&offset=0&refine=cou_name_en%3A%22India%22');
      setCities(response.data.results);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-gray-150 m-4 md:m-12 lg:m-20 xl:m-24 2xl:m-32 rounded-lg p-8 w-[450px] h-[860px] bg-darkblue">
      <div className="flex justify-end">
        <button className="text-2xl text-gray-150" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex my-5 space-x-4">
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-400 bg-transparent p-3 flex-grow text-gray-150 focus:outline-none"
          placeholder="Enter location/zip code"
        />
        <button className="bg-blue-500 text-white py-3 px-5 rounded hover:bg-blue-600 focus:outline-none">
          <Link to={`/${searchTerm}`}>
      <p> Search</p> </Link>
        </button>
      </div>

      <div className="w-full overflow-hidden h-[680px]">

      <thead>
              <tr>
                <th className="px-3 py-2 text-left">City Name</th>
                <th className="px-5 pl-10 py-2 text-left">Country</th>
                <th className="px-8  text-left">Timezone</th>
                {/* <th className="px-4 py-2 text-left">Population</th> */}
              </tr>
            </thead>
      
          <table className="table-auto w-full md:w-auto">
          
            <tbody>
              {filteredCities.map((city, index) => (
                <tr key={index}>

                  <td
                    onClick={() => console.log(city.name)}
                    className="border px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                   <Link to={`/${city.name}`}>
      <p>{city.name}</p>
    </Link>
                  </td>
                  <td className="border px-4 py-2">{city.cou_name_en}</td>
                  <td className="border px-4 py-2">{city.timezone}</td>
                </tr>
              ))}
            </tbody>
          </table>
   
      </div>
    </div>
  );
};

export default SearchLocation;
