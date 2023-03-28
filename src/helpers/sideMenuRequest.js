// This code shows the implementation of Azure CosmosDb using ReactJS
// All credit belong to the author of the code as I am not the original author
// For more information, visit https://www.npmjs.com/package/@azure/cosmos

// This line imports the necessary resources required for all the functionality
import { CosmosClient } from "@azure/cosmos";

// Declaring the environment variables

// This is your Azure CosmosDB account URI link

const endpoint = "";

// The primary key for the Azure Cosmos account.
const key = "";

// Instantiating a CosmosClient object
const cosmosClient = new CosmosClient({ endpoint, key });

export const AzureCosmos = async () => {
  // This piece of code creates a database on Azure CosmosDB

  const { database } = await cosmosClient.databases.createIfNotExists({
    id: "categorymenus",
  });

  // End of code

  // This piece of code creates a container on Azure CosmosDB

  const { container } = await database.containers.createIfNotExists({
    id: "menus",
  });

  // This piece of code queries the DB on Azure CosmosDB

  const { resources } = await container.items
    .query("SELECT * FROM c WHERE c.PartitionKey = 'menus'")
    .fetchAll();

  return resources;
};
