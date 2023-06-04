class MenuItem {
    constructor(indication, name, image, price, description) {
        this.indication = indication;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
        this.amount = 0;
    }
}

class Menu {
    constructor () {
        this.items = [];
        this.subTotal = 0;

        const INDICATION_VEGETARIAN = 'Vegetarian';
        const INDICATION_ERR_FREE = 'Egg Free';
        const INDICATION_GLUTEN_FREE = 'Gluten Free';

        this.addItem(INDICATION_VEGETARIAN, 'Vegetable Soup', './images/Vegetable-Soup.jpg', 11.99, 'A classic vegetable soup recipe, to carry you through fall and keep you cozy, healthy and warm well into the chill of winter.');
        this.addItem(INDICATION_VEGETARIAN, 'Instant Pot Mac and Cheese', './images/instant-pot-mac-and-cheese.jpg', 19.99, "What's easier—and way better—than instant mac and cheese? Rich, creamy, homemade Instant Pot mac and cheese!");
        this.addItem(INDICATION_ERR_FREE, 'Egg-free cheese & bacon quiche', './images/egg-free-cheese-and-bacon-quiche.webp', 15.50, "Good Food's Shopping coordinator, Sarah Sysum, shares her tried-and-tested egg-free quiche recipe");
        this.addItem(INDICATION_ERR_FREE, 'Spicy kimchi pancake (kimchi jeon)', './images/spicy-kimchi-pancake.webp', 19.99, "Make these Korean-style spicy pancakes made with gut-friendly kimchi (sour cabbage) and gochujang (Korean red pepper paste). They're packed with flavour");
        this.addItem(INDICATION_GLUTEN_FREE, 'Lemon & spinach rice with feta', './images/lemon-and-spinach-rice.webp', 18.99, "Pack in spinach, feta and walnuts into this rice dish. It's bursting with nutrients, including vitamin K, which is important for our skin, hair and bones");
        this.addItem(INDICATION_GLUTEN_FREE, 'Prawn tikka masala', './images/prawn-tikka-masala.webp', 19.99, "Forget a takeaway and tuck into a midweek meal that will please the whole family with our easy, low calorie prawn tikka masala. Serve with naan breads");
    }

    addItem(indication, name, image, price, description) {
        this.items.push(new MenuItem(indication, name, image, price, description));
    }

    onChange(menuItem) {
        console.log("Change menu item: ", menuItem);
    }

    display($container) {
        $container.empty();

        this.items.forEach(menuItem => {
            let divMenuItem = document.createElement('div');
            divMenuItem.classList.add('menu-item', 'row');

            let divMenuImage = document.createElement('div');
            divMenuImage.classList.add('menu-image', 'col2');
            let imgMenuItem = document.createElement('img');
            imgMenuItem.src = menuItem.image;
            divMenuImage.append(imgMenuItem);
            divMenuItem.append(divMenuImage);

            let divMenuDetail = document.createElement('div');
            divMenuDetail.classList.add('menu-detail', 'col10');
            
            let divMenuName = document.createElement('div');
            divMenuName.classList.add('menu-name');
            divMenuName.innerHTML = menuItem.name;
            
            let inputAmount = document.createElement('input');
            inputAmount.type = 'number';
            inputAmount.min = 0;
            inputAmount.value = menuItem.amount;
            inputAmount.classList.add('menu-item-amount');
            inputAmount.addEventListener('change', () => {
                menuItem.amount++;
                this.subTotal += menuItem.price;
                this.onChange(menuItem);
            });
            divMenuName.append(inputAmount);

            divMenuDetail.append(divMenuName);

            let divMenuPrice = document.createElement('div');
            divMenuPrice.classList.add('menu-price');
            divMenuPrice.innerHTML = '$'+menuItem.price + '<span class="menu-indication">' + menuItem.indication+'</span>';
            divMenuDetail.append(divMenuPrice);

            let divMenuDesc = document.createElement('div');
            divMenuDesc.classList.add('menu-desc');
            divMenuDesc.innerHTML = menuItem.description;
            divMenuDetail.append(divMenuDesc);

            divMenuItem.append(divMenuDetail);

            $container.append(divMenuItem);
        });
    }

    displayConfirm($container) {
        $container.empty();
        let totalPrice = 0;
        this.items.forEach(menuItem => {
            if (menuItem.amount <= 0) return;

            let divMenuName = document.createElement('div');
            divMenuName.classList.add('menu-name');
            divMenuName.innerHTML = menuItem.name + ' ($' + menuItem.price.toFixed(2) + ' x ' + menuItem.amount + ')';

            let subTotal = (menuItem.price * menuItem.amount);
            totalPrice += subTotal;

            let divMenuPrice = document.createElement('div');
            divMenuPrice.classList.add('menu-price');
            divMenuPrice.innerHTML = '$'+ subTotal;

            let li = document.createElement('li');
            li.append(divMenuName);
            li.append(divMenuPrice);
            $container.append(li);
        });
        return totalPrice;
    }
}
