using Deshawnapicsharp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

List<Dog> dogs = new List<Dog> ()
{
    new Dog()
    {
        Id = 1,
        Name = "Dianemarie Hartness",
        CityId = 1,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 2,
        Name = "Christoph Fosdyke",
        CityId = 1,
        WalkerId = 11
    },
    new Dog()
    {
        Id = 3,
        Name = "Rocket",
        CityId = 3,
        WalkerId = 7
    },
    new Dog()
    {
        Id = 4,
        Name = "Ebony",
        CityId = 4,
        WalkerId = 3
    },
    new Dog()
    {
        Id = 5,
        Name = "Scotty",
        CityId = 5,
        WalkerId = 8
    },
    new Dog()
    {
        Id = 6,
        Name = "Mac",
        CityId = 6,
        WalkerId = 2
    },
    new Dog()
    {
        Id = 7,
        Name = "Oreo",
        CityId = 7,
        WalkerId = 5
    },
    new Dog()
    {
        Id = 8,
        Name = "Sassy",
        CityId = 8,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 9,
        Name = "Salem",
        CityId = 9,
        WalkerId = 9
    },
    new Dog()
    {
        Id = 10,
        Name = "Panda",
        CityId = 1,
        WalkerId = 7
    },
    new Dog()
    {
        Id = 11,
        Name = "Classy",
        CityId = 2,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 12,
        Name = "Witch",
        CityId = 3,
        WalkerId = 9
    },
    new Dog()
    {
        Id = 13,
        Name = "Diamond",
        CityId = 4,
        WalkerId = null
    }

};

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{

});


app.Run();
