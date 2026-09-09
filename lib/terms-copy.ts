import type { Lang } from './product-map';

export const TERMS_COPY: Record<Lang, { title: string; description: string; label: string; h1: string; h2: string; intro: string; blocks: { h: string; p: string[] }[]; cta: string; note: string; home: string }> = {
  az: {
    title: 'Əməkdaşlıq şərtləri — LeadDrive CRM', description: 'LeadDrive CRM-in qiymət modeli, tətbiq, dəstək və məlumat şərtləri. Sabit tarif yoxdur: şərtlər şirkətin ölçüsünə və modullara görə müzakirə olunur.', label: 'Şərtlər', h1: 'Əməkdaşlıq şərtləri.', h2: 'Sabit tarif yoxdur, hər şirkət üçün ayrı hesablanır.', intro: 'LeadDrive açıq qiymət siyahısı dərc etmir: şirkətlər ölçüsünə, lazım olan modullara və kanallara görə çox fərqlənir. Aşağıda qiymətin nədən asılı olduğu və tətbiqə nəyin daxil olduğu izah edilir.',
    blocks: [
      { h: 'Qiymət nədən asılıdır', p: ['İstifadəçi sayı və lazım olan modullar: satış, Inbox, dəstək, müqavilələr, fakturalar, sahə, marketinq.', 'Qoşulan kanallar: WhatsApp Business API, Instagram, Telegram, telefoniya. Bəzi kanalların provayder tərəfindən öz tarifi var.', 'AI funksiyaları: AI agent, Da Vinci və avtopilot ssenariləri gündəlik büdcə ilə işləyir.'] },
      { h: 'Tətbiqə nə daxildir', p: ['Prosesin təsviri və pilot şöbə (2–4 həftə), məlumatların Excel və ya köhnə sistemdən köçürülməsi, kanalların qoşulması, komandanın təlimi.', 'Sahə bölmələri (səhiyyə, sığorta, dövlət sektoru, media, enerji) tətbiq zamanı şirkətə uyğunlaşdırılır.'] },
      { h: 'Dəstək', p: ['Azərbaycan dilində, iş saatlarında WhatsApp və e-poçt vasitəsilə. Şirkətlər üçün SLA şərtləri müqavilədə təsbit olunur.'] },
      { h: 'Məlumatlar', p: ['Müştəri məlumatları şirkətə məxsusdur. Rollar, sahə səviyyəsində hüquqlar, ikifaktorlu giriş və audit jurnalı standart olaraq mövcuddur. Məlumatların ixracı istənilən vaxt mümkündür.'] },
    ],
    cta: 'Şərtləri WhatsApp-da müzakirə edək', note: 'Cavab iş saatlarında adətən bir saat ərzində.', home: 'Ana səhifə',
  },
  ru: {
    title: 'Условия сотрудничества — LeadDrive CRM', description: 'Модель цены, внедрение, поддержка и данные в LeadDrive CRM. Фиксированных тарифов нет: условия обсуждаются по размеру компании и набору модулей.', label: 'Условия', h1: 'Условия сотрудничества.', h2: 'Фиксированных тарифов нет, для каждой компании считается отдельно.', intro: 'LeadDrive не публикует открытый прайс: компании слишком отличаются по размеру, нужным модулям и каналам. Ниже объясняем, от чего зависит цена и что входит во внедрение.',
    blocks: [
      { h: 'От чего зависит цена', p: ['Число пользователей и нужные модули: продажи, Inbox, поддержка, договоры, счета, поле, маркетинг.', 'Подключаемые каналы: WhatsApp Business API, Instagram, Telegram, телефония. У некоторых каналов есть свой тариф провайдера.', 'AI-функции: AI-агент, Da Vinci и сценарии автопилота работают в пределах дневного бюджета.'] },
      { h: 'Что входит во внедрение', p: ['Описание процесса и пилот в одном отделе (2–4 недели), перенос данных из Excel или старой системы, подключение каналов, обучение команды.', 'Отраслевые разделы (медицина, страхование, госсектор, медиа, энергетика) настраиваются под компанию при внедрении.'] },
      { h: 'Поддержка', p: ['На азербайджанском и русском, в рабочие часы, через WhatsApp и почту. Для компаний условия SLA фиксируются в договоре.'] },
      { h: 'Данные', p: ['Данные клиентов принадлежат компании. Роли, права на уровне полей, двухфакторный вход и журнал аудита есть по умолчанию. Экспорт данных возможен в любой момент.'] },
    ],
    cta: 'Обсудить условия в WhatsApp', note: 'Отвечаем в рабочие часы, обычно в течение часа.', home: 'Главная',
  },
  en: {
    title: 'Terms of cooperation — LeadDrive CRM', description: 'Pricing model, implementation, support and data terms for LeadDrive CRM. No fixed tiers: terms are discussed per company size and module set.', label: 'Terms', h1: 'Terms of cooperation.', h2: 'No fixed tiers; each company is priced individually.', intro: 'LeadDrive does not publish a public price list: companies differ too much in size, modules and channels. Below is what the price depends on and what implementation includes.',
    blocks: [
      { h: 'What the price depends on', p: ['Number of users and the modules you need: sales, inbox, support, contracts, invoices, field, marketing.', 'Connected channels: WhatsApp Business API, Instagram, Telegram, telephony. Some channels carry a provider fee of their own.', 'AI features: the AI agent, Da Vinci and autopilot scenarios run within a daily budget.'] },
      { h: 'What implementation includes', p: ['A process description and a pilot in one department (2–4 weeks), data migration from Excel or the old system, channel setup, team training.', 'Industry sections (healthcare, insurance, public sector, media, utilities) are configured for the company during implementation.'] },
      { h: 'Support', p: ['In Azerbaijani, Russian and English during business hours via WhatsApp and email. SLA terms for companies are fixed in the contract.'] },
      { h: 'Data', p: ['Customer data belongs to the company. Roles, field-level rights, two-factor login and an audit log are standard. Data export is available at any time.'] },
    ],
    cta: 'Discuss terms on WhatsApp', note: 'We reply during business hours, usually within an hour.', home: 'Home',
  },
};
