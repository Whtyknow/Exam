using RepositoryModel.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace RepositoryModel
{
    public class MyContext : DbContext
    {

        public MyContext() : base("MyExamDb")
        {
            Database.SetInitializer<MyContext>(new DbInitializer());
        }

        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Detail> Details { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<SDP> SDP { get; set; }
    }

    public class DbInitializer : DropCreateDatabaseIfModelChanges<MyContext>
    {
        protected override void Seed(MyContext context)
        {
            Supplier s = new Supplier() { Name = "Petro", City = "Lviv", Status = "Manager" };
            Detail d = new Detail() { Name = "D1", City = "Lviv", Color = "red", Weight = 46 };
            Project p = new Project() { Name = "P1", City = "Lviv" };
            SDP sdp1 = new SDP() { Detail = d, Project = p, Supplier = s, Quantity = 40 };
            SDP sdp2 = new SDP() { Detail = d, Project = p, Supplier = s, Quantity = 55 };

            context.Suppliers.Add(s);
            context.Details.Add(d);
            context.Projects.Add(p);
            context.SDP.AddRange(new SDP[] { sdp1, sdp2 });

            base.Seed(context);
        }
    }
}
