using EmployeeManagement.Domain.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagement.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            if (!context.Employees.Any())
            {
                context.Employees.Add(new Employee()
                {

                    FirstName = "John",
                    LastName = "Timilsina",
                    PhoneNumber = "977-598988999",
                    Email = "test@test.com",
                    Mobile = "+977984112345678",
                    IsActive = true

                });
                context.Employees.Add(new Employee()
                {

                    FirstName = "Ram Prasad",
                    LastName = "Gajurel",
                    PhoneNumber = "977-5688938383",
                    Email = "ramprasadgajurel@gmail.com.np",
                    Mobile = "+9779841000000099",
                    IsActive = false

                });

                await context.SaveChangesAsync();
            }
        }
    }
}

