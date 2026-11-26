'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, MessageCircle, Pause, Phone, Play } from 'lucide-react';
import type { Lang } from '@/lib/product-map';
import { TypedText, useTypewriter } from './Typewriter';

/*
 * The AI operator: one assistant answers Instagram, WhatsApp and phone calls and writes everything to the CRM.
 * The demo is a row of business directions. The directions are the ones that actually wrote to LeadDrive's own
 * Instagram (Fanumsec inbox, November 2026): a flower shop that cannot keep up with order peaks, a car rental,
 * a barbershop; the pharmacy is the live order line; the hotel was the owner's own ask.
 * Every direction opens on a phone call behind a breathing orb (owner: «голосовые также звонки», after
 * syncallai.com); all but the pharmacy can switch to the same request as a chat.
 * All calls are voiced at studio quality with Vertex gemini-3.8-flash-tts: the AI in the line's own voice
 * (Sulafat, the line's speaking style), the customer in another female voice. The pharmacy call is the dialogue
 * of a real test-stand call (made-up pharmacy name); the others are written to match the chats. The words stay
 * in Azerbaijani, translated for ru/en readers. Chats and prices are samples and say so.
 * TikTok is left out on purpose: replies there were not reaching customers.
 */

type Msg = { ai?: boolean; text: string; at: string };
type CallLine = { ai: boolean; a: number; b: number; az: string; ru: string; en: string };
type CallData = { src: string; dur: number; env: readonly number[]; lines: readonly CallLine[] };
type Dir = { id: string; label: string; chatTitle?: string; who: string; listen: string; did: readonly string[]; msgs?: readonly Msg[] };

