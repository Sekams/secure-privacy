using Xunit;
using BinaryStringAnalyzer.Services;

namespace BinaryStringAnalyzer.UnitTests.Services
{
    public class BinaryService_IsGoodBinaryShould
    {
        private readonly BinaryService _binaryService;

        public BinaryService_IsGoodBinaryShould()
        {
            _binaryService = new BinaryService();
        }

        [Theory]
        [InlineData("1100")]
        [InlineData("111000")]
        public void IsGoodBinary_ValueIsBinary_ReturnTrue(string value)
        {
            bool result = _binaryService.IsGoodBinaryString(value);

            Assert.True(result, $"{value} should be a good binary string");
        }

        [Theory]
        [InlineData("")]
        [InlineData(" ")]
        [InlineData("110")]
        [InlineData("1101")]
        [InlineData("0011")]
        public void IsGoodBinary_ValueIsNotGoodBinary_ReturnFalse(string value)
        {
            bool result = _binaryService.IsGoodBinaryString(value);

            Assert.False(result, $"{value} should not be a good binary string");
        }
    }
} 