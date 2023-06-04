$(document).ready(function () {
    queryWeather();
    // forecastWeather();

    let today = $.format.date(new Date(), 'yyyy-MM-dd');
    let nextFourDays = $.format.date(new Date(new Date().getTime() + 86400000 * 4), 'yyyy-MM-dd');

    $('#txtBookingDate').attr('max', nextFourDays).attr('min', today).val(today);

    let bookingStep = 1;

    $('#btnNext').on('click', function () {
        $('#btnPrevious').prop('disabled', false);

        if (bookingStep >= MAX_STEP) {
            console.log("The next step dosen't exist.")
            return;
        }

        $('#step' + bookingStep).hide();
        bookingStep++;
        $('#step' + bookingStep).show();
        eval('step' + bookingStep + '();');

        if (bookingStep >= MAX_STEP - 1) {
            $(this).text('Check Out');
        }

        if (bookingStep >= MAX_STEP) {
            this.disabled = true;
            $(this).text('Finished');
            $('#btnPrevious').prop('disabled', true);
            $('#btnBookingAgain').show();
        }
    });

    $('#btnPrevious').on('click', function () {
        let btnNext = $('#btnNext').prop('disabled', false);
        $('#btnBookingAgain').hide();

        if (bookingStep <= 1) return;

        $('#step' + bookingStep).hide();
        bookingStep--;
        $('#step' + bookingStep).show();

        if (bookingStep >= MAX_STEP - 1) {
            btnNext.text('Check Out');
        } else {
            btnNext.text('Next');
        }

        if (bookingStep <= 1) {
            this.disabled = true;
        }
    });

    $('#btnBookingAgain').on('click', function() {
        $(this).hide();
        $('#btnNext').prop('disabled', false).text('Next');
        $('#step' + bookingStep).hide();
        bookingStep = 1;
        $('#step' + bookingStep).show();
        totalSeatPrice = 0;
    });
});