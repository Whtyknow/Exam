using Repository;
using RepositoryModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel
{
    public class DetailRepository : BaseRepository<Detail>
    {
        public DetailRepository(MyContext context) : base(context) { }
    }

    public class ProjectRepository : BaseRepository<Project>
    {
        public ProjectRepository(MyContext context) : base(context) { }
    }

    public class SupplierRepository : BaseRepository<Supplier>
    {
        public SupplierRepository(MyContext context) : base(context) { }
    }

    public class SDPRepository : BaseRepository<SDP>
    {
        public SDPRepository(MyContext context) : base(context) { }
    }


}
