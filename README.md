# Embedded JavaScript (EJS) Homework

![Banner](./images/banner.png)


## Overview

In this deliverable, you're going to create a dynamic website for our fictional restaurant - "The Green Byte Bistro."  This lab is all about practically applying your skills and using EJS templates in an Express application.


## Getting Started

- **Fork** and **clone** this repository
- `cd` into the newly created directory
- Run `npm install` to install dependencies
  - `express` and `ejs` have been provided
- Run `npm run dev` to spin up your Express server


## What You'll Build

You're going to create a vibrant, interactive website for The Green Byte Bistro. This website will feature:
- **Homepage:** Displays key details of the bistro - name, address, and contact info.
- **Nav Bar:** Includes links to various sections of the site.
- **Menu Page:** Showcases the menu, sorted into mains, desserts, and sides.
- **Category Page:** Generates pages for each menu type, using route parameters for content rendering.


## First Things First

First, copy and paste the following data to be used in the lab above your `/` route in **`server.js`**:

```js
const RESTAURANT = {
  name: 'The Green Byte Bistro',
  isOpen: true,
  address: '742 Evergreen Rd, Mapleview, OS 45502',
  phone: '555-321-9876',
  menu: [
    {
      id: 1,
      name: 'Quantum Quinoa Mushroom Burger',
      price: 13.00,
      rating: 4,
      category: 'mains',
      details: 'A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.'
    },
    {
      id: 2,
      name: 'Binary Berry Cheesecake',
      price: 10.11,
      rating: 3,
      category: 'desserts',
      details: 'A creamy cheesecake bursting with flavor. A mix of berries in every byte.'
    },
    {
      id: 3,
      name: 'Recursive Rigatoni',
      price: 17.00,
      rating: 5,
      category: 'mains',
      details: 'A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You\'ll keep coming back for more.'
    },
    {
      id: 4,
      name: 'Pumpkin Pi Squared',
      price: 3.14,
      rating: 5,
      category: 'desserts',
      details: 'A delightful pumpkin dessert, squared and spiced to perfection.'
    },
    {
      id: 5,
      name: 'Fibonacci String Bean Fries',
      price: 11.23,
      rating: 5,
      category: 'sides',
      details: 'Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.'
    }
  ]
}
```


### Exercise 1: Create a Homepage


#### Create a View

1. Create an **`home.ejs`** file inside of your `views` directory. Once created, add the following boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
  </head>
  <body>
    <h1>Home Page</h1>
  </body>
</html>
```


#### Modify the Route

2. Now modify the existing route that handles the homepage `/` request. Update this route to render the `home.ejs` template in response to a request.

> 👀 When you refresh your browser, it should now be rendering the `<h1>` with the content `Home Page`.


#### Send Data to View

3. Using the `locals object`, send the `RESTAURANT` data from `server.js` to the `home.ejs` view.

4. Using EJS tags, update your HTML to display the restaurant details. Include `name`, `address`, and `phone`.

5. Update the `<title>` of your `home` page to dynamically match the restaurant name.

6. ***Level-Up:*** Include conditional rendering to add the line "Yes we are open!" to the page if the restaurant `isOpen`, and "Sorry, we are closed." otherwise.

<br>


### Exercise 2: Create a Nav Bar


#### Create a Nav Partial

1. Create a `partials` directory inside your `views` directory.
2. Inside `partials`, create a `nav.ejs` file.

Add the following code to `nav.ejs`:

```html
<nav>
  <a href="/">Home</a>
  <a href="/menu">Full Menu</a>
</nav>
```


#### Add Partial to `home` Page

Add your partial file to the top of the `<body>` in `home.ejs`

```html
<%- include('./partials/nav') %>
```

> 👀  Refresh to see a new nav bar appear.


#### Create a New Route

3. Create a new `menu` route in `server.js`

    - `GET` route to `/menu`
    - `res.render()` a `menu.ejs` view *(created next)*


#### Create a Matching View

4. Create a `menu.ejs` view for this new route in the `views` directory.

5. Add boilerplate HTML to your new view:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
  </head>
  <body>
    <h1>Full Menu</h1>
  </body>
</html>
```

> 👀 Test your new view in the browser. You should see "Full Menu" on the page.

6.  Add your `nav.ejs` partial to your menu page.


#### Send Data to View

1. Using the `locals object`, pass the `menu` array data from `server.js` to the `menu.ejs` view.

2. In `menu.ejs`, Use a `forEach()` loop, to render each of the menu items and their details to the page. Include `name`, `price`, `rating` and `details` for each item.

3. ***Level Up***: Using conditionals, refactor your code to render the items under three separate `<h2>` headers based on the category of the dish- `"Mains"` `"Desserts"` or `"Sides"`.

<br>


### Exercise 3: Create a Separate Page for Menu Categories


#### Create New Links in the Nav

1. Add the following new links to `nav.ejs`

```html
<nav>
  <a href="/">Home</a>
  <a href="/menu">Full Menu</a>
  <!-- new links below-->
  <a href="/menu/mains">Mains</a>
  <a href="/menu/desserts">Desserts</a>
  <a href="/menu/sides">Sides</a>
</nav>
```


#### Create a New Route

1. Create a new `/menu/:category` route in `server.js`

    - `GET` route to `/menu/:category` that uses route parameters to determine the menu category being passed to that route
    - `res.render()` a `category.ejs` view *(created next)*


#### Create a Matching View

4. Create a `category.ejs` view for this new route in the `views` directory.

5. Use `menu.ejs` as an example and add boilerplate HTML to your new view. Make sure to add the `nav` partial to the top of the page.


#### Send Data to View

1. Using the `locals object`, pass an array of data called `menuItems` containing ***only*** items that match the `req.params` category to the `category.ejs` view. Best practice dictates that this data should be filtered *before* it is sent to the view. This can be done in the route handler with a `for loop` or the `.filter()` method.

2. Send the category `name` in the `locals object` along with the filtered menu data. *Level-Up: Capitalize the first letter for a better UI experience.*

3. Once in the view, use a `forEach()` loop, to render each of the menu items and their details to the page. Include `name`, `price`, `rating` and `details` for each item.

4. Add the name of the category to the `<title>` of the page and to an `<h1>`.


### Exercise 4: Add a Star Rating

Some menu items have a 5 star rating from guests. These are known as "guest favorites" by the staff.

1.  Use inline conditional rendering to add a star emoji `"⭐"` next to the title of any menu item that has a rating of 5.


## Submission Guidelines

- PR must be submitted utilizing these guidelines: [PR Guidelines](https://github.com/SEB-Core/pr_template)


## Resources

- [EJS](https://ejs.co/)
