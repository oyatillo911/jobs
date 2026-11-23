// =========================================================================================================
// 1-QADAM: TASHQI DUNYODAN KERAKLI ASBOBLARNI CHAQIRISH (IMPORT BO'LIMI)
// =========================================================================================================

// "import" — boshqa fayllar yoki kutubxonalardan tayyor asboblarni olib kelish buyrug'i.
// "{ useState }" — React kutubxonasining "Reaktiv Xotira" yaratuvchi asosiy asbobi.
// Bu asbob yordamida yaratilgan ma'lumot o'zgarganda, React ekranni avtomatik ravishda yangilaydi (re-render qiladi).
import { useState } from "react";

// "BrowserRouter" — Butun veb-ilovamizni o'rab turuvchi, brauzer URL manzilini nazorat qiluvchi "Katta kompas".
// "Route" — Bitta aniq yo'l (masalan: "/kompaniyalar" manziliga qaysi sahifa ochilishi kerakligini belgilovchi qoida).
// "Routes" — Barcha yo'nalishlarni o'z ichiga olgan chorraha (yo'l xaritasi).
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Saytning yuqori qismidagi doimiy bosh menyu (Navbar) komponenti:
import Navbar from "./Navbar";

// Asosiy sahifa — Barcha mavjud ish o'rinlari (vakansiyalar) va filtrlar joylashgan sahifa:
import VakansiyalarPage from "./pages/VakansiyalarPage";

// Saqlanganlar sahifasi — Foydalanuvchi o'ziga yoqtirib, xatcho'p (bookmark) qilgan ishlar ro'yxati:
import SaqlanganPage from "./pages/SaqlanganPage";

// Kompaniyalar sahifasi — Saytdagi barcha ish beruvchi kompaniyalar haqida batafsil ma'lumot beruvchi sahifa:
import KompaniyalarPage from "./pages/KompaniyalarPage";

// Mening e'lonlarim sahifasi — Foydalanuvchi o'zi joylashtirgan e'lonlarni ko'rish, tahrirlash va o'chirish kabineti:
import MeningElonlarimPage from "./pages/MeningElonlarimPage";

// Blog sahifasi — Jobs platformasi bo'yicha yo'riqnomalar, karyera va rezyume maslahatlari sahifasi:
import BlogPage from "./pages/BlogPage";

// Ariza topshirish modali — Foydalanuvchi "Ariza topshirish" tugmasini bosganda qalqib chiquvchi anketali oyna:
import ArizaModal from "./components/ArizaModal";

// E'lon joylashtirish va tahrirlash modali — Yangi ish o'rni qo'shish yoki mavjudini o'zgartirish oynasi:
import ElonJoylashModal from "./components/ElonJoylashModal";

// =========================================================================================================
// 2-QADAM: ASOSIY KOMPONENT (APP FUNKSIYASI) — BUTUN SAYTNING BOSHQARUV MARKAZI
// =========================================================================================================

