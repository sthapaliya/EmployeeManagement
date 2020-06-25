using FluentValidation;

namespace EmployeeManagement.Application.Employees.Commands.CreateEmployee
{
    public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
    {
        public CreateEmployeeCommandValidator()
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
