// =========================================================================================================
// 1-QADAM: KUTUBXONA VA HOOKLARNI IMPORT QILISH (KIRITISH)
// =========================================================================================================

// "useState" - React-ning holat boshqarish hooki.
// Bu sahifada foydalanuvchi qaysi vakansiyani o'chirmoqchi ekanini eslab qolish uchun kerak.
import { useState } from "react";

// "Link" - react-router-dom komponenti bo'lib, sahifani to'liq yangilamasdan (reload qilmasdan)
// bosh sahifaga (vakansiyalar ro'yxatiga) silliq o'tkazib beradi.
import { Link } from "react-router-dom";

// =========================================================================================================
// 2-QADAM: KOMPONENT VA PROPS (KIRIB KELUVCHI QIYMATLAR)
// =========================================================================================================
// "MeningElonlarimPage" komponenti - foydalanuvchi "E'lon joylash" orqali o'zi kiritgan vakansiyalarini
// ko'rishi, tahrirlashi yoki o'chirib tashlashi uchun maxsus shaxsiy kabinet sahifasi.
// Props tushuntirishi:
// 1. myJobs - foydalanuvchi tomonidan kiritilgan e'lonlar massivi (default qiymati bo'sh massiv: []).
// 2. onEditJob - vakansiyani tahrirlash tugmasi bosilganda ishga tushadigan funksiya (App.jsx dan keladi).
// 3. onDeleteJob - vakansiyani butunlay o'chirish funksiyasi (App.jsx dan keladi va localStorage-dan ham o'chiradi).
// 4. onOpenElonModal - "Yangi e'lon joylashtirish" tugmasi bosilganda modalni ochuvchi funksiya.
function MeningElonlarimPage({
  myJobs = [],
  onEditJob = () => {},
  onDeleteJob = () => {},
  onOpenElonModal = () => {},
}) {
  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: STATE (XOTIRA QISMI)
  // -------------------------------------------------------------------------------------------------------

  // "jobToDelete" - O'chirish tugmasi bosilgan paytda qaysi vakansiya tanlanganini saqlaydi.
  // Boshlang'ich holati: null (ya'ni hech qanday e'lon o'chirishga tanlanmagan, modal yopiq).
  // Agar foydalanuvchi o'chirish belgisini bossa, shu e'lon obyekti bu yerga yoziladi va tasdiqlash oynasi ochiladi.
  const [jobToDelete, setJobToDelete] = useState(null);

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: MANTIQIY FUNKSIYALAR (ACTION HANDLERS)
  // -------------------------------------------------------------------------------------------------------

  // "confirmDelete" - Tasdiqlash dialogida "Ha, o'chirilsin" tugmasi bosilganda chaqiriladi:
  const confirmDelete = () => {
    // Agar chindan ham o'chirilishi kerak bo'lgan e'lon tanlangan bo'lsa
    if (jobToDelete) {
      // 1. Ota komponent (App.jsx) ga shu e'lonning unikal id raqamini uzatamiz
      onDeleteJob(jobToDelete.id);
      // 2. O'chirish dialogini yopish uchun xotirani qaytadan null qilamiz
      setJobToDelete(null);
    }
  };

  // =======================================================================================================
  // 5-QADAM: JSX RETURN (FOYDALANUVCHI KO'RADIGAN VIZUAL INTERFEYS)
  // =======================================================================================================

  return (
    // Asosiy fon: silliq oq-kulrang (#fafafa) va pastki bo'shliq pb-16
    <div className="bg-[#fafafa] min-h-screen pb-16">

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 1. SAHIFA BOSHI (HERO HEADER): Qora premium fon */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <section className="bg-black text-white py-12 px-4 border-b border-neutral-800">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            {/* Nishon (badge): Foydalanuvchi o'z kabinetida ekanini bildiradi */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 mb-3">
              <span>👤</span> Ish beruvchi kabineti
            </div>

            {/* Asosiy sarlavha */}
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Mening e‘lonlarim
            </h1>

            {/* Qo'shimcha tushuntirish matni */}
            <p className="text-neutral-400 text-xs md:text-sm mt-1 max-w-xl">
              Siz tomondan platformaga joylashtirilgan barcha faol vakansiyalar
              ro‘yxati. Bu yerdan ularni tahrirlashingiz yoki o‘chirishingiz mumkin.
            </p>
          </div>

          {/* O'ng tomondagi "Yangi e'lon joylashtirish" chaqiruv tugmasi */}
          <button
            type="button"
            onClick={onOpenElonModal} // Modalni ochish funksiyasi
            className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-xl hover:bg-neutral-100 transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0"
          >
            <span className="text-base leading-none">+</span>
            <span>Yangi e‘lon joylashtirish</span>
          </button>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 2. ASOSIY RO'YXAT VA STATISTIKA */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-4 mt-8">
        
        {/* Ro'yxat boshidagi sarlavha va umumiy soni */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-900">
              Joylashtirilgan vakansiyalar
            </span>
            {/* E'lonlar soni nishoni: masalan, "3 ta" */}
            <span className="text-xs bg-neutral-200 text-neutral-700 font-semibold px-2 py-0.5 rounded-full">
              {myJobs.length} ta
            </span>
          </div>

          {/* Asosiy sahifada ko'rish uchun Link */}
          <Link
            to="/"
            className="text-xs text-neutral-500 hover:text-black underline cursor-pointer"
          >
            Bosh sahifada ko‘rish →
          </Link>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* A HOLAT: HECH QANDAY E'LON QO'SHILMAGAN BO'LSA (BO'SH XOLAT - EMPTY STATE) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        {myJobs.length === 0 ? (
          <div className="bg-white border border-[#e5e5e5] rounded-2xl py-16 px-6 text-center max-w-xl mx-auto shadow-xs">
            {/* Katta ikonka */}
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl mx-auto mb-4">
              📋
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">
              Siz hali hech qanday e‘lon joylashtirmadingiz
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6">
              Kompaniyangiz yoki jamoangiz uchun mutaxassis qidiryapsizmi?
              Navbar-dagi "E‘lon joylash" tugmasi orqali 1 daqiqada yangi vakansiya
              e‘lon qiling.
            </p>
            {/* Birinchi e'lonni qo'shishga undovchi tugma */}
            <button
              type="button"
              onClick={onOpenElonModal}
              className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl cursor-pointer transition shadow-xs inline-flex items-center gap-2"
            >
              <span>+ Birinchi e‘lonni joylashtirish</span>
            </button>
          </div>
        ) : (
          /* --------------------------------------------------------------------------------------------- */
          /* B HOLAT: FOYDALANUVCHINING E'LONLARI MAVJUD BO'LSA (KARTALAR RO'YXATI) */
          /* --------------------------------------------------------------------------------------------- */
          <div className="space-y-4">
            {myJobs.map((job) => (
              <div
                key={job.id} // React ro'yxatni tez yangilashi uchun yagona kalit
                className="bg-white border border-[#e5e5e5] hover:border-neutral-300 rounded-2xl p-5 md:p-6 transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                {/* Chap tomon: Vakansiya haqida to'liq ma'lumotlar */}
                <div className="flex items-start gap-4 flex-1">
                  
                  {/* Kompaniya nomining bosh harfi logotipi */}
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-lg font-bold text-neutral-800 shrink-0">
                    {job.letter}
                  </div>

                  {/* Matnli tafsilotlar */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-base font-bold text-neutral-900">
                        {job.title}
                      </h2>
                      {/* Faol e'lon ekanini bildiruvchi yashil nishon */}
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ● Faol e‘lon
                      </span>
                    </div>

                    {/* Kompaniya nomi */}
                    <div className="text-xs text-neutral-600 font-medium">
                      {job.company}
                    </div>

                    {/* Maosh, shahar, kategoriya va e'lon vaqti */}
                    <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
                      <span className="font-semibold text-neutral-800">
                        {job.salaryText} so‘m/oy
                      </span>
                      <span>•</span>
                      <span>📍 {job.city}</span>
                      <span>•</span>
                      <span>🏢 {job.category}</span>
                      <span>•</span>
                      <span>⏱ {job.time}</span>
                    </div>

                    {/* Teglar (To'liq stavka, Masofaviy va h.k.) */}
                    <div className="flex gap-1.5 pt-1 flex-wrap">
                      {(job.tags || []).map((t) => (
                        <span
                          key={t}
                          className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* O'ng tomon: Boshqaruv tugmalari (Tahrirlash va O'chirish) */}
                <div className="flex items-center gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100 shrink-0">
                  
                  {/* 1. TAHRIRLASH TUGMASI (Qalam belgisi bilan) */}
                  <button
                    type="button"
                    onClick={() => onEditJob(job)} // Modalni tahrirlash rejimida ochadi
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl cursor-pointer transition flex items-center gap-1.5"
                    title="E‘lonni tahrirlash"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>Tahrirlash</span>
                  </button>

                  {/* 2. O'CHIRISH TUGMASI (Axlat qutisi belgisi bilan) */}
                  <button
                    type="button"
                    onClick={() => setJobToDelete(job)} // O'chirish dialogini ochadi
                    className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl cursor-pointer transition flex items-center gap-1.5 border border-rose-200"
                    title="E‘lonni o‘chirish"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span>O‘chirish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 3. O'CHIRISHNI TASDIQLASH DIALOGI (CONFIRM MODAL OYNASI) */}
      {/* Faqat jobToDelete holatida o'chiriladigan e'lon tanlangan bo'lsa ekranga chiqadi */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Qizil axlat qutisi belgisi */}
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto mb-3">
              🗑️
            </div>
            {/* Ogohlantirish sarlavhasi */}
            <h3 className="text-base font-bold text-neutral-900 text-center mb-1">
              E‘lonni o‘chirmoqchimisiz?
            </h3>
            {/* Qaysi vakansiya o'chirilishi haqida ma'lumot */}
            <p className="text-xs text-neutral-500 text-center mb-6 leading-relaxed">
              "{jobToDelete.title}" vakansiyasi platformadan butunlay olib
              tashlanadi. Bu amalni ortga qaytarib bo‘lmaydi.
            </p>

            {/* Tugmalar guruhi */}
            <div className="grid grid-cols-2 gap-3">
              {/* Bekor qilish tugmasi */}
              <button
                type="button"
                onClick={() => setJobToDelete(null)} // Bekor qilinsa, modal yopiladi
                className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl cursor-pointer transition"
              >
                Bekor qilish
              </button>

              {/* Tasdiqlash tugmasi */}
              <button
                type="button"
                onClick={confirmDelete} // O'chirish funksiyasini chaqiradi
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition"
              >
                Ha, o‘chirilsin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================
// 1. Foydalanuvchi o'zi qo'shgan "Frontend Dasturchi" e'lonidagi "Tahrirlash" tugmasini bosadi:
//    - onClick hodisasi ro'y beradi -> onEditJob(job) funksiyasi chaqiriladi.
//    - Bu chaqiriq App.jsx dagi handleEditJob funksiyasiga yetib boradi.
//    - App.jsx da editingJob = job va isElonModalOpen = true bo'ladi.
//    - ElonJoylashModal ochilib, uning ichidagi hamma inputlarga shu e'lonning ma'lumotlari to'ldirilgan holda ko'rinadi!
//
// 2. Foydalanuvchi "O'chirish" tugmasini bosadi:
//    - onClick hodisasi ro'y beradi -> setJobToDelete(job) ishga tushadi.
//    - Kompyuter xotirasidagi jobToDelete holati null-dan shu e'lon obyektiga aylanadi.
//    - React shartli render (jobToDelete && ...) tufayli qora yarim shaffof orqa fon va qizil axlat qutisi belgili
//      ogohlantirish oynasini darhol ekranga chiqaradi.
//
// 3. Foydalanuvchi "Ha, o'chirilsin" tugmasini bosadi:
//    - confirmDelete funksiyasi chaqiriladi.
//    - onDeleteJob(jobToDelete.id) chaqirilib, o'sha vakansiya App.jsx dagi jobs massividan va localStorage-dan tozalanadi.
//    - setJobToDelete(null) qilinib, modal oyna yo'qoladi.
//    - Agar boshqa e'lon qolmagan bo'lsa, avtomatik ravishda chiroyli "Siz hali hech qanday e'lon joylashtirmadingiz"
//      (empty state) oynasi paydo bo'ladi.

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega bevosita o'chirib tashlamasdan, tasdiqlash dialogi (jobToDelete) qo'yildi?
//    - Foydalanuvchi tasodifan "O'chirish" tugmasini bosib yuborishi mumkin. Agar tasdiqlashsiz darhol o'chirilsa,
//      kiritilgan barcha mehnat va matnlar yo'qoladi. Tasdiqlash dialogi xatolikning oldini oluvchi eng muhim himoyadir.
// 2. Nega myJobs alohida prop sifatida qabul qilinadi?
//    - Bu sahifada saytning boshqa barcha vakansiyalari emas, faqat foydalanuvchining O'ZI joylagan e'lonlar
//      (isUserCreated === true) ko'rsatilishi kerak. Shunda foydalanuvchi boshqa kompaniyalar e'lonlarini o'chira olmaydi.
// 3. Nega empty state alohida ko'rsatiladi?
//    - Bo'sh qora yoki oq sahifa foydalanuvchini chalg'itadi. Bo'sh holatda unga nima qilish kerakligi
//      ("Birinchi e'lonni joylashtirish" tugmasi) ko'rsatilsa, foydalanuvchi tajribasi (UX) a'lo darajada bo'ladi.

export default MeningElonlarimPage;
