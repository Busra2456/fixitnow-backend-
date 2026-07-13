# FixItNow Backend API

##  Developed By: Busra

FixItNow is a complete backend application developed by **Busra** as a home service marketplace system.

This project allows customers to find and book professional technicians, technicians to manage their services and bookings, and admins to manage users and platform activities.

The backend is built with a scalable modular architecture using modern backend technologies.

---

##  Technology Stack

 Node.js
 Express.js
 TypeScript
 Prisma ORM
 PostgreSQL
 JWT Authentication
 SSLCOMMERZ Payment Integration

---

##  Project Features

###  Authentication & Authorization

 User registration and login
 JWT based authentication
 Role based access control
 Secure API authorization

###  Customer Module

 View available services
 Create service booking
 View booking history
 Manage profile
 Submit service reviews

###  Technician Module

 Technician profile management
 Update availability status
 Manage customer bookings
 Accept or decline booking requests
 Complete services

###  Admin Module

 View all users
 Manage user status
 Ban and unbar users

###  Service Module

 Create services
 Get all services
 Get single service details
 Update services
 Delete services

### Booking Module

 Create booking
 View bookings
 Booking status management
 Customer and technician based booking access

###  Payment Module

 Payment creation
 Payment confirmation
 Payment status tracking

###  Review Module

 Customer can review completed services
 Rating system



##  Project Structure

text
src
 ├── app
 ├── modules
 │    ├── auth
 │    ├── user
 │    ├── service
 │    ├── booking
 │    ├── technician
 │    ├── review
 │    └── payment
 ├── middleware
 ├── utils
 └── server.ts

prisma
 └── schema.prisma

postman
 └── FixItNow-Backend-API.postman_collection.json


##  Important Links

###  GitHub Repository

```
https://github.com/Busra2456/your-repository-name
```

###  Postman API Documentation

```
Postman Documentation Link
```

###  Live Server URL

```
backend URL
```

###  Project Demo Video (Optional)

```
video link
```


##  Setup Instructions

Install dependencies:

bash
npm install


##  Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=5000

APP_URL=http://localhost:5000

DATABASE_URL=your_postgresql_database_url

BCRYPT_SALT_ROUNDS=12

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=30d


# SSLCommerz Payment Configuration

SSL_STORE_ID=your_store_id
SSL_STORE_PASSWORD=your_store_password
SSL_IS_LIVE=false
```


Generate Prisma client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
```

Start project:

```bash
npm run dev
```

---

##  API Base URL

```text
http://localhost:5000/api
```

---

##  API Documentation

Postman Collection:

```text
postman/FixItNow-Backend-API.postman_collection.json
```

All APIs were tested using Postman.

---

##  User Roles

| Role       | Responsibility                 |
| ---------- | ------------------------------ |
| CUSTOMER   | Book services and give reviews |
| TECHNICIAN | Manage services and bookings   |
| ADMIN      | Manage users and platform      |

---

##  Development Information

 Developed from scratch by **Busra**
 Backend architecture designed using modular pattern
 Database designed with Prisma ORM and PostgreSQL
 API testing completed with Postman
 Includes authentication, authorization, booking, payment, and review systems

---

##  Author

**Busra**
Full Stack Web Developer
GitHub: Busra2456
