function $(id) {
    return document.getElementById(id);
}

function onLoad() {
    setTimeout(function(){
        $('frmBanner').src="banner.html";
        $('frmCar').src = 'car.html';
    }, 42000);

    setTimeout(function(){
        $('btnReplayCar').style.display='inline';
    }, 68000);

    $('txtRooms').addEventListener("input", (event)=>{
        $('txtRoomsValue').innerHTML = event.target.value;
    })
}

function replayCar() {
    $('frmCar').src = 'car.html';
}

let step = 1;
const maxStep = 4;
function previousStep() {
    if (step <= 1) {
        return;
    }

    $('navStep' + step).classList.remove('current');
    $('tabStep' + step).classList.remove('tab-current');

    step--;

    $('navStep' + step).classList.add('current');
    $('tabStep' + step).classList.add('tab-current');
    $('cmdNext').innerHTML = 'Next';

    if (step <= 1) {
        $('cmdPrevious').disabled = 'disabled';
        return;
    }
}

function nextStep() {
    if (step >= maxStep) {
        finish();
        return;
    }

    let stepFunction = Function('return step'+step+'()');
    if (!stepFunction()) return;

    $('cmdPrevious').disabled = "";
    $('navStep' + step).classList.remove('current');
    $('tabStep' + step).classList.remove('tab-current');

    step++;

    $('tabStep' + step).classList.add('tab-current');
    $('navStep' + step).classList.add('current');
    if (step >= maxStep) {
        $('cmdNext').innerHTML = 'Finish';
    }
}

function step1() {
    return true;
}

function step2() {
    return true;
}

function step3() {
    $('outFirstName').textContent = $('txtFirstName').value;
    $('outLastName').textContent = $('txtLastName').value;
    $('outPhoneNumber').textContent = $('txtPhoneNumber').value;

    document.getElementsByName('gender').forEach(element => {
        if (element.checked) {
            $('outGender').textContent = element.value;
        }
    });

    $('outAdults').textContent = $('nmAdults').value;
    $('outChildren').textContent = $('nmChildren').value;

    $('outCity').textContent = $('selCity').value;
    $('outDateTravel').textContent = $('txtDateTravel').value;
    $('outDateReturn').textContent = $('txtDateReturn').value;
    document.getElementsByName('arrivalTime').forEach(element => {
        if (element.checked) {
            $('outArrivalTime').textContent = element.value;
        }
    });
    $('outRooms').textContent = $('txtRooms').value;
    $('outMeals').textContent = '';
    document.getElementsByName('meals').forEach(element => {
        $('outMeals').textContent += element.value + ' ';
    });
    $('outColor').style.backgroundColor = $('souvenirColor').value;
    return true;
}

function finish() {
    let message = 'You booked successfully.\r\nThe infomation will be sent to your email: ' + $('txtEmail').value;

    if ($('chkReceiveEmail').checked) {
        message += "\r\nYou will receive text messages.";
    }
    alert(message);
}