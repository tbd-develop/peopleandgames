using LiteDB;

namespace application.Infrastructure
{
    public class LiteDbDataStore
    {
        private readonly string _databasePath;

        public LiteDatabase GetConnection()
        {
            return new LiteDatabase(_databasePath);
        }

        public LiteDbDataStore(string dataPath)
        {
            _databasePath = dataPath;
        }

    }
}
