# CS208 Full Stack Final Project - Downtown Donuts Website

- Name: Rob Gonzalez
- GitHub: [https://github.com/rob-gonzalez38/CS208-Final](https://github.com/rob-gonzalez38/CS208-Final)
- Term: Spring 2026

## Project Description

This project is a full-stack website prototype for Downtown Donuts, a family-owned donut and coffee shop established in 1992. The goal of this prototype is to demonstrate both front-end design and back-end functionality in order to simulate a freelance pitch for a real client.

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/rob-gonzalez38/CS208-Final.git
cd CS208-Final
```

### 2. Install dependencies

```bash
npm install
```
### 3. Install & start database

```bash
./setup_scripts/install_db.sh
```

### 4. Create the database and tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_demo_table.sql
```

When promped for a password, enter: 12345

### 5. Run the Application

Start the application using the following command:

```bash
npm start
```

When promted, open the browser on port 3000.