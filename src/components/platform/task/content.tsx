'use client'

import { useState } from 'react'
import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Icon } from '@iconify/react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import TaskForm from './form'
import { Task } from './type'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onTasksChange?: () => Promise<void>
}

export function Content<TData, TValue>({ columns, data, onTasksChange }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    gender: false,
    dob: false,
    priority: false,
    remark: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const statusColumn = table.getColumn('status')
  const priorityColumn = table.getColumn('priority')

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    if (onTasksChange) {
      await onTasksChange();
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      {/* Filters and Add Task Button */}
      <div className='flex flex-wrap items-center justify-between gap-2 md:gap-4 py-4'>
        <div className='flex flex-wrap items-center gap-2 md:gap-4'>
          {/* Search Input */}
          <Input
            placeholder='Search by task name...'
            value={(table.getColumn('task')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('task')?.setFilterValue(event.target.value)
            }
            className='w-[200px]'
          />

          {/* Mobile filter trigger */}
          <div className='block sm:hidden'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='ghost'>
                  <Icon icon='mdi:filter' width={24} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Filter Options</DialogTitle>
                <div className='flex flex-col gap-4'>
                  {/* Filters inside modal */}
                  {statusColumn && (
                    <DataTableFacetedFilter
                      column={statusColumn}
                      title='Status'
                      options={[
                        { label: 'Stuck', value: 'stuck' },
                        { label: 'In Progress', value: 'in_progress' },
                        { label: 'Done', value: 'done' },
                        { label: 'Cancelled', value: 'cancelled' },
                      ]}
                      onFilterChange={(filterValue) => {
                        statusColumn.setFilterValue(filterValue)
                      }}
                    />
                  )}
                  
                  {priorityColumn && (
                    <DataTableFacetedFilter
                      column={priorityColumn}
                      title='Priority'
                      options={[
                        { label: 'High', value: 'high' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Low', value: 'low' },
                        { label: 'Neutral', value: 'neutral' },
                      ]}
                      onFilterChange={(filterValue) => {
                        priorityColumn.setFilterValue(filterValue)
                      }}
                    />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Desktop filters */}
          <div className='hidden gap-4 sm:flex'>
            {statusColumn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="h-9 px-3 gap-2 reveal"
                  >
                    <Icon icon="lucide:filter" className="size-3" />
                    Status
                    {!!statusColumn?.getFilterValue() && (
                      <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-medium">
                        1
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DataTableFacetedFilter
                    column={statusColumn}
                    title='Status'
                    options={[
                      { label: 'Stuck', value: 'stuck' },
                      { label: 'In Progress', value: 'in_progress' },
                      { label: 'Done', value: 'done' },
                      { label: 'Cancelled', value: 'cancelled' },
                    ]}
                    onFilterChange={(filterValue) => {
                      statusColumn.setFilterValue(filterValue);
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {priorityColumn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 px-3 gap-2 reveal"
                  >
                    <Icon icon="lucide:filter" className="size-3" />
                    Priority
                    {!!priorityColumn?.getFilterValue() && (
                      <span className="ml-1 rounded-full bg-primary/10 px-1.5 text-xs font-medium">
                        1
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DataTableFacetedFilter
                    column={priorityColumn}
                    title='Priority'
                    options={[
                      { label: 'High', value: 'high' },
                      { label: 'Medium', value: 'medium' },
                      { label: 'Low', value: 'low' },
                      { label: 'Neutral', value: 'neutral' },
                    ]}
                    onFilterChange={(filterValue) => {
                      priorityColumn.setFilterValue(filterValue);
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Column visibility dropdown */}
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label='Select Columns'
                  variant='outline'
                  className='h-9 px-3 gap-2 reveal'
                >
                  <MixerHorizontalIcon className='size-4' />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Task Button */}
            <Button 
              variant="outline"
              className="h-9 w-9 rounded-full flex items-center justify-center p-0 mx-1.5"
              onClick={handleOpenModal}
            >
              <Icon icon="lucide:plus" className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className='border-t border-b rounded-none'>
        <Table className="border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border-b border-l-0 border-r-0">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b hover:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-0 p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center border-0'
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Task create/edit modal */}
      {isModalOpen && (
        <TaskForm
          onSuccess={async () => {
            if (onTasksChange) await onTasksChange();
            return Promise.resolve();
          }}
          onClose={handleCloseModal}
        />
      )}
    </>
  )
}
