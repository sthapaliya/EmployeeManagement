using EmployeeManagement.Domain.Common;
using System;

namespace EmployeeManagement.Domain.Entities
{
    public class Employee : AuditableEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Mobile { get; set; }
        public bool IsActive { get; set; }

    }
}
