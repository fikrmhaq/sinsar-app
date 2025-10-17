import TabelPeminjaman from "../../components/manajemen-tabel/TabelPeminjaman";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Data() {
  const [dataBarang, setDataBarang] = useState([])
  const [data, setData] = useState([])
  const user_storage: any = localStorage.getItem('user') 
  const user = user_storage ? JSON.parse(user_storage) : null
  const token = localStorage.getItem('token')




  const getDataBarang = () => {
    axios.get(import.meta.env.VITE_API + '/barang', {headers: {authorization:token}}).then(res => {
      setDataBarang(res.data)
    })
  }

  const getData = () => {
    axios.get(import.meta.env.VITE_API + '/peminjaman', {
      params: {
        NIM: user ? user.Username : '-'
      }, 
      headers: {authorization:token}
    }).then(res => {
      setData(res.data)
    })
  }


  const postData = async (data: any) => {
    // console.log(data)
    await axios.post(import.meta.env.VITE_API + '/peminjaman', {...data, NIM: user.Username, Status: 1}, {headers: {authorization:token}})
    Swal.fire({
      icon: "success",
      title: "Inputted!",
      text: "You've been successfully inputted a data.",
      timer: 1500,
      showConfirmButton: false,
    });
    getData()
  }



  useEffect(() => {
    getData()
    getDataBarang()
  }, [])
  return (
    <>
      <PageMeta
        title="SinSar | Sistem Informasi Sarana Prasarana"
        description="Sistem Informasi Sarana Prasarana"
      />
      <div className="">


        <div className="col-span-12 xl:col-span-7">
          <TabelPeminjaman data={data} barang={dataBarang} onTambah={postData} />
        </div>
      </div>
    </>
  );
}
