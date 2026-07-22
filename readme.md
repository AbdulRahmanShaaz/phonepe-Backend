# PhonePe Backend 

A REST API backend inspired by PhonePe built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

---

# Features

- User Registration
- User Login
- JWT Authentication
- Set MPIN
- Wallet
    - Add Money
    - Pay Bills
- Send Money
- Transaction History
- Swagger API Documentation

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Swagger Autogen

---

# Folder Structure

```
PhonePe Backend
│
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   └── utils
│
├── swagger.js
├── swagger-output.json
├── server.js
├── package.json
└── README.md
```

---

# Installation

```bash
git clone <repository-url>

cd phonepe-backend

npm install
```

Create a `.env` file using `.env.example`

```
PORT=5000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret
```

Run

```bash
node swagger.js
```

Start server

```bash
npm start
```

or

```bash
nodemon server.js
```

---

# Swagger Documentation

After starting the server

```
http://localhost:5000/api-docs
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/set-mpin |
| GET | /api/auth/profile |

---

## Wallet

| Method | Endpoint |
|----------|----------------|
| POST | /api/wallet/addMoney |
| POST | /api/wallet/payBill |

---

## Transactions

| Method | Endpoint |
|----------|----------------|
| POST | /api/transactions/send |
| GET | /api/transactions/history |

---

# Authentication

Protected routes require

```
Authorization

Bearer YOUR_JWT_TOKEN
```

---

# Project Flow

```
Register

↓

Login

↓

Receive JWT

↓

Set MPIN

↓

Add Money

↓

Send Money

↓

Pay Bills

↓

View Transaction History
```

---

# Database Models

## User

- name
- email
- phone
- password
- upID
- MPIN
- balance

---

## Transaction

- sender
- receiver
- amount
- billerName
- types
- status

---

# Future Improvements

- MongoDB Transactions (Sessions)
- Razorpay Integration
- QR Payments
- Notifications
- Refresh Tokens
- Pagination
- Rate Limiting

---

# Author

Developed using **Node.js**, **Express.js**, and **MongoDB**.