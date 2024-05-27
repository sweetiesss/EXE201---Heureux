using System;
using System.Collections.Generic;
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
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password can not be empty.")]
        public string Password { get; set; } = null!;

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public DateTime? Dob { get; set; }

        public string? Gender { get; set; }
        [Required(ErrorMessage = "Username can not be empty")]
        public string Username { get; set; } = null!;
        
        public int? Roleid { get; set; }
    }
}
