using ExtJS_Demo.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExtJS_Demo.Infrastructure
{
   public class DataContext : DbContext
   {
      public DbSet<Customer> Customers { get; set; }

      public DbSet<Student>   Students { get; set; }
   }
}