// Loudness (three bars per second) and line timings are measured from each file.
const CALLS: Record<string, CallData> = {
  pharmacy: { src: '/media/ai-calls/aptek-sulafat.mp3', dur: 28.9, env: [0,91,83,75,70,57,43,73,14,82,82,73,9,41,79,74,52,56,46,6,70,73,58,32,0,0,51,41,14,86,83,75,68,66,61,71,60,4,76,39,0,0,66,92,81,84,100,75,69,63,17,74,83,74,84,55,67,19,0,5,91,85,80,77,52,85,68,72,76,59,1,0,8,85,39,57,93,82,58,52,4,64,84,76,65,0], lines: [
    { ai: true, a: 0.35, b: 8.04, az: 'Dərman anbarı, satış şöbəsi, salam! Nömrəniz «Mərkəzi aptek» kimi qeydə alınıb. Düzdürsə, sifarişinizi deyin.', ru: 'Аптечный склад, отдел продаж, здравствуйте! Ваш номер записан как «Mərkəzi aptek». Если верно — говорите заказ.', en: 'Pharmacy warehouse, sales desk, hello! Your number is on file as «Mərkəzi aptek». If that is right, go ahead with your order.' },
    { ai: false, a: 8.74, b: 13.35, az: 'Düzdür. Parasetamol beş yüz, on qutu.', ru: 'Верно. Парацетамол 500, десять коробок.', en: 'Right. Paracetamol 500, ten boxes.' },
    { ai: true, a: 14.25, b: 19.24, az: 'Parasetamol 500 hazırda tükənib. Başqa əvəzedicisini təklif edim?', ru: 'Парацетамол 500 сейчас закончился. Предложить замену?', en: 'Paracetamol 500 is sold out right now. Shall I offer a substitute?' },
    { ai: false, a: 19.94, b: 23.51, az: 'Yox, əvəzedici lazım deyil. Gələndə xəbər verin, on qutu yazın.', ru: 'Нет, замена не нужна. Сообщите, когда придёт, запишите десять коробок.', en: 'No substitute. Let us know when it arrives — put down ten boxes.' },
    { ai: true, a: 24.41, b: 28.47, az: 'Qeyd etdim, gələn kimi xəbər verəcəyik. Daha nə əlavə edək?', ru: 'Записала, сообщим, как только поступит. Что ещё добавим?', en: 'Noted, we will tell you as soon as it arrives. What else shall we add?' },
  ] },
  hotel: { src: '/media/ai-calls/hotel-sulafat.mp3', dur: 30.8, env: [0,63,86,79,74,68,66,5,84,81,71,58,4,0,2,98,45,45,91,83,80,78,67,56,72,57,60,40,0,0,5,68,74,86,76,77,74,72,74,71,61,63,36,16,65,94,82,75,76,53,5,0,79,62,82,78,67,75,57,34,0,0,91,73,70,73,64,64,72,79,43,63,60,73,57,51,63,9,68,75,68,59,39,13,62,100,83,73,60,57,45,0], lines: [
    { ai: true, a: 0.35, b: 4.29, az: 'Otelin qəbulu, salam! Sizə necə kömək edə bilərəm?', ru: 'Ресепшн отеля, здравствуйте! Чем могу помочь?', en: 'Hotel reception, hello! How can I help?' },
    { ai: false, a: 4.99, b: 9.25, az: 'Salam, 12–14 dekabr üçün iki nəfərlik otaq lazımdır.', ru: 'Здравствуйте, нужен номер на двоих на 12–14 декабря.', en: 'Hi, I need a double room for 12–14 December.' },
    { ai: true, a: 10.15, b: 16.8, az: 'Var. Standart otaq gecəsi 90 AZN, səhər yeməyi daxildir. Adınızı deyin, bronu menecerə ötürüm.', ru: 'Есть. Стандартный номер — 90 AZN за ночь, завтрак включён. Назовите имя — передам бронь менеджеру.', en: 'We have one. A standard room is 90 AZN a night, breakfast included. Your name, and I will pass the booking to a manager.' },
    { ai: false, a: 17.5, b: 19.94, az: 'Aynur. Hava limanından transfer də olsun.', ru: 'Айнур. И трансфер из аэропорта.', en: 'Aynur. And an airport transfer, please.' },
    { ai: true, a: 20.84, b: 30.36, az: 'Qeyd etdim: Aynur, 12–14 dekabr, transfer 25 AZN. Menecer WhatsApp-da təsdiq göndərəcək.', ru: 'Записала: Айнур, 12–14 декабря, трансфер 25 AZN. Менеджер пришлёт подтверждение в WhatsApp.', en: 'Noted: Aynur, 12–14 December, transfer 25 AZN. A manager will confirm on WhatsApp.' },
  ] },
  car: { src: '/media/ai-calls/car-sulafat.mp3', dur: 20.7, env: [0,70,62,27,53,48,36,62,16,0,64,94,14,81,66,68,72,78,62,50,0,0,63,55,35,56,63,59,57,60,56,38,9,48,67,68,59,43,16,0,27,88,100,71,63,55,0,0,53,61,56,48,83,72,72,60,62,72,68,44,22,0], lines: [
    { ai: true, a: 0.35, b: 2.81, az: 'Salam! Rent a car xidməti, buyurun.', ru: 'Здравствуйте! Прокат авто, слушаю.', en: 'Hello! Car rental, go ahead.' },
    { ai: false, a: 3.51, b: 6.51, az: 'Salam, həftəsonu üçün Prado boşdur?', ru: 'Здравствуйте, Прадо на выходные свободен?', en: 'Hi, is the Prado free this weekend?' },
    { ai: true, a: 7.41, b: 12.93, az: 'Bəli, ağ Prado şənbə və bazar boşdur. Gündəlik 120 AZN.', ru: 'Да, белый Прадо свободен в субботу и воскресенье. 120 AZN в сутки.', en: 'Yes, the white Prado is free on Saturday and Sunday. 120 AZN a day.' },
    { ai: false, a: 13.63, b: 15.3, az: 'Hava limanında götürə bilərəm?', ru: 'Можно забрать в аэропорту?', en: 'Can I pick it up at the airport?' },
    { ai: true, a: 16.2, b: 20.31, az: 'Əlbəttə. Reys nömrənizi deyin, sürücümüz sizi qarşılayacaq.', ru: 'Конечно. Назовите номер рейса — водитель вас встретит.', en: 'Of course. Tell me your flight number and our driver will meet you.' },
  ] },
  flowers: { src: '/media/ai-calls/flowers-sulafat.mp3', dur: 29.1, env: [0,76,62,6,59,67,59,14,55,63,42,0,5,73,97,14,52,100,76,91,82,87,61,79,65,27,0,0,82,30,16,78,82,62,62,53,68,41,40,55,60,67,58,8,52,75,56,36,43,48,5,10,99,71,67,54,40,0,2,78,100,71,76,77,50,1,0,2,62,72,41,50,70,72,68,60,60,53,16,49,69,78,59,74,55,32,0], lines: [
    { ai: true, a: 0.35, b: 3.54, az: 'Salam! Gül mağazası, sizi eşidirəm.', ru: 'Здравствуйте! Цветочный магазин, слушаю.', en: 'Hello! Flower shop, I am listening.' },
    { ai: false, a: 4.24, b: 8.51, az: 'Salam, bu gün axşama 25 qızılgül çatdıra bilərsiniz?', ru: 'Здравствуйте, доставите сегодня к вечеру 25 роз?', en: 'Hi, can you deliver 25 roses this evening?' },
    { ai: true, a: 9.41, b: 18.97, az: 'Bəli. 25 qırmızı qızılgül 85 AZN, çatdırılma 5 AZN. Ünvan və saatı deyin.', ru: 'Да. 25 красных роз — 85 AZN, доставка 5 AZN. Назовите адрес и время.', en: 'Yes. 25 red roses are 85 AZN, delivery 5 AZN. Tell me the address and time.' },
    { ai: false, a: 19.67, b: 21.81, az: 'Nərimanov, axşam saat yeddidə.', ru: 'Нариманов, в семь вечера.', en: 'Narimanov, at seven in the evening.' },
    { ai: true, a: 22.71, b: 28.71, az: 'Qeyd etdim: Nərimanov, saat 19:00. Floristimiz təsdiq üçün zəng edəcək.', ru: 'Записала: Нариманов, 19:00. Флорист позвонит подтвердить.', en: 'Noted: Narimanov, 7 pm. Our florist will call to confirm.' },
  ] },
  barber: { src: '/media/ai-calls/barber-sulafat.mp3', dur: 20.6, env: [0,62,75,43,67,65,71,21,0,76,92,34,43,100,71,83,69,77,80,60,0,0,65,66,72,68,62,60,67,69,43,42,2,65,60,9,0,85,84,8,0,0,79,44,52,55,72,63,64,69,48,68,19,54,50,48,79,57,54,22,0], lines: [
    { ai: true, a: 0.35, b: 2.48, az: 'Salam! Bərbərxana, buyurun.', ru: 'Здравствуйте! Барбершоп, слушаю.', en: 'Hello! Barbershop, go ahead.' },
    { ai: false, a: 3.18, b: 6.65, az: 'Salam, sabah saç kəsiminə yer var?', ru: 'Здравствуйте, на завтра есть место на стрижку?', en: 'Hi, any slot for a haircut tomorrow?' },
    { ai: true, a: 7.55, b: 11.91, az: 'Sabah saat 11:00 və 15:30 boşdur. Hansı uyğundur?', ru: 'Завтра свободно в 11:00 и 15:30. Какое удобно?', en: 'Tomorrow 11:00 and 15:30 are free. Which suits you?' },
    { ai: false, a: 12.61, b: 13.27, az: '11:00.', ru: 'В одиннадцать.', en: 'Eleven.' },
    { ai: true, a: 14.17, b: 20.16, az: 'Yazdım: sabah saat 11:00, saç kəsimi. Bir gün əvvəl xatırladacağıq.', ru: 'Записала: завтра в 11:00, стрижка. Напомним за день.', en: 'Booked: tomorrow at 11:00, haircut. We will remind you the day before.' },
  ] },
};

