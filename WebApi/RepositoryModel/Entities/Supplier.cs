using Repository;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel.Entities
{
    public class Supplier : IEntity
    {
        public int Id { get; set; }
        [Index(IsUnique = true)][MaxLength(100)]
        public string Name { get; set; }

        public string Status { get; set; }

        public string City { get; set; }
    }
}
