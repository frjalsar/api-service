using System;

namespace JiraApi
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string Summary { get; set; }
    }

    public class fields
    {
        public Project project { get; set; }
        public string summary { get; set; }
        public string description { get; set; }
        public Issuetype issuetype { get; set; }
        public Assignee assignee { get; set; }
    }

    public class Assignee
    {
        public string name { get; set; }
    }

    public class Issuetype
    {
        public string name { get; set; }
    }

    public class Project
    {
        public  string key { get; set; }
    }
}
