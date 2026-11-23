// =========================================================================================================
// 1-QADAM: KUTUBXONA VA HOOKLARNI IMPORT QILISH (KIRITISH)
// =========================================================================================================

// "useMemo" - murakkab hisob-kitoblarni keshlab (eslab) qoluvchi maxsus React quroli (hook).
// Agar qidiruv so'zi yoki kategoriya o'zgarmasa, React minglab maqolalarni qayta-qayta saralamaydi, 
// balki o'tgan safargi tayyor natijani ko'rsatib, kompyuter protsessorini ortiqcha charchatmaydi.
// "useState" - komponentning shaxsiy xotirasi bo'lib, ekranda o'zgarishi kerak bo'lgan ma'lumotlarni
// (masalan, qidiruv matni, tanlangan maqola, ochiq FAQ savoli) xotirada saqlaydi va o'zgarganda ekranni yangilaydi.
import { useMemo, useState } from "react";

// "Link" - react-router-dom kutubxonasining maxsus komponenti.
// Oddiy HTML <a> tegidan farqli o'laroq, sahifani butunlay qayta yuklamasdan (reload qilmasdan),
// foydalanuvchini bir soniyada boshqa sahifaga silliq o'tkazib yuboradi (Single Page Application - SPA uslubi).
import { Link } from "react-router-dom";

// =========================================================================================================
// 2-QADAM: STATIK MA'LUMOTLAR VA KONSTANTALAR (O'ZGARMAS RO'YXATLAR)
// Komponent tashqarisida e'lon qilinadi, chunki bu ma'lumotlar har safar BlogPage chizilganda qayta yaratilmasligi kerak.
// =========================================================================================================

// "platformFeatures" - Jobs saytining 4 ta eng asosiy afzalligi ro'yxati.
// Har bir obyektda belgi (icon), sarlavha (title) va batafsil tavsif (description) mavjud.
const platformFeatures = [
  {
    icon: "⚡", // Chaqmoq belgisi - tezkorlik ramzi
    title: "Tezkor qidiruv & Filtrlar",
    description:
      "Shahar, oylik maosh, yo‘nalish va bandlik turi (masofaviy/ofis) bo‘yicha kerakli ishni bir zumda toping.",
  },
  {
    icon: "📑", // Hujjat belgisi - rezyume va ariza ramzi
    title: "1 daqiqada oson ariza",
    description:
      "Murakkab ro‘yxatdan o‘tishlarsiz, to‘g‘ridan-to‘g‘ri telefon raqam va rezyume orqali ish beruvchiga ariza yuboring.",
  },
  {
    icon: "🔖", // Xatcho'p belgisi - sevimlilar ramzi
    title: "Aqlli Saqlanganlar xatcho‘pi",
    description:
      "Sizga ma'qul kelgan barcha vakansiyalarni bir tugma bilan saqlab qo‘ying va istalgan payt ko‘rib chiqing.",
  },
  {
    icon: "🛡️", // Qalqon belgisi - xavfsizlik va ishonchlilik ramzi
    title: "100% Rasmiy ish beruvchilar",
    description:
      "Saytdagi barcha kompaniyalar (Datalab, Texnomart, Moliya Invest va h.k.) tekshirilgan va ishonchli hamkorlardir.",
  },
];

