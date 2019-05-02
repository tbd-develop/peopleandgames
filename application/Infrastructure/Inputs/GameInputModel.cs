using System.ComponentModel.DataAnnotations;

namespace application.Infrastructure.Inputs
{
    public class GameInputModel
    {
        [Required]
        [Range(double.Epsilon, double.MaxValue)]
        public int PersonId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Platform { get; set; }

        [Required]
        public int Year { get; set; }
    }
}