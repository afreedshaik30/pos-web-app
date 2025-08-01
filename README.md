# 🛍️ EazyStore - Point of Sale (POS) System for Retail Clothing Shop

## 📌 Overview  
A web-based POS system designed to streamline operations for a retail clothing shop. It includes user-friendly interfaces for managing users, products, sales, inventory, and reports. The system supports secure authentication and role-based access (admin and staff), ensuring efficient and secure store management.

---

## 🚀 Features

- **User Management**  
  Admin and staff roles with secure authentication and password hashing for account privacy.

- **Product Management**  
  Add, edit, and delete clothing items with name, price, and stock details.

- **Sales Processing**  
  Real-time transaction handling with automatic stock updates.

- **Inventory Management**  
  Track stock levels and auto-update after sales or restocking.

- **Report Generation**  
  Generate sales and inventory reports with customizable views.

- **Responsive Interface**  
  Single-page application (SPA) with client-side navigation and search.

- **Deployment**  
  - Backend: Dockerized and deployed to **Render**  
  - Frontend: Hosted on **Netlify**  
  - Database: **MySQL** 

---

## 🗂️ Project Structure

### 🔧 Backend
- **Framework**: Spring Boot  
- **Security**: Spring Security + JWT  
- **Database**: MySQL  
- **Components**: Repositories for users, products, and transactions  

### 🎨 Frontend
- **Tech Stack**: React, Vite, Tailwind CSS  
- **Routing**: React Router  
- **State Management**: Context API (for JWT handling)  
- **HTTP Client**: Axios  

### 🔗 APIs
- Total **13 RESTful APIs** covering user, product, sales, and report management

---

## 🧰 Prerequisites

- Node.js (for frontend)
- Java & Maven (for backend)
- MySQL 
- Docker
- Accounts: [Render](https://render.com), [Netlify](https://netlify.com), [Aiven](https://aiven.io)
- Familiarity with REST APIs & JWT

---

## ⚙️ Installation

### 📦 Backend Setup

```bash
git clone <repository-url>
cd pos-system/backend
```

1. Configure `application.properties`:
   - MySQL connection
   - JWT secret key

2. Build & run:

```bash
mvn clean install
mvn spring-boot:run
```

3. Or use Docker:

```bash
docker build -t pos-backend .
docker push <render-docker-registry>
```

---

### 💻 Frontend Setup

```bash
cd pos-system/frontend
npm install
```

1. Configure `.env`:
   - Backend API base URL
   - Any required keys

2. Start development server:

```bash
npm run dev
```

3. Deploy to Netlify:
   - Push code to GitHub
   - Connect repo on Netlify
   - Set build command: `npm run build`
   - Publish directory: `dist`

---

### 🗃️ Database Setup

- Create MySQL DB
- Run SQL scripts to create tables:

```sql
CREATE TABLE users (...);
CREATE TABLE products (...);
CREATE TABLE transactions (...);
```

- Update backend DB credentials accordingly.

---

## 🔐 Usage

### 👤 Admin Access
- Login to manage staff/products
- View dashboards and reports

### 👥 Staff Access
- Login to process sales
- Update inventory and search products

### 💰 Sales Processing
- Add items to cart
- Complete transactions
- Auto-update stock levels

### 📊 Reports
- Access sales and inventory reports via the admin dashboard

---

## 📡 API Endpoints

| Endpoint | Method | Description | Access Role |
|----------|--------|-------------|-------------|
| `/api/auth/register` | POST | Register a new user | Admin |
| `/api/auth/login` | POST | Authenticate user, return JWT | Admin, Staff |
| `/api/users` | GET | List all users | Admin |
| `/api/users/{id}` | PUT | Update user details | Admin |
| `/api/users/{id}` | DELETE | Delete a user | Admin |
| `/api/products` | POST | Add a product | Admin |
| `/api/products` | GET | List/search products | Admin, Staff |
| `/api/products/{id}` | PUT | Update product | Admin |
| `/api/products/{id}` | DELETE | Delete product | Admin |
| `/api/transactions` | POST | Process transaction | Admin, Staff |
| `/api/transactions` | GET | List all transactions | Admin |
| `/api/reports/sales` | GET | Get sales report | Admin |
| `/api/reports/inventory` | GET | Get inventory report | Admin |

---

## 📝 API Notes

- All endpoints require JWT auth in the `Authorization` header (except login/register)
- **Admin**: Full access  
- **Staff**: Can process sales and view products
- Testing: **Postman**
---
