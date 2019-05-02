using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.Infrastructure;
using application.Infrastructure.Inputs;
using application.Infrastructure.Models;
using application.Infrastructure.ViewModels;
using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    public class GamesController : Controller
    {
        private readonly LiteDbDataStore _store;

        public GamesController(LiteDbDataStore store)
        {
            _store = store;
        }

        [HttpPost,Route("games")]
        public IActionResult AddGame([FromBody] GameInputModel model)
        {
            if (ModelState.IsValid)
            {
                using (var db = _store.GetConnection())
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

        [HttpGet, Route("games/for/{personId}")]
        public ActionResult<IEnumerable<GameViewModel>> GetGamesFor(int personId)
        {
            using (var db = _store.GetConnection())
            {
                var games = db.GetCollection<Game>("games");

                var results = from x in games.FindAll()
                    where x.PersonId == personId
                    select new GameViewModel
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Platform = x.Platform,
                        Year = x.Year
                    };

                return new ActionResult<IEnumerable<GameViewModel>>(results);
            }
        }
    }
}