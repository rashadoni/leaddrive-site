import type { Lang } from './product-map';

export const DEMO_ENDPOINT = 'https://app.leaddrivecrm.org/api/v1/public/leads';
export const NOTIFY_EMAIL = 'info@fanumsec.com';

export const DEMO_FORM: Record<Lang, {
  title: string; sub: string; name: string; company: string; email: string; phone: string; size: string; sizes: string[]; interest: string; interests: string[]; message: string; messagePh: string;
  submit: string; sending: string; or: string; whatsapp: string; consent: string; okTitle: string; okText: string; errTitle: string; errText: string; close: string; required: string; badEmail: string;
}> = {
  az: {
    title: 'Demo sorğusu', sub: 'Formu doldurun, iş saatlarında bir saat ərzində sizinlə əlaqə saxlayıb demonu razılaşdıracağıq.',
    name: 'Ad, soyad', company: 'Şirkət', email: 'İş e-poçtu', phone: 'Telefon və ya WhatsApp', size: 'Komandanın ölçüsü', sizes: ['1–5 nəfər', '6–20 nəfər', '21–50 nəfər', '51+ nəfər'],
    interest: 'Sizi nə maraqlandırır', interests: ['Satış və WhatsApp', 'Dəstək və tiketlər', 'Müqavilələr və fakturalar', 'Sahə komandaları', 'AI agent', 'Bütün CRM'],
    message: 'Mesaj', messagePh: 'Prosesiniz, müraciətlərin haradan gəldiyi, indi nə istifadə edirsiniz…',
    submit: 'Sorğu göndər', sending: 'Göndərilir…', or: 'və ya', whatsapp: 'WhatsApp-da yazın', consent: 'Göndərməklə sorğunuzun LeadDrive CRM-də lid kimi qeydə alınmasına razılıq verirsiniz.',
    okTitle: 'Sorğu qəbul edildi.', okText: 'Lid CRM-də yaradıldı. İş saatlarında bir saat ərzində cavab verəcəyik. Tələsirsinizsə, WhatsApp-da yazın.', errTitle: 'Göndərmək alınmadı.', errText: 'Bir dəqiqədən sonra yenidən cəhd edin və ya WhatsApp-da yazın.', close: 'Bağla', required: 'Bu sahə mütləqdir', badEmail: 'E-poçtu yoxlayın',
  },
  ru: {
    title: 'Запрос демо', sub: 'Заполните форму, в рабочие часы свяжемся в течение часа и согласуем демо.',
    name: 'Имя, фамилия', company: 'Компания', email: 'Рабочая почта', phone: 'Телефон или WhatsApp', size: 'Размер команды', sizes: ['1–5 человек', '6–20 человек', '21–50 человек', '51+ человек'],
    interest: 'Что интересует', interests: ['Продажи и WhatsApp', 'Поддержка и тикеты', 'Договоры и счета', 'Полевые команды', 'AI-агент', 'Вся CRM'],
    message: 'Сообщение', messagePh: 'Ваш процесс, откуда приходят обращения, чем пользуетесь сейчас…',
    submit: 'Отправить запрос', sending: 'Отправляем…', or: 'или', whatsapp: 'Написать в WhatsApp', consent: 'Отправляя форму, вы соглашаетесь, что запрос будет сохранён как лид в LeadDrive CRM.',
    okTitle: 'Запрос принят.', okText: 'Лид создан в CRM. Ответим в рабочие часы в течение часа. Если срочно, напишите в WhatsApp.', errTitle: 'Не удалось отправить.', errText: 'Попробуйте через минуту или напишите в WhatsApp.', close: 'Закрыть', required: 'Обязательное поле', badEmail: 'Проверьте почту',
  },
  en: {
    title: 'Request a demo', sub: 'Fill in the form; during business hours we reply within an hour and schedule the demo.',
    name: 'Full name', company: 'Company', email: 'Work email', phone: 'Phone or WhatsApp', size: 'Team size', sizes: ['1–5 people', '6–20 people', '21–50 people', '51+ people'],
    interest: 'What are you interested in', interests: ['Sales and WhatsApp', 'Support and tickets', 'Contracts and invoices', 'Field teams', 'AI agent', 'The whole CRM'],
    message: 'Message', messagePh: 'Your process, where requests come from, what you use today…',
    submit: 'Send request', sending: 'Sending…', or: 'or', whatsapp: 'Write on WhatsApp', consent: 'By sending you agree that the request is stored as a lead in LeadDrive CRM.',
    okTitle: 'Request received.', okText: 'A lead was created in the CRM. We reply within an hour during business hours. In a hurry? Write on WhatsApp.', errTitle: 'Could not send.', errText: 'Try again in a minute or write on WhatsApp.', close: 'Close', required: 'Required', badEmail: 'Check the email',
  },
};
