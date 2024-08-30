'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type StartingPoint = {
  id: string;
  name: string;
  description: string;
};
export const columns: ColumnDef<StartingPoint>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    id: 'options',
    cell: ({ row }) => {
      const startingPoint = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#F5EAF7] p-2 rounded-md"
            >
              <DropdownMenuItem
                onClick={() => console.log(`Edit ${startingPoint.name}`)}
                className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
              >
                Editar Jornada
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log(`Manage ${startingPoint.name}`)}
                className="text-gray-700 hover:bg-gray-200 p-2 rounded-md"
              >
                Gerenciar Trilhas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => console.log(`Delete ${startingPoint.name}`)}
                className="text-red-600 hover:bg-red-100 p-2 rounded-md"
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
