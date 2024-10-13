using System.Numerics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProductCatalogue.Api.Models;

public class Product {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("Name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("Category")]
    public string Category { get; set; } = string.Empty;

    [BsonElement("Condition")]
    public string Condition { get; set; } = string.Empty;

    [BsonElement("Price")]
    public int Price { get; set; } = 0;

    [BsonElement("Image")]
    public string Image { get; set; } = string.Empty;

    [BsonElement("DateCreated")]
    public long DateCreated { get; set; } = 0;
}