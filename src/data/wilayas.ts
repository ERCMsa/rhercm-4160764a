export interface Wilaya {
  code: string;
  nom_fr: string;
  nom_ar: string;
  communes: string[];
}

export const WILAYAS_DATA: Wilaya[] = [
  { code: '01', nom_fr: 'Adrar', nom_ar: 'أدرار', communes: ['أدرار', 'تيميمون', 'برج باجي مختار', 'المنيعة'] },
  { code: '02', nom_fr: 'Chlef', nom_ar: 'الشلف', communes: ['الشلف', 'تنس', 'أبو الحسن'] },
  { code: '03', nom_fr: 'Laghouat', nom_ar: 'الأغواط', communes: ['الأغواط', 'آفلو', 'عين ماضي'] },
  { code: '04', nom_fr: 'Oum El Bouaghi', nom_ar: 'أم البواقي', communes: ['أم البواقي', 'عين البيضاء', 'عين مليلة'] },
  { code: '05', nom_fr: 'Batna', nom_ar: 'باتنة', communes: ['باتنة', 'بريكة', 'مروانة'] },
  { code: '06', nom_fr: 'Béjaïa', nom_ar: 'بجاية', communes: ['بجاية', 'أكبو', 'أميزور'] },
  { code: '07', nom_fr: 'Biskra', nom_ar: 'بسكرة', communes: ['بسكرة', 'طولقة', 'أورلال'] },
  { code: '08', nom_fr: 'Béchar', nom_ar: 'بشار', communes: ['بشار', 'القنادسة', 'بني ونيف'] },
  { code: '09', nom_fr: 'Blida', nom_ar: 'البليدة', communes: ['البليدة', 'العفرون', 'موزاية'] },
  { code: '10', nom_fr: 'Bouira', nom_ar: 'البويرة', communes: ['البويرة', 'القادرية', 'الأخضرية'] },
  { code: '11', nom_fr: 'Tamanrasset', nom_ar: 'تمنراست', communes: ['تمنراست', 'عين صالح', 'تينزاواتين'] },
  { code: '12', nom_fr: 'Tébessa', nom_ar: 'تبسة', communes: ['تبسة', 'الشريعة', 'العوينات'] },
  { code: '13', nom_fr: 'Tlemcen', nom_ar: 'تلمسان', communes: ['تلمسان', 'مغنية', 'هنين'] },
  { code: '14', nom_fr: 'Tiaret', nom_ar: 'تيارت', communes: ['تيارت', 'السوقر', 'مادنة'] },
  { code: '15', nom_fr: 'Tizi Ouzou', nom_ar: 'تيزي وزو', communes: ['تيزي وزو', 'ذراع بن خدة', 'عزازقة'] },
  { code: '16', nom_fr: 'Alger', nom_ar: 'الجزائر', communes: ['الجزائر الوسطى', 'سيدي امحمد', 'المدنية', 'بلوزداد', 'باب الواد', 'بولوغين', 'القصبة', 'وادي قريش', 'بئر مراد رايس', 'الأبيار', 'بوزريعة', 'بئر خادم', 'الحراش', 'براقي', 'وادي السمار', 'باش جراح', 'حسين داي', 'القبة', 'بوروبة', 'الدار البيضاء', 'باب الزوار', 'بن عكنون', 'دالي إبراهيم', 'الحمامات', 'الرايس حميدو', 'جسر قسنطينة', 'المرادية', 'حيدرة', 'المحمدية', 'برج الكيفان', 'المغارية', 'بني مسوس', 'الأوكاليبتوس', 'بئر التوتة', 'تسالة المرجة', 'أولاد شبل', 'سيدي موسى', 'عين طاية', 'برج البحري', 'المرسى', 'حراوة', 'الرويبة', 'الرغاية', 'عين البنيان', 'سطاوالي', 'زرالدة', 'المحالمة', 'سويدانية', 'الرحمانية', 'عين تاقورايت', 'الشراقة', 'الدويرة', 'بابا حسن', 'خرايسية', 'الساولة', 'الدرارية', 'العاشور', 'أولاد فايت'] },
  { code: '17', nom_fr: 'Djelfa', nom_ar: 'الجلفة', communes: ['الجلفة', 'عين وسارة', 'مسعد'] },
  { code: '18', nom_fr: 'Jijel', nom_ar: 'جيجل', communes: ['جيجل', 'الطاهير', 'الميلية'] },
  { code: '19', nom_fr: 'Sétif', nom_ar: 'سطيف', communes: ['سطيف', 'العلمة', 'عين ولمان'] },
  { code: '20', nom_fr: 'Saïda', nom_ar: 'سعيدة', communes: ['سعيدة', 'عين الحجر', 'سيدي عمار'] },
  { code: '21', nom_fr: 'Skikda', nom_ar: 'سكيكدة', communes: ['سكيكدة', 'القل', 'عين بوزيان'] },
  { code: '22', nom_fr: 'Sidi Bel Abbès', nom_ar: 'سيدي بلعباس', communes: ['سيدي بلعباس', 'تلاغ', 'سفيزف'] },
  { code: '23', nom_fr: 'Annaba', nom_ar: 'عنابة', communes: ['عنابة', 'البوني', 'سرايدي'] },
  { code: '24', nom_fr: 'Guelma', nom_ar: 'قالمة', communes: ['قالمة', 'بوشقوف', 'هيليوبوليس'] },
  { code: '25', nom_fr: 'Constantine', nom_ar: 'قسنطينة', communes: ['قسنطينة', 'الخروب', 'عين سمارة'] },
  { code: '26', nom_fr: 'Médéa', nom_ar: 'المدية', communes: ['المدية', 'البرواقية', 'قصر البخاري'] },
  { code: '27', nom_fr: 'Mostaganem', nom_ar: 'مستغانم', communes: ['مستغانم', 'عين تادلس', 'خير الدين'] },
  { code: '28', nom_fr: "M'Sila", nom_ar: 'المسيلة', communes: ['المسيلة', 'بوسعادة', 'عين الحجل'] },
  { code: '29', nom_fr: 'Mascara', nom_ar: 'معسكر', communes: ['معسكر', 'المحمدية', 'بوحنيفية'] },
  { code: '30', nom_fr: 'Ouargla', nom_ar: 'ورقلة', communes: ['ورقلة', 'تقرت', 'الرويسات'] },
  { code: '31', nom_fr: 'Oran', nom_ar: 'وهران', communes: ['وهران', 'بئر الجير', 'السانية', 'قديل', 'مرسى الكبير', 'عين الترك', 'بطيوة', 'أرزيو', 'وادي تليلات', 'بوتليليس', 'مسير', 'عين الكرمة', 'عين البية', 'بن فريحة', 'طفراوي', 'العامرية', 'البرية', 'حاسي بن عقبة', 'حاسي بونيف', 'الكرمة', 'سيدي الشحمي', 'عين العز', 'مسرغين'] },
  { code: '32', nom_fr: 'El Bayadh', nom_ar: 'البيض', communes: ['البيض', 'بوقطب', 'الأبيض سيدي الشيخ'] },
  { code: '33', nom_fr: 'Illizi', nom_ar: 'إليزي', communes: ['إليزي', 'جانت', 'برج عمر إدريس'] },
  { code: '34', nom_fr: 'Bordj Bou Arréridj', nom_ar: 'برج بوعريريج', communes: ['برج بوعريريج', 'رأس الوادي', 'المنصورة'] },
  { code: '35', nom_fr: 'Boumerdès', nom_ar: 'بومرداس', communes: ['بومرداس', 'بغلية', 'رأس جنات', 'دلس', 'زموري', 'برج منايل', 'الثنية', 'قورصو', 'أولاد موسى', 'بودواو', 'الكرمة', 'سيدي داود', 'جنات', 'يسر', 'حمادي', 'أولاد هداج', 'الناصرية', 'تيجلابين', 'خميس الخشنة', 'الأربعطاش', 'سوق الحد', 'عمّال', 'أعفير', 'تاورقة', 'بني عمران', 'شعبة العامر', 'بوزقزة', 'جيني', 'سيدي عيسى', 'حدود', 'تاقزو', 'الخروبة'] },
  { code: '36', nom_fr: 'El Tarf', nom_ar: 'الطارف', communes: ['الطارف', 'القالة', 'بوثلجة'] },
  { code: '37', nom_fr: 'Tindouf', nom_ar: 'تندوف', communes: ['تندوف', 'أم العسل'] },
  { code: '38', nom_fr: 'Tissemsilt', nom_ar: 'تسمسيلت', communes: ['تسمسيلت', 'ثنية الحد', 'برج بونعامة'] },
  { code: '39', nom_fr: 'El Oued', nom_ar: 'الوادي', communes: ['الوادي', 'قمار', 'الرباح'] },
  { code: '40', nom_fr: 'Khenchela', nom_ar: 'خنشلة', communes: ['خنشلة', 'عين الطويلة', 'ششار'] },
  { code: '41', nom_fr: 'Souk Ahras', nom_ar: 'سوق أهراس', communes: ['سوق أهراس', 'المشروحة', 'الحدادة'] },
  { code: '42', nom_fr: 'Tipaza', nom_ar: 'تيبازة', communes: ['تيبازة', 'الشعيبة', 'مناصر', 'الزبوجة', 'شرشال', 'القليعة'] },
  { code: '43', nom_fr: 'Mila', nom_ar: 'ميلة', communes: ['ميلة', 'الرواشد', 'تلاغمة'] },
  { code: '44', nom_fr: 'Aïn Defla', nom_ar: 'عين الدفلى', communes: ['عين الدفلى', 'الخميس', 'العبادية'] },
  { code: '45', nom_fr: 'Naâma', nom_ar: 'النعامة', communes: ['النعامة', 'مشرية', 'عين الصفراء'] },
  { code: '46', nom_fr: 'Aïn Témouchent', nom_ar: 'عين تيموشنت', communes: ['عين تيموشنت', 'حمّام بوحجر', 'ولهاصة'] },
  { code: '47', nom_fr: 'Ghardaïa', nom_ar: 'غرداية', communes: ['غرداية', 'القرارة', 'متليلي'] },
  { code: '48', nom_fr: 'Relizane', nom_ar: 'غليزان', communes: ['غليزان', 'مازونة', 'وادي ارهيو'] },
  { code: '49', nom_fr: 'Timimoun', nom_ar: 'تيميمون', communes: ['تيميمون', 'توقرت', 'بني عباس'] },
  { code: '50', nom_fr: 'Bordj Badji Mokhtar', nom_ar: 'برج باجي مختار', communes: ['برج باجي مختار', 'تيمياوين'] },
  { code: '51', nom_fr: 'Ouled Djellal', nom_ar: 'أولاد جلال', communes: ['أولاد جلال', 'الشرفة', 'الدوائر'] },
  { code: '52', nom_fr: 'Béni Abbès', nom_ar: 'بني عباس', communes: ['بني عباس', 'إقلي', 'الواتة'] },
  { code: '53', nom_fr: 'In Salah', nom_ar: 'عين صالح', communes: ['عين صالح', 'فقارة الزوى', 'إنغر'] },
  { code: '54', nom_fr: 'In Guezzam', nom_ar: 'عين قزام', communes: ['عين قزام', 'تين زاواتين'] },
  { code: '55', nom_fr: 'Touggourt', nom_ar: 'تقرت', communes: ['تقرت', 'النزلة', 'تبسبست'] },
  { code: '56', nom_fr: 'Djanet', nom_ar: 'جانت', communes: ['جانت', 'برج الحواس'] },
  { code: '57', nom_fr: "El M'Ghair", nom_ar: 'المغير', communes: ['المغير', 'جامعة', 'سيدي عمران'] },
  { code: '58', nom_fr: 'El Meniaa', nom_ar: 'المنيعة', communes: ['المنيعة', 'حاسي القارة', 'حاسي لفحل'] },
];

export function getCommunesByWilaya(wilayaAr: string): string[] {
  const wilaya = WILAYAS_DATA.find(w => w.nom_ar === wilayaAr);
  return wilaya?.communes ?? [];
}
