import type { Lang } from './product-map';

// The demo request itself: the CRM stores it and mails the prospect a link.
// Following it confirms the address and opens the demo; only then does the
// owner hear about the request (owner, 18.10.2026).
export const DEMO_ENDPOINT = 'https://app.leaddrivecrm.org/api/v1/public/demo-requests';
// The bot check the form solves before sending (lib/demo-challenge.ts).
export const DEMO_CHALLENGE_ENDPOINT = 'https://app.leaddrivecrm.org/api/v1/public/demo-requests/challenge';

// The demo's modules — the ids the CRM keeps (leaddrive-v2
// src/lib/demo-center/journey/modules.ts). The demo opens with the ones
// ticked; three are ticked until the visitor says otherwise (owner, 18.10.2026).
export const DEMO_MODULES: { id: string; ticked: boolean; label: Record<Lang, string> }[] = [
  { id: 'omnichannel', ticked: true, label: { az: 'Omni-kanal və AI agent', ru: 'Омниканал и ИИ-агент', en: 'Omni-channel and AI agent' } },
  { id: 'ai-calls', ticked: true, label: { az: 'AI zənglər', ru: 'ИИ-звонки', en: 'AI calls' } },
  { id: 'deals', ticked: true, label: { az: 'Satış: sövdələşmə və təklif', ru: 'Продажи: сделки и КП', en: 'Sales: deals and quotes' } },
  { id: 'service-desk', ticked: false, label: { az: 'Service Desk', ru: 'Service Desk', en: 'Service Desk' } },
  { id: 'call-center', ticked: false, label: { az: 'Call Center', ru: 'Call Center', en: 'Call Center' } },
  { id: 'route-field', ticked: false, label: { az: 'Marşrut & Sahə', ru: 'Маршрут и поле', en: 'Route & Field' } },
  { id: 'personnel', ticked: false, label: { az: 'Kadr uçotu', ru: 'Учёт персонала', en: 'Attendance' } },
  { id: 'contracts', ticked: false, label: { az: 'Müqavilələr', ru: 'Договоры', en: 'Contracts' } },
  { id: 'marketing', ticked: false, label: { az: 'Marketinq kampaniyaları', ru: 'Маркетинговые кампании', en: 'Marketing campaigns' } },
];
export const DEMO_MODULES_LABEL: Record<Lang, string> = {
  az: 'Hansı modullar maraqlıdır? Demo onlarla başlayacaq',
  ru: 'Какие модули интересны? Демо начнётся с них',
  en: 'Which modules interest you? The demo starts with them',
};
export const NOTIFY_EMAIL = 'info@fanumsec.com';

