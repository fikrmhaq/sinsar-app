import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
// import Badge from "../ui/badge/Badge";
import ModalTambahPeminjaman from "./ModalTambahPeminjaman"
// import ModalEditBarang from "./ModalEditBarang"
import { useState } from "react";
// import TableActions from "./Icons/TableActions"
import StatusCell from "./subcomponents/ConfirmationBadge";
import { findMatchingRecords } from "../../function";
import { useApp } from "../../layout/AppLayout";

// Define the table data using the interface

export default function RecentOrders(props: any) {
    const [open, setOpen] = useState(false)
    // const [editOpen, setEditOpen] = useState(false)
    // const [val, setVal] = useState(null)
      const app: any = useApp()
    

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Peminjaman Barang
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                        Pinjam
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
                                NIM
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Nama Barang
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Tanggal Pinjam
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Tanggal Kembali
                            </TableCell>
                            <TableCell
                                isHeader
                                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                            >
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    {/* Table Body */}

                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {findMatchingRecords(props.data, app.search).map((product: any) => {
                            var find_barang = props.barang.find((x: any) => x.id === product.Id_Barang)
                            var nama_barang = find_barang ? find_barang.Nama_Barang : "-"
                            return (
                                <TableRow key={product.Id} className="">
                                    <TableCell className="py-3">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.NIM}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {nama_barang}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.Tgl_Pinjam}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                        <div>
                                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {product.Tgl_Kembali}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <StatusCell status={product.Status} />
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <ModalTambahPeminjaman data_barang={props.barang} data_peminjaman={props.data} open={open} onClose={() => setOpen(false)} onSubmit={props.onTambah} />
            {/* <ModalEditBarang open={editOpen} onClose={() => setEditOpen(false)} onSubmit={(params: any) => props.onEdit(val, params)} /> */}

        </div>
    );
}
