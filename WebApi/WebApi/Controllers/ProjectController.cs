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
    public class ProjectController : ApiController
    {
        UnitOfWork uow;

        public ProjectController()
        {
            uow = new UnitOfWork(new MyContext());
        }

        public IEnumerable<Project> Get()
        {
            return uow.Projects.GetAll();
        }

        public HttpResponseMessage Get(int? id)
        {
            if (id == null)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Bad id");
            }

            Project d = uow.Projects.GetAll().Where(x => x.Id == id).SingleOrDefault();
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

        public HttpResponseMessage Post([FromBody]Project value)
        {
            try
            {
                if (uow.Projects.GetAll().Where(x => x.Name == value.Name).SingleOrDefault() != null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.Conflict, "Value with this name already exists");
                }
                uow.Projects.Create(value);
                HttpResponseMessage msg = Request.CreateResponse(HttpStatusCode.Created, value);
                // var msg = Request.CreateResponse(HttpStatusCode.BadRequest);


                msg.Headers.Location = new Uri(Request.RequestUri + "/" + (uow.Projects.GetAll().Count() - 1));
                return msg;
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ServiceUnavailable, "Server error");
            }
        }

        public HttpResponseMessage Put(int id, [FromBody]Project value)
        {
            if (id < 0)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            else
            {
                value.Id = id;
                uow.Projects.Update(value);

                return Request.CreateResponse(HttpStatusCode.OK, uow.Projects.Get(id));
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
                Project p = uow.Projects.Get(id);
                uow.Projects.Delete(p);
                return Request.CreateResponse(HttpStatusCode.OK, p);
            }
        }
    }
}
