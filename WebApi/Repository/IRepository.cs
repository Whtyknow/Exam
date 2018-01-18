using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        void Create(T obj);
        void Update(T obj);
        void Delete(T id);
    }
}
