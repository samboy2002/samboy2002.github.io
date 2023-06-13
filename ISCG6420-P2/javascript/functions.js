const MAX_STEP = 5;
const ORDER_SEAT_LIST = $('#detail-info .detail-seat');
const CONFIRM_SEAT_LIST = $('#cfrmSeats .detail-seat');
const BOAT_TERE = 'Tere Boat';
const BOAT_NUI = 'Nui Boat';

function getBookedDateTime(format) {
    let date = new Date($('#txtBookingDate').val());
    date.setHours($('#selBookTime').val());
    date.setMinutes(0);
    date.setSeconds(0);

    return format ? $.format.date(date, format) : date;
}

let boatCatch = {};

function buildBoatKey(date, boatName) {
    return boatName.substring(0,1) + $.format.date(date, 'yyyyMMddHH');
}
function getBoat(date, boatName) {
    let key = buildBoatKey(date, boatName);

    if ($.isEmptyObject(boatCatch[key])) {
        boatCatch[key] = boatName == BOAT_TERE ? new TereBoat(date) : new NuiBoat(date);

        boatCatch[key].onBookSeat = seat => appendBookedSeat(ORDER_SEAT_LIST, seat);
        boatCatch[key].onCancelSeat = seat => removeBookedSeat(seat);
    }

    return boatCatch[key];
}

function step2() {
    displayBookingInfo();

    $('#totalSeatPrice span').text('$0.00');
    let $boatLayout = $('#boatLayout');
    $boatLayout.empty();
    $boatLayout.removeClass('tere', 'nui');

    $('#boatName').text($('#selBoatName').val());

    ORDER_SEAT_LIST.empty();

    let boatName = $('#selBoatName').val();
    if (boatName == BOAT_TERE) {
        $boatLayout.addClass('tere');
    } else {
        $boatLayout.addClass('nui');
    }

    let boat = getBoat(getBookedDateTime(), boatName);
    boat.show($boatLayout);
    boat.getBookedSeats().forEach(seat => appendBookedSeat(ORDER_SEAT_LIST, seat));
}

let mealCatch = {};
function step3() {
    let boat = getBoat(getBookedDateTime(), $('#selBoatName').val());

    if ($.isEmptyObject(mealCatch[boat.key])) {
        mealCatch[boat.key] = new Menu();
    }

    $('#totalMenuPrice span').text('$0.00');
    let menu = mealCatch[boat.key];
    menu.onChange = menuItem => {
        console.log(menuItem);
        $('#totalMenuPrice span').text('$' + menu.subTotal.toFixed(2));
    }

    menu.display($('#menuList'));
}

function step4() {
    let boat = getBoat(getBookedDateTime(), $('#selBoatName').val());
    let menu = mealCatch[boat.key];

    let totalPrice = 0;

    CONFIRM_SEAT_LIST.empty();
    boat.getBookedSeats().forEach(seat => {
        appendBookedSeat(CONFIRM_SEAT_LIST, seat);
        totalPrice += seat.price;
    });
    
    totalPrice += menu.displayConfirm($('#cfrmMeals'));

    $('#totalPrice span').text('$' + totalPrice.toFixed(2));
}

let orderMealCatch = [];

function step5() {
    let totalPrice = 0;

    let boat = getBoat(getBookedDateTime(), $('#selBoatName').val());
    boat.getBookedSeats().forEach(seat => seat.confirm());

    let menu = mealCatch[boat.key];
    
    let orderMeals = {
        'date': getBookedDateTime(),
        'items' : []
    };
    
    menu.items.forEach(menuItem => {
        if (menuItem.amount <= 0) return;

        orderMeals.items.push({'name': menuItem.name, 'price': menuItem.price, 'amount': menuItem.amount});
        totalPrice += menuItem.price * menuItem.amount;
        menuItem.amount = 0;
    });

    menu.subTotal = 0;
    orderMealCatch.push(orderMeals);
}

function displayBookingInfo() {
    $('#s2_booking_date').text(getBookedDateTime('yyyy-MM-dd'));
    $('#s2_booking_time').text(getBookedDateTime('HH:mm'));
    $('#s2_booking_boat').text($('#selBoatName').val());
    $('#s2_booking_people').text($('#numPeople').val());
    $('#s2_booking_fname').text($('#txtFirstName').val());
    $('#s2_booking_lname').text($('#txtLastName').val());
    $('#s2_booking_email').text($('#txtEmail').val());
    $('#s2_booking_phone').text($('#txtPhone').val());

    $('#s4_booking_date').text(getBookedDateTime('yyyy-MM-dd'));
    $('#s4_booking_time').text(getBookedDateTime('HH:mm'));
    $('#s4_booking_boat').text($('#selBoatName').val());
    $('#s4_booking_people').text($('#numPeople').val());
    $('#s4_booking_fname').text($('#txtFirstName').val());
    $('#s4_booking_lname').text($('#txtLastName').val());
    $('#s4_booking_email').text($('#txtEmail').val());
    $('#s4_booking_phone').text($('#txtPhone').val());
}

let totalSeatPrice = 0;

function appendBookedSeat($container, seat) {
    let li = document.createElement('li');
    li.id = seat.key;

    let labelNumber = document.createElement('label');
    labelNumber.classList.add('number');
    labelNumber.innerHTML = seat.number;
    li.appendChild(labelNumber);

    let labelPrice = document.createElement('label');
    labelPrice.classList.add('price');
    labelPrice.innerHTML = `$${seat.price}.00`;
    li.appendChild(labelPrice);

    $container.append(li);

    totalSeatPrice += seat.price;
    $('#totalSeatPrice span').text(`$${totalSeatPrice}.00`);
}

function removeBookedSeat(seat) {
    totalSeatPrice -= seat.price;
    $('#totalSeatPrice span').text(`$${totalSeatPrice}.00`);

    $(`#${seat.key}`).remove();
}


async function queryWeather() {
    const apiKey = '6141a11cb33510ef1b79081a555c0e75'; // Replace with your OpenWeatherMap API key
    const city = 'Auckland'; // Replace with the name of the city you want to get weather data for

    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('The response of weather: ', data);
        $('#today').text(new Date().toLocaleDateString());
        $('#city').text(city);
        $('#weather').text(data.weather[0].description);
        $('#temperature').text(data.main.temp);
      })
      .catch((error) => console.error(error));
}

async function forecastWeather() {
    const apiKey = '6141a11cb33510ef1b79081a555c0e75'; // Replace with your OpenWeatherMap API key
    const city = 'Auckland'; // Replace with the name of the city you want to get weather data for

    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&cnt=4`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('The response of weather: ', data);
        
      })
      .catch((error) => console.error(error));
}