function App() {
  // -------------------------------------------------------------------------------------------------------
  // STANDART (BOSHLANG'ICH) MA'LUMOTLAR BAZASI
  // -------------------------------------------------------------------------------------------------------

  // "boshlangichVakansiyalar" — Agar localStorage bo'sh bo'lsa yoki sayt birinchi ochilganda ishlatiladigan ro'yxat:
  const boshlangichVakansiyalar = [
    {
      id: 1, // Takrorlanmas unikal ID raqami (pasport seriyasi kabi)
      letter: "D", // Kompaniya logotipidagi bosh harf
      title: "Senior frontend dasturchi", // Kasb/Lavozim nomi
      salaryText: "8 – 12 mln", // Saytda chiroyli ko'rinuvchi oylik matni
      salaryMax: 12, // Filtrlash uchun sof son ko'rinishidagi maosh (mln)
      company: "Datalab · IT Park rezidenti", // Ish beruvchi tashkilot
      city: "Toshkent", // Shahar
      category: "IT va dasturlash", // Faoliyat sohasi
      time: "2 soat oldin", // E'lon berilgan vaqt
      createdAt: 6, // Saralash (sorting) uchun vaqt ko'rsatkichi
      tags: ["Masofaviy", "To‘liq stavka"], // Bandlik turlari
    },
    {
      id: 2,
      letter: "D",
      title: "Python backend dasturchi",
      salaryText: "7 – 10 mln",
      salaryMax: 10,
      company: "Datalab",
      city: "Toshkent",
      category: "IT va dasturlash",
      time: "4 soat oldin",
      createdAt: 5,
      tags: ["Masofaviy"],
    },
    {
      id: 3,
      letter: "M",
      title: "Buxgalter",
      salaryText: "3.5 – 5 mln",
      salaryMax: 5,
      company: "Moliya Invest MChJ",
      city: "Samarqand",
      category: "Moliya va buxgalteriya",
      time: "5 soat oldin",
      createdAt: 4,
      tags: ["To‘liq stavka"],
    },
    {
      id: 4,
      letter: "Z",
      title: "SMM mutaxassisi",
      salaryText: "4 – 6 mln",
      salaryMax: 6,
      company: "Zamon Media",
      city: "Toshkent",
      category: "Marketing",
      time: "Kecha",
      createdAt: 3,
      tags: ["Qisman bandlik"],
    },
    {
      id: 5,
      letter: "T",
      title: "Savdo menejeri",
      salaryText: "2.5 mln + bonus",
      salaryMax: 2.5,
      company: "Texnomart",
      city: "Farg‘ona",
      category: "Savdo",
      time: "Kecha",
      createdAt: 2,
      tags: ["To‘liq stavka"],
    },
    {
      id: 6,
      letter: "P",
      title: "Ingliz tili o‘qituvchisi",
      salaryText: "3 – 4.5 mln",
      salaryMax: 4.5,
      company: "Progress Academy",
      city: "Andijon",
      category: "Ta‘lim",
      time: "2 kun oldin",
      createdAt: 1,
      tags: ["Qisman bandlik"],
    },
  ];

  // Shaharlar ro'yxati (boshlang'ich filtr variantlari)
  const shaharlar = [
    { name: "Toshkent", count: 84 },
    { name: "Samarqand", count: 21 },
    { name: "Farg‘ona", count: 12 },
    { name: "Andijon", count: 9 },
    { name: "Nukus", count: 2 },
    { name: "Namangan", count: 2 },
  ];

  // Sohalar ro'yxati (kategoriya filtri variantlari)
  const sohalar = [
    { name: "IT va dasturlash", count: 45 },
    { name: "Moliya va buxgalteriya", count: 18 },
    { name: "Savdo", count: 15 },
    { name: "Marketing", count: 11 },
    { name: "Ta‘lim", count: 8 },
  ];

  // Bandlik turlari (ish jadvali filtri)
  const bandlikTurlari = [
    { name: "To‘liq stavka", count: 70 },
    { name: "Masofaviy", count: 22 },
    { name: "Qisman bandlik", count: 14 },
  ];

  // Maosh variantlari filtri (radio buttonlar uchun)
  const maoshVariantlari = [
    { id: 1, label: "Barchasi" },
    { id: 2, label: "2 mln dan" },
    { id: 3, label: "2 – 5 mln" },
    { id: 4, label: "5 – 10 mln" },
    { id: 5, label: "10 mln dan yuqori" },
  ];

  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: STATE (REAKTIV XOTIRA) — SAYTNING O'ZGARUVCHAN YURAGI
  // -------------------------------------------------------------------------------------------------------

  // 1-XOTIRA: Vakansiyalar ro'yxati (yangi e'lon qo'shilganda dinamik yangilanadi va brauzerda saqlanadi)
  // localStorage orqali foydalanuvchi sahifani yangilasa ham yangi qo'shilgan ishlar yo'qolib ketmaydi!
  const [vakansiyalarRoyxati, setVakansiyalarRoyxati] = useState(() => {
    const saqlangan = localStorage.getItem("job_board_vakansiyalar");
    if (saqlangan) {
      try {
        return JSON.parse(saqlangan);
      } catch (err) {
        console.error("Vakansiyalarni o'qishda xatolik:", err);
      }
    }
    return boshlangichVakansiyalar;
  });

  // 2-XOTIRA: Saqlangan (xatcho'pga olingan) ishlar ro'yxati
  const [savedjob, setsavedjob] = useState([]);

  // 3-XOTIRA: Foydalanuvchi ariza topshirib bo'lgan vakansiyalar ro'yxati
  const [appliedJobs, setAppliedJobs] = useState([]);

  // 4-XOTIRA: Ariza topshirish modalida ayni daqiqada qaysi vakansiya ochiqligi (null bo'lsa modal yopiq)
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);

  // 5-XOTIRA: Yangi e'lon joylashtirish modali ochiq/yopiq holati (boolean: true/false)
  const [isElonModalOpen, setIsElonModalOpen] = useState(false);

  // 6-XOTIRA: Ayni daqiqada tahrirlanayotgan e'lon obyekti (agar null bo'lsa — demak yangi e'lon qo'shilmoqda)
  const [editingJob, setEditingJob] = useState(null);

  // FOYDALANUVCHINING O'Z E'LONLARI RO'YXATI:
  // "isMyJob: true" belgisi bo'lgan yoki keyinchalik qo'shilgan (ID > 100) barcha vakansiyalarni ajratib olamiz:
  const myJobs = vakansiyalarRoyxati.filter(
    (job) =>
      Boolean(job.isMyJob) || (typeof job.id === "number" && job.id > 100),
  );

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: MANTIQIY FUNKSIYALAR (HODISALARNI BOSHQARUVCHILAR / HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // A) ARIZA MUVAFFAQIYATLI YUBORILGANDA ISHGA TUSHUVCHI FUNKSIYA:
  const handleApplySuccess = (job) => {
    setAppliedJobs((prev) => {
      // .some() — tekshiramiz: bu ishga oldin topshirilganmi?
      const allaqachonTopshirilgan = prev.some((item) => item.id === job.id);
      if (allaqachonTopshirilgan) return prev;
      return [...prev, job]; // Ro'yxat oxiriga yangi arizani qo'shamiz
    });
    setSelectedJobForApply(null); // Ariza ketgach modalni yopamiz
  };

  // B) ARIZA TOPSHIRISH MODALINI OCHUVCHI FUNKSIYA:
  const handleOpenApplyModal = (job) => {
    setSelectedJobForApply(job); // Xotiraga shu ishni solamiz, React modalni chizadi
  };

  // C) VAKANSIYANI SAQLASH / SAQLASHDAN CHIQARISH (TOGGLE):
  const handleToggleSave = (job) => {
    setsavedjob((prev) => {
      const allaqachonbor = prev.some((item) => item.id === job.id);
      if (allaqachonbor) {
        // Agar bor bo'lsa — elakdan o'tkazib (filter qilib) o'chirib tashlaymiz:
        return prev.filter((item) => item.id !== job.id);
      }
      // Agar yo'q bo'lsa — ro'yxatga qo'shamiz:
      return [...prev, job];
    });
  };

  // D) SAQLANGANLAR RO'YXATIDAN BITTA ISHNI BUTUNLAY O'CHIRISH:
  const handleRemoveSave = (jobId) => {
    setsavedjob((prev) => prev.filter((item) => item.id !== jobId));
  };

  // E) BARCHA SAQLANGAN ISHLARNI BIR ZUMDA TOZALASH:
  const handleclearAll = () => {
    setsavedjob([]); // Bo'sh massiv bilan xotirani tozalaymiz
  };

  // F) YANGI VAKANSIYA QO'SHISH YOKI MAVJUDINI TAHRIRLASH (SAVE / UPDATE):
  // jobData: e'lon ma'lumotlari obyekti
  // isEdit: true bo'lsa tahrirlash, false bo'lsa yangi qo'shish
  const handleSaveJob = (jobData, isEdit = false) => {
    setVakansiyalarRoyxati((prev) => {
      let yangilangan;
      if (isEdit) {
        // 1. Tahrirlash: ro'yxat ichidagi mos ID-li ishni yangi ma'lumotga almashtiramiz
        yangilangan = prev.map((item) =>
          item.id === jobData.id ? { ...jobData, isMyJob: true } : item,
        );
      } else {
        // 2. Yangi qo'shish: eng yangi e'lon birinchi bo'lib ko'rinishi uchun boshiga qo'shamiz
        yangilangan = [{ ...jobData, isMyJob: true }, ...prev];
      }

      // O'zgarishni brauzer xotirasiga (localStorage) yozib qo'yamiz:
      try {
        localStorage.setItem(
          "job_board_vakansiyalar",
          JSON.stringify(yangilangan),
        );
      } catch (err) {
        console.error("Localstorage saqlashda xatolik:", err);
      }
      return yangilangan;
    });

    setIsElonModalOpen(false); // Modal oynani yopamiz
    setEditingJob(null); // Tahrirlash holatini tozalaymiz
  };

  // G) MAVJUD E'LONNI TAHRIRLASH UCHUN MODALNI OCHISH:
  const handleOpenEditJob = (job) => {
    setEditingJob(job); // Tahrirlanayotgan ishni xotiraga yuklaymiz
    setIsElonModalOpen(true); // Modal oynani ochamiz
  };

  // H) FOYDALANUVCHINING E'LONINI O'CHIRISH:
  const handleDeleteMyJob = (jobId) => {
    setVakansiyalarRoyxati((prev) => {
      const yangilangan = prev.filter((item) => item.id !== jobId);
      try {
        localStorage.setItem(
          "job_board_vakansiyalar",
          JSON.stringify(yangilangan),
        );
      } catch (err) {
        console.error("Localstorage saqlashda xatolik:", err);
      }
      return yangilangan;
    });

    // Agar bu ish saqlanganlar orasida ham bo'lsa, u yerdan ham olib tashlaymiz:
    setsavedjob((prev) => prev.filter((item) => item.id !== jobId));
  };

  // I) E'LON MODALINI YOPISH:
  const handleCloseElonModal = () => {
    setIsElonModalOpen(false);
    setEditingJob(null);
  };

  // =========================================================================================================
  // 5-QADAM: RETURN (JSX) — FOYDALANUVCHINING KO'ZIGA KO'RINADIGAN VIZUAL DUNYO
  // =========================================================================================================

  return (
    // <BrowserRouter> — Butun sahifalarni qamrab oluvchi tashqi yo'l boshqaruvchisi.
    <BrowserRouter>
      {/* 
        <Navbar /> — Saytning doimiy yuqori menyusi.
        Props orqali saqlanganlar soni, foydalanuvchi e'lonlari soni va modal ochish funksiyasini beramiz:
      */}
      <Navbar
        savedCount={savedjob.length}
        myJobsCount={myJobs.length}
        onOpenElonModal={() => {
          setEditingJob(null); // Yangi e'lon qo'shish rejimi
          setIsElonModalOpen(true); // Modalni ochish
        }}
      />

      {/* <Routes> — Sahifalar yo'llari xaritasi */}
      <Routes>
        {/* 1-YO'L: Bosh sahifa — Vakansiyalar ro'yxati (path="/") */}
        <Route
          path="/"
          element={
            <VakansiyalarPage
              vakansiyalarRoyxati={vakansiyalarRoyxati} // Barcha ishlar
              shaharlar={shaharlar} // Shaharlar filtri
              sohalar={sohalar} // Sohalar filtri
              bandlikTurlari={bandlikTurlari} // Bandlik turlari
              maoshVariantlari={maoshVariantlari} // Maosh filtri
              savedjob={savedjob} // Saqlangan ishlar
              appliedJobs={appliedJobs} // Arizalar holati
              handleToggleSave={handleToggleSave} // Saqlash/o'chirish pulti
              onOpenApplyModal={handleOpenApplyModal} // Ariza modalini ochish pulti
            />
          }
        />

        {/* 2-YO'L: Saqlangan ishlar sahifasi (path="/saqlangan") */}
        <Route
          path="/saqlangan"
          element={
            <SaqlanganPage
              savedjob={savedjob}
              appliedJobs={appliedJobs}
              handleRemoveSave={handleRemoveSave}
              handleclearAll={handleclearAll}
              onOpenApplyModal={handleOpenApplyModal}
            />
          }
        />

        {/* 3-YO'L: Kompaniyalar sahifasi (path="/kompaniyalar") */}
        <Route
          path="/kompaniyalar"
          element={
            <KompaniyalarPage
              vakansiyalarRoyxati={vakansiyalarRoyxati}
              onOpenApplyModal={handleOpenApplyModal}
            />
          }
        />

        {/* 4-YO'L: Mening e'lonlarim sahifasi (path="/mening-elonlarim") */}
        <Route
          path="/mening-elonlarim"
          element={
            <MeningElonlarimPage
              myJobs={myJobs} // Foydalanuvchi yaratgan e'lonlar
              onEditJob={handleOpenEditJob} // Tahrirlash pulti
              onDeleteJob={handleDeleteMyJob} // O'chirish pulti
              onOpenElonModal={() => {
                setEditingJob(null);
                setIsElonModalOpen(true);
              }}
            />
          }
        />

        {/* 5-YO'L: Blog sahifasi (path="/blog") */}
        <Route path="/blog" element={<BlogPage />} />
      </Routes>

      {/* 
        ARIZA TOPSHIRISH MODALI:
        selectedJobForApply null bo'lmaganda (foydalanuvchi ishni tanlaganda) ekranda qalqib chiqadi
      */}
      {selectedJobForApply && (
        <ArizaModal
          job={selectedJobForApply}
          alreadyApplied={appliedJobs.some(
            (item) => item.id === selectedJobForApply.id,
          )}
          onClose={() => setSelectedJobForApply(null)}
          onSubmitSuccess={() => handleApplySuccess(selectedJobForApply)}
        />
      )}

      {/* 
        YANGI E'LON JOYLASHTIRISH VA TAHRIRLASH MODALI:
        isElonModalOpen true bo'lganda ochiladi.
        "key" xossasi orqali tahrirlanayotgan ish o'zgarganda formani yangitdan toza ochilishini ta'minlaymiz!
      */}
      <ElonJoylashModal
        key={editingJob ? `edit-${editingJob.id}` : "new-job"}
        isOpen={isElonModalOpen}
        editJob={editingJob}
        onClose={handleCloseElonModal}
        onSubmit={handleSaveJob}
        shaharlar={shaharlar}
        sohalar={sohalar}
      />
    </BrowserRouter>
  ); // return tugadi.
} // App funksiyasi tugadi.

