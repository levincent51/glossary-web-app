using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PartB.Data.Migrations
{
    public partial class FirstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Glossary",
                columns: table => new
                {
                    Term = table.Column<string>(type: "TEXT", nullable: false),
                    Definition = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Glossary", x => x.Term);
                });

            migrationBuilder.InsertData(
                table: "Glossary",
                columns: new[] { "Term", "Definition" },
                values: new object[] { "abyssal plain", "The ocean floor offshore from the continental margin, usually very flat with a slight slope." });

            migrationBuilder.InsertData(
                table: "Glossary",
                columns: new[] { "Term", "Definition" },
                values: new object[] { "accrete", "v. To add terranes (small land masses or pieces of crust) to another, usually larger, land mass." });

            migrationBuilder.InsertData(
                table: "Glossary",
                columns: new[] { "Term", "Definition" },
                values: new object[] { "alkaline", "Term pertaining to a highly basic, as opposed to acidic, subtance. For example,hydroxide or carbonate of sodium or potassium." });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Glossary");
        }
    }
}
