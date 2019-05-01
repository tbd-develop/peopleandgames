using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using application.Infrastructure.Inputs;
using application.Infrastructure.Models;
using LiteDB;
using Microsoft.AspNetCore.Mvc;

namespace application.Controllers
{
    public class PersonsController : Controller
    {
        [HttpPost, Route("person")]
        public void AddPerson([FromBody]PersonInputModel model)
        {
            if (ModelState.IsValid)
            {
                using (var db = new LiteDatabase(@"MyData.db"))
                {
                    // Get person collection
                    var persons = db.GetCollection<Person>("persons");

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
            }
        }
    }
}