class BoatSeat {
    constructor(key, number) {
        this.key = key;
        this.number = number;
        this.price = 0;
        this.status = 0; // -1 disabled, 0 allowed, 1 ordered by others, 2 ordered by current user
        this.element = document.createElement('div');
        this.element.classList.add('seat');
        this.element.addEventListener('click', ()=>this.onclick(this));
        this.enable();

        this.onclick = (seat) => console.log(`Click a seat: ${seat.number}`);
    }

    _changeStatus() {
        this.element.classList.remove('disabled', 'ordered', 'booked', 'available');
        let tip = '';

        switch (this.status) {
            case -1:
                this.element.classList.add('disabled');
                break;
            case 1:
                this.element.classList.add('ordered');
                tip = 'The seat has been ordered by others.'
                break;
            case 2:
                this.element.classList.add('booked');
                tip = 'The seat is chosen.'
                break;
            case 3:
                this.element.classList.add('confirmed');
                tip = 'The seat has been booked by yourself';
                break;
            default:
                this.element.classList.add('available');
                tip = 'The seat is available.';
        }

        this.element.title = tip == '' ? '' : `Number: ${this.number}\n${tip}`;
    }

    get isConfirmed() {
        return this.status == 3;
    }
    get isBooked() {
        return this.status == 2;
    }

    get isAvailable() {
        return this.status == 0;
    }

    get isDisabled() {
        return this.status == -1;
    }

    get isOrdered() {
        return this.status == 1;
    }

    disable() {
        this.status = -1;
        this._changeStatus();
    }

    enable() {
        this.status = 0;
        this._changeStatus();
    }

    order() {
        this.status = 1;
        this._changeStatus();
    }

    book() {
        this.status = 2;
        this._changeStatus();
    }

    confirm() {
        this.status = 3;
        this._changeStatus();
    }
}

class Boat {
    constructor(name, seatRows, seatCols) {
        this.name = name;
        this.rows = seatRows;
        this.cols = seatCols;
        this.seats = {};

        this.onBookSeat = (seat) => console.log(`Book a seat: ${seat.number}`);
        this.onCancelSeat = (seat) => console.log(`Cancel a seat: ${seat.number}`);

        this._initial();
    }

    _initial() {
        if ($.isEmptyObject(this.seats)) {
            for (let row = 1; row <= this.rows; row++) {
                for (let col = 1; col <= this.cols; col++) {
                    let key = this._buildKey(row, col);
                    let number = this._buildNumber(row, col);

                    let seat = new BoatSeat(key, number);
                    seat.onclick = (seat) => this.onChooseSeat(seat);

                    if (col == 5) {
                        seat.disable();
                    }

                    switch(row) {
                        case 1:
                        case 2:
                            seat.price = 30.00;
                            break;
                        case 3:
                        case 4:
                        case 5:
                            seat.price = 25.00;
                            break;
                        default:
                            seat.price = 20.00;
                    }

                    this.seats[seat.key] = seat;
                }
            }
        }
    }

    onChooseSeat(seat) {
        if (seat.isDisabled) return;

        if (seat.isOrdered) {
            alert(`The seat ${seat.number} has been booked by others.`);
            return;
        }

        if (seat.isConfirmed) {
            alert(`The seat ${seat.number} has been booked by yourself.`);
            return;
        }

        if (seat.isBooked) {
            seat.enable();
            this.onCancelSeat(seat);
        } else {
            seat.book();
            this.onBookSeat(seat);
        }
    }

    _buildKey(row, col) {
        return 'S_' + row + '_' + col;
    }

    _buildNumber(row, col) {
        return row + '-' + col;
    }

    _disableSeat(row, col) {
        let key = this._buildKey(row, col);
        this.seats[key].disable();
    }

    _orderSeat(row, col) {
        let key = this._buildKey(row, col);
        this.seats[key].order();
    }

    _bookSeat(row, col) {
        let key = this._buildKey(row, col);
        this.seats[key].book();
    }

    _releaseSeat(row, col) {
        let key = this._buildKey(row, col);
        this.seats[key].enable();
    }

    show($container) {
        $.each(this.seats, (number, seat) => {
            $container.append(seat.element);
        });
    }

    getBookedSeats() {
        let result = [];
        $.each(this.seats, (key, seat) => {
            if (seat.isBooked) result.push(seat);
        });
        return result;
    }
}

class TereBoat extends Boat {
    constructor(date) {
        super('Tere Boat', 9, 9);
        this.date = date;

        this._disableSeat(1, 1);
        this._disableSeat(2, 1);
        this._disableSeat(1, 9);
        this._disableSeat(2, 9);
        this._disableSeat(9, 1);
        this._disableSeat(9, 9);

        this._orderSeat(2, 6);
        this._orderSeat(3, 1);
        this._orderSeat(3, 2);
        this._orderSeat(3, 3);
        this._orderSeat(4, 6);
        this._orderSeat(4, 7);
        this._orderSeat(4, 8);
        this._orderSeat(5, 1);
        this._orderSeat(5, 2);
        this._orderSeat(7, 2);
        this._orderSeat(7, 7);
        this._orderSeat(7, 8);
        this._orderSeat(7, 9);
    }
}

class NuiBoat extends Boat {
    constructor(date) {
        super('Nui Boat', 13, 9);
        this.date = date;

        this._disableSeat(1, 1);
        this._disableSeat(1, 2);
        this._disableSeat(1, 8);
        this._disableSeat(1, 9);
        this._disableSeat(2, 1);
        this._disableSeat(2, 2);
        this._disableSeat(2, 8);
        this._disableSeat(2, 9);
        this._disableSeat(3, 1);
        this._disableSeat(3, 9);
        this._disableSeat(4, 1);
        this._disableSeat(4, 9);
        this._disableSeat(12, 1);
        this._disableSeat(12, 9);
        this._disableSeat(13, 1);
        this._disableSeat(13, 9);

        this._orderSeat(4, 2);
        this._orderSeat(4, 3);
        this._orderSeat(4, 4);
        this._orderSeat(4, 8);
        this._orderSeat(5, 8);
        this._orderSeat(6, 1);
        this._orderSeat(6, 3);
        this._orderSeat(6, 4);
        this._orderSeat(6, 8);
        this._orderSeat(7, 1);
        this._orderSeat(7, 6);
        this._orderSeat(7, 7);
        this._orderSeat(7, 8);
        this._orderSeat(7, 9);
        this._orderSeat(8, 1);
        this._orderSeat(10, 1);
        this._orderSeat(10, 2);
    }
}