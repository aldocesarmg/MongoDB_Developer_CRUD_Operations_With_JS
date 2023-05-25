const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user_aldo:aldocesar0206@fccmongodbexample.lutitw5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try{
        await client.connect();
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log('Databases: ');
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

main().catch(console.error);