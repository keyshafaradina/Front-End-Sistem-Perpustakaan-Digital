import MainLayout from "../../layouts/MainLayout";

export default function Dashboard () {
  return(
    <div><MainLayout />
    <div className="font-bold w-full text-center text-2xl py-6 bg-pink-200"><h1>Dinas Perpustakaan dan Arsip Daerah</h1></div>
    <div className="flex justify-center items-center gap-7 p-20">
      <img src="/images/logoperpus.png" alt="logo" className="w-80 h-80"/>
      <div className="flex flex-col gap-4">
      <div className="font-bold text-2xl"><h2>Visi:</h2></div>
      <p>Mewujudkan masyarakat Humbang Hasundutan yang cerdas, mandiri, dan bermartabat melalui optimalisasi budaya baca dan pengelolaan kearsipan yang profesional.</p>
      <div className="font-bold text-2xl"><h2>Misi:</h2></div>
      <div className="">
      <p>​1. Peningkatkan Minat Baca: Menumbuhkan kebiasaan membaca di seluruh lapisan masyarakat, mulai dari tingkat desa hingga perkotaan.<br></br>​2. Penyediaan Koleksi yang Berkualitas: Menyediakan buku dan referensi (baik fisik maupun digital) yang relevan dengan kebutuhan masyarakat petani, pelajar, dan umum di Humbang Hasundutan.
          <br></br>​3. Transformasi Perpustakaan Berbasis Inklusi Sosial: Menjadikan perpustakaan bukan sekadar tempat pinjam buku, tapi pusat kegiatan masyarakat untuk meningkatkan kesejahteraan.
          <br></br>​4. Profesionalisme Tata Kelola: Meningkatkan kualitas pelayanan perpustakaan dan kearsipan melalui pemanfaatan teknologi informasi (digitalisasi).</p>
      </div>
      <div className="font-bold text-2xl"><h2>Alamat:</h2></div>
      <p>Alamat: 
        Kompleks Tanah Lapang, Kel. I, Ps. Doloksanggul,
        Kec. Doloksanggul, Kabupaten Humbang
        Hasundutan, Sumatera Utara 22457</p>
      <div className="font-bold text-2xl"><h2>Akun Sosial Media:</h2></div>
      <p>@disperpusiphumbahas</p>
      </div>
    </div>
    </div>
  );
}