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
            select
            fullWidth
            margin="normal"
            label="Status"
            name="Status"
            value={form.Status}
            onChange={handleChange}
          >
            <MenuItem value="Tersedia">Tersedia</MenuItem>
            <MenuItem value="Tidak Tersedia">Tidak Tersedia</MenuItem>
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