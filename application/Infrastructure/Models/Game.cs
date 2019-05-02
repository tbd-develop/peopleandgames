using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace application.Infrastructure.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public string Name { get; set; }
        public string Platform { get; set; }
        public int Year { get; set; }
    }
}
