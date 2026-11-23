// =========================================================================================================
// 1-QADAM: ASBOBLARNI CHAQIRISH (IMPORT)
// =========================================================================================================

// "useMemo" — "Xotirador Daho". Filtrlash yoki ro'yxatni saralash kabi og'ir hisob-kitoblarni
// qayta-qayta takrorlamay, faqat qidiruv so'zi yoki ro'yxat o'zgargandagina hisoblab eslab qoluvchi asbob.
// "useState" — "Reaktiv Xotira". Foydalanuvchi klaviaturada yozayotgan qidiruv matnini eslab turuvchi quti.
import { useMemo, useState } from "react";

// "Link" — Boshqa sahifaga brauzerni refresh qilmasdan, 0.001 soniyada sakrab o'tuvchi tezyurar ko'prik.
import { Link } from "react-router-dom";

// =========================================================================================================
// 2-QADAM: KOMPONENT VA UNING HIMOYALANGAN SOVG'ALAR QUTISI (PROPS)
// =========================================================================================================

// "function KompaniyalarPage" — Kompaniyalar sahifasini yasovchi funksiya.
// "({ vakansiyalarRoyxati = [], onOpenApplyModal = () => {} })":
//   - vakansiyalarRoyxati: saytdagi barcha ish o'rinlari (qaysi kompaniyada nechta ish borligini bilish uchun).
//   - onOpenApplyModal: to'g'ridan-to'g'ri shu sahifadan ham ishga ariza topshirish oynasini ochuvchi pult.
function KompaniyalarPage({
  vakansiyalarRoyxati = [],
  onOpenApplyModal = () => {},
}) {
  // -------------------------------------------------------------------------------------------------------
  // 3-QADAM: REAKTIV XOTIRA (STATE)
  // -------------------------------------------------------------------------------------------------------

  // 1-XOTIRA: Foydalanuvchi qidiruv maydoniga yozayotgan so'z (boshida bo'sh matn: "")
  const [searchTerm, setSearchTerm] = useState("");

  // 2-XOTIRA: Tanlangan soha filtri (boshida "Barchasi" turadi)
  const [selectedIndustry, setSelectedIndustry] = useState("Barchasi");

  // 3-XOTIRA: Qaysi kompaniyaning vakansiyalari pastga ochilib turgani (id yoki null)
  const [expandedCompany, setExpandedCompany] = useState(null);

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: KOMPANIYALAR BAZASI (STATIK MA'LUMOTLAR)
  // -------------------------------------------------------------------------------------------------------

  // "kompaniyalarMalumoti" — O'zbekistonning yetakchi ish beruvchi tashkilotlari ro'yxati.
  // useMemo bilan o'raymiz, shunda har renderda qaytadan yangi xotira yaratilmaydi.
  const kompaniyalarMalumoti = useMemo(
    () => [
      {
        id: "datalab", // Unikal kalit
        name: "Datalab", // Rasmiy nomi
        badge: "IT Park rezidenti", // Maxsus nishon
        logoLetter: "D", // Bosh harf
        accentColor: "from-blue-600 to-indigo-700", // Gradient rangi
        industry: "IT va dasturlash", // Soha
        city: "Toshkent", // Joylashgan shahar
        address: "Mirzo Ulug‘bek tumani, IT Park hududi", // Aniq manzil
        teamSize: "120+ mutaxassis", // Jamoa kattaligi
        founded: "2019-yil", // Tashkil topgan yili
        website: "datalab.uz", // Veb-sayt
        rating: 4.9, // Baholash reytingi
        reviewsCount: 38, // Fikrlar soni
        description:
          "Datalab — katta hajmdagi ma'lumotlarni tahlil qilish (Big Data), sun'iy intellekt (AI) hamda yuqori yuklamali veb va mobil dasturlarni ishlab chiqishga ixtisoslashgan innovatsion IT kompaniya. Kompaniya mahalliy va xalqaro bozorlar uchun ilg'or dasturiy yechimlarni taqdim etadi.",
        benefits: [
          "Masofaviy ishlash (Remote)",
          "Bepul tushlik va kofe",
          "Zamonaviy Apple uskunalari",
          "Tibbiy sug‘urta paketi",
          "Ingliz tili kurslari",
        ],
        searchKeys: ["datalab"], // Qidiruv va vakansiyalarni bog'lash kalit so'zi
      },
      {
        id: "moliya-invest",
        name: "Moliya Invest MChJ",
        badge: "Moliyaviy konsalting",
        logoLetter: "M",
        accentColor: "from-emerald-600 to-teal-700",
        industry: "Moliya va buxgalteriya",
        city: "Samarqand",
        address: "Samarqand shahri, Registon ko‘chasi, 45",
        teamSize: "45+ xodim",
        founded: "2017-yil",
        website: "moliyainvest.uz",
        rating: 4.7,
        reviewsCount: 24,
        description:
          "Moliya Invest — yirik va o'rta biznes korxonalariga buxgalteriya hisobini yuritish, audit, soliq konsaltingi hamda investitsiya loyihalarini moliyaviy baholash bo'yicha ishonchli hamkorlikni ta'minlovchi professional konsalting kompaniyasi.",
        benefits: [
          "Yillik 13-oylik bonuslar",
          "Karyerada tezkor o‘sish",
          "Xalqaro ACCA/CIPA o‘qitish",
          "Rasmiy mehnat daftarchasi",
        ],
        searchKeys: ["moliya invest"],
      },
      {
        id: "zamon-media",
        name: "Zamon Media",
        badge: "Kreativ agentlik",
        logoLetter: "Z",
        accentColor: "from-purple-600 to-pink-600",
        industry: "Marketing",
        city: "Toshkent",
        address: "Chilonzor tumani, Bunyodkor shoh ko‘chasi",
        teamSize: "35+ ijodkor",
        founded: "2021-yil",
        website: "zamonmedia.uz",
        rating: 4.8,
        reviewsCount: 19,
        description:
          "Zamon Media — raqamli marketing (Digital Marketing), SMM, kreativ video-reklamalar va brending strategiyalari orqali bizneslarning internetdagi obro‘sini yangi bosqichga olib chiquvchi zamonaviy media agentlik.",
        benefits: [
          "Erkin va ijodiy ish muhiti",
          "Moslashuvchan ish grafigi",
          "Eng so‘nggi kamera va texnikalar",
          "Doimiy jamoaviy sayohatlar",
        ],
        searchKeys: ["zamon media"],
      },
      {
        id: "texnomart",
        name: "Texnomart",
        badge: "Milliy riteyl brendi",
        logoLetter: "T",
        accentColor: "from-amber-500 to-orange-600",
        industry: "Savdo",
        city: "Farg‘ona",
        address: "Farg‘ona filiali & Respublika bo‘ylab 40+ do‘kon",
        teamSize: "1500+ xodim",
        founded: "2008-yil",
        website: "texnomart.uz",
        rating: 4.6,
        reviewsCount: 112,
        description:
          "Texnomart — butun O‘zbekiston bo‘ylab maishiy texnika va elektronika savdosi bo‘yicha yetakchi riteyl do‘konlar tarmog‘i. Kompaniya xodimlarga mustahkam ijtimoiy kafolatlar va barqaror karyera imkoniyatini taqdim etadi.",
        benefits: [
          "Savdodan yuqori foizli bonuslar",
          "Bepul tushlik va korporativ forma",
          "Boshqaruv lavozimlariga o‘sish",
          "Kompaniya mahsulotlariga chegirmalar",
        ],
        searchKeys: ["texnomart"],
      },
      {
        id: "progress-academy",
        name: "Progress Academy",
        badge: "Innovatsion ta'lim",
        logoLetter: "P",
        accentColor: "from-rose-500 to-red-600",
        industry: "Ta‘lim",
        city: "Andijon",
        address: "Andijon shahri, Bobur shoh ko‘chasi, 12",
        teamSize: "30+ ustoz",
        founded: "2020-yil",
        website: "progressacademy.uz",
        rating: 4.9,
        reviewsCount: 31,
        description:
          "Progress Academy — yoshlarga xorijiy tillar (IELTS, CEFR, General English) va zamonaviy IT ko‘nikmalarini o‘rgatishga ixtisoslashgan ilg‘or xalqaro ta'lim markazi. Markazda har yili yuzlab talabalar yuqori natijalarga erishadi.",
        benefits: [
          "Qulay soatbay yoki to‘liq stavka",
          "Xalqaro sertifikatlash imkoniyati",
          "Do‘stona va yosh pedagoglar jamoasi",
          "Zamonaviy interaktiv sinfxonalar",
        ],
        searchKeys: ["progress academy"],
      },
    ],
    [],
  );

  // -------------------------------------------------------------------------------------------------------
  // 5-QADAM: DINAMIK BOG'LASH VA HISOB-KITOBLAR
  // -------------------------------------------------------------------------------------------------------

  // Har bir kompaniyaga mos keluvchi ochiq vakansiyalarni aniqlash:
  // "vakansiyalarRoyxati" dagi ishlar bilan solishtirib, har bir kompaniyaga o'z ishlarini biriktiramiz:
  const kompaniyalarVakansiyalariBilan = useMemo(() => {
    return kompaniyalarMalumoti.map((company) => {
      // .filter() — Faqat kompaniya nomi bizning qidiruv kalitimizga to'g'ri keladigan ishlarni ajratadi:
      const mosVakansiyalar = vakansiyalarRoyxati.filter((job) => {
        const companyText = (job.company || "").toLowerCase();
        return company.searchKeys.some((key) => companyText.includes(key));
      });

      return {
        ...company, // Kompaniya ma'lumotlarini nusxalaymiz
        vacancies: mosVakansiyalar, // Unga tegishli vakansiyalar massivi
        vacanciesCount: mosVakansiyalar.length, // Ochiq ishlar soni
      };
    });
  }, [kompaniyalarMalumoti, vakansiyalarRoyxati]);

  // Sohalar ro'yxati (filtrlash tugmalari uchun unikal sohalarni yig'amiz):
  const sohalar = useMemo(() => {
    const list = [
      "Barchasi",
      ...new Set(kompaniyalarMalumoti.map((c) => c.industry)),
    ];
    return list;
  }, [kompaniyalarMalumoti]);

  // Filtrlangan kompaniyalar (qidiruv va tanlangan soha bo'yicha saralanadi):
  const filteredCompanies = useMemo(() => {
    return kompaniyalarVakansiyalariBilan.filter((comp) => {
      const qidiruvMatni = searchTerm.trim().toLowerCase();
      // Nom, shahar yoki tavsif ichida qidiruv so'zi bormi?
      const nomMos = comp.name.toLowerCase().includes(qidiruvMatni);
      const shaharMos = comp.city.toLowerCase().includes(qidiruvMatni);
      const tavsifMos = comp.description.toLowerCase().includes(qidiruvMatni);
      const searchMatch = !qidiruvMatni || nomMos || shaharMos || tavsifMos;

      // Soha mosligi:
      const industryMatch =
        selectedIndustry === "Barchasi" || comp.industry === selectedIndustry;

      return searchMatch && industryMatch;
    });
  }, [kompaniyalarVakansiyalariBilan, searchTerm, selectedIndustry]);

  // Kompaniya vakansiyalari akkordeonini ochish va yopish pulti:
  const toggleCompanyVacancies = (id) => {
    setExpandedCompany((prev) => (prev === id ? null : id));
  };

  // =======================================================================================================
  // 6-QADAM: EKRANGA CHIZISH (JSX RETURN)
  // =======================================================================================================

  return (
    <div className="bg-[#fafafa] min-h-screen pb-16">
      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 1. HERO BANNER VA STATISTIKA BO'LIMI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <section className="bg-black text-white py-14 px-4 border-b border-neutral-800">
        <div className="max-w-[1280px] mx-auto text-center">
          {/* Nishon (Pill badge) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Tasdiqlangan ish beruvchilar bazasi
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            O‘zbekistonning yetakchi kompaniyalari
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Jobs platformasidagi ochiq vakansiyalarga ega nufuzli tashkilotlar,
            ularning korporativ madaniyati, imtiyozlari va takliflari bilan
            tanishib chiqing.
          </p>

          {/* Statistika kartochkalari (Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-white">
                {kompaniyalarMalumoti.length} ta
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Hamkor kompaniya
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-emerald-400">
                {vakansiyalarRoyxati.length} ta
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Ochiq ish o‘rni
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-blue-400">
                100%
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Tekshirilgan tashkilot
              </div>
            </div>
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold text-amber-400">
                4 ta
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Viloyat & Poytaxt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 2. QIDIRUV VA SOHALAR FILTRI BO'LIMI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-4 mt-8">
        <div className="bg-white border border-[#e5e5e5] rounded-xl p-4 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Qidiruv inputi */}
            <div className="relative w-full md:w-96">
              <svg
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Kompaniya nomi yoki shahar bo‘yicha qidiring..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900 transition"
              />
            </div>

            {/* Soha filtr tugmalari */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
              <span className="text-xs text-neutral-500 font-medium mr-1">
                Soha:
              </span>
              {sohalar.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedIndustry(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                    selectedIndustry === item
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* 3. KOMPANIYALAR RO'YXATI (KARTALARI) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        {filteredCompanies.length === 0 ? (
          // A Holat: Agar qidiruv bo'yicha hech qanday kompaniya topilmasa:
          <div className="bg-white border border-[#e5e5e5] rounded-xl py-12 px-4 text-center text-neutral-500">
            <p className="text-base font-medium text-neutral-700">
              Hech qanday kompaniya topilmadi
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Qidiruv so‘zini o‘zgartirib yoki boshqa sohani tanlab ko‘ring.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("Barchasi");
              }}
              className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs cursor-pointer hover:bg-black"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          // B Holat: Kompaniyalar ro'yxati:
          <div className="space-y-6">
            {filteredCompanies.map((company) => {
              const isExpanded = expandedCompany === company.id;

              return (
                <div
                  key={company.id}
                  className="bg-white border border-[#e5e5e5] hover:border-neutral-300 rounded-2xl p-6 transition duration-200 shadow-xs"
                >
                  {/* Bosh qism: Logotip, nom va status */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
                    <div className="flex items-start gap-4">
                      {/* Harf avatar */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${company.accentColor} flex items-center justify-center text-white text-2xl font-bold shadow-xs shrink-0`}
                      >
                        {company.logoLetter}
                      </div>

                      {/* Kompaniya nomi va ma'lumotlari */}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-xl font-bold text-neutral-900">
                            {company.name}
                          </h2>
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {company.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1.5 flex-wrap">
                          <span className="font-medium text-neutral-800">
                            {company.industry}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            📍 {company.city}
                          </span>
                          <span>•</span>
                          <span>👥 {company.teamSize}</span>
                          <span>•</span>
                          <span>Tashkil topgan: {company.founded}</span>
                        </div>
                      </div>
                    </div>

                    {/* Reyting va vakansiyalarni ochish tugmasi */}
                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <span className="text-amber-500 font-bold text-sm">
                            ★ {company.rating}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {company.reviewsCount} ta baholash
                        </div>
                      </div>

                      {/* Vakansiyalarni pastga yoyish tugmasi */}
                      <button
                        type="button"
                        onClick={() => toggleCompanyVacancies(company.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition flex items-center gap-2 ${
                          company.vacanciesCount > 0
                            ? "bg-neutral-900 hover:bg-black text-white"
                            : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                        }`}
                      >
                        <span>
                          {company.vacanciesCount > 0
                            ? `${company.vacanciesCount} ta ochiq vakansiya`
                            : "Hozircha vakansiya yo‘q"}
                        </span>
                        {company.vacanciesCount > 0 && (
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Kompaniya tavsifi */}
                  <div className="py-4">
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {company.description}
                    </p>
                  </div>

                  {/* Afzalliklar va sayt havolasi */}
                  <div className="pt-3 border-t border-neutral-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-neutral-400 font-medium">
                        Afzalliklar:
                      </span>
                      {company.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-[11px]"
                        >
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500">
                      <span>Veb-sayt:</span>
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {company.website}
                      </a>
                    </div>
                  </div>

                  {/* ------------------------------------------------------------------------------------------- */}
                  {/* AKKORDEON: OCHILUVCHI VAKANSIYALAR BLOKI */}
                  {/* ------------------------------------------------------------------------------------------- */}
                  {isExpanded && company.vacancies.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-dashed border-neutral-200 bg-neutral-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-neutral-900">
                          {company.name} taklif qilayotgan ochiq ish o‘rinlari:
                        </h3>
                        <span className="text-xs text-neutral-500">
                          Jami: {company.vacancies.length} ta
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {company.vacancies.map((v) => (
                          <div
                            key={v.id}
                            className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col justify-between hover:border-neutral-400 transition"
                          >
                            <div>
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="font-semibold text-sm text-neutral-900">
                                  {v.title}
                                </h4>
                                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm whitespace-nowrap">
                                  {v.salaryText} so‘m
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2 text-xs text-neutral-500">
                                <span>📍 {v.city}</span>
                                <span>•</span>
                                <span>⏱ {v.time}</span>
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() => onOpenApplyModal(v)}
                                className="px-3.5 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-lg cursor-pointer transition"
                              >
                                Ariza topshirish
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Pastki chaqiruv bloki (Call to Action) */}
        <div className="mt-12 bg-linear-to-r from-neutral-900 to-black text-white rounded-2xl p-8 text-center border border-neutral-800">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Siz ham o‘z kompaniyangizni qo‘shmoqchimisiz?
          </h3>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-6">
            Jobs platformasi orqali har oy minglab saralangan nomzodlar bilan
            bog‘laning va jamoangiz uchun eng iqtidorli mutaxassislarni toping.
          </p>
          <div className="inline-flex gap-3">
            <Link
              to="/"
              className="px-5 py-2.5 bg-white text-black font-medium text-xs rounded-xl hover:bg-neutral-100 transition"
            >
              Barcha vakansiyalarni ko‘rish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KompaniyalarPage;

// =========================================================================================================
// 2-QISM: ULTRA SLOW-MOTION (VOQEALAR SEKINLASHTIRILGAN KADRDA)
// =========================================================================================================

// Voqea: Foydalanuvchi "2 ta ochiq vakansiya" tugmasini bosdi
// [0.000 soniya] - FOYDALANUVCHI HARAKATI:
// Foydalanuvchi sichqoncha bilan Datalab kartasidagi "2 ta ochiq vakansiya" tugmasini bosdi.
// [0.001 soniya] - TOGGLE FUNKSIYASI ISHGA TUSHDI:
// `toggleCompanyVacancies('datalab')` chaqirildi.
// [0.002 soniya] - STATE O'ZGARISHI:
// `setExpandedCompany('datalab')` xotirani yangilaydi.
// [0.003 soniya] - REACT RE-RENDER:
// React 'datalab' kompaniyasining `isExpanded === true` ekanligini ko'radi.
// [0.004 soniya] - VIRTUAL DOM & ANIMATSIYA:
// Kartaning pastki qismida silliq ochilib, Datalab ning ochiq vakansiyalari va "Ariza topshirish" tugmalari namoyon bo'ladi!
