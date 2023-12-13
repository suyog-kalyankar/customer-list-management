# Introduction
This GitHub repository contains the source code for a Customer Management System built using React, TypeScript, and Ant Design. The system allows users to manage a list of customers with functionalities such as viewing active and inactive customers, adding new customers, editing customer details, and deleting inactive customers.

## Table of Contents
1. [Installation](link)

2. [Usage](link)

3. [Features](link)

4. [Project Structure](link)

## Installation
1. Clone the repository:
```git clone https://github.com/suyog-kalyankar/customer-list-management.git```

2. Install dependencies:
```cd ccustomer-list-management```
```npm install```
## Usage
Run the application locally:
```npm start```
The application will be available at http://localhost:3000.

Visit http://localhost:3000 in your browser to view the Customer list Management.

## Features
### 1. View Customers
2. The system fetches a list of customers from an API.
3. Customers are displayed in an Ant Design table.
4. Pagination is implemented for better navigation.

### 2. Filter Customers
1. Two checkboxes, one for active and one for inactive customers, allow users to filter the displayed customers.
2. By default, both checkboxes are selected, showing both active and inactive customers.

### 3. Add New Customer
1. Users can add a new customer by clicking the "+ Add Customer" button.
2. The system displays a form with validations for creating a new customer.

### 4. Edit Customer
1. Edit actions are available for each row in the table.
2. Clicking the edit action opens the customer form with pre-filled data for editing.

### 5. Delete Customer
1. Delete actions are available for each row, but only for inactive customers.
2. Deleting an inactive customer removes them from the list.

### 6. Filter Customer by Industries
1. Filter customers by single or multi-select industries
2. Clicking on filter icon near Industry header, opens industry selector modal.

## Project Structure
The project structure is organized as follows:

1. src/
2. components/: React components, including the customer table and form.
3. api/: Service for calling an api
4. hooks/: Custom hooks for fetching customers and managing customer columns.
5. types/: TypeScript type definitions.
6. constants/: Constants such as action types and labels.
7. App.tsx: The main application component.


