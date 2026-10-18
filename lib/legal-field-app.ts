import type { Lang } from './product-map';
import { COMPANY } from './company';
import type { LegalCopy } from './legal-copy';

/**
 * Privacy policy of the LeadDrive Route Field Android app (package
 * com.mtmobileapp). Google Play requires a policy that names the app and its
 * sensitive data; the site policy covers only the demo form.
 *
 * Re-checked against the app (leaddrive-mtm 3.11.30, versionCode 1624) and the
 * server on 2026-10-18 for the Google Play submission:
 * - location only during a confirmed, unpaused workday (runtime/AndroidApp.tsx);
 *   the server refuses points taken during a break (lib/mtm/workday-pauses.ts);
 * - ACCESS_BACKGROUND_LOCATION IS requested since 2026-09-29, after the card on
 *   the Today screen, so recording resumes after a restart or an update
 *   (services/background-location.ts, FieldTrackingResume) — the 2026-09-14
 *   text said the opposite;
 * - customer signature drawn on screen plus signer name (services/visit-signature.ts);
 * - push through Firebase Cloud Messaging (services/push-registration.ts);
 * - attendance QR scanned on the phone with ML Kit, attendance place only with
 *   the organisation's consent text, mock-location flag (services/attendance-*);
 * - sign-in codes sent to WhatsApp (leaddrive-v2 lib/mtm/whatsapp-login-code.ts);
 * - raw GPS pruned after 30 days (cron mtm-cleanup), crash reports to Sentry's
 *   EU region with sendDefaultPii off, map tiles from CARTO, no advertising ID.
 * Change the app, re-check the text. The `delete` section id is the deletion
 * link given to Google Play — keep it.
 */
const E = COMPANY.email;
const P = COMPANY.phone;

