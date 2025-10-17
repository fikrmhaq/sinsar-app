import * as React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

export default function BarangDialog(props: any) {
  // const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    Kode_Barang: "",
    Nama_Barang: "",
    Jenis_Barang: "",
    Status: "Tersedia"
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    props.onSubmit(form)
    
    props.onClose();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={() => props.onClose(false)} fullWidth maxWidth="sm">
        <DialogTitle>Tambah Barang</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="normal"
            label="Kode Barang"
            name="Kode_Barang"
            value={form.Kode_Barang}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nama Barang"
            name="Nama_Barang"
            value={form.Nama_Barang}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Jenis Barang"
            name="Jenis_Barang"
            value={form.Jenis_Barang}
            onChange={handleChange}
          >
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Pakaian">Pakaian</MenuItem>
            <MenuItem value="Makanan">Makanan</MenuItem>
            <MenuItem value="Lainnya">Lainnya</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => props.onClose()}>Batal</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}