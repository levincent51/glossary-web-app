using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace PartB.Data
{
    public  class GlossaryTerm
    {

        [Key]
        [Required]
        public String Term { get; set; } = String.Empty;

        [Required]
        public String Definition { get; set; } = String.Empty;


    }
}

