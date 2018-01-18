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
    public class DetailController : ApiController
    {
        UnitOfWork uow;

        public DetailController()
        {
            uow = new UnitOfWork(new MyContext());
        }
        
        public IEnumerable<Detail> Get()
        {
            return uow.Details.GetAll();
        }
        
        public HttpResponseMessage Get(int? id)
        {
            if (id == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad id");
            }

            Detail d = uow.Details.GetAll().Where(x => x.Id == id).SingleOrDefault();
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
        
        public HttpResponseMessage Post([FromBody]Detail value)
        {
            try
            {
                uow.Details.Create(value);                
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.Created, value);
                // var msg = Request.CreateResponse(HttpStatusCode.BadRequest);


                msg.Headers.Location = new Uri(Request.RequestUri + "/" + (uow.Details.GetAll().Count() - 1));
                return msg;
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "Server error");
            }
        }
        
        public HttpResponseMessage Put(int id, [FromBody]Detail value)
        {
            if (id < 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                value.Id = id;
                uow.Details.Update(value);

                return Request.CreateResponse(HttpStatusCode.OK, uow.Details.Get(id));
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
                Detail p = uow.Details.Get(id);
                uow.Details.Delete(p);                
                return Request.CreateResponse(HttpStatusCode.OK, p);
            }
        }
    }
}