// "blogArticles" - Blogda e'lon qilinadigan maqolalar ro'yxati (massivi).
// Har bir maqolada unikal id, sarlavha, kategoriya, o'qish vaqti, sana, qisqacha mazmun (summary),
// to'liq matn (content - xatboshilar massivi) va qidiruv teglari (tags) saqlanadi.
const blogArticles = [
  {
    id: 1, // Maqolaning betakror tartib raqami
    title: "Jobs platformasidan qanday qilib 100% samarali foydalanish mumkin?",
    category: "Jobs Qo‘llanmasi", // Qaysi mavzuga tegishli ekani
    readTime: "4 daqiqa", // Foydalanuvchi qancha vaqt sarflashi
    date: "22-Noyabr, 2026", // E'lon qilingan sana
    summary:
      "Jobs saytidagi aqlli qidiruv, maosh filtrlari, sevimlilar ro‘yxati va ariza topshirish mexanizmini to‘liq o‘rganing.",
    content: [
      // To'liq o'qish modalida har bir xatboshi alohida <p> elementi sifatida chiqadi
      "Jobs platformasi O‘zbekiston mehnat bozoridagi eng qulay va zamonaviy ish qidirish portali hisoblanadi. Undan foydalanishda quyidagi imkoniyatlardan to‘liq foydalanishingiz tavsiya etiladi:",
      "1. Shahar va Soha filtrlari: Chap paneldagi filtrlardan foydalanib, faqat o‘zingiz yashaydigan shahar (masalan Toshkent, Samarqand, Farg‘ona) yoki o‘zingiz qiziqqan yo‘nalish (IT, Moliya, Marketing) bo‘yicha e'lonlarni ajratib oling.",
      "2. Maosh bo‘yicha saralash: Aniq daromad darajasini ko‘rsatuvchi filtrlar orqali o‘z mehnatingizga munosib qadrlovchi takliflarni tanlang.",
      "3. Saqlanganlar (Bookmarks): Bir vaqtning o‘zida bir nechta taklif ma'qul kelsa, ularning xatcho‘p belgisini bosing. Ular yuqori menyudagi 'Saqlanganlar' bo‘limida to‘planadi va brauzerni yopib ochganda ham yo‘qolib ketmaydi.",
      "4. Bir klikda ariza: Har bir e'londagi 'Ariza topshirish' tugmasi orqali qisqa formani to‘ldirib, o‘z telefoningiz va rezyumeingizni to‘g‘ridan-to‘g‘ri kadrlar bo‘limiga yetkazing.",
    ],
    tags: ["Jobs", "Qo‘llanma", "Vakansiyalar", "Filtrlar"],
  },
  {
    id: 2,
    title: "Mukammal rezyume (CV) tayyorlash: HR mutaxassislarining 7 ta oltin qoidasi",
    category: "Rezyume & CV",
    readTime: "6 daqiqa",
    date: "20-Noyabr, 2026",
    summary:
      "HR mutaxassislari e'tiborini 10 soniyada jalb qiladigan, xatosiz va kuchli rezyume yozish bo‘yicha amaliy tavsiyalar.",
    content: [
      "Statistikaga ko‘ra, HR mutaxassis bitta rezyumeni ko‘zdan kechirish uchun o‘rtacha 7-10 soniya vaqt sarflaydi. Shu sababli rezyumeingiz qisqa, tushunarli va ta'sirchan bo‘lishi zarur.",
      "1. Hajm: 1 yoki ko‘pi bilan 2 sahifadan oshmasin. Ortiqcha shaxsiy ma'lumotlar (oila a'zolari, maktab davri yutuqlari) o‘rniga real loyihalarga e'tibor bering.",
      "2. Natijalar raqamlarda: Shunchaki 'Savdoni oshirdim' deb emas, 'Savdo aylanmasini 3 oyda 35% ga oshirdim' deb aniq raqamlar bilan yozing.",
      "3. Aloqa ma'lumotlari: Telegram profili, faol telefon raqami va portfolio havolalarini rezyumening eng yuqori qismiga joylashtiring.",
      "4. PDF formati: Hech qachon Word (.docx) formatida yubormang! Har xil qurilmalarda shriftlar buzilmasligi uchun doimo PDF formatida eksport qiling.",
      "5. Ijtimoiy tarmoqlar va Portfolio: Dasturchi bo‘lsangiz GitHub, dizayner bo‘lsangiz Behance, marketolog bo‘lsangiz real keyslaringiz linkini taqdim eting.",
    ],
    tags: ["CV", "Rezyume", "Ishga kirish", "Karyera"],
  },
  {
    id: 3,
    title: "Ish suhbatidan (Interview) muvaffaqiyatli o‘tish sirlari",
    category: "Suhbat sirlari",
    readTime: "5 daqiqa",
    date: "18-Noyabr, 2026",
    summary:
      "Suhbatdagi hayajonni yengish, murakkab savollarga to‘g‘ri javob berish va o‘zingiz ham kompaniyaga to‘g‘ri savollar berish uslubi.",
    content: [
      "Suhbat — bu bir tomonlama tergov emas, balki ikki tomonlama manfaatli biznes muzokaradir. Suhbatga borishdan oldin kompaniya haqida izlanish qiling.",
      "1. Kompaniyani o‘rganing: Jobs saytidagi 'Kompaniyalar' bo‘limiga kirib, kompaniya tarixi, sohasidagi o‘rni va qadriyatlarini bilib oling.",
      "2. STAR usulidan foydalaning: Vaziyat (Situation), Vazifa (Task), Harakat (Action), Natija (Result). O‘z tajribangizni aynan shu zanjir asosida hikoya qilib bering.",
      "3. Kuchli va zaif tomonlar: Zaif tomoningiz so‘ralganda, hozirda uni bartaraf etish ustida qanday ishlayotganingizni ko‘rsating.",
      "4. Oxirida beriladigan savollar: Suhbat oxirida 'Kompaniyangizda yangi xodim uchun sinov muddati qanday baholanadi?' yoki 'Jamoangiz yaqin oylarda qanday maqsadlarni ko‘zlamoqda?' kabi aqlli savollar bering.",
    ],
    tags: ["Interview", "Suhbat", "HR", "Muzokara"],
  },
  {
    id: 4,
    title: "Masofaviy ish (Remote): Uyda turib yuqori daromad topish taktikasi",
    category: "Karyera maslahatlari",
    readTime: "5 daqiqa",
    date: "15-Noyabr, 2026",
    summary:
      "Uyda ishlash intizomi, xalqaro va mahalliy masofaviy vakansiyalarni tanlash hamda uyqu va ish muvozanatini saqlash.",
    content: [
      "Bugungi kunda Jobs saytidagi IT, dizayn, SMM va tahlilchilik sohasidagi e'lonlarning 40% dan ortig‘i masofaviy formatni qo‘llab-quvvatlaydi.",
      "1. Maxsus ish joyi yarating: Divanda yoki yotoqda ishlash miyani charchatadi. Xonangizda faqat ish uchun mo‘ljallangan stol va qulay stul bo‘lsin.",
      "2. Vaqt chegaralari (Time-boxing): Ish soatini 09:00 dan 18:00 gacha qat'iy belgilang. Shunda charchoq (burnout) holatiga tushmaysiz.",
      "3. Aloqa madaniyati (Communication): Masofaviy ishda asinxron xabarlashuv muhim. Ish beruvchiga bajarilgan ishlar hisobotini muntazam yuborib turing.",
    ],
    tags: ["Remote", "Masofaviy", "Frilans", "WorkFromHome"],
  },
  {
    id: 5,
    title: "Oylik maosh bo‘yicha qanday qilib tortinmasdan to‘g‘ri muzokara olib borish kerak?",
    category: "Karyera maslahatlari",
    readTime: "4 daqiqa",
    date: "12-Noyabr, 2026",
    summary:
      "Siz o‘z sohangizda qancha haq olishingiz kerak? Oylik belgilashda nimalarni inobatga olish va qo‘rqmasdan muzokara qilish sirlari.",
    content: [
      "Ko‘pgina nomzodlar oylik maosh haqida gapirishdan tortinishadi. Ammo to‘g‘ri yondashuv bilan siz o‘z bilimingizga mos haqni osongina kelishib olishingiz mumkin.",
      "1. Bozor o‘rtacha qiymatini biling: Jobs platformasidagi o‘xshash vakansiyalarning maosh oralig‘ini ko‘rib chiqing (masalan, Frontend: 8-12 mln, Buxgalter: 4-6 mln).",
      "2. Aniq oraliq (Range) ayting: Masalan, 'Mening kutilmam 7 dan 9 mln so‘mgacha, ammo vazifalar ko‘lamiga qarab buni muhokama qilishga tayyorman'.",
      "3. Qo‘shimcha bonuslar: Agar asosiy maosh biroz pastroq bo‘lsa, KPI bonuslari, bepul tushlik yoki tibbiy sug‘urta kabi imtiyozlarni so‘rang.",
    ],
    tags: ["Maosh", "Muzokara", "Oylik", "Karyera"],
  },
  {
    id: 6,
    title: "Ish beruvchilar diqqatini tortadigan Ilova xat (Cover Letter) yozish",
    category: "Rezyume & CV",
    readTime: "3 daqiqa",
    date: "10-Noyabr, 2026",
    summary:
      "Jobs saytida ariza topshirganda xabar bo‘limiga nimalar yozish kerak? Standart shablonlardan qochish usullari.",
    content: [
      "Jobs saytida 'Ariza topshirish' oynasida 'Xabar yoki portfolio havolasi' maydoni mavjud. Ko‘pchilik uni bo‘sh qoldiradi, vaholanki bu HR uchun eng muhim ko‘rsatkichdir!",
      "1. Shaxsiy murojaat qiling: 'Assalomu alaykum Datalab jamoasi...' deb boshlash sizning e'tiboringizni ko‘rsatadi.",
      "2. Nega aynan siz?: 'Men bu lavozimga kerakli bo‘lgan barcha 3 ta asosiy texnologiyada 2 yillik tajribaga egaman va loyihalaringizni tezda rivojlantira olaman'.",
      "3. Harakatga chorlov: 'Rezyumeim ilova qilindi. Suhbatda loyihalarimni batafsil tushuntirib berishdan mamnun bo‘laman'.",
    ],
    tags: ["CoverLetter", "Ariza", "Xat", "Jobs"],
  },
];

