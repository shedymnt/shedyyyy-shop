
//this function named factory takes four parameters: id, name, price, and image and return an object with these properties It returns an object with these properties
function factory(id, name, price, image) {
    return {
        id: id,
        name: name,
        price: price,
        image: image,  
    }
}
//The array have a list of motorcycle objects, which are created using the factory function and every object has an id, name, price, and image
var motors = [
    factory(1,"NINJA H2R", 290000, "https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190256_960_720.jpg"),
    factory(2,"R1M", 1900000, "https://www.motoplanete.com/yamaha/zoom-700px/10123-R1M-1000-2024-1000px.webp"),
    factory(3,"GSX-R1000", 390000, "https://lh5.googleusercontent.com/proxy/Bv4G3RC8PCEaJzAU17iuCaJD-LGfTNyFeaUG0JQFPOJf3PxGPOhMYzL08ylm-RXa2tEkEcVaw8rBA2xgRvwM3IXw9dzJNiSskKNcV-kBayXKAtfYl-QlCOLodOM8bi7tEm1WELowU6rx4bqtuEZbt5xjvFo"),
    factory(4,"HP4", 150000, "https://www.motoplanete.com/bmw/zoom-700px/BMW-S-1000-RR-HP4-Race-2020-700px.webp"),
    factory(5,"APRILIA RS ", 150000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBV7NdRYvc7Z-WVw6-BouUaFCralSJejkpA&s"),
    factory(6,"PULSAR RS", 180000, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUIvFPFYgSBQGq-jIWlvPu3iIDEq9niGT8w&s")
]
var cart = JSON.parse(localStorage.getItem('cart')) || []  // stock cart in local storge

// Function display motors list
function displayMotors() {
    var productsList = document.getElementById("products-list")
    productsList.innerHTML = ''
    for (var i = 0; i < motors.length; i++) {
        var motor = motors[i]
        var motorDiv = document.createElement('div')
        motorDiv.className = 'motor'
        motorDiv.innerHTML = `
            <img src="${motor.image}" alt="${motor.name}" class="motor-image">
            <h3>${motor.name}</h3>
            <p>Price: $${motor.price}</p>
            <button onclick="addToCart(${motor.id})">Add to Cart</button>
            <button onclick="deleteMotor(${motor.id})">Delete Motor</button>
        `
        productsList.appendChild(motorDiv)
    }
}
// Function add to cart This function adds a motor to the cart and search the id of the motor in the motors array
//If find it add it to the cart array and saves the cart to localStorage.
//then update the cart count on the page and displays the updated the items 
function addToCart(id) {
    var motor = null
    for (var i = 0; i < motors.length; i++) {
        if (motors[i].id === id) {
            motor = motors[i]
        }
    }
    if (motor) {
        cart.push(motor)
        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartCount()
    }
    displayCartItems()
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length
}//This function update the cart count displayed on the page

// Function toggle the cart If the cart is currently displayed it hide it if it's hide it display it and show the cart items
function toggleCart() {
    var cartContainer = document.getElementById('cart-container')
    if (cartContainer.style.display === 'block') {
        cartContainer.style.display = 'none'
    } else {
        cartContainer.style.display = 'block'
        displayCartItems()
    }
}

// Function display items This function displays the items in the cart.If the cart is empty, it shows a message saying "Your cart is empty"If there are items in the cart it creates a list  containing the motor's image, name, price, and a button to remove the motor from the cart

function displayCartItems() {
    var cartItemsList = document.getElementById('cart-items')
    cartItemsList.innerHTML = ""
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty</p>'
    } else {
        for (var i = 0; i < cart.length; i++) {
            var motor = cart[i];
            var cartItemDiv = document.createElement('li')
            cartItemDiv.className = 'cart-item'
            cartItemDiv.innerHTML = `
                <img src="${motor.image}" alt="${motor.name}" 
                <div class="info">
                    <h3>${motor.name}</h3>
                    <p>Price: $${motor.price}</p>
                </div>
                <button onclick="removeFromCart(${motor.id})">Remove</button>
            `
            cartItemsList.appendChild(cartItemDiv)
        }
    }
}

// Checkout This function handles the checkout process.If the cart is empty, it shows an alert saying "Your cart is empty!"If there are items in the cart it displays a "Thank you for your purchase!" message clear the cart updates the cart count
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!")
    } else {
        alert("Thank you for your purchase!")
        cart.length = 0
        updateCartCount()
        toggleCart()
    }
}

// Function remove item After removing the item it update the cart in localStorage updates the cart count and displays the items
function removeFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart.splice(i, 1)
            i--
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    updateCartCount()
    displayCartItems()
}

// Login function you put your name and your password If both are provided it save the name to localStorage shows a success alert
function login() {
    var username = document.getElementById('username').value
    var password = document.getElementById('password').value

    if (username && password) {
        localStorage.setItem('username', username)
        alert('Logged in successfully!')
        document.getElementById('login-section').style.display = 'none'
        displayMotors();
    } else {
        alert('Please enter valid credentials!')
    }
}

if (!localStorage.getItem('username')) {
    document.getElementById('login-section').style.display = 'block'  
} else {
    document.getElementById('login-section').style.display = 'block'  
    displayMotors() ;
}
// add motor This function give the user the acces to add a new motor to the list
function addMotor() {
    var name = prompt("Enter motor name:")
    var price = parseFloat(prompt("Enter motor price:"))
    var image = prompt("Enter image URL:")

    if (name && price && image) {
        var newMotor = factory(motors.length + 1, name, price, image)
        motors.push(newMotor)
        displayMotors()
    } else {
        alert("Invalid motor details")
    }
}
// delete motor This function give the user the acces to delete a motor from the list by his id

function deleteMotor(id) {
    var motor = motors.findIndex(function(motor) {
        return motor.id === id
    })

    if (motor !== -1) {
        motors.splice(motor, 1)
        displayMotors()
        alert("Motor deleted successfully!")
    } else {
        alert("Motor not found!")
    }
}


// Search you can search on any motor in the shop 
function searchFunction() {
    var query = document.querySelector('input[type="text"]').value.toLowerCase()
    var filteredMotors = []
    
    for (var i = 0; i < motors.length; i++) {
        if (motors[i].name.toLowerCase().includes(query)) {
            filteredMotors.push(motors[i])
        }
    }

    var productsList = document.getElementById('products-list')
    productsList.innerHTML = ""

    for (var i = 0; i < filteredMotors.length; i++) {
        var motorDiv = document.createElement("div")
        motorDiv.className = "motor"
        motorDiv.innerHTML = `
            <img src="${filteredMotors[i].image}" alt="${filteredMotors[i].name}">
            <h3>${filteredMotors[i].name}</h3>
            <p>Price: $${filteredMotors[i].price}</p>
            <button onclick="addToCart(${filteredMotors[i].id})">Add to Cart</button>
        `;
        productsList.appendChild(motorDiv);
    }

    updateCartCount()
}

