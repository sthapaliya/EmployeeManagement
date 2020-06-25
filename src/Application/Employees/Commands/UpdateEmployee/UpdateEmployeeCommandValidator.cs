using EmployeeManagement.Application.Employees.Commands.UpdateEmployee;
using FluentValidation;

namespace EmployeeManagement.Application.TodoItems.Commands.UpdateEmployee
{
    public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
    {
        public UpdateEmployeeCommandValidator()
        {
            RuleFor(v => v.FirstName)
                .MaximumLength(200)
                .NotEmpty();

            RuleFor(v => v.LastName)
            .MaximumLength(200)
            .NotEmpty();

            RuleFor(v => v.PhoneNumber)
                .MaximumLength(15)
            .NotEmpty();

            RuleFor(v => v.Email).EmailAddress()
            .NotEmpty();

            RuleFor(v => v.Mobile)
            .MaximumLength(15);

        }
    }
}
