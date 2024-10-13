using DotNetEnv;

namespace ProductCatalogue.Configurations;

public class LoadEnv {
    public LoadEnv() {
        Env.Load();
    }

    public void LoadDBConfigs(dynamic options) {
        options.ConnectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING") ?? string.Empty;
        options.DatabaseName = Environment.GetEnvironmentVariable("DATABASE_NAME") ?? string.Empty;
        options.CollectionName = Environment.GetEnvironmentVariable("COLLECTION_NAME") ?? string.Empty;
    }

    public string GetVariable(string variableName) {
        return Environment.GetEnvironmentVariable(variableName) ?? string.Empty;
    }
}

