using PartB.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy", builder =>
    {
        builder
        .AllowAnyHeader()
        .AllowAnyMethod()
        .WithOrigins("http://localhost:3000");
    });
});

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

app.UseCors("CORSPolicy");

app.MapGet("/get-glossary", async () => await GlossaryRepository.GetGlossaryAsync());

app.MapPost("/add-term", async (GlossaryTerm gt) =>
{

    bool success = await GlossaryRepository.AddGlossaryTerm(gt);

    if (success)
    {
        return Results.Ok("Added");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapPut("/edit-definition", async (GlossaryTerm gt) =>
{

    bool success = await GlossaryRepository.EditGlossaryDefinition(gt);

    if (success)
    {
        return Results.Ok("Editted definition");
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapPut("/edit-term", async (String oldTerm, String newTerm) =>
{

    bool success = await GlossaryRepository.EditGlossaryTerm(oldTerm, newTerm);

    if (success)
    {
        return Results.Ok("Editted term");
    }
    else
    {
        return Results.BadRequest();
    }
});


app.MapDelete("/remove-term", async (String term) =>
{

    bool success = await GlossaryRepository.RemoveGlossaryTerm(term);

    if (success)
    {
        return Results.Ok("Deleted");
    }
    else
    {
        return Results.BadRequest();
    }
});

app.MapFallbackToFile("index.html"); ;


app.Run();
