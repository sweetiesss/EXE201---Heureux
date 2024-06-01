using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ViewModels.RequestModels
{
    public class RoleRequestModel
    {
        [Required(ErrorMessage = "Name can not be empty.")]
        public string RoleCode { get; set; }
    }
}
