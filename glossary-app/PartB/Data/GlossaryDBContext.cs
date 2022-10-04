using Microsoft.EntityFrameworkCore;

namespace PartB.Data
{
    public class GlossaryDBContext : DbContext
    {
        public DbSet<GlossaryTerm> Glossary { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/GlossaryDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            GlossaryTerm[] glossaryToSeed = new GlossaryTerm[3];

            glossaryToSeed[0] = new GlossaryTerm
            {
                Term = "abyssal plain",
                Definition = "The ocean floor offshore from the continental margin, usually very flat with a slight slope."
            };
            glossaryToSeed[1] = new GlossaryTerm
            {
                Term = "accrete",
                Definition = "v. To add terranes (small land masses or pieces of crust) to another, usually larger, land mass."
            };
            glossaryToSeed[2] = new GlossaryTerm
            {
                Term = "alkaline",
                Definition = "Term pertaining to a highly basic, as opposed to acidic, subtance. For example,hydroxide or carbonate of sodium or potassium."
            };

            modelBuilder.Entity<GlossaryTerm>().HasData(glossaryToSeed);
        }

       
    }
}

