export type Lang = 'uz' | 'ru' | 'en';

export const t = {
  uz: {
    // Nav
    about:    "Men haqimda",
    skills:   "Ko'nikmalar",
    projects: "Loyihalar",
    contact:  "Aloqa",

    // Hero
    greeting:  "Salom, men",
    firstName: "Asadbek",
    lastName:  "",          // faqat bir marta chiqadi
    roles: ["Mobile App Dasturchi", "Web Sayt Yaratuvchi", "AI Interfeys Dizayneri"],
    heroDesc: "Sirdaryo, Guliston shahridan. Mobile ilovalar va AI interfeyslar yaratishga qiziqaman. O'z portfolio va aqlli loyihalarim ustida ishlayapman.",
    viewProjects: "Loyihalarni Ko'rish",
    aboutMe:      "Men Haqimda",
    yearsLabel:   "Tajriba",
    monthsLabel:  "Oy",
    techLabel:    "Texnologiya",
    statusLabel:  "Ochiq",
    available:    "Ishga Ochiq",

    // About
    aboutTitle:  "Ijodiy Texnolog",
    aboutSub:    "Mening Haqimda",
    bio: "Men Guliston shahridan Frontend dasturchiman. 6 oylik tajribam bor. Mobile ilovalar va sun'iy intellekt interfeyslarini yaratishga katta qiziqishim bor. Hozirda o'z portfolio va aqlli loyihalarim ustida faol ishlamoqdaman.",
    experience:  "6 oy",
    location:    "Guliston, O'zbekiston",
    projects:    "Loyihalar",
    technologies:"Texnologiyalar",

    // Skills
    skillsTitle: "Ko'nikmalar va",
    skillsAccent:"Tajriba",

    // Projects
    projectsTitle:  "Tanlangan",
    projectsAccent: "Ishlar",
    projectsDesc:   "Eng sara loyihalarim — dizayn va texnologiya birligida.",
    featured:       "Tanlangan",
    details:        "Batafsil →",

    // Social / Footer
    connectTitle:  "Birga",
    connectAccent: "Quraylik",
    connectDesc:   "Hamkorlik, frilanser loyihalar va qiziqarli takliflar uchun ochiqman.",
    footerBuilt:   "Yaratilgan",
    footerWith:    "bilan",

    // 404
    notFoundTitle: "Topilmadi",
    notFoundDesc:  "Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.",
    backHome:      "Bosh Sahifaga",
  },

  ru: {
    about:    "Обо мне",
    skills:   "Навыки",
    projects: "Проекты",
    contact:  "Контакты",

    greeting:  "Привет, я",
    firstName: "Asadbek",
    lastName:  "",
    roles: ["Mobile App Разработчик", "Веб Разработчик", "Дизайнер AI Интерфейсов"],
    heroDesc: "Из города Гулистан, Сирдарьинская область. Увлечён созданием мобильных приложений и AI-интерфейсов. Работаю над собственным портфолио и умными проектами.",
    viewProjects: "Смотреть Проекты",
    aboutMe:      "Обо Мне",
    yearsLabel:   "Опыт",
    monthsLabel:  "Месяцев",
    techLabel:    "Технологий",
    statusLabel:  "Открыт",
    available:    "Открыт к Работе",

    aboutTitle:  "Творческий Технолог",
    aboutSub:    "Обо Мне",
    bio: "Я Frontend разработчик из Гулистана с 6-месячным опытом. Увлечён мобильными приложениями и интерфейсами с искусственным интеллектом. Активно работаю над собственным портфолио и умными проектами.",
    experience:  "6 мес",
    location:    "Гулистан, Узбекистан",
    projects:    "Проектов",
    technologies:"Технологий",

    skillsTitle: "Навыки и",
    skillsAccent:"Технологии",

    projectsTitle:  "Избранные",
    projectsAccent: "Работы",
    projectsDesc:   "Лучшие проекты — на стыке дизайна и технологий.",
    featured:       "Избранное",
    details:        "Подробнее →",

    connectTitle:  "Создадим",
    connectAccent: "Вместе",
    connectDesc:   "Открыт для сотрудничества, фриланса и интересных предложений.",
    footerBuilt:   "Создано",
    footerWith:    "с помощью",

    notFoundTitle: "Не найдено",
    notFoundDesc:  "Страница не существует или была перемещена.",
    backHome:      "На Главную",
  },

  en: {
    about:    "About",
    skills:   "Skills",
    projects: "Projects",
    contact:  "Contact",

    greeting:  "Hey, I'm",
    firstName: "Asadbek",
    lastName:  "",
    roles: ["Mobile App Developer", "Web Developer", "AI Interface Designer"],
    heroDesc: "Based in Gulistan, Uzbekistan. Passionate about building mobile apps and AI-powered interfaces. Currently working on my portfolio and smart projects.",
    viewProjects: "View Projects",
    aboutMe:      "About Me",
    yearsLabel:   "Experience",
    monthsLabel:  "Months",
    techLabel:    "Technologies",
    statusLabel:  "Open",
    available:    "Open to Work",

    aboutTitle:  "Creative Technologist",
    aboutSub:    "About Me",
    bio: "I'm a Frontend developer from Gulistan, Uzbekistan with 6 months of experience. Passionate about mobile apps and AI-driven interfaces. Actively building my portfolio and smart side projects.",
    experience:  "6 mo",
    location:    "Gulistan, Uzbekistan",
    projects:    "Projects",
    technologies:"Technologies",

    skillsTitle: "Skills &",
    skillsAccent:"Expertise",

    projectsTitle:  "Featured",
    projectsAccent: "Work",
    projectsDesc:   "A selection of projects crafted with precision and technology.",
    featured:       "Featured",
    details:        "Details →",

    connectTitle:  "Let's Build",
    connectAccent: "Together",
    connectDesc:   "Open for collaborations, freelance projects, and exciting opportunities.",
    footerBuilt:   "Built with",
    footerWith:    "",

    notFoundTitle: "Not Found",
    notFoundDesc:  "The page you're looking for doesn't exist or has been moved.",
    backHome:      "Back Home",
  },
} as const;
