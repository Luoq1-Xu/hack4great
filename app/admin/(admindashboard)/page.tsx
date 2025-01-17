import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import { getProducts } from '@/lib/db';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { addProduct } from './actions';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = searchParams.offset ?? 0;
  const { products, totalProducts } = await getProducts(
    search,
    Number(offset),
  );

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Product</DialogTitle>
              <form action={addProduct}>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input id="name" name="name" type="text" required />

                  <label htmlFor="price">Price (Dollars)</label>
                  <Input id="price" name="price" type="number" required />

                  <label htmlFor="stock">Stock</label>
                  <Input id="stock" name="stock" type="number" required />

                  <label htmlFor="availableAt">Available Starting From</label>
                  <Input id="availableAt" name="availableAt" type="date" required />

                  <label htmlFor="imageUrl">Image URL</label>
                  <Input id="imageUrl" name="imageUrl" type="text" required />

                  <label htmlFor="status">Status</label>
                  <Select name="status" required>
                    <SelectTrigger>
                      <SelectValue placeholder="status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="inactive">inactive</SelectItem>
                        <SelectItem value="archived">archived</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button type="submit">Add Product</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          offset={Number(offset)}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}