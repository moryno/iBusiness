# iBussiness Design

## By Maurice Nganga
## By James Maina
## By Joseph Mwita



![Medicine](./src/assests/medication-land.png)

## Table of Content

- [Description](#description)
- [Features](#features)
- [Development](#development)
- [Live Link](#live-link)
- [Setup Instructions and Technology](#technology-used)
- [License](#license)



### Technology Used

---

- **React** - help in creating interactive website

- **DevExtreme** - framework was used to add basic tables and data tables in the admin dashboard to display the products, users and orders. As well as adding icons in the website.

- **Redux** - to help persist a logged in user and modules across all pages in the website and enable them with accessibility privilages.

- **SQL Server** - 

## Instructions

### To have the admin privileges then you have to do the following.

- If you are in the landing page and you are logged in the click on the signin buttton and that will take you to the login page.
- If you are already signed in as a different user then signout the click on the signin button.
- Enter **admin** as username and **123456** as the password and this will take you to the landing page.
- You'll see a button labeled dashboard which you can click and this will send you to the admin dashboard.
- While here you'll have access to the sidebar where you can view users and products.
- Click on products and this will take you to a page with all the products filtered in 5 per page.
- If you click on the **View** button on any product this will take you to a single page where you see more details about the product. It also provides you with a form where you can update the product.
- In the procucts page at the top right corner there is a **Add New** button that will take you to a new page where you can create a new product.
- Also in the products page you can delete a product by clicking the **Delete** button.
- Clicking in the logo will take you back to the landing page.

### To have the user privileges then you have to do the following.

- In the landing page click the signin button at the navbar or the signup button in the filter component section.
- This will take you to **register** page where you can enter your details.
- After successfully login then you can click the profile avatar at navbar and this will take you to **settings** page where you can enter your profile details including image, address and phone number.
- A user has privilege to leave a review in single product.

## Development

---

## Available Scripts

In the project directory, you can run:

### USING NPM

`npm install`

`npm run start`

`npm run build`

### Live Link

---

\- Click this link to see the live website [iBusiness](https://ibusiness-git-main-moryno.vercel.app/)

## License

---

MIT License

Copyright (c) [2023] [Maurice Nganga]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
