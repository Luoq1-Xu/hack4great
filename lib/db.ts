import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {
  pgTable,
  text,
  numeric,
  integer,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { count, eq, ilike } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const db = drizzle(neon(process.env.POSTGRES_URL!));

export const statusEnum = pgEnum('status', ['active', 'inactive', 'archived']);

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  name: text('name').notNull(),
  status: statusEnum('status').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  stock: integer('stock').notNull(),
  availableAt: timestamp('available_at').notNull()
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  user_type: text('user_type').notNull(),
  status: text('status').notNull()
});

export type SelectProduct = typeof products.$inferSelect;
export const insertProductSchema = createInsertSchema(products);


export async function getUsers() {
  return await db.select().from(users);
}

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Always search the full table, not per page
  if (search) {
    return {
      products: await db
        .select()
        .from(products)
        .where(ilike(products.name, `%${search}%`))
        .limit(1000),
      newOffset: null,
      totalProducts: 0
    };
  }

  if (offset === null) {
    return { products: [], newOffset: null, totalProducts: 0 };
  }

  let totalProducts = await db.select({ count: count() }).from(products);
  let moreProducts = await db.select().from(products).limit(5).offset(offset);
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    products: moreProducts,
    newOffset,
    totalProducts: totalProducts[0].count
  };
}

export async function deleteProductById(id: number) {
  await db.delete(products).where(eq(products.id, id));
}

export async function editProductById(id: number, product: Partial<SelectProduct>) {
  await db.update(products).set(product).where(eq(products.id, id));
}

// Define the TypeScript type based on the schema
export type InsertProduct = z.infer<typeof insertProductSchema>;

export async function insertProduct(product: InsertProduct) {
  // Validate the product object against the schema
  const validatedProduct = insertProductSchema.parse(product);
  
  // Insert the validated product into the database
  await db.insert(products).values(validatedProduct);
}

export async function getUserByUsername(username: string) {
  console.log(username);
  try {
    const usersResult = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    console.log(usersResult);
    return usersResult[0] ?? null;
  }
  catch (error) {
    console.log(error);
  }
}

export async function createUser(username: string, password: string, user_type: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.insert(users).values({
    username,
    password: hashedPassword,
    user_type: user_type, // Assuming a default user type, adjust as needed
    status: 'active' // Assuming a default status, adjust as needed
  });
  return user;
}