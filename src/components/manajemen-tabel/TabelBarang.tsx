import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import ModalTambahBarang from "./ModalTambahBarang"
import ModalEditBarang from "./ModalEditBarang"
import { useState } from "react";
import TableActions from "./Icons/TableActions"
import { useApp } from "../../layout/AppLayout";
import { findMatchingRecords } from "../../function";

// Define the TypeScript interface for the table rows
// interface Product {
//   id: number; // Unique identifier for each product
//   name: string; // Product name
//   variants: string; // Number of variants (e.g., "1 Variant", "2 Variants")
//   category: string; // Category of the product
//   price: string; // Price of the product (as a string with currency symbol)
//   // status: string; // Status of the product
//   image: string; // URL or path to the product image
//   status: "Delivered" | "Pending" | "Canceled"; // Status of the product
// }

// Define the table data using the interface

export default function RecentOrders(props: any) {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [val, setVal] = useState(null)
  const app: any = useApp()

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Barang
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Tambah
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Barang
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {findMatchingRecords(props.data, app.search).map((product: any) => (
              <TableRow key={product.Id} className="">
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.Nama_Barang}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.Jenis_Barang}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.Status === "Tersedia"
                        ? "success"
                        : product.Status === "Tidak Tersedia"
                          ? "warning"
                          : "error"
                    }
                  >
                    {product.Status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <TableActions onEdit={() => {
                    setEditOpen(true)
                    setVal(product.id)
                  }} onDelete={() => props.onDelete(product.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalTambahBarang open={open} onClose={() => setOpen(false)} onSubmit={props.onTambah} />
      <ModalEditBarang open={editOpen} onClose={() => setEditOpen(false)} onSubmit={(params: any) => props.onEdit(val, params)} />

    </div>
  );
}
