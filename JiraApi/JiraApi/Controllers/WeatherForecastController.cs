using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace JiraApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        // Copy-a úr unicorn verkefninu, er að nota get og post þar. eða já bara checka hvort þetta sé ekki þægilegasta uppsetningin
        

        [HttpGet("blee", Name = "Getter")]
        public IActionResult Getter()
        {
            return Ok("búúúúú!!");
        }

        [HttpPost("blamm")]
        public IActionResult Poster([FromBody] fields JiraDot)
        {
            // Þetta var samt til að getta
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://steini.atlassian.net/rest/api/2/issue/");
            request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;

            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(stream))
            {
                return Ok(reader.ReadToEnd());
            }

            return Ok();
            // return CreatedAtRoute("GetById", new {id=student.id}, student)
        }







        [HttpPost("hosthost")]
        public IActionResult func([FromBody] fieldHolder JiraDot)
        {
            sender(JiraDot);
            return Ok();
        }

        [HttpGet("send")]
        public IActionResult func2()
        {
            getter();
            return Ok();
        }

        public async void sender(fieldHolder JiraDot)
        {
            HttpClient client = new HttpClient();
            var authString = Convert.ToBase64String(Encoding.UTF8.GetBytes("steini.tki@gmail.com:gqT1nhsuiSAb8zVsTk3975BC"));

            string jsonString = JsonSerializer.Serialize(JiraDot);
            // string strengur = "";

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", authString);
            var response = await client.PostAsync("https://steini.atlassian.net/rest/api/2/issue/", new StringContent(jsonString, Encoding.UTF8, "application/json"));

            // client.PostAsync(uri, new StringContent(jsonInString, Encoding.UTF8, "application/json"));
            
            return;
        }

        public async void getter()
        {
            HttpClient client = new HttpClient();
            var authString = Convert.ToBase64String(Encoding.UTF8.GetBytes("steini.tki@gmail.com:gqT1nhsuiSAb8zVsTk3975BC"));

            // string jsonString = JsonSerializer.Serialize(JiraDot);
            // string strengur = "";

            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", authString);
            var response = await client.GetAsync("https://steini.atlassian.net/rest/api/2/search?jql=project=PRUFA&maxResults=1000");

            // client.PostAsync(uri, new StringContent(jsonInString, Encoding.UTF8, "application/json"));


            
            // client.DefaultRequestHeaders.Accept.Clear();
            // HttpResponseMessage response = await client.GetAsync("http://localhost:8080/document/quicksearch");

               
            return;
        }


    }
}
