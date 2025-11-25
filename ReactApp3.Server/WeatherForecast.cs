namespace ReactApp3.Server
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }
        //public DateTime Date { get; set; }

        public int TemperatureF { get; set; }

        public int TemperatureC =>  (int)((TemperatureF-32) * 0.5556);

        public string? Summary { get; set; }
    }
}
