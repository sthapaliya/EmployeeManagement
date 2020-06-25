using EmployeeManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EmployeeManagement.Infrastructure.Persistence.Configurations
{
    public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.Property(t => t.FirstName)
                .HasMaxLength(1000)
                .IsRequired();
            builder.Property(t => t.LastName)
              .HasMaxLength(1000)
              .IsRequired();
            builder.Property(t => t.Email)
              .HasMaxLength(200)
              .IsRequired();
            builder.Property(t => t.PhoneNumber)
               .HasMaxLength(200)
               .IsRequired();
        }
    }
}
