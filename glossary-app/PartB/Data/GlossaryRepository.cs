using Microsoft.EntityFrameworkCore;

namespace PartB.Data
{
    public class GlossaryRepository
    {
       public async static Task<List<GlossaryTerm>> GetGlossaryAsync()
        {
            using (var db = new GlossaryDBContext())
            {
                return await db.Glossary.ToListAsync();
            }
        }

        public async static Task<bool> AddGlossaryTerm(GlossaryTerm gt)
        {
            using (var db = new GlossaryDBContext())
            {
                try
                {
                    await db.Glossary.AddAsync(gt);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public async static Task<bool> EditGlossaryDefinition(GlossaryTerm gt)
        {
            using (var db = new GlossaryDBContext())
            {
                try
                {
                    db.Glossary.Update(gt);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public async static Task<bool> EditGlossaryTerm(String term, String newTerm)
        {
            using (var db = new GlossaryDBContext())
            {
                try
                {
                    GlossaryTerm found = await db.Glossary.FirstOrDefaultAsync(t => t.Term == term);

                    GlossaryTerm editted = new GlossaryTerm
                    {
                        Term = newTerm,
                        Definition = found.Definition
                    };

                    db.Remove(found);

                    await db.Glossary.AddAsync(editted);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public async static Task<bool> RemoveGlossaryTerm(String term)
        {
            using (var db = new GlossaryDBContext())
            {
                try
                {
                    GlossaryTerm delete = await db.Glossary.FirstOrDefaultAsync(t => t.Term == term);

                    db.Remove(delete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}

