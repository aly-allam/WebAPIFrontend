  import React, { useState, useEffect } from 'react';
  import './home.css';
  import video from '../../Assets/video.mp4';
  import { GrLocation } from 'react-icons/gr';
  import { FiFacebook } from 'react-icons/fi';
  import { AiOutlineInstagram } from 'react-icons/ai';
  import { AiOutlineSearch } from 'react-icons/ai';
  import { SiTripadvisor } from 'react-icons/si';
  import { BsListTask } from 'react-icons/bs';
  import { TbApps } from 'react-icons/tb';

  import { HiOutlineClipboardCheck, HiOutlineLocationMarker } from 'react-icons/hi';
  import { AiOutlineClose } from 'react-icons/ai';

  import 'aos/dist/aos.css';
  import axios from 'axios';

  const Home = () => {
    const [showDestination, setShowDestination] = useState(true);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedReturnDate, setSelectedReturnDate] = useState('');
    const [selectedBudget, setSelectedBudget] = useState('$1000');
    const [selectedDestination, setSelectedDestination] = useState('');

    const [allTrips, setAllTrips] = useState([]);
    const [allTripsError, setAllTripsError] = useState('');

    const [filteredTrips, setFilteredTrips] = useState([]);


    const [currentDestination, setCurrentDestination] = useState(null);
    const [meals, setMeals] = useState([]);
    const [weather, setWeather] = useState(null);
    const [currency, setCurrency] = useState(null);

    const [showPopup, setShowPopup] = useState(false);


    const handleDetailsClick = (destination) => {
      setCurrentDestination(destination);
      setShowPopup(true);
    };

    // handle user input for date field
    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
    };

    // handle user input for date field
    const handleDateReturnChange = (event) => {
      setSelectedReturnDate(event.target.value);
    };



    // handle user input for budget field
    const handleBudgetChange = (event) => {
      setSelectedBudget('$' + event.target.value);
    };

    // handle user input for destination field
    const handleDestinationChange = (event) => {
      setSelectedDestination(event.target.value);
    };


    const getAllTrips = () => {
      let filteredTrips = allTrips;
    
      if (selectedDate && selectedDestination) {
        axios.get(`https://backendforwebapi-production.up.railway.app/api/trips/date/${selectedDate}/return/${selectedReturnDate}/location/${selectedDestination}`)
          .then(res => {
            filteredTrips = res.data;
            setFilteredTrips(filteredTrips);
          })
          .catch(err => {
            console.log(err);
            setAllTripsError('Error occurred while fetching trips.');
            setFilteredTrips([]);
          });
      } else if (selectedDate && selectedBudget) {
        axios.get(`https://backendforwebapi-production.up.railway.app/api/trips/date/${selectedDate}/return/${selectedReturnDate}/fees/${selectedBudget.slice(1)}`)
          .then(res => {
            filteredTrips = res.data;
            setFilteredTrips(filteredTrips);
          })
          .catch(err => {
            console.log(err);
            setAllTripsError('Error occurred while fetching trips.');
            setFilteredTrips([]);
          });
      } else {
        setFilteredTrips(filteredTrips);
      }
    
      setAllTrips(filteredTrips);
    };

    const handleToggle = () => {
      setShowDestination(!showDestination);
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

    return (
      <section className='home'>
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video>

        <div className='homeContent container'>
          <div className='textDiv'>
            <span className='smallText'>Our Packages</span>
            <h1 className='homeTitle'>Search your Holiday</h1>
          </div>

          <div className='cardDiv grid'>
            <div className='dateInput'>

              <label htmlFor='date'>Travel date:</label>
              <div className='input flex'>
                <input type='date' value={selectedDate} onChange={handleDateChange} />
              </div>

              <label htmlFor="date">Return Date:</label>
              <div className='input flex'>
                <input type='date' value={selectedReturnDate} onChange={handleDateReturnChange} />
              </div>

          

            </div>

            {showDestination ? (
              <div className='destinationInput'>
                <label htmlFor='city'>Search your destination:</label>
                <div className='input flex'>
                  <input type='text' placeholder='Enter name here....'   value={selectedDestination} onChange={handleDestinationChange}/>
                  <GrLocation className='icon' />
                </div>
              </div>
            ) : (
              <div className='priceInput'>
                <div className='label_total flex'>
                <label htmlFor='price'>Selected budget:</label>
                <h3 className='total'>{selectedBudget}</h3> {/* default value */}
              </div>
              <div className='input flex'>
                <input
                  type='range'
                  max='2000'
                  min='0'
                  value={selectedBudget.slice(1)}
                  onChange={handleBudgetChange}
                  />
                </div>
              </div>
            )}

            <div className='searchOptions flex' onClick={getAllTrips}>
              <AiOutlineSearch className='icon' />
              <span>SEARCH</span>
            </div>

            <div className='toggleButton'>
              <button onClick={handleToggle}>
                {showDestination
                  ? 'Enter Date and Budget'
                  : 'Enter Date and Destination'}
              </button>
            </div>
          </div>

          <div className='homeFooterIcons flex'>
            <div className='rightIcons'>
              <FiFacebook className='icon' />
              <AiOutlineInstagram className='icon' />
              <SiTripadvisor className='icon' />
            </div>

            <div className='leftIcons'>
              <BsListTask className='icon' />
              <TbApps className='icon' />
            </div>
          </div>

          <div>
          {filteredTrips.length > 0 && (
            <div className='searchResults'>
              <h2>Search Results:</h2>
              <button className='closeButton' onClick={() => setFilteredTrips([])}>X</button>
              <div className='tripList'>


  <div className="secContent grid">
          {filteredTrips.map(({ id, imgSrc, destTitle, location, nationality, fees, airfare,accommodationPerDay,mealsPerDay, date, returnDate, latitude, longitude, currency, description }) => {
            return (
              <div key={id} className="singleDestination">
                <div className="imageDiv">
                  <img src={imgSrc} alt={destTitle} />
                </div>

                <div className="cardInfo">
                  <h4 className="destTitle">{destTitle}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{location} - {date} to {returnDate}</span>
                  </span>

                  <div className="fees flex">
                    <div className="price">
                      <h5>${fees}</h5>
                      
                    </div>
                  </div>

                  <div className="desc">
                    <p>{description}</p>
                  </div>

                  <button className="btn flex" onClick={() => handleDetailsClick({ imgSrc,destTitle, location, nationality, fees, airfare,accommodationPerDay,mealsPerDay, date, returnDate,latitude, longitude, description, currency })}>
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
              </div>
            </div>
  )}
        </div>
        </div>
      </section>
    );
  };

  export default Home;
