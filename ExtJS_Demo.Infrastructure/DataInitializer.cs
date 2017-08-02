using ExtJS_Demo.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExtJS_Demo.Infrastructure
{
   public class DataInitializer : DropCreateDatabaseIfModelChanges<DataContext>
   {
      protected override void Seed( DataContext context )
      {
         var students = new List<Student>();
         students.Add( new Student
         {
            Address1 = "Address1 for a Student",
            Address2 = "Address2 for a Student",
            Birthdate = DateTime.Now,
            City = "Muntinlupa",
            FirstName = "Randel",
            MiddleName = "Ronquillo",
            LastName = "Ramirez",
            State = "NCR"
         } );

         students.Add( new Student
         {
            Address1 = "Address1 for a Student",
            Address2 = "Address2 for a Student",
            Birthdate = DateTime.Now,
            City = "City XYZ",
            FirstName = "Student 1",
            MiddleName = "Middle",
            LastName = "Last",
            State = "State"
         } );

         students.ForEach(s => context.Students.Add(s));
      }
   }
}
