using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json.Linq;

namespace ReactApp3.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static JToken? periods;

        static List<WeatherForecast> forecastList = new List<WeatherForecast>();


        static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //https://api.weather.gov/stations/KPYM/observations/latest
        
        public static async void GetForecast()
        {
            string baseUrl = "https://api.weather.gov/stations/KPYM/";
            //string forecastUrl = "https://api.weather.gov/gridpoints/BOX/41,70/forecast/hourly?units=us";

            int lat = 0;
            int lng = 0;

            try
            {
                //We will now define your HttpClient with your first using statement which will use a IDisposable.
                using (HttpClient client = new HttpClient())
                {

                    client.DefaultRequestHeaders.Add("User-Agent", "C# App");
                    //In the next using statement you will initiate the Get Request, use the await keyword so it will execute the using statement in order.
                    //The HttpResponseMessage which contains status code, and data from response.
                    using (HttpResponseMessage res = await client.GetAsync(baseUrl))
                    {
                        //Then get the data or content from the response in the next using statement, then within it you will get the data, and convert it to a c# object.
                        using (HttpContent content = res.Content)
                        {
                            //Now assign your content to your data variable, by converting into a string using the await keyword.
                            string data = await content.ReadAsStringAsync();
                            //If the data isn't null return log convert the data using newtonsoft JObject Parse class method on the data.
                            if (data != null)
                            {
                                //Parse your data into a object.      
                                Console.WriteLine("Check 1:");
                                Console.WriteLine("--------------");
                                Console.WriteLine(data);
                                JObject dataObj = JObject.Parse(data);
                                //ToDo use this dataObject to get Coordinates then ping for the forcast
                                JToken? geometry = dataObj["geometry"];
                                if (geometry != null && geometry.HasValues)
                                {
                                    JToken? coords = geometry["coordinates"];
                                    //if (coords != null && coords.HasValues) { 
                                    if (coords != null && coords.HasValues)
                                    {
                                        lat = (int)coords[1];
                                        lng = (int)coords[0];
                                    }
                                }
                            }
                            else
                            {
                                Console.WriteLine("NO Data----------");
                            }
                        }
                    }

                    string template_url = "https://api.weather.gov/gridpoints/BOX/{0},{1}/forecast/hourly?units=us";
                    lng = Math.Abs(lng);
                    string formatted_url = string.Format(template_url, lat, lng);

                    client.DefaultRequestHeaders.Add("User-Agent", "C# App");
                    using (HttpResponseMessage res = await client.GetAsync(formatted_url))
                    {
                        //Then get the data or content from the response in the next using statement, then within it you will get the data, and convert it to a c# object.
                        using (HttpContent content = res.Content)
                        {
                            //Now assign your content to your data variable, by converting into a string using the await keyword.
                            string data = await content.ReadAsStringAsync();
                            //If the data isn't null return log convert the data using newtonsoft JObject Parse class method on the data.
                            if (data != null)
                            {
                                //Parse your data into a object.     
                                Console.WriteLine("Check 2:");
                                Console.WriteLine(data);
                                Console.WriteLine("--------------");
                                JObject dataObj = JObject.Parse(data);
                                //ToDo use this dataObject to get Coordinates then ping for the forcast
                                JToken? properties = dataObj["properties"];
                                if (properties != null && properties.HasValues)
                                {
                                    periods = properties["periods"];
                                    if(periods != null && periods.HasValues)
                                    {
                                        for (int i = 0; i < periods.Count(); i++)
                                        {
                                            if (forecastList.Count >= 5)
                                            {
                                                i = periods.Count();
                                            }
                                            else if (forecastList.Count < 5)
                                            {
                                                JToken? forecastData = periods[i * 24];

                                                if(forecastData != null && forecastData.HasValues)
                                                {
                                                    WeatherForecast wForecast = new WeatherForecast();
                                                    wForecast.Date = DateOnly.FromDateTime((DateTime)forecastData["startTime"]);
                                                    wForecast.TemperatureF = (int)forecastData["temperature"];
                                                    wForecast.Summary = (string?)forecastData["shortForecast"];
                                                    forecastList.Add(wForecast);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else
                            {
                                Console.WriteLine("NO Data----------");
                            }
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                Console.WriteLine("Exception Hit------------");
                Console.WriteLine(exception);
            }
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            GetForecast();

            if(forecastList.Count > 0)
            {
                return forecastList.ToArray();
            } else {
                //Send Dummy Values
                return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                    TemperatureF = 10,
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                }).ToArray();
            }
        }
    }
}
