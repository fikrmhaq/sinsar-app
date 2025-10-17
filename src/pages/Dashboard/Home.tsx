import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import PageMeta from "../../components/common/PageMeta";
import Peminjaman from "./../Mahasiswa/Peminjaman";
import axios from "axios";
import { useEffect, useState } from "react";

export default () => {
  const user_storage = localStorage.getItem('user')
  const user = user_storage ? JSON.parse(user_storage) : null

  if(user === null) return null
  if(user.Role === 1) return <Admin/>
  return <Peminjaman/> 
}

function Admin() {
  const [barang, setBarang] = useState([])
  const [peminjaman, setPeminjaman] = useState([])
  const [chartData, setChartData] = useState([
    { name: "Peminjaman", data: Array(12).fill(0) },
  ]);
  const token = localStorage.getItem('token')


  const getBarang = () => {
    axios.get(import.meta.env.VITE_API + '/barang', {headers: {authorization:token}}).then(res => {
      setBarang(res.data)
    })
  }

  const getPeminjaman = () => {
    axios.get(import.meta.env.VITE_API + '/peminjaman', {headers: {authorization:token}}).then(res => {
      setPeminjaman(res.data)
      const monthlyCounts = Array(12).fill(0);

      res.data.forEach((item: any) => {
        const date = new Date(item.Tgl_Pinjam);
        const month = date.getMonth(); // 0 = Jan, 11 = Dec
        monthlyCounts[month] += 1;
      });
      setChartData([{ name: "Peminjaman", data: monthlyCounts }]);
    })
  }



  useEffect(() => {
    getBarang()
    getPeminjaman()
  }, [])

  return (
    <>
      <PageMeta
       title="SinSar | Sistem Informasi Sarana Prasarana"
        description="Sistem Informasi Sarana Prasarana"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics barang={barang} peminjaman={peminjaman} />

          <MonthlySalesChart chart={chartData} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <RecentOrders barang={barang} peminjaman={peminjaman} />
        </div>
      </div>
    </>
  );
}
