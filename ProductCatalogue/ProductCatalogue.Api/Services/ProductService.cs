using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ProductCatalogue.Api.Models;
using ProductCatalogue.Configurations;

namespace ProductCatalogue.Api.Services;

public class ProductService {
    private readonly IMongoCollection<Product> _productCollection;

    public ProductService(IOptions<DatabaseSettings> databaseSettings) {
        var client = new MongoClient(databaseSettings.Value.ConnectionString);
        var database = client.GetDatabase(databaseSettings.Value.DatabaseName);
        var indexModel = new CreateIndexModel<Product>(Builders<Product>.IndexKeys.Ascending(product => product.Name).Ascending(product => product.Category));
        _productCollection = database.GetCollection<Product>(databaseSettings.Value.CollectionName);
        _productCollection.Indexes.CreateOne(indexModel);
    }
        

    public async Task CreateProductAsync(Product product) {
        product.DateCreated = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds();
        await _productCollection.InsertOneAsync(product);
        return;
    }

    public async Task<List<Product>> GetProductsAsync(string? name = null, string? category = null) {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Empty;
        var onCategory = !string.IsNullOrEmpty(category);
        var onName = !string.IsNullOrEmpty(name);

        if (onName && onCategory) {
            filter = Builders<Product>.Filter.Eq("Name", name) & Builders<Product>.Filter.Eq("Category", category);
        } else if (onName && !onCategory) {
            filter = Builders<Product>.Filter.Eq("Name", name);
        } else if (!onName && onCategory) {
            filter = Builders<Product>.Filter.Eq("Category", category);
        }

         return await _productCollection.Find(filter).Sort(Builders<Product>.Sort.Descending("DateCreated")).ToListAsync();
    }

    public async Task DeleteProductsAsync(string[] ids) {
        FilterDefinition<Product> filter = Builders<Product>.Filter.In("Id", ids);
        await _productCollection.DeleteManyAsync(filter);
        return;
    }
}