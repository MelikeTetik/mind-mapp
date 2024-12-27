import Link from "next/link";

// Konu verileri
const topics = [
  { id: 1, title: "Tarih ve Zaman", description: "Tarih bilimine giriş yapın." },
  { id: 2, title: "İnsanlığın İlk Dönemleri", description: "İlk çağlar hakkında bilgi edinin." },
  { id: 3, title: "Ortaçağ’da Dünya", description: "Ortaçağ dönemine derinlemesine bakış." },
  { id: 4, title: "İlk ve Orta Çağlarda Türk Dünyası", description: "Türk dünyasının tarihini keşfedin." },
  { id: 5, title: "İslam Medeniyetinin Doğuşu", description: "İslam medeniyetinin temelleri." },
  { id: 6, title: "İlk Türk İslam Devletleri", description: "İlk Türk-İslam devletlerini inceleyin." },
  { id: 7, title: "Yerleşme ve Devletleşme Sürecinde Selçuklu Türkiyesi", description: "Selçuklu tarihine genel bakış." },
  { id: 8, title: "Beylikten Devlete Osmanlı Siyaseti (1300-1453)", description: "Osmanlı Devleti'nin yükseliş dönemi." },
  { id: 9, title: "Dünya Gücü Osmanlı Devleti (1453-1600)", description: "Osmanlı Devleti'nin zirve dönemi." },
  { id: 10, title: "Yeni Çağ Avrupa Tarihi", description: "Yeni Çağ'da Avrupa'ya bir bakış." },
  { id: 11, title: "Yakın Çağ Avrupa Tarihi", description: "Yakın Çağ'da Avrupa tarihini keşfedin." },
  { id: 12, title: "Osmanlı Devletinde Arayış Yılları", description: "Osmanlı'da değişim ve yenilikler." },
  { id: 13, title: "18. Yüzyılda Değişim ve Diplomasi", description: "18. yüzyılın diplomatik gelişmeleri." },
  { id: 14, title: "En Uzun Yüzyıl", description: "Osmanlı'nın modernleşme süreci." },
  { id: 15, title: "Osmanlı Kültür ve Medeniyeti", description: "Osmanlı'nın kültürel mirası." },
  { id: 16, title: "20. Yüzyılda Osmanlı Devleti", description: "Osmanlı'nın son dönemleri." },
  { id: 17, title: "I. Dünya Savaşı", description: "I. Dünya Savaşı'nın nedenleri ve sonuçları." },
  { id: 18, title: "Mondros Ateşkesi, İşgaller ve Cemiyetler", description: "Osmanlı'nın işgaller dönemi." },
  { id: 19, title: "Kurtuluş Savaşına Hazırlık Dönemi", description: "Kurtuluş Savaşı'nın başlangıcı." },
  { id: 20, title: "I. TBMM Dönemi", description: "I. TBMM'nin faaliyetleri." },
  { id: 21, title: "Kurtuluş Savaşı ve Antlaşmalar", description: "Kurtuluş Savaşı'nın dönüm noktaları." },
  { id: 22, title: "II. TBMM Dönemi ve Çok Partili Hayata Geçiş", description: "Çok partili hayata geçiş dönemi." },
  { id: 23, title: "Türk İnkılabı", description: "Türk İnkılabı'nın temel taşları." },
  { id: 24, title: "Atatürk İlkeleri", description: "Atatürk'ün ilkelerini keşfedin." },
  { id: 25, title: "Atatürk Dönemi Türk Dış Politikası", description: "Atatürk döneminin dış politikası." },
];

const Home = () => {
  return (
      <main style={{ backgroundColor: "rgb(139,119,101)" }} className="p-8">
        <h1
            style={{ backgroundColor: "rgb(139 121 94)" }}
            className="text-3xl font-bold mb-6 text-center text-brown-800"
        >
          TYT Tarih Zihin Haritalarını Keşfedin
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
              <Link key={topic.id} href={`/pages/${topic.id}`}>
                <div
                    style={{ backgroundColor: "rgb(205,175,149)" }}
                    className="p-4 border rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:shadow-2xl hover:scale-105"
                >
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200">
                    {topic.title}
                  </h2>
                  <p className="text-gray-700 hover:text-gray-500 transition-colors duration-200">
                    {topic.description}
                  </p>
                </div>
              </Link>
          ))}
        </div>
      </main>
  );
};

export default Home;