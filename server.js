const express = require("express")

const app = express()

const PORT = 3000

const RESTAURANT = {
  name: "The Green Byte Bistro",
  isOpen: true,
  address: "742 Evergreen Rd, Mapleview, OS 45502",
  phone: "555-321-9876",
  menu: [
    {
      id: 1,
      name: "Quantum Quinoa Mushroom Burger",
      price: 13.0,
      rating: 4,
      category: "mains",
      details:
        "A vegetarian burger made with a quinoa and mushroom patty, it will take you to another realm.",
    },
    {
      id: 2,
      name: "Binary Berry Cheesecake",
      price: 10.11,
      rating: 3,
      category: "desserts",
      details:
        "A creamy cheesecake bursting with flavor. A mix of berries in every byte.",
    },
    {
      id: 3,
      name: "Recursive Rigatoni",
      price: 17.0,
      rating: 5,
      category: "mains",
      details:
        "A classic rigatoni pasta dish, layered with rich tomato sauce and herbs. You'll keep coming back for more.",
    },
    {
      id: 4,
      name: "Pumpkin Pi Squared",
      price: 3.14,
      rating: 5,
      category: "desserts",
      details:
        "A delightful pumpkin dessert, squared and spiced to perfection.",
    },
    {
      id: 5,
      name: "Fibonacci String Bean Fries",
      price: 11.23,
      rating: 5,
      category: "sides",
      details:
        "Crispy and lightly seasoned string bean fries, served in a pattern for a fun twist.",
    },
  ],
}

app.get("/home", (req, res) => {
  res.render("home.ejs", { bistro: RESTAURANT })
})

app.get("/", (req, res) => {
  res.render("home.ejs", { bistro: RESTAURANT })
})

app.get("/menu", (req, res) => {
  res.render("menu.ejs", { menu: RESTAURANT.menu })
})

app.get("/menu/:category", (req, res) => {
  const cat = req.params.category
  const filteredItems = RESTAURANT.menu.filter((item) => item.category === cat)

  const categoryName = cat.charAt(0).toUpperCase() + cat.slice(1)

  res.render("category.ejs", {
    menuItems: filteredItems,
    category: categoryName,
  })
})
app.get("/", (req, res) => {
  res.send("🧑‍🍳 Mongoose Recipes is open for business . . .")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} . . . `)
})
