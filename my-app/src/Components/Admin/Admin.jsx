import React, {useState , useEffect} from 'react';
import './Admin.css';
import axios from 'axios';

const Admin = () => {
  const [id , setId] = useState('');
  const [trip , setTrip] = useState({});
  const [error, setError] = useState('');
  const [allTrips, setAllTrips] = useState([]); // eslint-disable-next-line
  const [allTripsError, setAllTripsError] = useState([]);


  const [imgSrc, setImgSrc] = useState('');
  const [destTitle, setDestTitle] = useState('');
  const [location, setLocation] = useState('');
  const [nationality, setNationality] = useState('');
  const [fees, setFees] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currency, setCurrency] = useState('');
  const [description, setDescription] = useState('');

  const [updatedPrice, setUpdatedPrice] = useState('');


  
  const [validationMessage, setValidationMessage] = useState('');

  const [updatedMealsPerDay, setUpdatedMealsPerDay] = useState('');
  const [updatedAccommodationPerDay, setUpdatedAccommodationPerDay] = useState('');
  const [updatedAirfare, setUpdatedAirfare] = useState('');

  const [accommodationPerDay, setAccommodationPerDay] = useState('');
  const [mealsPerDay, setMealsPerDay] = useState('');
  const [airfare, setAirfare] = useState('');


  



  useEffect(() => {
    getAllTrips();
  }, []);

  const addTrip = (e) => {
    e.preventDefault();
  
    // Validate return date is after travel date
    const startDate = new Date(date);
    const endDate = new Date(returnDate);
  
    if (endDate <= startDate) {
      setValidationMessage('Return date must be after the travel date.');
      return;
    }
  
    // Calculate duration
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Duration in days
  
    const newTrip = {
      imgSrc,
      destTitle,
      location,
      nationality,
      accommodationPerDay,
      mealsPerDay,
      airfare,
      date,
      returnDate,
      duration, // Add duration to the newTrip object
      latitude,
      longitude,
      currency,
      description,
      fees: parseFloat(airfare) + duration * (parseFloat(accommodationPerDay) + parseFloat(mealsPerDay))
    };
  
    axios
      .post('https://backendforwebapi-production.up.railway.app/api/trips', newTrip)
      .then((res) => {
        console.log(res.data);
        setAllTrips([...allTrips, newTrip]);
        setImgSrc('');
        setDestTitle('');
        setLocation('');
        setNationality('');
        setFees('');
        setDate('');
        setReturnDate('');
        setLatitude('');
        setLongitude('');
        setCurrency('');
        setDescription('');
        setValidationMessage(''); // Clear any previous validation message
      })
      .catch((err) => {
        console.log(err);
        setError('Error occurred while adding trip.');
      });
  };
  
  

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

  const getTrip = () => {
    axios.get(`https://backendforwebapi-production.up.railway.app/api/trips/${id}`)
    .then(res => {
      console.log(res.data);
      if (res.data.length === 0) {
        setError('No trip found with specified ID.');
        setTrip({});
      } else {
        setTrip(res.data[0]);
        setError('');
      }
    })
    .catch(err => {
      console.log(err);
      setError('Error occurred while fetching trip details.');
      setTrip({});
    });
  };

  const deleteTrip = (id) => {
    axios.delete(`https://backendforwebapi-production.up.railway.app/api/trips/${id}`)
      .then(res => {
        console.log(res.data);
        // Remove the deleted trip from the allTrips array
        setAllTrips(prevTrips => prevTrips.filter(trip => trip.id !== id));
      })
      .catch(err => {
        console.log(err);
        setError('Error occurred while deleting trip.');
      });
  }

  const updateMealsPerDay = (id) => {
    const updatedTrip = {
      mealsPerDay: updatedMealsPerDay
    };
    axios
      .put(`https://backendforwebapi-production.up.railway.app/api/trips/${id}/meals`, updatedTrip)
      .then((res) => {
        console.log(res.data);
        setAllTrips((prevTrips) =>
          prevTrips.map((trip) => (trip.id === id ? { ...trip, mealsPerDay: updatedMealsPerDay } : trip))
        );
        setUpdatedMealsPerDay('');
      })
      .catch((err) => {
        console.log(err);
        setError('Error occurred while updating trip meals per day.');
      });
  };

  const updateAccommodationPerDay = (id) => {
    const updatedTrip = {
      accommodationPerDay: updatedAccommodationPerDay
    };
    axios
      .put(`https://backendforwebapi-production.up.railway.app/api/trips/${id}/accommodation`, updatedTrip)
      .then((res) => {
        console.log(res.data);
        setAllTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === id ? { ...trip, accommodationPerDay: updatedAccommodationPerDay } : trip
          )
        );
        setUpdatedAccommodationPerDay('');
      })
      .catch((err) => {
        console.log(err);
        setError('Error occurred while updating trip accommodation per day.');
      });
  };

  const updateAirfare = (id) => {
    const updatedTrip = {
      airfare: updatedAirfare
    };
    axios
      .put(`https://backendforwebapi-production.up.railway.app/api/trips/${id}/airfare`, updatedTrip)
      .then((res) => {
        console.log(res.data);
        setAllTrips((prevTrips) =>
          prevTrips.map((trip) => (trip.id === id ? { ...trip, airfare: updatedAirfare } : trip))
        );
        setUpdatedAirfare('');
      })
      .catch((err) => {
        console.log(err);
        setError('Error occurred while updating trip airfare.');
      });
  };

  return (
    <div className="centered">
      
      <h1>Admin Page</h1>
    

      <div className="section-divider">
      <h2>Get all trips</h2>
      <div>
      

        {error && <p>{error}</p>}

        {allTrips.map(trip => (
        <div key={trip.id}>
          <h2>{trip.destTitle}</h2>
          {/* <p>${trip.airfare + parseInt(trip.duration) * (parseInt(trip.accommodationPerDay) + parseInt(trip.mealsPerDay))}</p> */}
          <p>${trip.fees}</p>
          <p>Airfare: ${trip.airfare}, Accomodation per day: ${trip.accommodationPerDay}, Meals per day: ${trip.mealsPerDay} </p>
          <p>{trip.date} to {trip.returnDate}</p>
          <p>{trip.description}</p>

          {/* <input type="number" placeholder="New Price" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
          <button onClick={() => updateTripPrice(trip.id)}>Update</button> */}



          <div>
              <label htmlFor={`mealsPerDay-${trip.id}`}></label>
              <input
                placeholder="New Meals Per Day"
                type="number"
                id={`mealsPerDay-${trip.id}`}
                value={updatedMealsPerDay}
                onChange={(e) => setUpdatedMealsPerDay(e.target.value)}
              />
              <button class="updateButton" onClick={() => updateMealsPerDay(trip.id)}>Update Meals Per Day</button>
            </div>

            <div>
              <label htmlFor={`accommodationPerDay-${trip.id}`}></label>
              <input
                placeholder="New Accommodation"
                type="number"
                id={`accommodationPerDay-${trip.id}`}
                value={updatedAccommodationPerDay}
                onChange={(e) => setUpdatedAccommodationPerDay(e.target.value)}
              />
              <button class="updateButton" onClick={() => updateAccommodationPerDay(trip.id)}>Update Accommodation Per Day</button>
            </div>

            <div>
              <label htmlFor={`airfare-${trip.id}`}></label>
              <input
                type="number"
                placeholder="New Airfare cost"
                id={`airfare-${trip.id}`}
                value={updatedAirfare}
                onChange={(e) => setUpdatedAirfare(e.target.value)}
              />
              <button class="updateButton" onClick={() => updateAirfare(trip.id)}>Update Airfare</button>
            </div>

          <button className="delete-button" onClick={() => deleteTrip(trip.id)}>Delete</button>
          <div className="clearfix"></div>
          {/*-----------*/}
        </div>
      ))}
      </div>
      </div>


    
      
      <div>
      <div className="section-divider">
  <h2>Add a new trip</h2>
  <form onSubmit={addTrip}>
  <label htmlFor="imgSrc">Image URL:</label><br />
  <input type="text" id="imgSrc" name="imgSrc" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} /><br />

  <label htmlFor="destTitle">Destination Title:</label><br />
  <input type="text" id="destTitle" name="destTitle" value={destTitle} onChange={(e) => setDestTitle(e.target.value)} /><br />

  <label htmlFor="location">Location:</label><br />
  <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />

  <label htmlFor="nationality">Nationality:</label><br />
  <input type="text" id="nationality" name="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} /><br />

  <label htmlFor="accommodationPerDay">Accommodation Per Day:</label><br />
  <input type="number" id="accommodationPerDay" name="accommodationPerDay" value={accommodationPerDay} onChange={(e) => setAccommodationPerDay(e.target.value)} /><br />

  <label htmlFor="mealsPerDay">Meals Per Day:</label><br />
  <input type="number" id="mealsPerDay" name="mealsPerDay" value={mealsPerDay} onChange={(e) => setMealsPerDay(e.target.value)} /><br />

  <label htmlFor="airfare">Airfare:</label><br />
  <input type="number" id="airfare" name="airfare" value={airfare} onChange={(e) => setAirfare(e.target.value)} /><br />

  <label htmlFor="date">Travel  Date:</label><br />
  <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} /><br />

  <label htmlFor="returnDate">Return Date:</label><br />
  <input type="date" id="returnDate" name="returnDate" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} /><br />


  <label htmlFor="latitude">Latitude:</label><br />
  <input type="text" id="latitude" name="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value.replace(/[^0-9.-]/g, ''))} /><br />

  <label htmlFor="longitude">Longitude:</label><br />
  <input type="text" id="longitude" name="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value.replace(/[^0-9.-]/g, ''))} /><br />

  <label htmlFor="currency">Currency:</label><br />
  <input type="text" id="currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} /><br />

  <label htmlFor="description">Description:</label><br />
  <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} cols={100} /><br />

  <button type="submit">Add Trip</button>
  {validationMessage && <p className="error">{validationMessage}</p>}
</form>
</div>
</div>


      <div className="section-divider">
      <h2>Get trip by ID</h2>
      <input type="number" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={getTrip}>Get Trip By ID</button>
      {error && <p className="error">{error}</p>}
      {trip.destTitle && (
        <div>
          <p>Trip destination: {trip.destTitle}</p>
          <p>Trip description: {trip.description}</p>
        </div>
      )}

      <br/>
    </div>
    </div>




  );
};
  
export default Admin;