using RepositoryModel;
using RepositoryModel.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.Controllers
{
    [Authorize]
    public class SupplierController : ApiController
    {
        UnitOfWork uow;

        public SupplierController()
        {
            uow = new UnitOfWork(new MyContext());
        }

        public IEnumerable<Supplier> Get()
        {
            return uow.Suppliers.GetAll();
        }

        public HttpResponseMessage Get(int? id)
        {
            if (id == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad id");
            }

            Supplier d = uow.Suppliers.GetAll().Where(x => x.Id == id).SingleOrDefault();
            if (d != null)
            {
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.OK, d);
                return msg;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Found");
            }
        }

        public HttpResponseMessage Post([FromBody]Supplier value)
        {
            try
            {
                uow.Suppliers.Create(value);
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.Created, value);
                // var msg = Request.CreateResponse(HttpStatusCode.BadRequest);


                msg.Headers.Location = new Uri(Request.RequestUri + "/" + (uow.Suppliers.GetAll().Count() - 1));
                return msg;
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "Server error");
            }
        }

        public HttpResponseMessage Put(int id, [FromBody]Supplier value)
        {
            if (id < 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                value.Id = id;
                uow.Suppliers.Update(value);

                return Request.CreateResponse(HttpStatusCode.OK, uow.Suppliers.Get(id));
            }
        }

        public HttpResponseMessage Delete(int id)
        {

            if (id < 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                Supplier p = uow.Suppliers.Get(id);
                uow.Suppliers.Delete(p);
                return Request.CreateResponse(HttpStatusCode.OK, p);
            }
        }
    }
}