const COPY = {
  az: {
    eyebrow: 'AI operator · Azərbaycan dilində', h1: 'Müştəri yazır,', h2: 'AI cavab verir.',
    sub: 'Instagram, WhatsApp və telefon zəngləri — hamısına bir AI operator cavab verir, sifarişi və müraciəti CRM-ə yazır. Gecə də.',
    sample: 'nümunə', call: 'Zəng', chat: 'Yazışma', play: 'Zəngə qulaq asın', pause: 'Dayandır', want: 'Biznesimə belə operator istəyirəm', ai: 'AI', review: 'Əmin olmadığı cavabı göndərmir — işçiyə qaralama kimi verir. Lazım olanda söhbəti menecerə ötürür.', cta: 'Demoda göstərək',
    dirs: [
      { id: 'pharmacy', label: 'Aptek', who: 'Aptek', listen: 'AI operator aptekdən sifariş qəbul edir', did: ['Apteki nömrədən tanıdı', '1C kataloqunda tapdı', 'Gözləmə siyahısına yazdı'] },
      { id: 'hotel', label: 'Otel', chatTitle: 'Otel · WhatsApp', who: 'Qonaq', listen: 'AI operator otel üçün bron qəbul edir', did: ['Qiymət otelin məlumatından', 'Bron sorğusu CRM-də', 'Menecerə ötürdü'], msgs: [
        { text: 'Salam, 12–14 dekabr üçün iki nəfərlik otaq var?', at: '22:14' },
        { ai: true, text: 'Salam! Standart otaq gecəsi 90 AZN-dən, səhər yeməyi daxildir. Adınızı yazın — menecer boş otağı təsdiqləsin.', at: '22:14' },
        { text: 'Aynur. Hava limanından transfer olar?', at: '22:15' },
        { ai: true, text: 'Bəli, transfer 25 AZN. Sorğunuzu menecerə ötürdüm, sizə yazacaq.', at: '22:15' }] },
      { id: 'car', label: 'Rent a car', chatTitle: 'Rent a car · Instagram', who: 'Müştəri', listen: 'AI operator maşın bronunu qəbul edir', did: ['Boş maşını dedi', 'Bron sorğusu', 'Lid CRM-də'], msgs: [
        { text: 'Salam, həftəsonu üçün Prado boşdur?', at: '08:30' },
        { ai: true, text: 'Salam! Ağ Prado şənbə və bazar boşdur — gündəlik 120 AZN. Bron edək?', at: '08:30' },
        { text: 'Bəli, hava limanında götürə bilərəm?', at: '08:31' },
        { ai: true, text: 'Əlbəttə. Adınızı və reys nömrəsini yazın — sürücümüz sizi qarşılayacaq.', at: '08:31' }] },
      { id: 'flowers', label: 'Gül mağazası', chatTitle: 'Gül mağazası · Instagram', who: 'Müştəri', listen: 'AI operator gül sifarişi qəbul edir', did: ['Sifariş çoxluğunda da cavab', 'Sifariş CRM-də', 'Floristə tapşırıq'], msgs: [
        { text: 'Salam, bu gün axşama 25 qızılgül çatdıra bilərsiniz?', at: '13:05' },
        { ai: true, text: 'Salam! Bəli, 25 qırmızı qızılgül — 85 AZN, Bakı daxili çatdırılma 5 AZN. Ünvan və saatı yazın.', at: '13:05' },
        { text: 'Nərimanov, saat 19:00', at: '13:06' },
        { ai: true, text: 'Qeyd etdim: Nərimanov, 19:00. Floristimiz təsdiq üçün zəng edəcək.', at: '13:06' }] },
      { id: 'barber', label: 'Bərbərxana', chatTitle: 'Bərbərxana · WhatsApp', who: 'Müştəri', listen: 'AI operator saç kəsiminə yazır', did: ['Boş vaxtı dedi', 'Görüş təqvimdə', 'Xatırlatma'], msgs: [
        { text: 'Salam, sabah saç kəsiminə yer var?', at: '21:40' },
        { ai: true, text: 'Salam! Sabah 11:00 və 15:30 boşdur. Hansı saat uyğundur?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Yazdım: sabah 11:00, saç kəsimi. Bir gün əvvəl xatırladacağıq.', at: '21:41' }] },
    ],
  },
  ru: {
    eyebrow: 'ИИ-оператор · на азербайджанском', h1: 'Клиент пишет,', h2: 'ИИ отвечает.',
    sub: 'Instagram, WhatsApp и телефонные звонки — на всё отвечает один ИИ-оператор и записывает заказ и обращение в CRM. Даже ночью.',
    sample: 'пример', call: 'Звонок', chat: 'Переписка', play: 'Послушайте звонок', pause: 'Пауза', want: 'Хочу такого оператора', ai: 'ИИ', review: 'Ответ, в котором не уверен, не отправляет — отдаёт сотруднику черновиком. Когда нужно, передаёт разговор менеджеру.', cta: 'Показать на демо',
    dirs: [
      { id: 'pharmacy', label: 'Аптека', who: 'Аптека', listen: 'ИИ-оператор принимает заказ у аптеки', did: ['Узнал аптеку по номеру', 'Нашёл в каталоге 1С', 'Записал в лист ожидания'] },
      { id: 'hotel', label: 'Отель', chatTitle: 'Отель · WhatsApp', who: 'Гость', listen: 'ИИ-оператор принимает бронь в отель', did: ['Цена из данных отеля', 'Заявка на бронь в CRM', 'Передал менеджеру'], msgs: [
        { text: 'Здравствуйте, есть номер на двоих на 12–14 декабря?', at: '22:14' },
        { ai: true, text: 'Здравствуйте! Стандартный номер — от 90 AZN за ночь, завтрак включён. Напишите имя — менеджер подтвердит свободный номер.', at: '22:14' },
        { text: 'Айнур. Трансфер из аэропорта есть?', at: '22:15' },
        { ai: true, text: 'Да, трансфер 25 AZN. Передал заявку менеджеру, он вам напишет.', at: '22:15' }] },
      { id: 'car', label: 'Прокат авто', chatTitle: 'Прокат авто · Instagram', who: 'Клиент', listen: 'ИИ-оператор бронирует машину', did: ['Назвал свободную машину', 'Заявка на бронь', 'Лид в CRM'], msgs: [
        { text: 'Здравствуйте, Прадо на выходные свободен?', at: '08:30' },
        { ai: true, text: 'Здравствуйте! Белый Прадо свободен в субботу и воскресенье — 120 AZN в сутки. Бронируем?', at: '08:30' },
        { text: 'Да, можно забрать в аэропорту?', at: '08:31' },
        { ai: true, text: 'Конечно. Напишите имя и номер рейса — водитель вас встретит.', at: '08:31' }] },
      { id: 'flowers', label: 'Цветы', chatTitle: 'Цветочный магазин · Instagram', who: 'Клиент', listen: 'ИИ-оператор принимает заказ цветов', did: ['Отвечает и в наплыв заказов', 'Заказ в CRM', 'Задача флористу'], msgs: [
        { text: 'Здравствуйте, доставите сегодня к вечеру 25 роз?', at: '13:05' },
        { ai: true, text: 'Здравствуйте! Да, 25 красных роз — 85 AZN, доставка по Баку 5 AZN. Напишите адрес и время.', at: '13:05' },
        { text: 'Нариманов, 19:00', at: '13:06' },
        { ai: true, text: 'Записал: Нариманов, 19:00. Флорист позвонит подтвердить.', at: '13:06' }] },
      { id: 'barber', label: 'Барбершоп', chatTitle: 'Барбершоп · WhatsApp', who: 'Клиент', listen: 'ИИ-оператор записывает на стрижку', did: ['Назвал свободное время', 'Запись в календаре', 'Напоминание'], msgs: [
        { text: 'Здравствуйте, на завтра есть место на стрижку?', at: '21:40' },
        { ai: true, text: 'Здравствуйте! Завтра свободно в 11:00 и 15:30. Какое время удобно?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Записал: завтра в 11:00, стрижка. За день напомним.', at: '21:41' }] },
    ],
  },
  en: {
    eyebrow: 'AI operator · in Azerbaijani', h1: 'Customers write,', h2: 'AI answers.',
    sub: 'Instagram, WhatsApp and phone calls — one AI operator answers them all and writes every order and request to the CRM. At night too.',
    sample: 'sample', call: 'Call', chat: 'Chat', play: 'Listen to the call', pause: 'Pause', want: 'I want this operator', ai: 'AI', review: 'A reply it is not sure about is not sent — it goes to an employee as a draft. When needed, the conversation is handed to a manager.', cta: 'Show on a demo',
    dirs: [
      { id: 'pharmacy', label: 'Pharmacy', who: 'Pharmacy', listen: 'The AI operator takes a pharmacy order', did: ['Knew the pharmacy by its number', 'Found it in the 1C catalogue', 'Put it on the waiting list'] },
      { id: 'hotel', label: 'Hotel', chatTitle: 'Hotel · WhatsApp', who: 'Guest', listen: 'The AI operator takes a hotel booking', did: ['Price from the hotel’s own data', 'Booking request in the CRM', 'Handed to a manager'], msgs: [
        { text: 'Hi, do you have a double room for 12–14 December?', at: '22:14' },
        { ai: true, text: 'Hello! A standard room is from 90 AZN a night, breakfast included. Send your name and a manager will confirm a free room.', at: '22:14' },
        { text: 'Aynur. Is there an airport transfer?', at: '22:15' },
        { ai: true, text: 'Yes, the transfer is 25 AZN. I have passed your request to a manager, who will write to you.', at: '22:15' }] },
      { id: 'car', label: 'Car rental', chatTitle: 'Car rental · Instagram', who: 'Client', listen: 'The AI operator books a car', did: ['Named a free car', 'Booking request', 'Lead in the CRM'], msgs: [
        { text: 'Hi, is the Prado free this weekend?', at: '08:30' },
        { ai: true, text: 'Hello! The white Prado is free on Saturday and Sunday — 120 AZN a day. Shall we book it?', at: '08:30' },
        { text: 'Yes, can I pick it up at the airport?', at: '08:31' },
        { ai: true, text: 'Of course. Send your name and flight number — our driver will meet you.', at: '08:31' }] },
      { id: 'flowers', label: 'Flowers', chatTitle: 'Flower shop · Instagram', who: 'Client', listen: 'The AI operator takes a flower order', did: ['Answers during order rushes', 'Order in the CRM', 'Task for the florist'], msgs: [
        { text: 'Hi, can you deliver 25 roses this evening?', at: '13:05' },
        { ai: true, text: 'Hello! Yes, 25 red roses — 85 AZN, delivery in Baku 5 AZN. Send the address and time.', at: '13:05' },
        { text: 'Narimanov, 7 pm', at: '13:06' },
        { ai: true, text: 'Noted: Narimanov, 7 pm. Our florist will call to confirm.', at: '13:06' }] },
      { id: 'barber', label: 'Barbershop', chatTitle: 'Barbershop · WhatsApp', who: 'Client', listen: 'The AI operator books a haircut', did: ['Named free slots', 'Appointment in the calendar', 'Reminder'], msgs: [
        { text: 'Hi, any slot for a haircut tomorrow?', at: '21:40' },
        { ai: true, text: 'Hello! Tomorrow 11:00 and 15:30 are free. Which suits you?', at: '21:40' },
        { text: '11:00', at: '21:41' },
        { ai: true, text: 'Booked: tomorrow at 11:00, haircut. We will remind you the day before.', at: '21:41' }] },
    ],
  },
} as const;

