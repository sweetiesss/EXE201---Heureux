using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class RegisterRequestModel
    {
        [Required(ErrorMessage = "Email can not be empty.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password can not be empty.")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; } = null!;

        [RegularExpression("^[0-9]*$", ErrorMessage = "Phone must contain only numbers.")]
        public string? Phone { get; set; }

        public string? Address { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? Dob { get; set; }

        [RegularExpression("^(Male|Female|Other)$", ErrorMessage = "Invalid gender.")]
        public string? Gender { get; set; }
        [Required(ErrorMessage = "Username can not be empty")]
        public string Username { get; set; } = null!;
        
        public string? RoleCode { get; set; }
    }
}
