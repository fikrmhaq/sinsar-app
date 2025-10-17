import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button
} from "@mui/material";

export default function BarangDialog(props: any) {
  const [form, setForm] = React.useState({
    Id_Barang: null,
    Tgl_Pinjam: "",
    Tgl_Kembali: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onSubmit(form);
    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={() => props.onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>Pinjam Barang</DialogTitle>
      <DialogContent dividers>
        {/* Nama Barang (choice) */}
        <TextField
          select
          fullWidth
          margin="normal"
          label="Nama Barang"
          name="Nama_Barang"
          value={form.Id_Barang}
          onChange={(ev) => setForm((prev: any) => ({...prev, Id_Barang: ev.target.value}))}
        >
          {
            props.data_barang.filter((el: any) => el.Status === 'Tersedia')
            .filter((el: any) => !props.data_peminjaman.filter((x: any) => x.Status === 1).map((x: any) => x.Id_Barang).includes(el.id))
            // .filter((el: any) => !props.data_peminjaman.filter((x: any) => x.Status !== 2).map((x: any) => x.Id_Barang).includes(el.id))
            .map((el: any, i: any) => {
              return <MenuItem value={el.id}>{el.Nama_Barang}</MenuItem>
            })
          }
        </TextField>

        {/* Tgl Pinjam */}
        <TextField
          fullWidth
          margin="normal"
          label="Tgl Pinjam"
          name="Tgl_Pinjam"
          type="date"
          value={form.Tgl_Pinjam}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        {/* Tgl Kembali */}
        <TextField
          fullWidth
          margin="normal"
          label="Tgl Kembali"
          name="Tgl_Kembali"
          type="date"
          value={form.Tgl_Kembali}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => props.onClose(false)}>Batal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}