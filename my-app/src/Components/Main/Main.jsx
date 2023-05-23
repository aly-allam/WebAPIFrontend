import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './main.css';
import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';



const Main = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [meals, setMeals] = useState([]);
  const [weather, setWeather] = useState(null);
  const [currency, setCurrency] = useState(null);

  const [allTrips, setAllTrips] = useState([]); 
  const [allTripsError, setAllTripsError] = useState('');

  useEffect(() => {
    getAllTrips();
  }, []);

  const getAllTrips = () => {
    axios.get('https://backendforwebapi-production.up.railway.app/api/trips')
      .then(res => {
        console.log(res.data);
        setAllTrips(res.data);
      })
      .catch(err => {
        console.log(err);
        setAllTripsError('Error occurred while fetching trips.');
        setAllTrips([]);
      });
  };

  useEffect(() => {
    if (currentDestination) {
      const fetchMeals = async () => {
        try {
          const response = await axios.get(`https://backendforwebapi-production.up.railway.app/api/meals/${currentDestination.nationality}`);
          setMeals(response.data || []);
        } catch (error) {
          console.error(error);
          setMeals([]);
        }
      };
      fetchMeals();

      const fetchWeather = async () => {
        try {
          const response = await axios.get(`https://backendforwebapi-production.up.railway.app/api/weather/${currentDestination.latitude}/${currentDestination.longitude}`);
          setWeather(response.data);
        } catch (error) {
          console.error(error);
          setWeather(null);
        }
      };
      fetchWeather();

      const fetchCurrency = async () => {
        try {
          const response = await axios.get(`https://backendforwebapi-production.up.railway.app/api/currency/${currentDestination.currency}`);
          setCurrency(response.data);
        } catch (error) {
          console.error(error);
          setCurrency(null);
        }
      };
      fetchCurrency();
    }
  }, [currentDestination]);

  const handleDetailsClick = (destination) => {
    setCurrentDestination(destination);
    setShowPopup(true);
  };

  return (
    <section className="main container section">
      <div className="secTitle">
        <h3 className="title">Our destinations</h3>
      </div>

      <div className="secContent grid">
        {allTrips.map(({ id, imgSrc, destTitle, location, nationality, fees, airfare,accommodationPerDay,mealsPerDay,date, returnDate, latitude, longitude, currency, description }) => {
          return (
            <div key={id} className="singleDestination">
              <div className="imageDiv">
                <img src={imgSrc} alt={destTitle} />
              </div>

              <div className="cardInfo">
                <h4 className="destTitle">{destTitle}</h4>
                <span className="continent flex">
                  <HiOutlineLocationMarker className="icon" />
                  <span className="name">{location}</span>
                </span>

                <div className="fees flex">
                  <div className="price">
                    <h5>${fees}</h5>
                  </div>
                </div>

                <div className="desc">
                  <p>{description}</p>
                </div>

                <button className="btn flex" onClick={() => handleDetailsClick({ imgSrc,destTitle, location, nationality, fees,airfare,accommodationPerDay,mealsPerDay, date, returnDate, latitude, longitude, description, currency })}>
                  DETAILS <HiOutlineClipboardCheck className="icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-innner">
            {/* <div className='pop-img-div'>
              <img className = 'popup-img' src={currentDestination.imgSrc}/>
            </div> */}
            
            <h2>{currentDestination.destTitle}</h2>
            <h4>${currentDestination.fees}</h4>
            <h4>{currentDestination.date} to {currentDestination.returnDate}</h4>
            <ul>
              <li>Airfare cost: ${currentDestination.airfare}</li>
              <li>Accommodaion per day: ${currentDestination.accommodationPerDay}</li>
              <li>Meals per day: ${currentDestination.mealsPerDay}</li>
            </ul>
            {/* <h4>${currentDestination.fees}-{currentDestination.location}</h4> */}
            {/* <h4>${currentDestination.fees}</h4> */}
            
            {/* <p>{currentDestination.description}</p> */}


            <br/>
            {weather ? (
              <div className="weather">
                <h4>Weather forecast for {currentDestination.destTitle}</h4>
                <ul>
                  {weather.list.filter((item, index) => [0].includes(index)).map((item) => (
                    <li key={item.dt}>{item.dt_txt} - {item.weather[0].main}: {item.main.temp} &#8451;</li>
                  ))}
                </ul>
              </div>
              ) : (
              <p>Loading weather forecast...</p>
              )
              }

      
            {currency ? (
              <div className="currencyExchange">
                <h4>Currency exchange rate for {currentDestination.location}</h4>
                <p>1 {currentDestination.currency} = {Number(Object.values(currency)[0]).toFixed(3)} EGP</p>
              </div>
            ) : (
              <p>Loading currency exchange...</p>
            )
            }
          
             
            <h4>Popular meals from {currentDestination.location}</h4>
            {meals.length > 0 ? (
              <div className="meals">
                {/* <h4>Popular meals from {currentDestination.location}</h4> */}
                <ul>
                  {meals.slice(0, 3).map((meal) => (//meals.map((meal) => (
                    <li key={meal.idMeal}>{meal.strMeal}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No meals found from {currentDestination.location} </p>
            )}

            <button className='close-btn' onClick={() => setShowPopup(false)}><AiOutlineClose/></button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Main;