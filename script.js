const container = document.querySelector('.container'); // .container > .row > .seat
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // .row > .seat & .seat.occupied
const count = document.getElementById('count'); //  .text > #count
const total = document.getElementById('total'); // .text > #total
const movieSelect = document.getElementById('movie'); //.movie-container > #movie
const submitButton = document.querySelector('.submit-btn');
if (JSON.parse(localStorage.getItem('selectedMoviePrice')) === null) {
  localStorage.setItem('selectedMoviePrice', 10);
  localStorage.setItem('selectedMovieIndex', 0);
}
let ticketPrice = JSON.parse(localStorage.getItem('selectedMoviePrice'));
populateUI();

// FUNCTIONS
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => {
    return [...seats].indexOf(seat);
  });
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const totalPrice = selectedSeats.length * ticketPrice;
  count.innerText = selectedSeats.length;
  total.innerText = totalPrice;
}

function updateOccupiedSeats() {
  let occupiedSeats = document.querySelectorAll('.row .seat.occupied');
  console.log(occupiedSeats);
  seats.forEach((seat) => {
    seat.classList.replace('selected', 'occupied');
    //seat.classList.add('saloon' + JSON.parse(localStorage.getItem('selectedMovieIndex')));/////////
    const occupiedSeatsIndex = [...occupiedSeats].map(seat => {
      return [...seats].indexOf(seat);
    });
    occupiedSeats = document.querySelectorAll('.row .seat.occupied');
    localStorage.setItem('occupiedSeats', JSON.stringify(occupiedSeatsIndex));
  });
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats'));
  let selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  if (occupiedSeats !== null && occupiedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (occupiedSeats.indexOf(index) > -1) {
        seat.classList.add('occupied');
      }
    });
  }
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// EVENT LISTENERS
// Movie select event 
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();


});
// Seat click event
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Occupied seat click listener
submitButton.addEventListener('click', e => {
  updateOccupiedSeats();
  updateSelectedCount();
  updateOccupiedSeats();
});


// Inıtial count and total set
updateSelectedCount();



