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
1. The system fetches a list of customers from an API.
2. Customers are displayed in an Ant Design table.
3. Pagination is implemented for better navigation.
4.  [view-customers.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/37c2f775-e28d-4b11-912a-6190aa246138)


### 2. Filter Customers
1. Two checkboxes, one for active and one for inactive customers, allow users to filter the displayed customers.
2. By default, both checkboxes are selected, showing both active and inactive customers.
3. [filter-customers.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/89ff5581-b8e8-4beb-bec6-0534cb0cce27)

 
### 3. Add New Customer
1. Users can add a new customer by clicking the "+ Add Customer" button.
2. The system displays a form with validations for creating a new customer.
3. [add-customer.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/873b2140-46d3-41eb-84d1-d5e55b691042)


### 4. Edit Customer
1. Edit actions are available for each row in the table.
2. Clicking the edit action opens the customer form with pre-filled data for editing.
3. [edit-customer.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/edb28fce-95a2-4124-a13f-0e116670268f)


### 5. Delete Customer
1. Delete actions are available for each row, but only for inactive customers.
2. Deleting an inactive customer removes them from the list.
3. [delete-customer.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/0c6d203b-c5a1-4bcb-9507-4c651615781b)


### 6. Filter Customer by Industries
1. Filter customers by single or multi-select industries
2. Clicking on filter icon near Industry header, opens industry selector modal.
3. [filter-industry.webm](https://github.com/suyog-kalyankar/customer-list-management/assets/30463183/3ee8eda6-bec9-427e-ae21-ce2c5ec02acb)


## Project Structure
The project structure is organized as follows:

1. src/
2. components/: React components, including the customer table and form.
3. api/: Service for calling an api
4. hooks/: Custom hooks for fetching customers and managing customer columns.
5. types/: TypeScript type definitions.
6. constants/: Constants such as action types and labels.
7. App.tsx: The main application component.



