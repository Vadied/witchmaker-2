import { sql } from '@vercel/postgres'
import { db } from '@/lib/drizzle'
import { UsersTable, User, NewUser } from './drizzle'

const {
  campaigns,
  classes,
  characters,
  users,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning()

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedCampaigns(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "campaigns" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS campaigns (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description VARCHAR(255),
          start_date VARCHAR(255) DEFAULT NOW(),
          end_date VARCHAR(255),
          status VARCHAR(255) DEFAULT 'active',
          master VARCHAR(255) NOT NULL,
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW()
        );
      `;

    console.log(`Created "campaigns" table`);

    // Insert data into the "campaigns" table
    const inserted = await Promise.all(
      campaigns.map(async (c) => {
        return client.sql`
          INSERT INTO campaigns (id, name, description, start_date, end_date, status, master)
          VALUES (${c.id}, ${c.name}, ${c.description}, ${c.start_date}, ${c.end_date}, ${c.status}, ${c.master})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${campaigns.length} campaigns`);

    return {
      createTable,
      data: inserted,
    };
  } catch (error) {
    console.error("Error seeding campaigns:", error);
    throw error;
  }
}

async function seedClasses(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "classes" table if it doesn't exist
    const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS classes (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            fatherClass VARCHAR(255),
            description VARCHAR(255),
            createdAt TIMESTAMP DEFAULT NOW(),
            updatedAt TIMESTAMP DEFAULT NOW(),
          );
        `;

    console.log(`Created "classes" table`);

    // Insert data into the "classes" table
    const inserted = await Promise.all(
      classes.map(async (c) => {
        return client.sql`
            INSERT INTO classes (id, name, description, fatherClass)
            VALUES (${c.id}, ${c.name}, ${c.description}, ${c.fatherClass})
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${classes.length} classes`);

    return {
      createTable,
      data: inserted,
    };
  } catch (error) {
    console.error("Error seeding classes:", error);
    throw error;
  }
}

async function seedCharacters(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "characters" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS characters (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          createdBy VARCHAR(255) NOT NULL,
          campaign VARCHAR(255) NOT NULL,
          class VARCHAR(255) NOT NULL,
          level INT DEFAULT 1,
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW(),
        );
      `;

    console.log(`Created "characters" table`);

    // Insert data into the "characters" table
    const inserted = await Promise.all(
      characters.map(async (c) => {
        return client.sql`
          INSERT INTO characters (id, name, description, start_date, end_date, status, master)
          VALUES (${c.id}, ${c.name}, ${c.description}, ${c.start_date}, ${c.end_date}, ${c.status}, ${c.master})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${characters.length} characters`);

    return {
      createTable,
      data: inserted,
    };
  } catch (error) {
    console.error("Error seeding characters:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCampaigns(client);
  await seedClasses(client);
  await seedCharacters(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
