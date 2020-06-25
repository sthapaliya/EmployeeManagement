using System;

namespace EmployeeManagement.Domain.Common
{
    public abstract class AuditableEntity
    {
        public DateTime Created { get; set; }

        public DateTime? LastModified { get; set; }
    }
}
