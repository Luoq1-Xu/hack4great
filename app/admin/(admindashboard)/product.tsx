import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CircleX, MoreHorizontal, PlusCircle } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectProduct } from '@/lib/db';
import { deleteProduct, editProduct } from './actions';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export function Product({ product }: { product: SelectProduct }) {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    stock: product.stock,
    availableAt: product.availableAt,
    imageUrl: product.imageUrl,
    status: product.status,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleStatusChange = (value: 'active' | 'inactive' | 'archived') => {
    setFormData((prevData) => ({ ...prevData, status: value }));
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editProduct(product.id, formData);
  };

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await deleteProduct(formData);
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.imageUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {product.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.availableAt?.toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Edit
                      </span>
                  </Button>
                </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form onSubmit={handleDelete}>
                <input name="id" type="hidden" value={String(product.id)} />
                <Button type="submit" variant="destructive" size="sm" className="h-8 gap-1">
                  <CircleX className="h-3.5 w-3.5"/>
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Delete
                      </span>
                </Button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>Update product details here.</DialogDescription>
          <form onSubmit={handleEdit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />

              <label htmlFor="price">Price (Dollars)</label>
              <Input id="price" name="price" type="text" value={formData.price} onChange={handleInputChange} required />

              <label htmlFor="stock">Stock</label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} required />

              <label htmlFor="availableAt">Available Starting From</label>
              <Input id="availableAt" name="availableAt" type="date" value={product.availableAt?.toISOString().split('T')[0]} onChange={handleInputChange} required />

              <label htmlFor="imageUrl">Image URL</label>
              <Input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleInputChange} required />

              <label htmlFor="status">Status</label>
              <Select name="status" value={formData.status} onValueChange={handleStatusChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>state</SelectLabel>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">inactive</SelectItem>
                    <SelectItem value="archived">archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogClose asChild>
              <div className="mt-4 flex justify-end">
                <Button type="submit">Edit Product</Button>
              </div>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
      </TableCell>
    </TableRow>
  );
}