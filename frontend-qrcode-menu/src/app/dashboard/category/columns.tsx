import DialogCategoryEdit from "@/components/DialogCategoryEdit";
import { Button } from "@/components/ui/button";
import { convertDate } from "@/helper/convert-date";
import { CategoryType } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";

export const getColumnsCategory = (
  onEdit: (categoryId: string, data: { name: string }) => void,
  onDelete: (id: string) => void
): ColumnDef<CategoryType>[] => [
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
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex gap-2 justify-center items-center">
          <DialogCategoryEdit category={category} onSubmit={onEdit} />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(category.id)}
            className="cursor-pointer"
          >
            Excluir
          </Button>
        </div>
      );
    },
  },
];