// Ushbu bosh komponentni saytga ulanishi uchun eksport qilamiz
export default App;

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================

// Voqea: Foydalanuvchi yangi vakansiya e'lon qildi
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi modaldagi formani to'ldirib, "E'lonni joylashtirish" tugmasini bosdi.
// [0.001 soniya] - ONSUBMIT HODISASI:
// ElonJoylashModal ichidagi handleSubmit ishga tushib, barcha ma'lumotlarni yig'adi va yangi newJob obyektini yasaydi.
// [0.002 soniya] - APP.JSX GAYETKAZILISH:
// `handleSaveJob(jobData, false)` chaqiriladi.
// [0.003 soniya] - IMMUTABLE MASSIV YANGILANISHI:
// `[newJob, ...prev]` orqali yangi ish ro'yxatning birinchi o'rniga qo'yiladi.
// `localStorage.setItem(...)` orqali ma'lumot kompyuterning qattiq diskida saqlab qo'yiladi.
// [0.004 soniya] - REACT RE-RENDER:
// `vakansiyalarRoyxati` o'zgargani uchun React butun daraxtni qayta tekshiradi.
// [0.005 soniya] - EKRANLAR JONLANISHI:
// 1. Asosiy sahifada yangi kartochka eng tepada paydo bo'ladi.
// 2. Chap panelda tegishli shaharning hisoblagich raqami 1 taga ko'payadi!
// 3. Navbar-dagi "Mening e'lonlarim" yonidagi badge raqami oshadi.
// Barchasi foydalanuvchining ko'z ochib yumishidan 50 baravar tez ro'y beradi!
