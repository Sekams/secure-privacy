using Microsoft.AspNetCore.Mvc;
using ProductCatalogue.Api.Models;
using ProductCatalogue.Api.Services;

namespace ProductCatalogue.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly ProductService _productService;

    public ProductController(ILogger<ProductController> logger, ProductService productService)
    {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet()]
    public async Task<List<Product>> Get([FromQuery] string? name, [FromQuery] string? category) {
        return await _productService.GetProductsAsync(name, category);
    }

    [HttpPost()]
    public async Task<IActionResult> Post([FromBody] Product product) {
        await _productService.CreateProductAsync(product);
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }

    [HttpDelete()]
    public async Task<IActionResult> Delete([FromQuery] string[] ids) {
        await _productService.DeleteProductsAsync(ids);
        return NoContent();
    }
}
