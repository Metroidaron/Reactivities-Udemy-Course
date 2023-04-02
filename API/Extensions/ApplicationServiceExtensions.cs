using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {

            // Not sure
            services.AddEndpointsApiExplorer();

            // Swagger Service
            services.AddSwaggerGen();

            // Database Context
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // CORS support for our Frontend
            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    // policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                    policy
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                });
            });

            // Mediator for the pattern
            services.AddMediatR(typeof(List.Handler));

            // AutoMapper Helper Package
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // Fluent Validation
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();

            // Cloudinary
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();

            // SignalR
            services.AddSignalR();


            return services;
        }
    }
}