type Copy = (typeof COPY)[Lang];

const fmt = (s: number) => { const v = Math.max(0, Math.floor(s)); return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`; };

function Chat({ msgs, ai }: { msgs: readonly Msg[]; ai: string }) {
  return (
    <div className="op-chat">
      {msgs.map((m, i) => (
        <div key={i} className={`op-msg ${m.ai ? 'is-ai' : ''}`} style={{ animationDelay: `${i * 0.45}s` }}>
          {m.text}<small>{m.at}{m.ai ? ` · ${ai}` : ''}</small>
        </div>
      ))}
    </div>
  );
}

/*
 * The call plays through Web Audio, not an <audio> element. The site's static assets answer without byte
 * ranges (no Accept-Ranges), so Chrome cannot seek an <audio> there: clicking a line or the waveform would do
 * nothing. Each file is 160–250 KB, fetched once on the first click and decoded; a decoded buffer seeks anywhere.
 * CSP allows this (connect-src 'self'); a blob: or data: media URL would be blocked by media-src 'self'.
 * The analyser also gives the real loudness of the voice, which drives the orb.
 */
function useCallAudio(src: string, duration: number) {
  const ctx = useRef<AudioContext | null>(null);
  const buf = useRef<AudioBuffer | null>(null);
  const node = useRef<AudioBufferSourceNode | null>(null);
  const an = useRef<AnalyserNode | null>(null);
  const startedAt = useRef(0);
  const offset = useRef(0);
  const [t, setT] = useState(0);
  const [level, setLevel] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const data = new Uint8Array(256);
    const id = window.setInterval(() => {
      const c = ctx.current;
      if (!c) return;
      setT(Math.min(duration, c.currentTime - startedAt.current));
      if (an.current) { an.current.getByteTimeDomainData(data); let s = 0; for (const v of data) s += ((v - 128) / 128) ** 2; setLevel(Math.min(1, Math.sqrt(s / data.length) * 4)); }
    }, 90);
    return () => window.clearInterval(id);
  }, [playing, duration]);
  useEffect(() => () => { try { node.current?.stop(); } catch {} ctx.current?.close().catch(() => {}); }, []);
  const stopNode = () => { const n = node.current; node.current = null; if (n) { n.onended = null; try { n.stop(); } catch {} } };
  const playFrom = async (at: number) => {
    if (!ctx.current) { const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext; ctx.current = new AC(); an.current = ctx.current.createAnalyser(); an.current.fftSize = 256; an.current.connect(ctx.current.destination); }
    const c = ctx.current;
    if (c.state === 'suspended') await c.resume();
    if (!buf.current) { const r = await fetch(src); buf.current = await c.decodeAudioData(await r.arrayBuffer()); }
    stopNode();
    const n = c.createBufferSource(); n.buffer = buf.current; n.connect(an.current!);
    const from = Math.max(0, Math.min(at, buf.current.duration - 0.05));
    n.onended = () => { if (node.current !== n) return; node.current = null; setPlaying(false); setEnded(true); setT(duration); offset.current = 0; setLevel(0); };
    n.start(0, from); node.current = n; startedAt.current = c.currentTime - from;
    setT(from); setPlaying(true); setStarted(true); setEnded(false);
  };
  const pause = () => { const c = ctx.current; if (!c || !node.current) return; offset.current = c.currentTime - startedAt.current; stopNode(); setPlaying(false); setLevel(0); };
  const toggle = () => { if (playing) pause(); else playFrom(ended ? 0 : offset.current).catch(() => setPlaying(false)); };
  const seek = (s: number) => { offset.current = s; playFrom(s).catch(() => setPlaying(false)); };
  return { t, level, playing, started, ended, toggle, seek };
}

function Call({ call, dir, lang, c, demoHref }: { call: CallData; dir: Dir; lang: Lang; c: Copy; demoHref: string }) {
  const { t, level, playing, started, ended, toggle, seek } = useCallAudio(call.src, call.dur);
  const isAi = (x: number) => call.lines.some((l) => l.ai && x >= l.a - 0.2 && x <= l.b + 0.2);
  return (
    <>
      <div className={`op-orb-row ${playing ? 'is-playing' : ''}`}>
        <button type="button" className="op-orb" onClick={toggle} aria-label={playing ? c.pause : c.play}>
          <span className="op-orb-halo" /><span className="op-orb-ring" /><span className="op-orb-ring op-orb-ring-2" />
          <span className="op-orb-sphere" style={playing ? { transform: `scale(${(1 + 0.18 * level).toFixed(3)})` } : undefined}>{playing ? <Pause size={22} /> : <Play size={24} />}</span>
        </button>
        <div className="op-orb-copy">
          <button type="button" className="op-orb-title" onClick={toggle}>{c.play}</button>
          <p>{dir.listen} · {fmt(call.dur)}</p>
          {started && (
            <div className="op-progress">
              <div className="op-wave" aria-hidden="true" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * call.dur); }}>
                {call.env.map((v, i) => { const at = ((i + 0.5) / call.env.length) * call.dur; return <i key={i} className={`${isAi(at) ? 'is-ai' : ''} ${at <= t ? 'is-done' : ''}`} style={{ height: `${Math.max(10, v)}%` }} />; })}
              </div>
              <span className="op-time">{fmt(t)} / {fmt(call.dur)}</span>
            </div>
          )}
          {ended && <a className="op-want" href={demoHref} target="_blank" rel="noopener">{c.want}<ArrowRight size={16} /></a>}
        </div>
      </div>
      <div className="op-lines">
        {call.lines.map((l, i) => {
          const next = call.lines[i + 1];
          const now = t > 0 && t >= l.a - 0.15 && t < (next ? next.a - 0.15 : call.dur + 1);
          return (
            <button type="button" key={i} className={`op-line ${l.ai ? 'is-ai' : ''} ${now ? 'is-now' : ''}`} onClick={() => seek(l.a)}>
              <span className="op-who">{l.ai ? c.ai : dir.who}</span>
              <span>{l.az}{lang !== 'az' && <small>{l[lang]}</small>}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export function AiPresenter({ lang, demoHref }: { lang: Lang; demoHref: string }) {
  const c = COPY[lang];
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [seen, setSeen] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  const [dirId, setDirId] = useState('pharmacy');
  const [mode, setMode] = useState<'call' | 'chat'>('call');
  // Until a visitor has switched once, the other option carries a pulsing dot: the toggle must read as clickable.
  const [switched, setSwitched] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const title = useTypewriter([c.h1, c.h2], { active: seen, speed: 55, startDelay: 300 });
  // The presenter's open-palm gesture lands as the conversation appears.
  useEffect(() => { if (title.done && video.current) video.current.play().catch(() => {}); }, [title.done]);
  const dirs = c.dirs as readonly Dir[];
  const dir = dirs.find((d) => d.id === dirId) ?? dirs[0];
  const showChat = mode === 'chat' && !!dir.msgs;
  return (
    <section className={`ai-presenter ${seen ? 'is-seen' : ''} ${title.done ? 'is-done' : ''}`} id="ai-agent" ref={ref}>
      <div className="wrap ai-presenter-grid">
        <div className="ai-presenter-copy">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="typewriter"><TypedText text={c.h1} shown={title.shown[0]} /><br /><em><TypedText text={c.h2} shown={title.shown[1]} cursor={title.started && !title.done} /></em></h2>
          <p className="ai-presenter-sub">{c.sub}</p>
          <div className="op-card" id="ai-operator">
            <div className="op-tabs" role="tablist" aria-label={c.eyebrow}>
              {dirs.map((d) => (
                <button type="button" role="tab" key={d.id} aria-selected={d.id === dir.id} onClick={() => { setDirId(d.id); setMode('call'); }}>{d.label}</button>
              ))}
            </div>
            <div className="op-pane">
              <div className="op-pane-head">
                <b>{showChat ? dir.chatTitle : `${dir.label} · ${c.call.toLowerCase()}`}</b>
                {dir.msgs ? (
                  <span className="op-mode" role="group" aria-label={`${c.call} / ${c.chat}`}>
                    <button type="button" aria-pressed={!showChat} onClick={() => { setMode('call'); setSwitched(true); }}><Phone size={14} />{c.call}{showChat && !switched && <i className="op-mode-dot" />}</button>
                    <button type="button" aria-pressed={showChat} onClick={() => { setMode('chat'); setSwitched(true); }}><MessageCircle size={14} />{c.chat}{!showChat && !switched && <i className="op-mode-dot" />}</button>
                  </span>
                ) : null}
              </div>
              {showChat && dir.msgs
                ? <Chat key={`${dir.id}-chat`} msgs={dir.msgs} ai={c.ai} />
                : <Call key={dir.id} call={CALLS[dir.id]} dir={dir} lang={lang} c={c} demoHref={demoHref} />}
            </div>
            <ul className="op-did">{dir.did.map((d) => <li key={d}><Check size={14} />{d}</li>)}<li className="op-did-note">{c.sample}</li></ul>
          </div>
          <p className="ai-review">{c.review}</p>
          <a className="cta" href={demoHref} target="_blank" rel="noopener">{c.cta}<span><ArrowRight size={18} /></span></a>
        </div>
        <div className="ai-presenter-media" aria-hidden="true">
          {hasVideo && <video ref={video} muted playsInline preload="auto" onError={() => setHasVideo(false)}><source src="/presenter.mp4" type="video/mp4" /></video>}
        </div>
      </div>
    </section>
  );
}
