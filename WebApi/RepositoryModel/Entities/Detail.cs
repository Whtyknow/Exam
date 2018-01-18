using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel.Entities
{
    public class Detail : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public double Weight { get; set; }

        public string City { get; set; }
    }
}
