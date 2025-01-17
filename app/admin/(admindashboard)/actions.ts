'use server';

import { deleteProductById, insertProduct, editProductById } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(formData: FormData) {
  console.log('Deleting product');
  let id = Number(formData.get('id'));
  await deleteProductById(id);
  revalidatePath('/');
}

export async function addProduct(formData: FormData) {
  let name = formData.get('name') as string;
  let price = String(formData.get('price'));
  let stock = Number(formData.get('stock'));
  let availableAt = new Date(formData.get('availableAt') as string);
  let imageUrl = formData.get('imageUrl') as string;
  let status = formData.get('status') as 'active' | 'inactive' | 'archived';

  await insertProduct({
    name: name,
    price: price,
    stock: stock,
    availableAt: availableAt,
    imageUrl: imageUrl,
    status: status
  });

  console.log('Product added');

  revalidatePath('/');
}

export async function editProduct(id: number, product: {
  name: string;
  price: string;
  stock: number;
  availableAt: Date;
  imageUrl: string;
  status: 'active' | 'inactive' | 'archived';
}) {
  await editProductById(id, {
    name: product.name,
    price: product.price,
    stock: product.stock,
    availableAt: product.availableAt,
    imageUrl: product.imageUrl,
    status: product.status
  });

  console.log('Product edited');

  revalidatePath('/');
}