// "faqs" - Foydalanuvchilar tomonidan eng ko'p beriladigan savollar va javoblar ro'yxati (FAQ).
// Har bir elementda q (savol - question) va a (javob - answer) matnlari joylashgan.
const faqs = [
  {
    q: "Jobs platformasida ish qidirish va ariza yuborish pullikmi?",
    a: "Yo‘q, barcha nomzodlar uchun Jobs saytidan foydalanish, vakansiyalarni ko‘rish va ariza topshirish mutlaqo bepul.",
  },
  {
    q: "Ariza topshirganimdan so‘ng nima sodir bo‘ladi?",
    a: "Sizning ma'lumotlaringiz (ism, telefon, rezyume havolasi) to‘g‘ridan-to‘g‘ri vakansiya e'lon qilgan kompaniyaning mas'ul HR mutaxassisiga yo‘naltiriladi. Ular nomzodlarni ko‘rib chiqib, telefon yoki Telegram orqali bog‘lanishadi.",
  },
  {
    q: "Vakansiyalarni saqlash (Bookmark) qanday ishlaydi?",
    a: "Vakansiya kartasidagi bayroqcha (bookmark) belgisini bossangiz, u 'Saqlanganlar' sahifasiga tushadi. U yerdan istalgan vaqtda arizangizni topshirishingiz yoki ro‘yxatni tozalashingiz mumkin.",
  },
  {
    q: "Kompaniyalar Jobs saytiga qanday qo‘shiladi?",
    a: "Biz faqat O‘zbekiston qonunchiligiga binoan ro‘yxatdan o‘tgan, xodimlarga rasmiy shartnoma va o‘z vaqtida maosh to‘laydigan ishonchli kompaniyalar bilan hamkorlik qilamiz.",
  },
];

