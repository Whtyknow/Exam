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
    public class SDPController : ApiController
    {
        UnitOfWork uow;

        public SDPController()
        {
            uow = new UnitOfWork(new MyContext());
        }

        public IEnumerable<SDP> Get()
        {
            return uow.SDPs.GetAll();
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

        public HttpResponseMessage Post([FromBody]SDP value)
        {
            try
            {
                uow.SDPs.Create(value);                
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.Created, value);
               
                return msg;
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "Server error");
            }
        }

        public HttpResponseMessage Put(int id, [FromBody]SDP value)
        {
            if (id < 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                value.Id = id;
                uow.SDPs.Update(value);

                return Request.CreateResponse(HttpStatusCode.OK, uow.SDPs.Get(id));
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
                SDP s = uow.SDPs.Get(id);
                uow.SDPs.Delete(s);
                return Request.CreateResponse(HttpStatusCode.OK, s);
            }
        }
    }
}
