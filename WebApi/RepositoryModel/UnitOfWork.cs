using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryModel
{
    public class UnitOfWork : IDisposable
    {
        public UnitOfWork(MyContext context)
        {
            this.context = context;
        }
        bool disposed = false;

        MyContext context;
        private SupplierRepository SupplierRep;
        private DetailRepository DetailRep;
        private ProjectRepository ProjectRep;
        private SDPRepository SDPRep;

        public SupplierRepository Suppliers
        {
            get
            {
                if (SupplierRep == null)
                    SupplierRep = new SupplierRepository(context);
                return SupplierRep;
            }
        }

        public DetailRepository Details
        {
            get
            {
                if (DetailRep == null)
                    DetailRep = new DetailRepository(context);
                return DetailRep;
            }
        }

        public ProjectRepository Projects
        {
            get
            {
                if (ProjectRep == null)
                    ProjectRep = new ProjectRepository(context);
                return ProjectRep;
            }
        }

        public SDPRepository SDPs
        {
            get
            {
                if (SDPRep == null)
                    SDPRep = new SDPRepository(context);
                return SDPRep;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }
        public virtual void Dispose(bool disposing)
        {
            if (this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                    this.disposed = true;
                }
            }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
