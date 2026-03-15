import type { Worker } from "@/lib/supabase-helpers";
import logoErcm from "@/assets/logo-ercm.png";

interface Props {
  worker: Worker;
  data: Record<string, string>;
}

function D({ value }: { value?: string | null }) {
  return (
    <span style={{ fontWeight: "bold", color: "#000", borderBottom: "1px dotted #000", padding: "0 5px", minWidth: 40, display: "inline-block" }}>
      {value || "................"}
    </span>
  );
}

export default function ContractPreview({ worker, data }: Props) {
  const pageStyle: React.CSSProperties = {
    width: "210mm",
    minHeight: "297mm",
    background: "white",
    padding: "20mm 20mm",
    fontFamily: "'Amiri', 'Times New Roman', serif",
    color: "black",
    lineHeight: 1.6,
    direction: "rtl",
    textAlign: "justify",
    fontSize: "12pt",
    boxShadow: "0 0 15px rgba(0,0,0,0.15)",
    margin: "0 auto",
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <img src={logoErcm} alt="ERCM SA" style={{ maxHeight: 80 }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: 30, borderBottom: "2px solid black", paddingBottom: 10 }}>
        <p style={{ fontWeight: "bold", fontSize: "18pt", margin: 0 }}>ERCMsa</p>
        <p style={{ margin: 0 }}>Etude réalisation construction métallique salhi adel</p>
        <p style={{ fontWeight: "bold", fontSize: "20pt", margin: "10px 0", textDecoration: "underline" }}>عقد عمل لمدة محددة</p>
        <p style={{ fontSize: "12pt", fontWeight: "bold" }}>رقم: <D value={data.num_contrat} /></p>
      </div>

      {/* Préambule */}
      <div style={{ fontSize: "11pt", marginBottom: 15, lineHeight: 1.4 }}>
        <p style={{ margin: "2px 0" }}>بمقتضى القانون رقم 90/11 المؤرخ في 21/04/90 المتعلق بعلاقات العمل المتمم و المعدل.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى القانون رقم 91/29 المؤرخ في 21/12/91 المعدل و المتمم للقانون 90/11 المذكور أعلاه.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى الأمر رقم 96/21 المؤرخ في 09/06/96 المعدل و المتمم للقانون 90/11 المذكور أعلاه.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى الأمر رقم 90/04 المؤرخ في 06/04/90 المتعلق بتسوية النزاعات الفردية المعدل و المتمم بالأمر رقم 91/28 المؤرخ في21/12/91 .</p>
        <p style={{ margin: "2px 0" }}>بمقتضى الامر 97-03 المؤرخ في 11 يناير سنة 1997 يحدد المدة القانونية للعمل.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى المرسوم التنفيذي رقم 59-15 المـؤرخ في 18 ربــيع الــثـاني عام 1436 المـوافـق 8 فبـرايـر سـنة 2015 الــذي يحدد العناصر المكونة للأجر الوطني الأدنى المضمون.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى المرسوم التنـفيذي رقم 15 -177- المؤرخ في 19 رمـضان عام 1436 الموافق 6 يــولـــيــو ســنــة 2015 الذي يــتــمـم المرسوم الــتـنــفــيــذي رقم 59-15 المذكور اعلاه.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى المرسوم الرئاسي رقم 21-137 المؤرخ في 7 أفريل 2021، والصادر في 14 أفريل 2021، الذي يحدد الأجر الوطني الأدنى المضمون.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى المرسوم التنفيذي 63-278 المؤرخ في 26 يوليو 1963 الذي يحدد قائمة الاعياد الرسمية المعدل و المتمم بالقانون رقم 18-12 ا المرخ في 2 يوليو سنة 2018 المعدل و المتمم بالقانون 23/10 المؤرخ 26 يونيو 2023.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى القانون 23-08 الموافق ل 21 يونيو 2023 يتعلق بالوقاية من النزعات الجماعية للعمل وتسويتها و ممارسة حق الاضراب.</p>
        <p style={{ margin: "2px 0" }}>بمقتضى القيد في المركز الوطني لسجل التجاري لولاية بومرداس شخص طبيعي " صالحي عادل" رقم 17 أ 3674152-00/35 بتاريخ 08/03/2022.</p>
      </div>

      <div style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold", fontSize: "16pt" }}>أبـــــــــرم هذا العقــــــــــــــــــــــد ما بين</div>

      {/* Parties */}
      <div style={{ margin: "20px 0", backgroundColor: "#f9f9f9", padding: 15, border: "1px dashed #aaa", fontSize: "12pt" }}>
        <span style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: 5, display: "block" }}>من جهـــــــــة:</span>
        السيد : <strong>صالحي عادل</strong> صاحب مؤسسة دراسة و تركيب المنشئات المعدنية المسماة <strong>ERCMSA</strong> الكائن مقرها سيدي سالم شمال مجموعة 108 قسم رقم 2 اولاد موسى بومرداس.<br />
        الهاتف: 0550575833 . الإمايل : ercmsalhi.com@gmail.com<br />
        رقم الضمان الإجتماعي للمستخدم : 3537638638
      </div>

      <div style={{ margin: "20px 0", backgroundColor: "#f9f9f9", padding: 15, border: "1px dashed #aaa", fontSize: "12pt" }}>
        <span style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: 5, display: "block" }}>من جهــــــــة اخرى:</span>
        و السيد <D value={worker.full_name} /><br />
        المولود في: <D value={data.date_nais || worker.date_naissance} /> بـ : <D value={data.lieu_nais || worker.lieu_naissance} /> ولاية <D value={data.wilaya_nais} /><br />
        الحامل لبطاقة التعريف البيومترية رقم <D value={data.cni} /> الصادرة في <D value={data.date_cni} /> عن بلدية: <D value={data.commune_cni} /> ولاية <D value={data.wilaya_cni} /><br />
        الساكن بـ <D value={data.adresse || worker.address} /> ولاية <D value={data.wilaya_adr} /><br />
        طبقا لبطاقة الاقامة المؤرخة في: <D value={data.date_res} /><br />
        الهاتف : <D value={data.tel || worker.phone} /> الإمايل : <D value={data.email} />
      </div>

      <div style={{ textAlign: "center", margin: "20px 0", fontWeight: "bold", fontSize: "16pt", textDecoration: "underline" }}>تم الاتفــــــــــــــــــــــــــــــــاق على ما يلي</div>

      {/* Articles */}
      <Article title="المادة 01: موضوع العقد">
        يحدد هذا العقد القواعد والشروط التي بموجبها انعقدت علاقة العمل المحددة المدة بالتوقيت الكامل بين الطرفين.
      </Article>

      <Article title="المادة 02 : غاية العقد">
        يوظف: السيد <D value={worker.full_name} /> بعقد محدد المدة بالتوقيت الكامل<br />
        في منصب : <D value={data.poste || worker.position} />
      </Article>

      <Article title="المادة 03 : مدة العقد و سببه.">
        طبقا لنص المادة 12 من قانون العمل 90-11 المعدل و المتمم بالامر 96-21 فان هذا العقد تم إبرامه بمدة محددة بالتوقيت الكامل وذالك لان تقوم بانجاز أشغال ذات مدة محددة على اساس القيام ببناء مستودعات ( اشغال مقاولاتية) منشئات معدنيـــــــة.<br />
        ولهذا السبب ابرم هذا العقد لمدة : ( 12) اثنى عشرة شهرا.<br />
        يبدأ هذا العقد من يوم <D value={data.date_debut} /> ينتهي هذا العقد يوم <D value={data.date_fin} />
      </Article>

      <Article title="المادة 04: المدة التجريبية">
        يخضع المعني لمدة تجريبية قدرها (03) ثلاثة أشهر سارية المفعول ابتداءا من تاريخ ابرام العقد ،و خلال الفترة التجريبية المحددة أعلاه يمكن لأي الطرفين فسخ هذا العقد وإنهاء علاقة العمل دون تعويض أو إشعار مسبق.
      </Article>

      <Article title="المادة 05 :مواقيت العمل">
        يقوم الطرف الثاني بمهامه المنوطة إليه في المواقيت المحددة قانونا.<br />
        المدة القانونية للعمل أربعون (40) ساعة في الأسبوع .<br />
        تتوزع هذه الساعات على خمسة أيام كاملة .<br />
        يستفيد العامل بيومين راحة في الاسبوع – الخميس و الجمعة -<br />
        على العامل احترام مواقيت العمل و الانضباط.<br />
        في حالة الغياب؛ على العامل إخطار المستخدم في اليوم ذاته مبررا غيابه بشهادة طبية مؤشر عليها من طرف صندوق الضمان الاجتماعي أو أي وثيقة أخرى داعمة و إذا تعذر ذلك يرسل تبريره في ظرف 48 ساعة؛<br />
        و خلاف ذلك يتم أعذاره بواسطة رسالة مضمنة الوصول بالعنوان المصرح به من طرف العامل في (شهادة الإقامة) الموجودة بالملف و إذا لم يلتحق بالمنصب خلال 48 ساعة يتم ارسال اعذار ثاني واذ ظل غيابه مستمر و غير مبررخلال 48 ساعة بعد الاعذارالثاني يعتبر العامل متخليا على المنصب .
      </Article>

      <Article title="المادة 06: الأجر">
        يتلقى المتعاقد مقابل العمل المنجز أجرا يتوافق مع شبكة الأجور المعمول بها في المؤسسة ٬ يقتطع من هذا الأجر المستحقات الجبائية و الضمان الاجتماعي طبقا للقوانين المعمول بها في هذا الشأن , ولا يمكن للعامل ان يطالب بما لم يتفق عليه الطرفين.<br />
        الاجر القاعدي : <D value={data.sal_base} /> دج، الاجر الصافي <D value={data.sal_net} /> دج.
      </Article>

      <Article title="المادة 07:تعويض العطلة السنوية">
        يستفيد الطرف الثاني ( العامل) من عطلة سنوية مدفوعة الأجر˛ من قبل الصندوق الوطني للعطل المدفوعة الأجر و البطالة الناجمة عن سوء الأحوال الجوية (CACOBATPH).<br />
        عملا بأحكام القانون 52 المكرر و 52 مكرر 1 من القانون 90/11.
      </Article>

      <Article title="المادة 08:السر المهني">
        يجب على الطرف الثاني ممارسة نشاطه المهني حسب قواعد المهنة ليبقى في خدمة صاحب العمل˛ و عليه أن يحفظ السر المهني أثناء و بعد فترة العقد.
      </Article>

      <Article title="المادة 09: احترام الالتزامات">
        يلتزم الطرفان المتعاقدان باحترام مضمون هذا العقد إلى جانب .<br />
        احترام النظام الداخلي.<br />
        احترام قواعد حفظ الصحة و الامن.<br />
        للعامل الحق في الحماية الاجتماعية لدى هيئات الضمان الاجتماعي.<br />
        و العمل في اي مكان يطلب منــــــــــــــــه .
      </Article>

      <Article title="المادة 10: انتهاء العقد ( علاقة العمل)">
        ينتهي هذا العقد لإحدى الحالات المنصوص عليها في المادة 66 من القانون 90/11 الخاص بعلاقة العمل.<br />
        وفي جميع الحالات الأخرى، يحتفظ العامل في هذا العقد بخيار إنهاء علاقة العمل، من خلال اتفاق متبادل صريح، مع مراعاة تقديم إشعار مدته ثلاثين (30) يومًا.
      </Article>

      <Article title="المادة 11: حالة توقف النشاط">
        في حالة توقف النشاط كليا أو جزئيا و بسبب إما التمويل أو التقلبات الجوية أو بسبب قوة قاهرة فان المؤسسة تتوقف عن دفع الراتب٬ و في حالة عدم استئناف النشاط بعد زوال تلك الأسباب فان العقد يفسخ حالا دون تعويض و دون إشعار مسبق.
      </Article>

      <Article title="المادة 12: حقوق و واجبات المتعاقد">
        تطبق على المتعاقد أحكام القانون 90/11 المؤرخ في 21/04/1990 المتعلق بعلاقات العمل المعدل و المتمم ˛ فيما يخص الحقوق و الواجبات .
      </Article>

      <Article title="المادة 13:تسوية النزاعات">
        كل نزاع يمكن أن يحدث بين طرفي هذا العقد بسبب تنفيذ أحكامه تتم تسويته بالتراضي بين الطرفين.<br />
        في حالة عدم التواصل إلى حل يستوجب إتباع إجراءات التسوية حسب أحكام القانون الداخلي و الإجراءات المحددة في التشريع و النظام الخاص و لا سيما المادة 4 من القانون 90/04 المؤرخ في 06/06/90) المعدل و المتمم.<br />
        و في حالة استنفاذ الاجراءات الداخلية لنزعات العمل الفردية داخل الهيئة يمكن للعامل حسب المادة 5 من القانون المذكور اعلاه اخطار مفتش العمل وفقا للإجراءات التي يحددها القانون.<br />
        محكمة الاختصاص محكمة خميس الخشنة.
      </Article>

      <Article title="المادة 14:بند موافقة صريحة بمعالجة البيانات الشخصية.">
        أقرر بموافقتي على معالجة بياناتي الشخصية من قبل صاحب مؤسسة تركيب المنشأت المعدنية المسمات ERCMSA SALHI ADEL الكائن مقرها سيدي سالم 108 شمال رقم 02 أولاد موسى ولاية بومرداس، طبقا لمقتضيات القانون 18-07 المؤرخ في 10 جوان 2018 والمتعلق بحماية الأشخاص الطبيعين في مجال معالجة المعطيات ذات الطابع الشخصي.
      </Article>

      <Article title="المادة 15:دخول العقد حيز التنفيذ">
        يدخل هذا العقد حيز التنفيذ بمجرد التوقيع عليه من الطرفين.<br />
        يوقع ويبصم العامل في الأول و يلي توقيعه عبارة " قرأ و صودق عليه"<br />
        - هذا العقد يحرر في(2) نسختين (يسلم نسخة من العقد لطرف الثاني و تحفظ نسخة في ملف العامل مع تأشير على صفحات ثلاثة للعقد و امضاء و بصمة الطرف الثاني على ادنى الصفحات الثلاث)<br />
        - تحتوي كل نسخة على ثلاثة صفحات .<br />
        - يتضمن العقد (15) خمسة عشرة مادة.
      </Article>

      {/* Lieu et date */}
      <div style={{ marginTop: 30, fontSize: "12pt" }}>
        حرر ب : <D value={data.lieu_sign || "أولاد موسى"} /> في <D value={data.date_sign} />
      </div>

      {/* Signatures */}
      <div style={{ marginTop: 50, display: "flex", justifyContent: "space-between", padding: "0 20px", pageBreakInside: "avoid" }}>
        <div style={{ textAlign: "center", width: "40%" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt", marginBottom: 60, textDecoration: "underline" }}>المستخدم ( الطرف الأول)</div>
        </div>
        <div style={{ textAlign: "center", width: "40%" }}>
          <div style={{ fontWeight: "bold", fontSize: "14pt", marginBottom: 60, textDecoration: "underline" }}>العامل (الطرف الثاني)</div>
          <div>قرأ و صودق عليه</div>
        </div>
      </div>
    </div>
  );
}

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <span style={{ fontWeight: "bold", fontSize: "14pt", textDecoration: "underline", marginBottom: 5, display: "block" }}>{title}</span>
      <div style={{ fontSize: "12pt" }}>{children}</div>
    </div>
  );
}
