using System;
using System.Collections.Generic;
using System.Linq;
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
        public IActionResult Poster([FromBody] WeatherForecast forriForecast)
        {
            return Ok();
            // return CreatedAtRoute("GetById", new {id=student.id}, student)
        }


    }
}
