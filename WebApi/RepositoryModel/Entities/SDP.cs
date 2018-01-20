using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel.Entities
{
    public class SDP : IEntity
    {
        public int Id { get; set; }

        public virtual Supplier Supplier { get; set; }

        public virtual Detail Detail { get; set; }

        public virtual Project Project { get; set; }

        public int Quantity { get; set; }
    }
}
