using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Repository
{
    public class BaseRepository<T> : IRepository<T> where T : class, IEntity
    {
        DbContext db;
        IDbSet<T> dbSet;

        public BaseRepository(DbContext db)
        {
            this.db = db;
            dbSet = db.Set<T>();
        }

        public void Create(T obj)
        {
            dbSet.Add(obj);
            db.SaveChanges();
        }

        public void Delete(T obj)
        {
            dbSet.Remove(obj);
            db.SaveChanges();
        }

        public IEnumerable<T> GetAll()
        {
            return dbSet;
        }

        public T Get(int Id)
        {            
            return dbSet.Where(x => x.Id == Id).SingleOrDefault();
        }

        public void Update(T obj)
        {
            db.Entry(obj).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}
