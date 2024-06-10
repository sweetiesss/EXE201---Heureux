using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Steeltoe.Discovery;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly IDiscoveryClient _discoveryClient;

        public BaseController(IDiscoveryClient discoveryClient)
        {
            _discoveryClient = discoveryClient;
        }

        [HttpGet("instances/{serviceName}")]
        public IActionResult GetServiceInstances(string serviceName)
        {
            var instances = _discoveryClient.GetInstances(serviceName);
            if (instances == null || !instances.Any())
            {
                return NotFound($"No instances found for service: {serviceName}");
            }
            return Ok(instances);
        }
    }
}
