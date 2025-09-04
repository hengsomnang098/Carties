

using System.Net;
using Polly;
using Polly.Extensions.Http;
using SearchService.Data;
using SearchService.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddHttpClient<AuctionSvcHttpClient>().AddPolicyHandler(GetPolicy());
builder.Services.AddOpenApi();

var app = builder.Build();


app.UseAuthorization();
app.MapControllers();

app.Lifetime.ApplicationStarted.Register(async () =>
{
    try
    {
        await DbInitializer.InitDB(app);
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.Message);
        // throw;
    }
});





app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy()
=> HttpPolicyExtensions.
HandleTransientHttpError()
.OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
.WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));
