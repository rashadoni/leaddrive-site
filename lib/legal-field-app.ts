import type { Lang } from './product-map';
import { COMPANY } from './company';
import type { LegalCopy } from './legal-copy';

/**
 * Privacy policy of the LeadDrive Route Field Android app (package
 * com.mtmobileapp). Google Play requires a policy that names the app and its
 * sensitive data; the site policy covers only the demo form.
 *
 * Every statement here was checked against the app and server code on
 * 2026-09-14: location only during a confirmed, unpaused workday
 * (runtime/AndroidApp.tsx), raw GPS pruned after 30 days (cron mtm-cleanup),
 * crash reports to Sentry's EU region with sendDefaultPii off, map tiles from
 * CARTO, no ACCESS_BACKGROUND_LOCATION and no advertising ID in the manifest.
 * Change the app, re-check the text.
 */
const E = COMPANY.email;
const P = COMPANY.phone;

export const FIELD_APP_PRIVACY: Record<Lang, LegalCopy> = {
  az: {
    title: 'LeadDrive Route Field məxfilik siyasəti — LeadDrive CRM',
    description: 'LeadDrive Route Field mobil tətbiqi hansı məlumatları emal edir: iş günü ərzində yer, ziyarət fotoları, iş qeydləri; kim görür, harada və nə qədər saxlanılır.',
    label: 'Mobil tətbiq: məxfilik',
    h1: 'LeadDrive Route Field mobil tətbiqinin məxfilik siyasəti',
    intro: 'Bu siyasət Android üçün LeadDrive Route Field tətbiqinə (paket com.mtmobileapp, bundan sonra «Tətbiq») aiddir və Azərbaycan Respublikasının «Fərdi məlumatlar haqqında» Qanununa (11 may 2010-cu il, № 998-IIIQ) uyğun tərtib edilib. Tətbiq LeadDrive CRM istifadə edən şirkətlərin səyyar əməkdaşları üçündür. Hansı məlumatların emal olunmasını işəgötürən şirkət (bundan sonra «Müştəri») müəyyən edir; operator Tətbiqi və serverləri Müştəri ilə bağlanmış müqavilə əsasında və onun tapşırığı ilə işlədir.',
    updated: '2026-09-14',
    sections: [
      { h: '1. Hesab', p: ['Tətbiqdə qeydiyyat yoxdur: hesabı Müştərinin administratoru LeadDrive CRM-də yaradır. Tətbiq əməkdaşın adını, istifadəçi adını və ya e-poçtunu, rolunu və şirkətini emal edir. Giriş tokeni telefonda saxlanılır.'] },
      { h: '2. Yer məlumatı', list: [
        'Dəqiq GPS nöqtələri yalnız aktiv iş günü ərzində toplanır: siz «İş gününü başlat» düyməsinə toxunduqdan sonra. Bu vaxt ərzində bildiriş daim görünür.',
        '«Fasilə» zamanı, «Günü bitir» düyməsinə toxunduqda və hesabdan çıxdıqda toplama dayanır.',
        'Ziyarətə giriş və çıxış qeyd olunanda həmin anın koordinatları yazılır.',
        'Tətbiq fon rejimində yer icazəsi (ACCESS_BACKGROUND_LOCATION) istəmir və iş günündən kənar yer toplamır.',
        'Yer məlumatı marşrutu və ziyarətləri Müştəriyə təsdiqləmək üçündür.',
      ] },
      { h: '3. Fotolar', p: ['Fotolar yalnız ziyarət zamanı Tətbiqin öz kamerası ilə çəkilir. Hər foto üzərinə tarix, vaxt, koordinatlar və əməkdaş qeyd olunur. Tətbiq telefonun qalereyasına və fayllarına çıxış istəmir.'] },
      { h: '4. İş qeydləri', p: ['Marşrutlar, ziyarətlər, qeydlər, tapşırıqlar və onların nəticələri, həmçinin əməkdaşın baxdığı və ya dəyişdiyi müştəri və kontakt kartları (ad, telefon, ünvan). Bu məlumatlar Müştərinin CRM-inə aiddir.'] },
      { h: '5. Cihaz və diaqnostika', list: [
        'Tətbiqin özünün yaratdığı quraşdırma identifikatoru — hesabın tanış cihazdan istifadə edildiyini yoxlamaq üçün.',
        'Bağlantı vəziyyəti — internet olmadıqda əməliyyatları telefonda saxlayıb sonra göndərmək üçün.',
        'Çökmə hesabatları və performans ölçmələri Sentry xidmətinə göndərilir: IP ünvanı, cookie və sorğuların məzmunu olmadan, yalnız əməkdaş və şirkət identifikatoru ilə.',
      ] },
      { h: '6. Tətbiqin toplamadıqları', p: ['Telefonun kontaktları, SMS, zənglər, təqvim, mikrofon, qalereya və fayllar, reklam identifikatoru. Tətbiqdə reklam yoxdur, məlumatlar satılmır və reklam məqsədilə ötürülmür.'] },
      { h: '7. İcazələr', list: [
        'Yer (dəqiq və təxmini) — iş günü ərzində marşrut və ziyarət qeydləri.',
        'Ön plan xidməti (yer) — iş günü ərzində bildirişlə işləyən GPS qeydi.',
        'Kamera — ziyarət fotoları.',
        'İnternet və şəbəkə vəziyyəti — sinxronizasiya və oflayn rejim.',
      ] },
      { h: '8. Məlumatları kim görür', list: [
        'Müştərinin səlahiyyətli istifadəçiləri (rəhbərlər, administratorlar) — LeadDrive CRM-dəki rollarına uyğun.',
        'Operatorun əməkdaşları — yalnız dəstək və müqavilə üzrə öhdəliklər üçün.',
        'Contabo GmbH — serverlərin hostinqi (Avropa İttifaqı).',
        'Functional Software, Inc. (Sentry) — çökmə hesabatları, məlumatlar Aİ regionunda (Almaniya) saxlanılır.',
        'CARTO — «GPS tarixçəm» ekranında xəritə şəkilləri CARTO serverlərindən yüklənir; CARTO cihazın IP ünvanını və yüklənən xəritə sahəsini görür.',
        'Məlumatlar qanunla tələb olunan hallar istisna olmaqla başqa üçüncü şəxslərə ötürülmür.',
      ] },
      { h: '9. Saxlama', list: [
        'Serverlər Avropa İttifaqında yerləşir. Deməli, məlumatlar Azərbaycan Respublikasından kənara ötürülür; bu barədə əməkdaşları məlumatlandırmaq və hüquqi əsası təmin etmək Müştərinin öhdəliyidir.',
        'Xam GPS nöqtələri 30 gündən sonra avtomatik silinir.',
        'Ziyarətlər, fotolar, tapşırıqlar və digər iş qeydləri Müştəri ilə müqavilə qüvvədə olduğu müddətdə və Müştərinin göstərişinə uyğun saxlanılır; müqavilə bitdikdə müqavilənin şərtlərinə görə silinir və ya Müştəriyə qaytarılır.',
        'Göndərilməmiş əməliyyatlar telefonda sinxronizasiyaya qədər saxlanılır. Tətbiqi silmək telefondakı bütün məlumatlarını silir.',
      ] },
      { h: '10. Təhlükəsizlik', p: ['Tətbiq serverlə yalnız HTTPS üzərində əlaqə saxlayır. Serverdə hər şirkətin məlumatları verilənlər bazası səviyyəsində ayrılır, çıxış rollarla məhdudlaşır və əməliyyatlar audit jurnalına yazılır.'] },
      { h: '11. Hüquqlarınız', list: [
        'Sizin haqqınızda hansı məlumatların emal olunduğunu öyrənmək, onların düzəldilməsini və ya silinməsini tələb etmək.',
        'Əvvəlcə işəgötürəninizin LeadDrive CRM administratoruna müraciət edin: hesabı və məlumatları o idarə edir.',
        `Operatora da yaza bilərsiniz: ${E}, ${P}. Müraciəti Müştəri ilə birlikdə 10 iş günü ərzində cavablandırırıq.`,
      ] },
      { h: '12. Uşaqlar', p: ['Tətbiq 18 yaşına çatmamış şəxslər üçün deyil və onların məlumatlarını bilərəkdən toplamır.'] },
      { h: '13. Dəyişikliklər', p: ['Siyasət yeniləndikdə bu səhifədə yeni tarix göstərilir. Əhəmiyyətli dəyişikliklər barədə Müştərilərə əvvəlcədən məlumat verilir.'] },
    ],
  },
  ru: {
    title: 'Политика конфиденциальности LeadDrive Route Field — LeadDrive CRM',
    description: 'Какие данные обрабатывает мобильное приложение LeadDrive Route Field: местоположение в рабочий день, фото визитов, рабочие записи; кто их видит, где и сколько они хранятся.',
    label: 'Мобильное приложение: конфиденциальность',
    h1: 'Политика конфиденциальности мобильного приложения LeadDrive Route Field',
    intro: 'Политика относится к приложению LeadDrive Route Field для Android (пакет com.mtmobileapp, далее «Приложение») и составлена в соответствии с Законом Азербайджанской Республики «О персональных данных» (от 11 мая 2010 г., № 998-IIIQ). Приложение предназначено для полевых сотрудников компаний, работающих в LeadDrive CRM. Какие данные обрабатываются, определяет компания-работодатель (далее «Клиент»); оператор обеспечивает работу Приложения и серверов по договору с Клиентом и по его поручению.',
    updated: '2026-09-14',
    sections: [
      { h: '1. Аккаунт', p: ['Регистрации в Приложении нет: аккаунт создаёт администратор Клиента в LeadDrive CRM. Приложение обрабатывает имя сотрудника, логин или адрес электронной почты, роль и компанию. Токен входа хранится на телефоне.'] },
      { h: '2. Местоположение', list: [
        'Точные GPS-точки собираются только во время активного рабочего дня: после того как вы нажали «Начать рабочий день». Всё это время на экране видно уведомление.',
        'Сбор останавливается на «Перерыве», по кнопке «Завершить день» и при выходе из аккаунта.',
        'При отметке входа на визит и выхода с него записываются координаты этого момента.',
        'Приложение не запрашивает разрешение на фоновое местоположение (ACCESS_BACKGROUND_LOCATION) и не собирает местоположение вне рабочего дня.',
        'Местоположение нужно, чтобы подтвердить Клиенту маршрут и визиты.',
      ] },
      { h: '3. Фотографии', p: ['Фото делаются только во время визита, собственной камерой Приложения. На каждое фото наносятся дата, время, координаты и сотрудник. Доступа к галерее и файлам телефона Приложение не запрашивает.'] },
      { h: '4. Рабочие записи', p: ['Маршруты, визиты, заметки, задачи и их результаты, а также карточки клиентов и контактов, которые сотрудник просматривает или меняет (имя, телефон, адрес). Эти данные принадлежат CRM Клиента.'] },
      { h: '5. Устройство и диагностика', list: [
        'Идентификатор установки, который создаёт само Приложение, — чтобы проверять, что аккаунт используется с известного устройства.',
        'Состояние сети — чтобы без интернета сохранять действия на телефоне и отправлять их позже.',
        'Отчёты о сбоях и замеры производительности уходят в сервис Sentry: без IP-адреса, cookies и содержимого запросов, только с идентификаторами сотрудника и компании.',
      ] },
      { h: '6. Чего Приложение не собирает', p: ['Контакты телефона, SMS, звонки, календарь, микрофон, галерею и файлы, рекламный идентификатор. В Приложении нет рекламы, данные не продаются и не передаются для рекламы.'] },
      { h: '7. Разрешения', list: [
        'Местоположение (точное и приблизительное) — маршрут и отметки визитов в рабочий день.',
        'Сервис переднего плана (местоположение) — запись GPS с уведомлением во время рабочего дня.',
        'Камера — фото визитов.',
        'Интернет и состояние сети — синхронизация и офлайн-режим.',
      ] },
      { h: '8. Кто видит данные', list: [
        'Уполномоченные пользователи Клиента (руководители, администраторы) — в соответствии с их ролями в LeadDrive CRM.',
        'Сотрудники оператора — только для поддержки и исполнения договора.',
        'Contabo GmbH — хостинг серверов (Европейский союз).',
        'Functional Software, Inc. (Sentry) — отчёты о сбоях, данные хранятся в регионе ЕС (Германия).',
        'CARTO — на экране «Мой GPS» изображения карты загружаются с серверов CARTO; CARTO видит IP-адрес устройства и загружаемый участок карты.',
        'Другим третьим лицам данные не передаются, кроме случаев, предусмотренных законом.',
      ] },
      { h: '9. Хранение', list: [
        'Серверы находятся в Европейском союзе. То есть данные передаются за пределы Азербайджанской Республики; уведомить об этом сотрудников и обеспечить правовое основание — обязанность Клиента.',
        'Сырые GPS-точки автоматически удаляются через 30 дней.',
        'Визиты, фото, задачи и другие рабочие записи хранятся, пока действует договор с Клиентом, и по его указаниям; после окончания договора удаляются или возвращаются Клиенту по его условиям.',
        'Неотправленные действия хранятся на телефоне до синхронизации. Удаление Приложения удаляет все его данные на телефоне.',
      ] },
      { h: '10. Безопасность', p: ['Приложение обменивается данными с сервером только по HTTPS. На сервере данные каждой компании разделены на уровне базы данных, доступ ограничен ролями, действия записываются в журнал аудита.'] },
      { h: '11. Ваши права', list: [
        'Узнать, какие данные о вас обрабатываются, потребовать их исправления или удаления.',
        'Сначала обратитесь к администратору LeadDrive CRM вашего работодателя: аккаунтом и данными управляет он.',
        `Можно написать и оператору: ${E}, ${P}. Мы ответим вместе с Клиентом в течение 10 рабочих дней.`,
      ] },
      { h: '12. Дети', p: ['Приложение не предназначено для лиц младше 18 лет и сознательно не собирает их данные.'] },
      { h: '13. Изменения', p: ['При обновлении политики на этой странице указывается новая дата. О существенных изменениях Клиенты уведомляются заранее.'] },
    ],
  },
  en: {
    title: 'LeadDrive Route Field Privacy Policy — LeadDrive CRM',
    description: 'What data the LeadDrive Route Field mobile app processes: location during the workday, visit photos and work records; who sees it, where and how long it is kept.',
    label: 'Mobile app privacy',
    h1: 'LeadDrive Route Field mobile app privacy policy',
    intro: 'This policy applies to the LeadDrive Route Field app for Android (package com.mtmobileapp, the “App”) and follows the Law of the Republic of Azerbaijan “On Personal Data” (11 May 2010, No. 998-IIIQ). The App is for field employees of companies that use LeadDrive CRM. The employer company (the “Customer”) decides which data is processed; the operator runs the App and its servers under the contract with the Customer and on its instructions.',
    updated: '2026-09-14',
    sections: [
      { h: '1. Account', p: ['There is no sign-up in the App: the Customer’s administrator creates the account in LeadDrive CRM. The App processes the employee’s name, username or email address, role and company. The sign-in token is stored on the phone.'] },
      { h: '2. Location', list: [
        'Precise GPS points are collected only during an active workday: after you tap “Start workday”. A notification stays visible the whole time.',
        'Collection stops during a “Break”, when you tap “End day” and when you sign out.',
        'Checking in to and out of a visit records the coordinates of that moment.',
        'The App does not request background location permission (ACCESS_BACKGROUND_LOCATION) and does not collect location outside the workday.',
        'Location is used to confirm the route and visits to the Customer.',
      ] },
      { h: '3. Photos', p: ['Photos are taken only during a visit, with the App’s own camera. Each photo is stamped with the date, time, coordinates and employee. The App does not request access to the phone’s gallery or files.'] },
      { h: '4. Work records', p: ['Routes, visits, notes, tasks and their results, and the customer and contact records the employee views or edits (name, phone, address). This data belongs to the Customer’s CRM.'] },
      { h: '5. Device and diagnostics', list: [
        'An installation identifier generated by the App, to check that the account is used from a known device.',
        'Network state, to keep actions on the phone while offline and send them later.',
        'Crash reports and performance traces go to the Sentry service without IP address, cookies or request contents, tagged only with the employee and company identifiers.',
      ] },
      { h: '6. What the App does not collect', p: ['Phone contacts, SMS, calls, calendar, microphone, gallery and files, advertising ID. The App shows no ads; data is not sold or shared for advertising.'] },
      { h: '7. Permissions', list: [
        'Location (precise and approximate) — route and visit check-ins during the workday.',
        'Foreground service (location) — GPS recording with a notification during the workday.',
        'Camera — visit photos.',
        'Internet and network state — sync and offline mode.',
      ] },
      { h: '8. Who sees the data', list: [
        'The Customer’s authorised users (managers, administrators), according to their roles in LeadDrive CRM.',
        'The operator’s staff, only for support and to perform the contract.',
        'Contabo GmbH — server hosting (European Union).',
        'Functional Software, Inc. (Sentry) — crash reports, stored in the EU region (Germany).',
        'CARTO — on the My GPS screen map images load from CARTO servers; CARTO sees the device IP address and the map area being loaded.',
        'Data is not shared with other third parties except where the law requires it.',
      ] },
      { h: '9. Retention', list: [
        'The servers are located in the European Union, so data is transferred outside the Republic of Azerbaijan; informing employees about this and ensuring a legal basis is the Customer’s responsibility.',
        'Raw GPS points are deleted automatically after 30 days.',
        'Visits, photos, tasks and other work records are kept while the contract with the Customer is in force and as the Customer instructs; when it ends they are deleted or returned to the Customer under its terms.',
        'Unsent actions stay on the phone until they sync. Uninstalling the App deletes all of its data on the phone.',
      ] },
      { h: '10. Security', p: ['The App talks to the server over HTTPS only. On the server each company’s data is separated at the database level, access is limited by roles, and actions are written to an audit log.'] },
      { h: '11. Your rights', list: [
        'Learn what data about you is processed and request its correction or deletion.',
        'Contact your employer’s LeadDrive CRM administrator first: they manage your account and data.',
        `You can also write to the operator: ${E}, ${P}. We answer together with the Customer within 10 business days.`,
      ] },
      { h: '12. Children', p: ['The App is not intended for persons under 18 and does not knowingly collect their data.'] },
      { h: '13. Changes', p: ['When the policy is updated, the new date is shown on this page. Customers are told about significant changes in advance.'] },
    ],
  },
};
