# ProductCatalogue.Api

This is the API for the Product Catalogue app. It provides endpoints to manage
and retrieve product information.

## Prerequisites

- [.NET Core 8](https://dotnet.microsoft.com/download/dotnet/8.0)
- [MongoDB 8](https://www.mongodb.com/try/download/community)

## Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/sekams/secure-privacy.git
   ```

   ```sh
   cd secure-privacy/ProductCatalogue/ProductCatalogue.Api
   ```

2. **Restore dependencies:**

   ```sh
   dotnet restore
   ```

3. **Setup the database:**

   - Run the MongoDB server and set up a user, a database and a collection
   - Note the connection string, database name and the collection name

4. **Setup environment variables:**

   - Create a `.env` file in the project root folder `appsettings.json`
   - Use the variables names in `.example.env` file to populate the `.env` file

5. **Run the application:**
   ```sh
   dotnet run
   ```

## Usage

The API will be available at `https://localhost:5231` by default. You can use
tools like [Postman](https://www.postman.com/) to interact with the endpoints.

## Endpoints

The endpoints of the API can be tested at `/swagger/index.html`. They include:

- `GET /api/product` - Retrieve all products
- `POST /api/product` - Save a product
- `DELETE /api/product?ids=[ids]` - Delete products by their ids
