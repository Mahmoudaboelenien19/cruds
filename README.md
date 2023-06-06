# CrudCastle

This is a full-stack web application built with PostgreSQL, Node.js, JavaScript, CSS, and HTML. It allows users to perform CRUD operations on a database of products, including viewing, adding, editing, and deleting products.

## Features

- **CRUD Operations** - Users can perform CRUD operations on a database of products, including viewing, adding, editing, and deleting products.

- **User Profile Management** - Users can update their profile information and profile image.

- **Authentication and Authorization** - The system requires users to authenticate before they can access the product management features. Users can only delete and update products that they created, while all products are visible to all authenticated users.

- **Custom Popups** - The system includes custom popups for every action, such as confirmation of deleting a product.

- **Responsive Design** - The user interface is designed to be responsive, providing a seamless experience across different screen sizes and devices.

- **Search** - Users can search for products by name or category.

- **Error Handling** - The system includes proper error handling to provide users with appropriate feedback when errors occur.

- **Logging** - The system includes logging to capture important events and errors.

- **Light and Dark Theme**- Users can switch between light and dark theme to customize their user experience.

## Installation

To install and run this application, follow these steps:

1. Clone the repository onto your local machine.
2. Install Node.js and PostgreSQL if you haven't already.
3. Create a new PostgreSQL database for the application.
4. Set the following environment variables in a `.env` file located in the project root directory:

```
POSTGRES_HOST=your_postgres_host
POSTGRES_DB=your_postgres_db
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_TEST_DB=your_postgres_test_db
NODE_ENV=development
BCRYPT_PASSWORD=your_bcrypt_password
SALT_ROUNDS=your_salt_rounds
TOKEN_SECRET=your_token_secret
Refresh_TOKEN_SECRET=your_refresh_token_secret
CLOUD_ACCESS=your_cloud_access
API_KEY=your_api_key
API_SECRET=your_api_secret
```

Replace `your_postgres_host`, `your_postgres_db`, `your_postgres_user`, `your_postgres_password`, `your_postgres_test_db`, `your_bcrypt_password`, `your_salt_rounds`, `your_token_secret`, `your_refresh_token_secret`, `your_cloud_access`, `your_api_key`, and `your_api_secret` with your own values.

5. In the project root directory, run `cd backend && npm install` to install the necessary Node.js modules for the backend.
6. Navigate to the `client` directory and run `npm install` to install the necessary Node.js modules for the frontend.
7. In the project root directory, run `npm run migrate` to run the migration script and create the necessary tables in the database.
8. In the project root directory, run `npm run dev` to start the backend and frontend in development mode.

Once the backend is running, you can access the application by navigating to `http://localhost:5000` in your web browser.

## Skills

- **PostgreSQL** - Experience working with PostgreSQL databases, including creating tables, writing queries, and managing data.

- **HTML/CSS/JavaScript** - Proficient in using HTML, CSS, and JavaScript to create responsive and interactive web applications.

- **Authentication and Authorization** - Experience implementing user authentication and authorization using technologies such as Passport.js and JSON Web Tokens (JWT).

- **Bcrypt** - Experience using Bcrypt for password hashing and salting to securely store user passwords.

- **Express** - Proficient in using Express to create RESTful APIs and web applications.

- **Node.js** - Experience working with Node.js to build server-side applications.

- **Authorization** - Experience implementing user authorization to restrict user access to certain resources.

- **Git** - Experience using Git for version control and collaboration.

- **Debugging** - Experience with debugging tools and techniques to diagnose and fix issues in code.
