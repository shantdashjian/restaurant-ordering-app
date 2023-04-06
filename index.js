import {menuArray} from './data.js'

const menuOptions = document.getElementById('menu-options')
const order = []

renderMenuOptions()

function renderMenuOptions() {
    let innerHTML = ''
    menuArray.forEach(menuOption => {
        const ingredients = stringifyIngredients(menuOption);

        innerHTML += `
            <div class="menu-option">
                <div class="emoji">
                  ${menuOption.emoji}
                </div>
                <div class="details">
                  <p class="menu-option-name">${menuOption.name}</p>
                  <p class="menu-option-ingredients">${ingredients}</p>
                  <p class="menu-option-price">$${menuOption.price}</p>
                </div>
                <div class="add-option-btn-container">
					<button class="add-option-btn" data-add-option-id="${menuOption.id}">+</button>				
                </div>
            </div>
        `

    })
    menuOptions.innerHTML = innerHTML
}

function stringifyIngredients(menuOption) {
    let ingredients = ''
    menuOption.ingredients.forEach(ingredient => {
        ingredients += ingredient + ', '
    })
    return ingredients.substring(0, ingredients.length - 1)
}

document.addEventListener('click', (e) => {
    if (e.target.dataset.addOptionId) {
        addMenuOption(e.target.dataset.addOptionId)
    } else if (e.target.dataset.removeOptionId) {
        removeMenuOption(e.target.dataset.removeOptionId)
    }
})

let orderItems = []

function addMenuOption(id) {
    let option = menuArray.filter(option => option.id == id)[0]
    orderItems.push(option)
    renderOrder()
}

function removeMenuOption(id) {
    let option = menuArray.filter(option => option.id == id)[0]
    let index = orderItems.indexOf(option)
    orderItems.splice(index, 1)
    renderOrder()
}

function renderOrder() {
    if (orderItems.length > 0) {
        document.getElementById('order-and-thank-you').classList.remove('hidden')
        document.getElementById('order').classList.remove('hidden')
        document.getElementById('thank-you').classList.add('hidden')
        const orderItemsEl = document.getElementById('order-items')
        let innerHTML = ''
        let totalPrice = 0
        orderItems.forEach(item => {
            totalPrice += item.price
            innerHTML += `
            <div class="order-item">
              <p class="order-item-name">${item.name}</p>
              <button data-remove-option-id="${item.id}" class="order-item-remove">remove</button>
              <p class="order-item-price">$${item.price}</p>
            </div>
        `
        })
        orderItemsEl.innerHTML = innerHTML
        document.getElementById('total-price').innerHTML = `
          <p id="total-price-title">Total price:</p>
          <p id="total-price-value">$${totalPrice}</p>
        `
    } else {
        document.getElementById('order-and-thank-you').classList.add('hidden')
    }
}

const completeOrderBtn = document.getElementById('complete-order-btn')

completeOrderBtn.addEventListener('click', () => {
    let cardDetails = document.getElementById('card-details');
    cardDetails.classList.remove('hidden')
})

const cardDetailsForm = document.getElementById('card-details-form')

cardDetailsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const cardDetailsFormData = new FormData(cardDetailsForm)
    const name = cardDetailsFormData.get('name')
    document.getElementById('card-details').classList.add('hidden')
    let thankYouEl = document.getElementById('thank-you');
    document.getElementById('order').classList.add('hidden')
    thankYouEl.classList.remove('hidden')
    thankYouEl.innerHTML = `
        <p>Thanks, ${name}! Your order is on its way!</p>
    `
    orderItems = []
})
