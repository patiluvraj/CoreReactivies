using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {        
        IMediator _mediator;

        protected IMediator Mediator=> _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if(null==result) return NotFound();

            if(result.IsSucess && null!=result.Value)
                return Ok(result.Value);

            if(result.IsSucess && null==result.Value)
                return NotFound();

            return BadRequest(result.Error);
        }
    }
}