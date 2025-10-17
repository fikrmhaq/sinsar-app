import TabelBarang from "../../components/manajemen-tabel/TabelBarang";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Data() {
  const [data, setData] = useState([])

  const token = localStorage.getItem('token')



  const getData = () => {
    axios.get(import.meta.env.VITE_API + '/barang', {headers: {authorization:token}}).then(res => {
      setData(res.data)
    })
  }

  const postData = async (data: any) => {
    await axios.post(import.meta.env.VITE_API + '/barang', data, {headers: {authorization:token}})
    Swal.fire({
      icon: "success",
      title: "Inputted!",
      text: "You've been successfully inputted a data.",
      timer: 1500,
      showConfirmButton: false,
    });
    getData()
  }

  const deleteData = async (id: any) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });


    if (result.isConfirmed) {
      await axios.delete(import.meta.env.VITE_API + '/barang/' + id, {headers: {authorization:token}})
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your item has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
      getData()
    }
  }

  const editData = async (id: any, body: any) => {
    await axios.patch(import.meta.env.VITE_API + '/barang/' + id, body)
    Swal.fire({
      icon: "success",
      title: "Editted!",
      text: "Your item has been editted.",
      timer: 1500,
      showConfirmButton: false,
    });
    getData()
  }



  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <PageMeta
        title="SinSar | Sistem Informasi Sarana Prasarana"
        description="Sistem Informasi Sarana Prasarana"
      />
      <div className="">


        <div className="col-span-12 xl:col-span-7">
          <TabelBarang data={data} onTambah={postData} onDelete={deleteData} onEdit={editData} />
        </div>
      </div>
    </>
  );
}
