using Microsoft.AspNetCore.Mvc;

namespace ReactApp3.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                status = "healthy",
                timestamp = DateTime.Now,
                message = "Bills-PC backend is running!"
            });
        }
    }
}
