using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.Infrastructure.Inputs;
using application.Infrastructure.Models;
using LiteDB;
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
                using (var db = new LiteDatabase(@"MyData.db"))
                {
                    // Get games collection
                    var games = db.GetCollection<Game>("games");

                    var existsAlready = games.FindOne(f =>
                        f.PersonId == model.PersonId &&
                        f.Name.Equals(model.Name, StringComparison.CurrentCultureIgnoreCase));

                    if (existsAlready != null)
                    {
                        return StatusCode(StatusCodes.Status409Conflict);
                    }

                    // Create your new game instance
                    var game = new Game
                    {
                        PersonId = model.PersonId,
                        Name = model.Name,
                        Platform= model.Platform,
                        Year = model.Year
                    };

                    // Insert new game document (Id will be auto-incremented)
                    games.Insert(game);

                    games.EnsureIndex(x => x.PersonId);
                    games.EnsureIndex(x => x.Platform);
                }

                return StatusCode(StatusCodes.Status200OK);
            }

            return StatusCode(StatusCodes.Status400BadRequest);
        }
    }
}