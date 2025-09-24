"use client";

import { convertDate } from "@/helper/convert-date";
import { CategoryType } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";

export const columnsCategory: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center w-full">Nome</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center w-full">Data de Criação</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <div className="text-center">
          <span>{convertDate(date)}</span>
        </div>
      );
    },
  },
];
