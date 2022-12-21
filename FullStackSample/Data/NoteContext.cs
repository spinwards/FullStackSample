using Microsoft.EntityFrameworkCore;

namespace FullStackSample.Data
{
    public class NoteContext : DbContext
    {
        public DbSet<Models.Note> Notes { get; set; }

        public string DbPath { get; }

        public NoteContext()
        {
            DbPath = Path.Join(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "notes.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Note>()
                .Property(e => e.ID)
                .ValueGeneratedOnAdd();
        }
    }
}
