'use client';
import { EditJourneyModal } from '@/components/journey/EditJourneyModal';
import { createColumns, Journey } from '@/components/journey/columns';
import { Input } from '@/components/ui/shadcnUi/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/shadcnUi/table';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

export function DataTable({ data }: { data: Journey[] }) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [selectedJourney, setSelectedJourney] = React.useState<Journey | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleEditClick = (journey: Journey) => {
    setSelectedJourney(journey);
    setIsModalOpen(true);
  };

  const handleDeleteJourney = (journey: Journey) => {
    console.log('Deletando jornada:', journey.name);
    // Adicione a lógica de exclusão aqui
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJourney(null);
  };

  const handleModalConfirm = (name: string, description: string) => {
    console.log('Atualizando jornada:', name, description);
    setIsModalOpen(false);
  };

  const table = useReactTable({
    data,
    columns: createColumns(handleEditClick, handleDeleteJourney),
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  });

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-4 border-b-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-transparent border-none"
                >
                  <TableCell
                    colSpan={row.getVisibleCells().length}
                    className="p-0 border-none"
                  >
                    <div className="my-2 px-6 py-3 mx-2 bg-white rounded-lg shadow-md border border-gray-300">
                      <div className="flex justify-between">
                        {row.getVisibleCells().map((cell) => (
                          <div key={cell.id} className="flex-1 p-2">
                            <span
                              className={
                                cell.column.id === 'name'
                                  ? 'font-medium'
                                  : 'font-normal'
                              }
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedJourney && (
        <EditJourneyModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          initialName={selectedJourney.name}
          initialDescription={selectedJourney.description}
        />
      )}
    </>
  );
}