using System;

namespace BinaryStringAnalyzer.Services;

public class BinaryService
{
    public bool IsGoodBinaryString(string binaryString)
    {
        if (string.IsNullOrWhiteSpace(binaryString)) {
            return false;
        }

        int zeros = 0;
        int ones = 0;

        foreach (char c in binaryString)
        {
            if (c == '0')
            {
                zeros++;
            }
            else if (c == '1')
            {
                ones++;
            }
            else
            {
                return false;
            }
            if (ones < zeros){
                return false;
            }
        }

        return zeros == ones;
    }
}