export const FIELD_APP_PRIVACY: Record<Lang, LegalCopy> = {
  az: {
    title: 'LeadDrive Route Field məxfilik siyasəti — LeadDrive CRM',
    description: 'LeadDrive Route Field mobil tətbiqi hansı məlumatları emal edir: iş günü ərzində yer, ziyarət fotoları və imzalar, iş qeydləri; kim görür, harada və nə qədər saxlanılır, necə silinir.',
    label: 'Mobil tətbiq: məxfilik',
    h1: 'LeadDrive Route Field mobil tətbiqinin məxfilik siyasəti',
    intro: 'Bu siyasət Android üçün LeadDrive Route Field tətbiqinə (paket com.mtmobileapp, bundan sonra «Tətbiq») aiddir və Azərbaycan Respublikasının «Fərdi məlumatlar haqqında» Qanununa (11 may 2010-cu il, № 998-IIIQ) uyğun tərtib edilib. Tətbiq LeadDrive CRM istifadə edən şirkətlərin səyyar əməkdaşları və onların rəhbərləri üçündür. Hansı məlumatların emal olunmasını işəgötürən şirkət (bundan sonra «Müştəri») müəyyən edir; operator Tətbiqi və serverləri Müştəri ilə bağlanmış müqavilə əsasında və onun tapşırığı ilə işlədir.',
    updated: '2026-10-18',
    sections: [
      { h: '1. Hesab və giriş', list: [
        'Tətbiqdə qeydiyyat yoxdur: hesabı Müştərinin administratoru LeadDrive CRM-də yaradır. Tətbiq əməkdaşın adını, e-poçtunu və ya telefon nömrəsini, rolunu və şirkətini emal edir.',
        'Giriş e-poçt və ya telefon nömrəsi və parol ilədir. İlk girişdə və parolu unutduqda 6 rəqəmli kod şirkətdə qeyd olunmuş nömrənin WhatsApp-ına göndərilir; kodla öz parolunuzu təyin edirsiniz.',
        'Giriş tokeni telefonda saxlanılır. Parol telefonda saxlanılmır.',
      ] },
      { h: '2. Yer məlumatı', list: [
        'Dəqiq GPS nöqtələri yalnız açıq iş günü ərzində toplanır: siz «İş gününü başlat» düyməsinə toxunduqdan sonra. Bu müddətdə toplama Tətbiq bağlı olanda və ya istifadə olunmayanda da (fon rejimində) davam edir və bütün bu vaxt bildiriş göstərilir (Android 13 və daha yeni versiyalarda — bildirişlərə icazə verdikdə).',
        'Qeydin telefon yenidən işə düşdükdən və ya Tətbiq yeniləndikdən sonra özü davam etməsi üçün Tətbiq «Həmişə icazə ver» (fon rejimində yer) icazəsini istəyir. İstəməzdən əvvəl «Bu gün» ekranında nəyin və nə üçün toplandığı izah olunur. İmtina edə bilərsiniz: onda telefon yenidən işə düşdükdən sonra qeydi davam etdirmək üçün Tətbiqi açmaq lazım olacaq.',
        '«Fasilə» zamanı, «Günü bitir» düyməsinə toxunduqda və hesabdan çıxdıqda toplama dayanır. Fasilə vaxtı alınmış nöqtəni server qəbul etmir. İş günündən kənar yer toplanmır.',
        'Ziyarətə giriş və çıxış qeyd olunanda həmin anın koordinatları yazılır.',
        'Müştəri iş vaxtının uçotunu qoşubsa: iş gününün başlanğıc və bitmə yeri yalnız təşkilatın təsdiqlənmiş mətninə ayrıca razılığınızla göndərilir. Razılığı Tətbiqdə istənilən vaxt geri götürə bilərsiniz; yer olmadan da vaxt qeyd olunur. Nöqtə ilə birlikdə telefonun «yer saxtalaşdırılıb» əlaməti də göndərilir.',
        'Rəhbərlər komandanın yerini xəritədə rollarına uyğun görür. Rəhbərin öz yeri yalnız o «Yerimi paylaş» düyməsinə toxunduqda, bir nöqtə kimi göndərilir.',
        'Yer məlumatı marşrutu, ziyarətləri və iş vaxtını Müştəriyə təsdiqləmək üçündür. Reklam üçün istifadə olunmur.',
      ] },
      { h: '3. Kamera: fotolar və QR kodlar', list: [
        'Fotolar yalnız ziyarət zamanı Tətbiqin öz kamerası ilə çəkilir. Hər foto üzərinə tarix, vaxt, koordinatlar və əməkdaş qeyd olunur.',
        'İş vaxtının uçotunda filialdakı QR kod kamera ilə oxunur. Şəkil telefonda emal olunur və saxlanılmır; serverə yalnız kodun məzmunu göndərilir.',
        'Tətbiq telefonun qalereyasına və fayllarına çıxış istəmir.',
      ] },
      { h: '4. Müştərinin imzası', p: ['Ziyarət zamanı müştəri ekranda imza ata bilər. Tətbiq imzanın xətlərini, imzalayanın daxil edilmiş adını və vaxtı saxlayır və ziyarətlə birlikdə göndərir.'] },
      { h: '5. İş qeydləri', p: ['Marşrutlar, ziyarətlər, qeydlər, tapşırıqlar və onların nəticələri; yeni həkim və ya kontakt kartında dəyişiklik sorğuları; iş vaxtı üzrə sorğu və izahatlar; rəhbərin komandaya mesajları və onların oxunma təsdiqi; əməkdaşın baxdığı və ya dəyişdiyi müştəri və kontakt kartları (ad, telefon, ünvan). Bu məlumatlar Müştərinin CRM-inə aiddir.'] },
      { h: '6. Bildirişlər', p: ['Ziyarət və tapşırıq xatırlatmaları və rəhbərin mesajları Google Firebase Cloud Messaging vasitəsilə göndərilir. Bunun üçün telefonun bildiriş ünvanı (token) və Firebase quraşdırma identifikatoru serverə və Google-a ötürülür.'] },
      { h: '7. Cihaz və diaqnostika', list: [
        'Tətbiqin özünün yaratdığı quraşdırma identifikatoru — hesabın tanış cihazdan istifadə edildiyini yoxlamaq üçün.',
        'Bağlantı vəziyyəti — internet olmadıqda əməliyyatları telefonda saxlayıb sonra göndərmək üçün.',
        'Çökmə hesabatları və performans ölçmələri Sentry xidmətinə göndərilir: IP ünvanı, cookie və sorğuların məzmunu olmadan, yalnız əməkdaş və şirkət identifikatoru ilə.',
        'QR kod oxunanda Google ML Kit diaqnostika üçün cihazın modelini, Android versiyasını, Tətbiqin versiyasını və sürət göstəricilərini Google-a göndərir; şəkil göndərilmir.',
      ] },
      { h: '8. Tətbiqin toplamadıqları', p: ['Telefonun kontaktları, SMS, zənglər, təqvim, mikrofon, qalereya və fayllar, reklam identifikatoru. Tətbiqdə reklam yoxdur, məlumatlar satılmır və reklam məqsədilə ötürülmür.'] },
      { h: '9. İcazələr', list: [
        'Yer (dəqiq və təxmini) — iş günü ərzində marşrut və ziyarət qeydləri.',
        'Fon rejimində yer («Həmişə icazə ver») — iş günü ərzində Tətbiq bağlı olanda qeydi davam etdirmək və telefon yenidən işə düşdükdən sonra bərpa etmək.',
        'Ön plan xidməti (yer) — iş günü ərzində bildirişlə işləyən GPS qeydi.',
        'Telefon işə düşəndə başlamaq — açıq iş gününün qeydini bərpa etmək üçün; iş günü bağlıdırsa, heç nə başlamır.',
        'Batareya qənaətindən azad etmə sorğusu — dayanmış telefonda Android-in qeydi dayandırmaması üçün; qərar əməkdaşındır.',
        'Bildirişlər — xatırlatmalar, rəhbərin mesajları və iş günü bildirişi.',
        'Kamera — ziyarət fotoları və QR kodlar.',
        'İnternet və şəbəkə vəziyyəti — sinxronizasiya və oflayn rejim.',
      ] },
      { h: '10. Məlumatları kim görür', list: [
        'Müştərinin səlahiyyətli istifadəçiləri (rəhbərlər, administratorlar) — LeadDrive CRM-dəki rollarına uyğun.',
        'Operatorun əməkdaşları — yalnız dəstək və müqavilə üzrə öhdəliklər üçün.',
        'Contabo GmbH — serverlərin hostinqi (Avropa İttifaqı).',
        'Functional Software, Inc. (Sentry) — çökmə hesabatları, məlumatlar Aİ regionunda (Almaniya) saxlanılır.',
        'Google LLC — bildirişlərin çatdırılması (Firebase Cloud Messaging) və QR kod oxuyucusunun diaqnostikası (ML Kit).',
        'Meta Platforms (WhatsApp) — giriş kodunun sizin WhatsApp nömrənizə çatdırılması.',
        'CARTO — xəritə ekranlarında xəritə şəkilləri CARTO serverlərindən yüklənir; CARTO cihazın IP ünvanını və yüklənən xəritə sahəsini görür.',
        'Məlumatlar qanunla tələb olunan hallar istisna olmaqla başqa üçüncü şəxslərə ötürülmür.',
      ] },
      { h: '11. Saxlama', list: [
        'Serverlər Avropa İttifaqında yerləşir. Deməli, məlumatlar Azərbaycan Respublikasından kənara ötürülür; bu barədə əməkdaşları məlumatlandırmaq və hüquqi əsası təmin etmək Müştərinin öhdəliyidir.',
        'Xam GPS nöqtələri 30 gündən sonra avtomatik silinir.',
        'Ziyarətlər, fotolar, imzalar, tapşırıqlar və digər iş qeydləri Müştəri ilə müqavilə qüvvədə olduğu müddətdə və Müştərinin göstərişinə uyğun saxlanılır; müqavilə bitdikdə müqavilənin şərtlərinə görə silinir və ya Müştəriyə qaytarılır.',
        'Göndərilməmiş əməliyyatlar telefonda sinxronizasiyaya qədər saxlanılır. Tətbiqi silmək telefondakı bütün məlumatlarını silir.',
      ] },
      { h: '12. Təhlükəsizlik', p: ['Tətbiq serverlə yalnız HTTPS üzərində əlaqə saxlayır. Serverdə hər şirkətin məlumatları verilənlər bazası səviyyəsində ayrılır, çıxış rollarla məhdudlaşır və əməliyyatlar audit jurnalına yazılır.'] },
      { id: 'delete', h: '13. Hesabın və məlumatların silinməsi', list: [
        'Hesabı Müştəri yaradır, ona görə də onu Müştərinin administratoru LeadDrive CRM-də silir və ya bağlayır. Əvvəlcə ona müraciət edin.',
        `Operatora da yaza bilərsiniz: ${E}. Məktubda şirkətin adını və hesabınızın e-poçtunu və ya telefon nömrəsini göstərin. Müraciəti Müştəri ilə birlikdə 10 iş günü ərzində cavablandırırıq.`,
        'Silindikdə hesab, giriş məlumatları və bildiriş ünvanları silinir. Xam GPS nöqtələri hər halda 30 gündən sonra silinir. Ziyarət, foto, imza və iş vaxtı qeydləri Müştərinin CRM-inə aiddir: qanunla saxlanması tələb olunan qeydlər (məsələn, iş vaxtının uçotu) bu müddət bitənə qədər saxlanılır, qalanları Müştərinin göstərişi ilə silinir.',
        'Tətbiqi silmək telefondakı bütün məlumatlarını dərhal silir.',
      ] },
      { h: '14. Hüquqlarınız', list: [
        'Sizin haqqınızda hansı məlumatların emal olunduğunu öyrənmək, onların düzəldilməsini və ya silinməsini tələb etmək, iş vaxtının uçotunda yerə verdiyiniz razılığı geri götürmək.',
        'Əvvəlcə işəgötürəninizin LeadDrive CRM administratoruna müraciət edin: hesabı və məlumatları o idarə edir.',
        `Operatora da yaza bilərsiniz: ${E}, ${P}. Müraciəti Müştəri ilə birlikdə 10 iş günü ərzində cavablandırırıq.`,
      ] },
      { h: '15. Uşaqlar', p: ['Tətbiq 18 yaşına çatmamış şəxslər üçün deyil və onların məlumatlarını bilərəkdən toplamır.'] },
      { h: '16. Dəyişikliklər', p: ['Siyasət yeniləndikdə bu səhifədə yeni tarix göstərilir. Əhəmiyyətli dəyişikliklər barədə Müştərilərə əvvəlcədən məlumat verilir.'] },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности LeadDrive Route Field — LeadDrive CRM',
    description: 'Какие данные обрабатывает мобильное приложение LeadDrive Route Field: местоположение в рабочий день, фото и подписи визитов, рабочие записи; кто их видит, где и сколько они хранятся, как их удалить.',
    label: 'Мобильное приложение: конфиденциальность',
    h1: 'Политика конфиденциальности мобильного приложения LeadDrive Route Field',
    intro: 'Политика относится к приложению LeadDrive Route Field для Android (пакет com.mtmobileapp, далее «Приложение») и составлена в соответствии с Законом Азербайджанской Республики «О персональных данных» (от 11 мая 2010 г., № 998-IIIQ). Приложение предназначено для полевых сотрудников компаний, работающих в LeadDrive CRM, и их руководителей. Какие данные обрабатываются, определяет компания-работодатель (далее «Клиент»); оператор обеспечивает работу Приложения и серверов по договору с Клиентом и по его поручению.',
    updated: '2026-10-18',
    sections: [
      { h: '1. Аккаунт и вход', list: [
        'Регистрации в Приложении нет: аккаунт создаёт администратор Клиента в LeadDrive CRM. Приложение обрабатывает имя сотрудника, адрес электронной почты или номер телефона, роль и компанию.',
        'Вход — по почте или номеру телефона и паролю. При первом входе и если вы забыли пароль 6-значный код отправляется в WhatsApp на номер, который записан в компании; по коду вы задаёте свой пароль.',
        'Токен входа хранится на телефоне. Пароль на телефоне не хранится.',
      ] },
      { h: '2. Местоположение', list: [
        'Точные GPS-точки собираются только во время открытого рабочего дня: после того как вы нажали «Начать рабочий день». В это время сбор продолжается и тогда, когда Приложение закрыто или не используется (в фоне), и всё это время показывается уведомление (на Android 13 и новее — если вы разрешили уведомления).',
        'Чтобы запись сама продолжилась после перезагрузки телефона или обновления Приложения, Приложение просит разрешение «Разрешить в любом режиме» (местоположение в фоне). Перед запросом на экране «Сегодня» объясняется, что и зачем собирается. Можно отказаться: тогда после перезагрузки телефона запись продолжится, только когда вы откроете Приложение.',
        'Сбор останавливается на «Перерыве», по кнопке «Завершить день» и при выходе из аккаунта. Точку, снятую во время перерыва, сервер не принимает. Вне рабочего дня местоположение не собирается.',
        'При отметке входа на визит и выхода с него записываются координаты этого момента.',
        'Если Клиент включил учёт рабочего времени: место начала и окончания рабочего дня отправляется только с вашего отдельного согласия на утверждённый текст организации. Согласие можно отозвать в Приложении в любой момент; время отмечается и без места. Вместе с точкой отправляется признак телефона «местоположение подменено».',
        'Руководители видят местоположение своей команды на карте в соответствии с ролями. Местоположение самого руководителя отправляется, только когда он нажимает «Поделиться местоположением», одной точкой.',
        'Местоположение нужно, чтобы подтвердить Клиенту маршрут, визиты и рабочее время. Для рекламы оно не используется.',
      ] },
      { h: '3. Камера: фото и QR-коды', list: [
        'Фото делаются только во время визита, собственной камерой Приложения. На каждое фото наносятся дата, время, координаты и сотрудник.',
        'При учёте рабочего времени камерой считывается QR-код филиала. Изображение обрабатывается на телефоне и не сохраняется; на сервер уходит только содержимое кода.',
        'Доступа к галерее и файлам телефона Приложение не запрашивает.',
      ] },
      { h: '4. Подпись клиента', p: ['Во время визита клиент может расписаться на экране. Приложение сохраняет линии подписи, введённое имя подписавшего и время и отправляет их вместе с визитом.'] },
      { h: '5. Рабочие записи', p: ['Маршруты, визиты, заметки, задачи и их результаты; заявки на нового врача или на изменение карточки контакта; заявки и объяснения по рабочему времени; сообщения руководителя команде и отметки о прочтении; карточки клиентов и контактов, которые сотрудник просматривает или меняет (имя, телефон, адрес). Эти данные принадлежат CRM Клиента.'] },
      { h: '6. Уведомления', p: ['Напоминания о визитах и задачах и сообщения руководителя приходят через Google Firebase Cloud Messaging. Для этого адрес уведомлений телефона (токен) и идентификатор установки Firebase передаются на сервер и в Google.'] },
      { h: '7. Устройство и диагностика', list: [
        'Идентификатор установки, который создаёт само Приложение, — чтобы проверять, что аккаунт используется с известного устройства.',
        'Состояние сети — чтобы без интернета сохранять действия на телефоне и отправлять их позже.',
        'Отчёты о сбоях и замеры производительности уходят в сервис Sentry: без IP-адреса, cookies и содержимого запросов, только с идентификаторами сотрудника и компании.',
        'При считывании QR-кода Google ML Kit отправляет в Google для диагностики модель устройства, версию Android, версию Приложения и показатели скорости; изображение не отправляется.',
      ] },
      { h: '8. Чего Приложение не собирает', p: ['Контакты телефона, SMS, звонки, календарь, микрофон, галерею и файлы, рекламный идентификатор. В Приложении нет рекламы, данные не продаются и не передаются для рекламы.'] },
      { h: '9. Разрешения', list: [
        'Местоположение (точное и приблизительное) — маршрут и отметки визитов в рабочий день.',
        'Местоположение в фоне («Разрешить в любом режиме») — продолжать запись рабочего дня, когда Приложение закрыто, и возобновлять её после перезагрузки телефона.',
        'Сервис переднего плана (местоположение) — запись GPS с уведомлением во время рабочего дня.',
        'Запуск при включении телефона — чтобы возобновить запись открытого рабочего дня; если рабочий день закрыт, ничего не запускается.',
        'Запрос на исключение из экономии батареи — чтобы Android не останавливал запись на неподвижном телефоне; решение принимает сотрудник.',
        'Уведомления — напоминания, сообщения руководителя и уведомление рабочего дня.',
        'Камера — фото визитов и QR-коды.',
        'Интернет и состояние сети — синхронизация и офлайн-режим.',
      ] },
      { h: '10. Кто видит данные', list: [
        'Уполномоченные пользователи Клиента (руководители, администраторы) — в соответствии с их ролями в LeadDrive CRM.',
        'Сотрудники оператора — только для поддержки и исполнения договора.',
        'Contabo GmbH — хостинг серверов (Европейский союз).',
        'Functional Software, Inc. (Sentry) — отчёты о сбоях, данные хранятся в регионе ЕС (Германия).',
        'Google LLC — доставка уведомлений (Firebase Cloud Messaging) и диагностика сканера QR-кодов (ML Kit).',
        'Meta Platforms (WhatsApp) — доставка кода входа на ваш номер WhatsApp.',
        'CARTO — на экранах с картой её изображения загружаются с серверов CARTO; CARTO видит IP-адрес устройства и загружаемый участок карты.',
        'Другим третьим лицам данные не передаются, кроме случаев, предусмотренных законом.',
      ] },
      { h: '11. Хранение', list: [
        'Серверы находятся в Европейском союзе. То есть данные передаются за пределы Азербайджанской Республики; уведомить об этом сотрудников и обеспечить правовое основание — обязанность Клиента.',
        'Сырые GPS-точки автоматически удаляются через 30 дней.',
        'Визиты, фото, подписи, задачи и другие рабочие записи хранятся, пока действует договор с Клиентом, и по его указаниям; после окончания договора удаляются или возвращаются Клиенту по его условиям.',
        'Неотправленные действия хранятся на телефоне до синхронизации. Удаление Приложения удаляет все его данные на телефоне.',
      ] },
      { h: '12. Безопасность', p: ['Приложение обменивается данными с сервером только по HTTPS. На сервере данные каждой компании разделены на уровне базы данных, доступ ограничен ролями, действия записываются в журнал аудита.'] },
      { id: 'delete', h: '13. Удаление аккаунта и данных', list: [
        'Аккаунт создаёт Клиент, поэтому удаляет или закрывает его администратор Клиента в LeadDrive CRM. Сначала обратитесь к нему.',
        `Можно написать и оператору: ${E}. Укажите в письме название компании и почту или номер телефона вашего аккаунта. Мы ответим вместе с Клиентом в течение 10 рабочих дней.`,
        'При удалении удаляются аккаунт, данные для входа и адреса уведомлений. Сырые GPS-точки в любом случае удаляются через 30 дней. Записи о визитах, фото, подписи и учёт рабочего времени принадлежат CRM Клиента: записи, которые закон обязывает хранить (например, учёт рабочего времени), хранятся до окончания этого срока, остальные удаляются по указанию Клиента.',
        'Удаление Приложения сразу удаляет все его данные на телефоне.',
      ] },
      { h: '14. Ваши права', list: [
        'Узнать, какие данные о вас обрабатываются, потребовать их исправления или удаления, отозвать согласие на сбор места при учёте рабочего времени.',
        'Сначала обратитесь к администратору LeadDrive CRM вашего работодателя: аккаунтом и данными управляет он.',
        `Можно написать и оператору: ${E}, ${P}. Мы ответим вместе с Клиентом в течение 10 рабочих дней.`,
      ] },
      { h: '15. Дети', p: ['Приложение не предназначено для лиц младше 18 лет и сознательно не собирает их данные.'] },
      { h: '16. Изменения', p: ['При обновлении политики на этой странице указывается новая дата. О существенных изменениях Клиенты уведомляются заранее.'] },
    ],
  },
  en: {
    title: 'LeadDrive Route Field Privacy Policy — LeadDrive CRM',
    description: 'What data the LeadDrive Route Field mobile app processes: location during the workday, visit photos and signatures, work records; who sees it, where and how long it is kept, and how to delete it.',
    label: 'Mobile app privacy',
    h1: 'LeadDrive Route Field mobile app privacy policy',
    intro: 'This policy applies to the LeadDrive Route Field app for Android (package com.mtmobileapp, the “App”) and follows the Law of the Republic of Azerbaijan “On Personal Data” (11 May 2010, No. 998-IIIQ). The App is for field employees of companies that use LeadDrive CRM and for their managers. The employer company (the “Customer”) decides which data is processed; the operator runs the App and its servers under the contract with the Customer and on its instructions.',
    updated: '2026-10-18',
    sections: [
      { h: '1. Account and sign-in', list: [
        'There is no sign-up in the App: the Customer’s administrator creates the account in LeadDrive CRM. The App processes the employee’s name, email address or phone number, role and company.',
        'You sign in with your email or phone number and a password. On the first sign-in, and if you forget the password, a 6-digit code is sent to the WhatsApp of the number your company has on file; with the code you set your own password.',
        'The sign-in token is stored on the phone. The password is not stored on the phone.',
      ] },
      { h: '2. Location', list: [
        'Precise GPS points are collected only during an open workday: after you tap “Start workday”. During that time collection continues even when the App is closed or not in use (in the background), and a notification is shown the whole time (on Android 13 and later, once you allow notifications).',
        'So that recording resumes by itself after the phone restarts or the App updates, the App asks for “Allow all the time” (background location). Before asking, the Today screen explains what is collected and why. You may refuse: then, after a restart, recording continues only once you open the App.',
        'Collection stops during a “Break”, when you tap “End day” and when you sign out. The server refuses a point taken during a break. Location is not collected outside the workday.',
        'Checking in to and out of a visit records the coordinates of that moment.',
        'If the Customer has turned on time and attendance: the place where your workday starts and ends is sent only with your separate consent to the organisation’s approved text. You can withdraw that consent in the App at any time; your time is recorded without the place too. The phone’s “mock location” flag is sent with the point.',
        'Managers see their team’s location on a map according to their roles. A manager’s own location is sent only when they tap “Share my location”, as a single point.',
        'Location is used to confirm the route, visits and working time to the Customer. It is not used for advertising.',
      ] },
      { h: '3. Camera: photos and QR codes', list: [
        'Photos are taken only during a visit, with the App’s own camera. Each photo is stamped with the date, time, coordinates and employee.',
        'For time and attendance the camera reads the branch’s QR code. The image is processed on the phone and not kept; only the code’s content is sent to the server.',
        'The App does not request access to the phone’s gallery or files.',
      ] },
      { h: '4. Customer signature', p: ['During a visit the customer can sign on the screen. The App keeps the strokes of the signature, the signer’s name if entered, and the time, and sends them with the visit.'] },
      { h: '5. Work records', p: ['Routes, visits, notes, tasks and their results; requests for a new doctor or a change to a contact record; time and attendance requests and explanations; manager messages to the team and read confirmations; the customer and contact records the employee views or edits (name, phone, address). This data belongs to the Customer’s CRM.'] },
      { h: '6. Notifications', p: ['Visit and task reminders and manager messages are delivered through Google Firebase Cloud Messaging. For this the phone’s notification address (token) and the Firebase installation ID are sent to the server and to Google.'] },
      { h: '7. Device and diagnostics', list: [
        'An installation identifier generated by the App, to check that the account is used from a known device.',
        'Network state, to keep actions on the phone while offline and send them later.',
        'Crash reports and performance traces go to the Sentry service without IP address, cookies or request contents, tagged only with the employee and company identifiers.',
        'When a QR code is read, Google ML Kit sends Google the device model, Android version, App version and speed metrics for diagnostics; the image is not sent.',
      ] },
      { h: '8. What the App does not collect', p: ['Phone contacts, SMS, calls, calendar, microphone, gallery and files, advertising ID. The App shows no ads; data is not sold or shared for advertising.'] },
      { h: '9. Permissions', list: [
        'Location (precise and approximate) — route and visit check-ins during the workday.',
        'Background location (“Allow all the time”) — keep recording the workday while the App is closed and resume it after the phone restarts.',
        'Foreground service (location) — GPS recording with a notification during the workday.',
        'Run at startup — to resume recording an open workday; if the workday is closed, nothing starts.',
        'Request to ignore battery optimisation — so Android does not stop recording on a stationary phone; the employee decides.',
        'Notifications — reminders, manager messages and the workday notification.',
        'Camera — visit photos and QR codes.',
        'Internet and network state — sync and offline mode.',
      ] },
      { h: '10. Who sees the data', list: [
        'The Customer’s authorised users (managers, administrators), according to their roles in LeadDrive CRM.',
        'The operator’s staff, only for support and to perform the contract.',
        'Contabo GmbH — server hosting (European Union).',
        'Functional Software, Inc. (Sentry) — crash reports, stored in the EU region (Germany).',
        'Google LLC — notification delivery (Firebase Cloud Messaging) and QR scanner diagnostics (ML Kit).',
        'Meta Platforms (WhatsApp) — delivering the sign-in code to your WhatsApp number.',
        'CARTO — on map screens the map images load from CARTO servers; CARTO sees the device IP address and the map area being loaded.',
        'Data is not shared with other third parties except where the law requires it.',
      ] },
      { h: '11. Retention', list: [
        'The servers are located in the European Union, so data is transferred outside the Republic of Azerbaijan; informing employees about this and ensuring a legal basis is the Customer’s responsibility.',
        'Raw GPS points are deleted automatically after 30 days.',
        'Visits, photos, signatures, tasks and other work records are kept while the contract with the Customer is in force and as the Customer instructs; when it ends they are deleted or returned to the Customer under its terms.',
        'Unsent actions stay on the phone until they sync. Uninstalling the App deletes all of its data on the phone.',
      ] },
      { h: '12. Security', p: ['The App talks to the server over HTTPS only. On the server each company’s data is separated at the database level, access is limited by roles, and actions are written to an audit log.'] },
      { id: 'delete', h: '13. Deleting your account and data', list: [
        'The Customer creates the account, so the Customer’s administrator deletes or closes it in LeadDrive CRM. Contact them first.',
        `You can also write to the operator: ${E}. Include the company name and the email or phone number of your account. We answer together with the Customer within 10 business days.`,
        'Deletion removes the account, the sign-in data and the notification addresses. Raw GPS points are deleted after 30 days in any case. Visit records, photos, signatures and time records belong to the Customer’s CRM: records the law requires to be kept (for example, working time records) are kept until that period ends, the rest are deleted on the Customer’s instruction.',
        'Uninstalling the App deletes all of its data on the phone at once.',
      ] },
      { h: '14. Your rights', list: [
        'Learn what data about you is processed, request its correction or deletion, and withdraw your consent to the place being collected for time and attendance.',
        'Contact your employer’s LeadDrive CRM administrator first: they manage your account and data.',
        `You can also write to the operator: ${E}, ${P}. We answer together with the Customer within 10 business days.`,
      ] },
      { h: '15. Children', p: ['The App is not intended for persons under 18 and does not knowingly collect their data.'] },
      { h: '16. Changes', p: ['When the policy is updated, the new date is shown on this page. Customers are told about significant changes in advance.'] },
    ],
  },
};
