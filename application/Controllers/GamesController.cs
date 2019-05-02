using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.Infrastructure.Inputs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    public class GamesController : Controller
    {
        [HttpPost,Route("games")]
        public IActionResult AddGame([FromBody] GameInputModel model)
        {
            if (ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status200OK);
            }

            return StatusCode(StatusCodes.Status400BadRequest);
        }
    }
}