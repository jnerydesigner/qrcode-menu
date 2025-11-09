"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ingredients = [
  {
    name: "Tomate",
    quantity: "5 kg",
    supplier: "Horta da Vila",
    status: "Fresco",
  },
  {
    name: "Queijo Muçarela",
    quantity: "3 kg",
    supplier: "Laticínios Serra Azul",
    status: "Repor em breve",
  },
  {
    name: "Alface",
    quantity: "2 maços",
    supplier: "Horta da Vila",
    status: "Fresco",
  },
  {
    name: "Carne Angus",
    quantity: "8 kg",
    supplier: "Empório das Carnes",
    status: "Em estoque",
  },
  {
    name: "Batata",
    quantity: "10 kg",
    supplier: "Distribuidora Central",
    status: "Fresco",
  },
];

export function TableIngredients() {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ingrediente</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.name}>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell>{ingredient.quantity}</TableCell>
              <TableCell>{ingredient.supplier}</TableCell>
              <TableCell className="text-muted-foreground">
                {ingredient.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
