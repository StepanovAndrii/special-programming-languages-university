"use strict";
// Крок 1: Типи товарів
// Крок 2: Функції для роботи з товарами
// Функція для пошуку товару за ID
const findProduct = (products, id) => {
    return products.find(product => product.id === id);
};
// Функція для фільтрації товарів за ціною
const filterByPrice = (products, maxPrice) => {
    return products.filter(product => product.price <= maxPrice);
};
// Функція для додавання товару до кошика
const addToCart = (cart, product, quantity) => {
    if (product.stock < quantity) {
        console.log('Немає достатньо товару на складі!');
        return cart;
    }
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    }
    else {
        cart.push({ product, quantity });
    }
    product.stock -= quantity;
    return cart;
};
// Функція для видалення товару з кошика
const removeFromCart = (cart, productId) => {
    const index = cart.findIndex(item => item.product.id === productId);
    if (index !== -1) {
        cart[index].product.stock += cart[index].quantity;
        cart.splice(index, 1);
    }
    else {
        console.log('Товар не знайдений у кошику');
    }
    return cart;
};
// Функція для зміни кількості товару в кошику
const updateQuantity = (cart, productId, newQuantity) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        if (item.product.stock + item.quantity >= newQuantity) {
            item.quantity = newQuantity;
            item.product.stock -= (newQuantity - item.quantity);
        }
        else {
            console.log('Недостатньо товару на складі');
        }
    }
    else {
        console.log('Товар не знайдений у кошику');
    }
    return cart;
};
// Функція для очищення кошика
const clearCart = (cart) => {
    cart.forEach(item => {
        item.product.stock += item.quantity;
    });
    return [];
};
// Функція для підрахунку загальної вартості кошика
const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};
// Функція для отримання всіх товарів у кошику
const getCartItems = (cart) => {
    return cart.map(item => `${item.product.name} - Кількість: ${item.quantity}`);
};
// Крок 4: Приклад використання
// Тестові дані для електроніки та одягу
const electronics = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        stock: 50,
        description: "Смартфон з високою якістю дисплея",
        category: 'electronics',
        warrantyPeriod: 24,
        brand: "Samsung",
        power: 10,
    },
    {
        id: 2,
        name: "Ноутбук",
        price: 20000,
        stock: 30,
        description: "Потужний ноутбук для роботи і навчання",
        category: 'electronics',
        warrantyPeriod: 36,
        brand: "Dell",
        power: 65,
    }
];
const clothing = [
    {
        id: 3,
        name: "Футболка",
        price: 500,
        stock: 100,
        description: "Комфортна футболка з органічного матеріалу",
        category: 'clothing',
        size: "M",
        material: "cotton",
        color: "blue",
        gender: "unisex",
    },
    {
        id: 4,
        name: "Штани",
        price: 800,
        stock: 80,
        description: "Модні штани з еластичного матеріалу",
        category: 'clothing',
        size: "L",
        material: "denim",
        color: "black",
        gender: "men",
    }
];
// Приклад використання функцій
// Додавання товарів до кошика
let cart = [];
const phone = findProduct(electronics, 1);
if (phone) {
    addToCart(cart, phone, 1); // Додаємо телефон в кошик
}
const tshirt = findProduct(clothing, 3);
if (tshirt) {
    addToCart(cart, tshirt, 2); // Додаємо футболку в кошик
}
console.log("Кошик після додавання товарів:", getCartItems(cart));
// Оновлення кількості товару
updateQuantity(cart, 1, 2); // Оновлюємо кількість телефону до 2
console.log("Кошик після оновлення кількості товару:", getCartItems(cart));
// Видалення товару з кошика
removeFromCart(cart, 3); // Видаляємо футболку з кошика
console.log("Кошик після видалення товару:", getCartItems(cart));
// Очищення кошика
cart = clearCart(cart);
console.log("Кошик після очищення:", getCartItems(cart));
// Підрахунок загальної вартості кошика 
const total = calculateTotal(cart);
console.log("Загальна вартість кошика:", total);
