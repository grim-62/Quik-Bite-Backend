# Quik-Bite Documentation

## Project Overview

Quik-Bite is a food delivery API that provides access to a range of restaurants, enabling users to browse menus, place orders, perform action and track delivery status.


## Technologies Used
- **Frontend:** React.js, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **File Storage:** (`imagekit.io`)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Access to Imagekit api

### Clone the Repository
```bash
git clone https://github.com/grim-62/Quik-Bite-Backend.git
```

### Install Dependencies
```bash
npm install
```

### Create a `.env` File
Create a `.env` file in the root directory and add the following environment variables:
```plaintext
PORT = your_PORT - 3000 || 8080 

MONGODB_URL = your_mongodb_url

EXPRESS_SESSION_SECRET= yout_express_session-secret

JWT_EXPIRES_IN= your_jwt_expires

JWT_SECRET = your_jwt_secret

JWT_EXPIRE = token_expire_time

PUBLIC_KEY_IMAGEKIT = your_public_key-imagekit

PRIVATE_KEY_IMAGEKIT = your_private_key-imagekit

ENDPOINT_URL_IMAGEKIT = your_endpoint_url-imagekit
```
if any problem there is a `.env.sample`file in the root directory you can replicate it .

### Start the Server
```bash
npm run dev
```
The server will run on `http://localhost:8080`.

### Base URL
`http://localhost:8080/api`


---
# API Documentation

## Auth Routes
**Base Path**: `/auth`

1. **POST** `/sign-up`
   - **Request Body**: 
     ```json
     {
       "username": "string",
       "password": "string",
       "email": "string",
     }
     ```
   - **Response**: 
     ```json
     {
       "message": "User registered successfully!",
       "token": "string",
       "user": { ... }
     }
     ```

2. **POST** `/sign-in`
   - **Request Body**: 
     ```json
     {
       "username": "string",
       "password": "string"
     }
     ```
   - **Response**: 
     ```json
     {
       "token": "string",
       "role": "string",
       "details": {...}
     }
     ```

3. **POST** `/sign-out`
   - **Request**: Requires authentication (`isAuthorized`)
   - **Response**: 
     ```json
     {
       "message": "User logged out successfully"
     }
     ```
4. **POST** `/reset-password`
   - **Request**: Requires authentication (`isAuthorized`)
   - **Request Body**: 
     ```json
     {       
       "new_password": "string",
       "confirm_password": "string"
     }
     ```
      **Response**: 
     ```json
     {
       "message": "reset-password successfully"
     }
     ```

## Users Routes
**Base Path**: `/user`

1. **GET** `/profile`
    - **Request**: Requires authentication (`isAuthorized`)
    - **Response**: 
     ```json
     {
       "message": "Returns user profile details, including name, email, avatar URL, and other profile information.",
       "user": { ... }
     }
     ```
2. **POST** `/user-update`
   - **Request**: Requires authentication (`isAuthorized`)
   - **Request Body**: 
     ```json
     {
       "userdetails": { ... }
     }
     ```
   - **Response**: 
     ```json
     {
       "message" : "user details updated"
     }
     ```
3. **POST** `/user-avatar`
   - **Request**: Requires authentication (`isAuthorized`)
   - **Request Body**: 
     ```json
     {
       "file": "avatar-file || image"
     }
     ```
   - **Response**: 
     ```json
     {
        "URL": "url of image",
       "message" : "image updated successfully"
     }
     ```
3. **POST** `/delete-user`
   - **Request**: Requires authentication (`isAuthorized`)
   - **Request Body**: 
     ```json
     {
       "message" :"take confirmation for deletion account" 
     }
     ```
   - **Response**: 
     ```json
     {
       "message" : "user deleted successfully"
     }
     ```
