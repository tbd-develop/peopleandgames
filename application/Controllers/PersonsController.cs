using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using application.Infrastructure.Inputs;
using application.Infrastructure.Models;
using application.Infrastructure.ViewModels;
using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    public class PersonsController : Controller
    {
        [HttpPost, Route("person")]
        public IActionResult AddPerson([FromBody]PersonInputModel model)
        {
            if (ModelState.IsValid)
            {
                using (var db = new LiteDatabase(@"MyData.db"))
                {
                    // Get person collection
                    var persons = db.GetCollection<Person>("persons");

                    var existsAlready = persons.FindOne(f =>
                        f.FirstName.Equals(model.FirstName, StringComparison.CurrentCultureIgnoreCase) &&
                        f.LastName.Equals(model.LastName, StringComparison.CurrentCultureIgnoreCase));

                    if (existsAlready != null)
                    {
                        return StatusCode(StatusCodes.Status409Conflict);
                    }

                    // Create your new person instance
                    var person = new Person
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        Email = model.Email,
                        Phone = model.Phone
                    };

                    // Insert new person document (Id will be auto-incremented)
                    persons.Insert(person);

                    // Index document using a document property
                    persons.EnsureIndex(x => x.LastName);
                }

                return StatusCode(StatusCodes.Status200OK);
            }

            return StatusCode(StatusCodes.Status400BadRequest); // Not good practice, no information reported and we own both sides
        }

        [HttpGet, Route("people")]
        public ActionResult<IEnumerable<PersonViewModel>> GetPeople()
        {
            using (var db = new LiteDatabase("MyData.db"))
            {
                var persons = db.GetCollection<Person>("persons");

                var results = from x in persons.FindAll()
                              select new PersonViewModel
                              {
                                  Id = x.Id,
                                  FirstName = x.FirstName,
                                  LastName = x.LastName,
                                  Email = x.Email,
                                  Phone = x.Phone
                              };

                return new ActionResult<IEnumerable<PersonViewModel>>(results);
            }
        }
    }
}