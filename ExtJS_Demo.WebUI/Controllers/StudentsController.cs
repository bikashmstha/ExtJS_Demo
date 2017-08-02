using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ExtJS_Demo.Core;
using ExtJS_Demo.Infrastructure;

namespace ExtJS_Demo.WebUI.Controllers
{
    public class StudentsController : Controller
    {
        private DataContext db = new DataContext();

        // GET: Students
        public ActionResult Index()
        {
            return View(db.Students.ToList());
        }

        // GET: Students/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return HttpNotFound();
            }
            return View(student);
        }

        // GET: Students/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Students/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,FirstName,LastName,MiddleName,Birthdate,Address1,Address2,City,State")] Student student)
        {
            if (ModelState.IsValid)
            {
                db.Students.Add(student);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(student);
        }

        // GET: Students/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return HttpNotFound();
            }
            return View(student);
        }

        // POST: Students/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,FirstName,LastName,MiddleName,Birthdate,Address1,Address2,City,State")] Student student)
        {
            if (ModelState.IsValid)
            {
                db.Entry(student).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(student);
        }

        // GET: Students/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Student student = db.Students.Find(id);
            if (student == null)
            {
                return HttpNotFound();
            }
            return View(student);
        }

        // POST: Students/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Student student = db.Students.Find(id);
            db.Students.Remove(student);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

      public JsonResult GetStudent(int id)
      {
         // refactor
         // notes, calling ToList, because without the expression is sent to sql server and it does not know how to interpret ToShortDateString()
         // notes, refactor expression select, it is used in other Actions of this controller for shaping the JSON result to the server
         var student =    this.db.Students.ToList().Select(s => new { id = s.Id, firstName = s.FirstName, lastName = s.LastName, middleName = s.MiddleName,
            birthDate = s.Birthdate.ToShortDateString(), state = s.State, address1 = s.Address1, address2 = s.Address2 } ).Single(s => s.id == id);
         return Json(new { success = true, data = student}, JsonRequestBehavior.AllowGet);
      }

      public JsonResult GetStudentsNoPaging()
      {
         var total = db.Students.Count();
         var students = db.Students.Select(s => new { id = s.Id, firstName = s.FirstName, lastName = s.LastName, middleName = s.MiddleName, birthDate = s.Birthdate.ToShortDateString(), state = s.State, address1 = s.Address1, address2 = s.Address2 } );
         return Json(new { TotalCount =  total, result = students }, JsonRequestBehavior.AllowGet);
      }

      public JsonResult GetStudents(int start, int page, int limit)
      {
         var total = db.Students.Count();
         var students = db.Students.Select(s => new { id = s.Id, firstName = s.FirstName, lastName = s.LastName, middleName = s.MiddleName, birthDate = s.Birthdate.ToShortDateString(), state = s.State, address1 = s.Address1, address2 = s.Address2 } );
         return Json(new { TotalCount =  total, result = students }, JsonRequestBehavior.AllowGet);
      }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
