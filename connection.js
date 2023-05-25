const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user_aldo:aldocesar0206@fccmongodbexample.lutitw5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
    try{
        await client.connect();
        // await listDatabases(client);
        await createListing(client, {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        });
        await createMultipleListings(client, [
            {
                name: "Infinite Views",
                summary: "Modern home with infinite views from the infinity pool",
                property_type: "House",
                bedrooms: 5,
                bathrooms: 4.5,
                beds: 5
            },
            {
                name: "Private room in London",
                property_type: "Apartment",
                bedrooms: 1,
                bathroom: 1
            },
            {
                name: "Beautiful Beach House",
                summary: "Enjoy relaxed beach living in this house with a private beach",
                bedrooms: 4,
                bathrooms: 2.5,
                beds: 7,
                last_review: new Date()
            }
        ]);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// EXAMPLE
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log('Databases: ');
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function createMultipleListings(client, newListings) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}

main().catch(console.error);