// "categories" - Foydalanuvchi maqolalarni mavzusi bo'yicha ajratib olishi uchun filtr tugmalari ro'yxati.
const categories = [
  "Barchasi",
  "Jobs Qo‘llanmasi",
  "Rezyume & CV",
  "Suhbat sirlari",
  "Karyera maslahatlari",
];

// =========================================================================================================
// 3-QADAM: ASOSIY KOMPONENT FUNKSIYASI - BlogPage
// =========================================================================================================

function BlogPage() {
  // -------------------------------------------------------------------------------------------------------
  // STATE (XOTIRA QISMI)
  // -------------------------------------------------------------------------------------------------------

  // "selectedCategory" - Hozir qaysi mavzu tugmasi tanlanganini saqlaydi (boshlang'ich qiymati: "Barchasi").
  // Agar foydalanuvchi "Rezyume & CV" tugmasini bossa, bu o'zgaruvchi shu nomga yangilanadi.
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  // "searchQuery" - Qidiruv inputiga yozilgan matnni xotirada saqlaydi (boshida bo'sh qator "").
  // Har safar klaviaturadan harf bosilganda, bu yerga o'sha harflar yoziladi.
  const [searchQuery, setSearchQuery] = useState("");

  // "selectedArticle" - Foydalanuvchi "Batafsil o'qish" tugmasini bosgan maqola obyektini saqlaydi.
  // Agar qiymat null bo'lsa, o'qish modali yopiq turadi. Agar maqola berilsa, o'sha maqola modali ochiladi.
  const [selectedArticle, setSelectedArticle] = useState(null);

  // "openFaqIndex" - FAQ bo'limidagi qaysi savol ochiq turganining tartib raqami (indeksi).
  // Agar null bo'lsa - barcha savollar yopiq. Agar masalan 0 bo'lsa - 1-savolning javobi ochilib turadi.
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // -------------------------------------------------------------------------------------------------------
  // 4-QADAM: MA'LUMOTLARNI FILTRLASH VA SARALASH (useMemo MANTIQI)
  // -------------------------------------------------------------------------------------------------------

  // "filteredArticles" - Foydalanuvchi tanlagan kategoriya va qidiruv matniga mos keladigan maqolalar ro'yxati.
  // useMemo - faqat selectedCategory yoki searchQuery o'zgargandagina bu hisoblashni qayta bajaradi.
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((art) => {
      // 1-shart: Kategoriya to'g'ri keladimi?
      // Agar "Barchasi" tanlangan bo'lsa barcha maqolalar o'tadi, aks holda maqolaning kategoriyasi mos kelishi kerak.
      const matchCat =
        selectedCategory === "Barchasi" || art.category === selectedCategory;

      // Qidiruv so'zini kichik harflarga o'tkazib, boshidagi va oxiridagi bo'shliqlarni olib tashlaymiz
      const q = searchQuery.toLowerCase().trim();

      // 2-shart: Qidiruv so'zi maqola sarlavhasi, qisqacha tavsifi yoki teglarida bormi?
      const matchSearch =
        !q || // Agar qidiruv maydoni bo'sh bo'lsa, qidiruv tekshiruvi shart emas (ha deb hisoblanadi)
        art.title.toLowerCase().includes(q) || // Sarlavhada qidiruv so'zi bormi?
        art.summary.toLowerCase().includes(q) || // Tavsifda qidiruv so'zi bormi?
        art.tags.some((t) => t.toLowerCase().includes(q)); // Birorta tegida bormi?

      // Ikkala shart ham to'g'ri (true) bo'lsagina maqola saralangan ro'yxatga kiritiladi
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // =======================================================================================================
  // 5-QADAM: JSX QAYTARISH (FOYDALANUVCHI KO'RADIGAN VIZUAL INTERFEYS)
  // =======================================================================================================

  return (
    // Asosiy konteyner: fon rangi och kulrang (#fafafa), ekranning minimal balandligi 100vh (min-h-screen)
    <div className="bg-[#fafafa] min-h-screen pb-16">

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 1. HERO BANNER: Qora fonli sahifa boshi va qidiruv maydoni */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <section className="bg-black text-white py-14 px-4 border-b border-neutral-800">
        <div className="max-w-[1280px] mx-auto text-center">
          
          {/* Kichik chiroyli nishon (badge) */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-xs text-neutral-300 mb-4">
            <span>📚</span> Jobs blogi va bilimlar xazinasi
          </div>

          {/* Katta bosh sarlavha */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Karyera sari eng to‘g‘ri yo‘riqnomalar
          </h1>

          {/* Sarlavha ostidagi tushuntirish matni */}
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto mb-8">
            Jobs platformasidan foydalanish bo‘yicha qo‘llanmalar, rezyumeni
            to‘g‘ri yozish sirlari va ish beruvchilar bilan suhbatdan o‘tish
            bo‘yicha ekspert tavsiyalari.
          </p>

          {/* Qidiruv inputi qutisi: nisbiy joylashuv (relative), maksimal kenglik lg (max-w-lg) */}
          <div className="relative max-w-lg mx-auto">
            {/* Lupa ikonchasi (qidiruv ramzi) - input ichida chap tomonga joylashadi */}
            <svg
              className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

            {/* Qidiruv matn kiritish maydoni (controlled input) */}
            <input
              type="text"
              placeholder="Maqolalar va maslahatlarni qidiring..."
              value={searchQuery} // Hozirgi state qiymati
              onChange={(e) => setSearchQuery(e.target.value)} // Har bir kiritilgan harfni state ga yozish
              className="w-full pl-11 pr-4 py-3 text-sm bg-neutral-900/90 text-white placeholder-neutral-500 border border-neutral-700 rounded-xl focus:outline-none focus:border-white transition"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 2. JOBS SAYTI IMKONIYATLARI (4 TA AFZALLIK KARTALARI) */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-4 -mt-6">
        {/* Grid tizimi: telefonda 1 ta, planshetda 2 ta, kompyuterda 4 ta ustun */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platformFeatures.map((feat, i) => (
            // Har bir afzallik qutisi
            <div
              key={i}
              className="bg-white border border-[#e5e5e5] rounded-xl p-5 shadow-xs hover:border-neutral-400 transition"
            >
              {/* Ikonka foni */}
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-xl mb-3">
                {feat.icon}
              </div>
              {/* Sarlavha */}
              <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                {feat.title}
              </h3>
              {/* Tavsif */}
              <p className="text-xs text-neutral-500 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 3. KATEGORIYALAR VA MAQOLALAR BO'LIMI */}
      {/* ------------------------------------------------------------------------------------------------- */}
      <div className="max-w-[1280px] mx-auto px-4 mt-12">
        
        {/* Kategoriya filtrlash tugmalari */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-neutral-200 pb-4">
          <span className="text-xs text-neutral-500 font-medium mr-2">
            Mavzular:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)} // Tugma bosilganda ushbu kategoriyani tanlash
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                selectedCategory === cat
                  ? "bg-black text-white" // Tanlangan tugma: qora fon, oq yozuv
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100" // Oddiy holat
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Maqolalar ro'yxati (Grid) yoki topilmagan holat */}
        {filteredArticles.length === 0 ? (
          // Agar qidiruv bo'yicha hech narsa topilmasa
          <div className="bg-white border border-[#e5e5e5] rounded-xl py-12 px-4 text-center text-neutral-500">
            <p className="text-base font-medium text-neutral-700">
              Ushbu so‘rov bo‘yicha maqola topilmadi
            </p>
            {/* Filtrlarni qayta tozalash tugmasi */}
            <button
              onClick={() => {
                setSearchQuery(""); // Qidiruv matnini bo'shatish
                setSelectedCategory("Barchasi"); // Kategoriyani ham boshiga qaytarish
              }}
              className="mt-3 px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs cursor-pointer hover:bg-black"
            >
              Qidiruvni tozalash
            </button>
          </div>
        ) : (
          // Agar maqolalar topilsa: 3 ustunli grid kartochkalari
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-[#e5e5e5] hover:border-neutral-400 rounded-2xl p-6 flex flex-col justify-between transition duration-200 shadow-xs hover:shadow-sm"
              >
                <div>
                  {/* Kategoriya va o'qish vaqti */}
                  <div className="flex items-center justify-between text-xs text-neutral-400 mb-3">
                    <span className="font-semibold text-neutral-800 px-2.5 py-0.5 rounded-md bg-neutral-100">
                      {article.category}
                    </span>
                    <span>⏱ {article.readTime}</span>
                  </div>

                  {/* Maqola sarlavhasi */}
                  <h3 className="text-base font-bold text-neutral-900 mb-2 leading-snug">
                    {article.title}
                  </h3>

                  {/* Qisqacha tavsif */}
                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                </div>

                <div>
                  {/* Teglar ro'yxati (#Jobs, #Rezyume va h.k.) */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-sm"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Maqola sanasi va to'liq o'qish tugmasi */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-400">
                      {article.date}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(article)} // Modallik oynani ochish va maqolani yuklash
                      className="text-xs font-semibold text-black hover:text-neutral-600 inline-flex items-center gap-1 cursor-pointer"
                    >
                      Batafsil o‘qish
                      {/* O'ngga qaratilgan strelka belgisi */}
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* 4. FAQ BO'LIMI: ENG KO'P BERILADIGAN SAVOLLAR (AKKORDEON) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="mt-16 bg-white border border-[#e5e5e5] rounded-2xl p-6 md:p-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Savol-Javob
            </span>
            <h2 className="text-2xl font-bold text-neutral-900 mt-1">
              Jobs platformasi haqida eng ko‘p beriladigan savollar
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              // Hozirgi savol ochiqmi yoki yo'qmi tekshiramiz
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
                >
                  {/* Savol sarlavhasi tugmasi: bosilganda javob ochiladi yoki yopiladi */}
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)} // Ochiq bo'lsa yopish (null), yopiq bo'lsa ochish
                    className="w-full py-4 px-5 text-left text-sm font-semibold text-neutral-900 bg-neutral-50/60 hover:bg-neutral-100 flex items-center justify-between gap-4 cursor-pointer transition"
                  >
                    <span>{faq.q}</span>
                    {/* Pastga/yuqoriga aylanuvchi strelka */}
                    <svg
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Javob qismi: faqat isOpen true bo'lganda ko'rinadi */}
                  {isOpen && (
                    <div className="p-5 text-xs text-neutral-600 bg-white leading-relaxed border-t border-neutral-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------------------------------------------- */}
        {/* 5. VAKANSIYALARGA O'TISH CHAQIRUVI (CTA BANNER) */}
        {/* ----------------------------------------------------------------------------------------------- */}
        <div className="mt-12 text-center bg-black text-white rounded-2xl p-8 border border-neutral-800">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            Tayyormisiz? O‘zingizga mos ishni hoziroq toping!
          </h3>
          <p className="text-xs md:text-sm text-neutral-400 max-w-lg mx-auto mb-6">
            Barcha tavsiyalarni o‘rgangan bo‘lsangiz, asosiy sahifaga o‘tib
            ochiq vakansiyalarga ariza topshirishni boshlang.
          </p>
          {/* Asosiy vakansiyalar sahifasiga tezkor o'tish havolasi */}
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-100 transition"
          >
            Vakansiyalar ro‘yxatiga o‘tish
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------- */}
      {/* 6. MAQOLANI TO'LIQ O'QISH MODAL OYNASI */}
      {/* Faqat selectedArticle o'zgaruvchisida maqola bo'lganda ekranga qalqib chiqadi */}
      {/* ------------------------------------------------------------------------------------------------- */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal bosh qismi (Header) */}
            <div className="p-5 border-b border-neutral-100 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700">
                  {selectedArticle.category}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 mt-2">
                  {selectedArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                  <span>Sana: {selectedArticle.date}</span>
                  <span>•</span>
                  <span>O‘qish vaqti: {selectedArticle.readTime}</span>
                </div>
              </div>
              {/* Modalni yopish "✕" tugmasi */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)} // state ni null qilib modalni yopadi
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center cursor-pointer shrink-0 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal asosiy matni (Body) - skroll bo'ladigan qism */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm text-neutral-700 leading-relaxed">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Modal pastki qismi (Footer) */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50 rounded-b-2xl flex items-center justify-between">
              {/* Teglar */}
              <div className="flex gap-1">
                {selectedArticle.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] text-neutral-500 bg-white border border-neutral-200 px-2 py-0.5 rounded-sm"
                  >
                    #{t}
                  </span>
                ))}
              </div>
              {/* Yopish tugmasi */}
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-lg cursor-pointer transition"
              >
                Yopish
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
// 1. Foydalanuvchi qidiruv maydoniga "rezyume" so'zini yozishni boshlaydi:
//    - "r" harfi bosildi -> onChange hodisasi ishga tushadi -> setSearchQuery("r") chaqiriladi.
//    - Kompyuter "BlogPage" komponentini qayta ishga tushiradi (re-render).
//    - useMemo hooki ishga tushadi: barcha 6 ta maqolani ko'zdan kechiradi, sarlavha, tavsif va teglarida "r" borlarini ajratadi.
//    - Natija 1 millisekundda ekranga yangilanib chiqadi. Foydalanuvchi sahifa yangilanmasdan natijani ko'radi!
//
// 2. Foydalanuvchi "Rezyume & CV" nomli kategoriya tugmasini bosadi:
//    - onClick -> setSelectedCategory("Rezyume & CV") chaqiriladi.
//    - useMemo faqat shu kategoriyaga tegishli bo'lgan maqolalarni qoldiradi.
//    - Bosilgan tugmaga "bg-black text-white" klasslari qo'shilib, uning faolligini ko'rsatuvchi vizual holat paydo bo'ladi.
//
// 3. Foydalanuvchi maqola ostidagi "Batafsil o'qish" tugmasini bosadi:
//    - setSelectedArticle(article) chaqiriladi.
//    - selectedArticle endi null emas, tanlangan maqola obyektiga teng bo'ldi.
//    - React shartli render orqali to'liq ekranli modal oynani (fixed inset-0) chizadi va xatboshilarni birma-bir ekranga chiqaradi.
//
// 4. Foydalanuvchi FAQ savolining ustiga bosadi:
//    - openFaqIndex holati o'zgaradi: agar ushbu savol avval yopiq bo'lsa, uning indeksi saqlanadi.
//    - Strelka ikonkasiga "rotate-180" klassi beriladi va u silliq pastga qarab buriladi.
//    - Savolning javobi bo'lgan matn ochilib ko'rinadi.

// =========================================================================================================
// 3-QISM: DASTURCHI TAFEKKURI VA NEGA AYNAN SHUNDAY YOZILGAN?
// =========================================================================================================
// 1. Nega maqolalar statik massiv sifatida saqlangan?
//    - Blog maqolalari har soniyada o'zgarib turmaydigan doimiy ma'lumotlardir. Uni tashqi fayl yoki massivda saqlash
//      serverga ortiqcha so'rov yubormasdan, saytning yashindek tez ishlashini ta'minlaydi.
// 2. Nega useMemo ishlatildi?
//    - Har safar foydalanuvchi FAQ akkordeonini ochib-yopganda, maqolalarni qayta-qayta filter qilib hisoblash shart emas.
//      useMemo faqat qidiruv so'zi yoki kategoriya o'zgargandagina maqolalarni saralaydi. Bu samaradorlikni oshiradi.
// 3. Nega FAQ bo'limida bitta indeks (openFaqIndex) saqlanmoqda?
//    - Bu foydalanuvchiga qulay akkordeon tajribasini beradi: bir vaqtning o'zida bitta savol ochiladi, 
//      boshqa savol bosilsa avvalgisi avtomatik yopiladi va ekran tartibli ko'rinishda saqlanadi.

export default BlogPage;