export const DEMO_FORM: Record<Lang, {
  title: string; sub: string; name: string; company: string; email: string; phone: string; size: string; sizes: string[]; interest: string; interests: string[]; message: string; messagePh: string;
  submit: string; sending: string; or: string; whatsapp: string; consent: string; consentLabel: string; consentLink: string; consentRequired: string; okTitle: string; okText: string; errTitle: string; errText: string; close: string; required: string; badEmail: string;
}> = {
  az: {
    title: 'Demo sorğusu', sub: 'Formu doldurun, iş saatlarında bir saat ərzində sizinlə əlaqə saxlayıb demonu razılaşdıracağıq.',
    name: 'Ad, soyad', company: 'Şirkət', email: 'İş e-poçtu', phone: 'Telefon və ya WhatsApp', size: 'Komandanın ölçüsü', sizes: ['1–5 nəfər', '6–20 nəfər', '21–50 nəfər', '51+ nəfər'],
    interest: 'Sizi nə maraqlandırır', interests: ['Satış və WhatsApp', 'Dəstək və tiketlər', 'Müqavilələr və fakturalar', 'Sahə komandaları', 'AI agent', 'Bütün CRM'],
    message: 'Mesaj', messagePh: 'Prosesiniz, müraciətlərin haradan gəldiyi, indi nə istifadə edirsiniz…',
    submit: 'Sorğu göndər', sending: 'Göndərilir…', or: 'və ya', whatsapp: 'WhatsApp-da yazın', consent: '', consentLabel: 'Fərdi məlumatlarımın demo sorğusuna cavab vermək məqsədilə emalına və bu zaman ölkədən kənara ötürülməsinə razıyam:', consentLink: 'Məxfilik siyasəti', consentRequired: 'Razılıq olmadan sorğu göndərilə bilməz',
    okTitle: 'Sorğu qəbul edildi.', okText: 'E-poçtunuza təsdiq məktubu göndərdik. Məktubdakı linkə keçin — e-poçt təsdiqlənəcək və demo açılacaq. Məktub görünmürsə, Spam qovluğuna baxın.', errTitle: 'Göndərmək alınmadı.', errText: 'Bir dəqiqədən sonra yenidən cəhd edin və ya WhatsApp-da yazın.', close: 'Bağla', required: 'Bu sahə mütləqdir', badEmail: 'E-poçtu yoxlayın',
  },
  ru: {
    title: 'Запрос демо', sub: 'Заполните форму, в рабочие часы свяжемся в течение часа и согласуем демо.',
    name: 'Имя, фамилия', company: 'Компания', email: 'Рабочая почта', phone: 'Телефон или WhatsApp', size: 'Размер команды', sizes: ['1–5 человек', '6–20 человек', '21–50 человек', '51+ человек'],
    interest: 'Что интересует', interests: ['Продажи и WhatsApp', 'Поддержка и тикеты', 'Договоры и счета', 'Полевые команды', 'AI-агент', 'Вся CRM'],
    message: 'Сообщение', messagePh: 'Ваш процесс, откуда приходят обращения, чем пользуетесь сейчас…',
    submit: 'Отправить запрос', sending: 'Отправляем…', or: 'или', whatsapp: 'Написать в WhatsApp', consent: '', consentLabel: 'Согласен на обработку персональных данных для ответа на запрос демо и на их передачу за пределы страны:', consentLink: 'Политика конфиденциальности', consentRequired: 'Без согласия отправить запрос нельзя',
    okTitle: 'Запрос принят.', okText: 'Мы отправили письмо на вашу почту. Перейдите по ссылке в нём — почта подтвердится, и откроется демо. Если письма нет, посмотрите в папке «Спам».', errTitle: 'Не удалось отправить.', errText: 'Попробуйте через минуту или напишите в WhatsApp.', close: 'Закрыть', required: 'Обязательное поле', badEmail: 'Проверьте почту',
  },
  en: {
    title: 'Request a demo', sub: 'Fill in the form; during business hours we reply within an hour and schedule the demo.',
    name: 'Full name', company: 'Company', email: 'Work email', phone: 'Phone or WhatsApp', size: 'Team size', sizes: ['1–5 people', '6–20 people', '21–50 people', '51+ people'],
    interest: 'What are you interested in', interests: ['Sales and WhatsApp', 'Support and tickets', 'Contracts and invoices', 'Field teams', 'AI agent', 'The whole CRM'],
    message: 'Message', messagePh: 'Your process, where requests come from, what you use today…',
    submit: 'Send request', sending: 'Sending…', or: 'or', whatsapp: 'Write on WhatsApp', consent: '', consentLabel: 'I agree to the processing of my personal data to answer this demo request and to its transfer outside the country:', consentLink: 'Privacy Policy', consentRequired: 'The request cannot be sent without consent',
    okTitle: 'Request received.', okText: 'We sent a confirmation email. Follow the link in it — your email is confirmed and the demo opens. If it is not there, look in Spam.', errTitle: 'Could not send.', errText: 'Try again in a minute or write on WhatsApp.', close: 'Close', required: 'Required', badEmail: 'Check the email',
  },
};
