import { defineStore } from 'pinia'

export const usePolicyStore = defineStore('policyStore',{
    state : ()=>({
       taps: [
              {
                "id": 1,
                "title": "سياسة الخصوصية: نظرة عامة",
                "content": "<div id=\"block-1\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#2D3263] text-2xl\"><strong>1. سياسة الخصوصية: نظرة عامة</strong></p>\n  <p class=\"text-[#6B697E]\">1.1- تشرح هذه السياسة كيف نتعامل مع معلوماتك. قد يتم تعديل هذه السياسة أو تحديثها من وقت لآخر، لذا يرجى التحقق منها بانتظام للتعرّف على التحديثات.</p>\n  <p class=\"text-[#6B697E]\">1.2 توفر موتيلز \"Moteelz\" (المشار إليها فيما يلي بضمير المتكلم \"نحن\" أو الملكية) خدمات السفر والأنشطة الترفيهية (\"الخدمات\") من خلال مواقعها على الإنترنت moteelz.com وتطبيقات الهاتف المحمول (يشار إليها فيما يلي باسم \"منصة الحجز\").</p>\n  <p class=\"text-[#6B697E]\">1.3 تطبق سياسة الخصوصية هذه على جميع المعلومات التي تجمعها عنك موتيلز، بغض النظر عن كيف تم تجميع المعلومات أو كيف تم تخزينها. كما تصف سياسة الخصوصية هذه أنواع المعلومات التي تجمعها عنك موتيلز عندما تدخل الموقع أو تزوره أو تستخدم خدماتها وكيف يمكن أن تستخدم معلوماتك ومتى يمكن الكشف عن معلوماتك وكيفية حمايتها وكيف يمكنك التحكم باستخدام معلوماتك والكشف عنها.</p>\n  <p class=\"text-[#6B697E]\">1.4 قد يتم تعديل أو تحديث هذه السياسة من وقت لآخر لتعكس التغييرات في ممارساتنا فيما يتعلق بمعالجة معلوماتك، أو التغييرات في القانون المعمول به. ننصحك بشدة بقراءة هذه السياسة بعناية، والتحقق منها بانتظام من خلال هذه الصفحة لمراجعة أي تغييرات قد نقوم بها.</p>\n  <p class=\"text-[#2D3263] text-2xl\"><strong>2. ما هي أنواع المعلومات التي نقوم بمعالجتها</strong></p>\n  <p class=\"text-[#6B697E]\">2.1 عند استخدامك لمنصة الحجز، نقوم بمعالجة أنواع المعلومات التالية عنك:</p>\n  <p class=\"text-[#6B697E]\">– التفاصيل الشخصية: اسم المستخدم الخاص بك و تفاصيل تسجيل الدخول، عنوان البريد الإلكتروني، و أرقام التواصل – معلومات الحجز: والتي تشمل معلومات عن سفرك وتفاصيل أرقام حجوزاتك وأرقام حجوزات خطوط الطيران والمسافرين معك وتفضيلات سفرك وما إلى ذلك. – المعلومات الشخصية: مثل الجنس، العمر، تاريخ الميلاد والجنسية – معلومات الموقع: بيانات الموقع التي تصف الموقع الجغرافي الدقيق لجهازك (\"بيانات الموقع الدقيقة\"). – تفاصيل الشراء والدفع: نقوم بتسجيل مشترياتك من خدمات السفر التي نقدمها وأسعارها؛ نقوم بتسجيل الفواتير، والمدفوعات وطريقة الدفع واسم حامل البطاقة وصاحب الحساب؛ ومبلغ الدفع وتاريخ الدفع. – المعلومات الأخرى التي قد يتم طلبها وجمعها أثناء زيارة أو الدخول إلى الموقع أو استخدام منصة الحجز. – قد نقوم أيضاً بمعالجة المعلومات الخاصة بك عند استخدامك لخدماتنا (على سبيل المثال: نوع الجهاز الذي تستخدمه، عنوان IP، مزود خدمة الإنترنت، إلخ)</p>\n</div>"
              },
              {
                "id": 2,
                "title":'شروط الاتفاقية ',
                "content": "<div id=\"block-2\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">عبر وصولك واستخدامك موقع Moteelz ، فإنك توافق على قبولك، من غير تعديل أو قيود أو شروط على جميع الأحكام والشروط الواردة في هذه الاتفاقية.أنت تقر وتضمن حقك القانوني للدخول في هذه الاتفاقية واستخدام الموقع وفقاً لجميع الشروط والأحكام المتواجدة هنا</p>\n</div>"
              },
              {
                "id": 3,
                "title": 'تعديل الشروط',
                "content": "<div id=\"block-3\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">يعمل موقع Moteelz قدر الإمكان على توفير المعلومات على الموقع بأكبر دقة ممكنة. مع ذلك، فإن بعض الأخطاء قد تحدث من وقت لآخر. إن موقع Moteelz وأي من شركائنا لا نتحمل أي مسؤولية عن أي خطأ في المعلومات التي يتضمنها الموقع.</p>\n  <p class=\"text-[#6B697E]\">يتضمن الموقع معلومات حول الخدمات والمنتجات التي يوفرها موقع Moteelz وأي طرف آخر. إن المعلومات والمواد الأخرى على الموقع مقدمة بأمانة تامة. عبر استخدامك الموقع أو فإنك توافق وتقر بأنه قد يقوم الموقع بعمل أي تحديث، تغيير أو تعديل الشروط والأحكام أو سياسة خدمة العملاء، أو أي معلومات مقدمة، في أي وقت بدون سابق إنذار.</p>\n  <p class=\"text-[#6B697E]\">ان الشروط والأحكام تصبح سارية المفعول بمجرد نشرها على الموقع ، ولن يكون لها أي أثر رجعي على أي حجوزات تمت مسبقا من خلاله.</p>\n  <p class=\"text-[#6B697E]\">يجب عليك قراءة هذه الشروط والأحكام في كل مرة تقوم بزيارة الموقع لضمان أنك على علم بكل الشروط والأحكام السابقة. وفقاً لذلك، الاستمرار باستخدامك للموقع يعتبر موافقة منك على أي تغيير في الشروط والأحكام.</p>\n</div>"
              },
              {
                "id": 4,
                "title": 'شروط الحجز',
                "content": "<div id=\"block-5\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">ينبغي عليك التواصل مع موقع Moteelz في حال رغبت بإلغاء حجزك (القابل للالغاء) قبل حلول موعد الدخول حسب سياسة الإلغاء لكل وحدة، ولكن إذا احتمل تأخر وصولك عن موعد تاريخ الدخول أو في عدم إمكانية التسجيل في يوم حجزك فعليك التواصل مباشرة مع خدمة العملاء وإخبارهم بذلك</p>\n  <p class=\"text-[#6B697E]\">وإذا اخفقت في تاريخ الدخول للوحدة في يوم الحجز دون إخبارهم بذلك، فقد يتم إلغاء الفترة المتبقية من حجزك وقد لا تكون مخولاً لاسترداد أموالك، وذلك وفقاً للشروط والاحكام الخاصة بالوحدة</p>\n</div>"
              },
              {
                "id": 5,
                "title": 'الوصول متأخر أو عدم الحضور',
                "content": "<div id=\"block-6\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">تختلف سياسة إلغاء الحجز بين الوحدات المعروضة في الموقع . فبعض الحجوزات غير قابلة للتغيير أو الإلغاء، وقد تفرض بعض الوحدات رسوماً معينة على إلغاء الحجز، بينما يتيح بعضها الآخر استرداد مبلغ الحجز بالكامل. يرجى الملاحظة بأن بعض الحجوزات بأسعار معينة أو عروض خاصة غير مؤهلة للتغيير أو الإلغاء. كما قد تقوم سياسة الوحدات بتطبيق رسوم إضافية على الإقامة المتأخرة</p>\n  <p class=\"text-[#6B697E]\">تتوفر سياسة تغيير الحجز أو الإلغاء الخاصة بالوحدات على صفحة معلومات الموقع الالكتروني للوحدة أو تحت بند \"شروط الحجز\"، \"سياسة الإلغاء\" أو ما شابه ذلك، وفي رسالة تأكيد الحجز الإلكترونية ووصل الحجز. ننصحك بالتأكد من وقراءة سياسة الإلغاء وسياسة عدم الحضور الخاصة بالوحدة قبل إتمام عملية الحجز. أو التواصل مع خدمة العملاء</p>\n  <p class=\"text-[#6B697E]\">بغض النظر عن سياسة تغيير أو إلغاء الحجز للوحدة يحتفظ موقع Moteelz بالحق في فرض رسوم معينة على تغيير أو إلغاء الحجز، وذلك كما هو مبين في الموقع. يرجى التأكد من تفاصيل الشروط والأحكام الخاصة بالوحدات قبل القيام بالحجز</p>\n  <p class=\"text-[#6B697E]\">إذا رغبت باستعراض، تعديل أو إلغاء حجزك، يرجى التواصل مع فريق خدمة عملاءموقع Moteelz</p>\n</div>"
              },
              {
                "id": 6,
                "title": 'تغيير أو إلغاء الحجز',
                "content": "<div id=\"block-7\" class=\"flex flex-col gap-5 max-w-fit justify-center items-center\">\n  <p class=\"text-[#6B697E]\">يستخدم موقع Moteelz كل الوسائل لضمان جاهزية الموقع واتاحة كل الخدمات المرتبطة به، ولكن لا يمكن لها أن تضمن عمله بشكل مستمر أو بدون انقطاع</p>\n</div>"
              },
              {
                "id": 7,
                "title": 'توافر الموقع',
                "content": "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا وجمع البيانات حول نشاطك."
              },
      
            ],
  tapsEnglish: [
    {
      "id": 1,
      "title": "Privacy Policy: Overview",
      "content": "<div id=\"block-1\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#2D3263] text-2xl\"><strong>1. Privacy Policy: Overview</strong></p>\n  <p class=\"text-[#6B697E]\">1.1 - This policy explains how we handle your information. This policy may be modified or updated from time to time, so please check it regularly to stay informed about any updates.</p>\n  <p class=\"text-[#6B697E]\">1.2 Moteelz (referred to as \"we\" or \"our\" hereinafter) provides travel and leisure services (\"services\") through its websites, moteelz.com, and mobile applications (hereinafter referred to as \"Booking Platform\").</p>\n  <p class=\"text-[#6B697E]\">1.3 This Privacy Policy applies to all the information collected about you by Moteelz, regardless of how the information was collected or how it was stored. This Privacy Policy also describes the types of information that Moteelz collects about you when you access, visit, or use our services, how we may use your information, when we may disclose it, and how we protect it, and how you can control the use and disclosure of your information.</p>\n  <p class=\"text-[#6B697E]\">1.4 This policy may be modified or updated from time to time to reflect changes in our practices regarding the processing of your information or changes in applicable law. We strongly encourage you to read this policy carefully and to check it regularly through this page to review any changes we may make.</p>\n  <p class=\"text-[#2D3263] text-2xl\"><strong>2. What types of information do we process?</strong></p>\n  <p class=\"text-[#6B697E]\">2.1 When using the Booking Platform, we process the following types of information about you:</p>\n  <p class=\"text-[#6B697E]\">– Personal details: Your username, login details, email address, and contact numbers. – Booking information: This includes information about your travels, booking reference numbers, airline booking numbers, co-travelers, travel preferences, etc. – Personal information: Such as gender, age, date of birth, and nationality. – Location information: Location data that describes the exact geographic location of your device (\"Precise Location Data\"). – Purchase and payment details: We record your purchases of travel services we provide, their prices, bills, payments, payment methods, cardholder and account holder names, payment amounts, and payment dates. – Other information that may be requested and collected during your visit to, access to, or use of the Booking Platform. – We may also process information about you when you use our services (e.g., the type of device you use, IP address, Internet service provider, etc.).</p>\n</div>"
    },
    {
      "id": 2,
      "title": "Terms of Agreement",
      "content": "<div id=\"block-2\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">By accessing and using the Moteelz website, you agree to accept, without modification or limitations, all the terms and conditions stated in this agreement. You acknowledge and guarantee your legal right to enter into this agreement and to use the website in accordance with all the terms and conditions herein.</p>\n</div>"
    },
    {
      "id": 3,
      "title": "Modification of Terms",
      "content": "<div id=\"block-3\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">Moteelz strives to provide information on the website as accurately as possible. However, errors may occur from time to time. Moteelz and any of our partners do not bear any responsibility for any errors in the information contained on the website.</p>\n  <p class=\"text-[#6B697E]\">The website contains information about the services and products provided by Moteelz and any other party. The information and other materials on the website are provided in good faith. By using the website, you acknowledge and agree that the website may make any update, change, or modification of the terms and conditions, customer service policy, or any information provided, at any time without prior notice.</p>\n  <p class=\"text-[#6B697E]\">The terms and conditions become effective as soon as they are published on the website, and will not have any retroactive effect on any previous bookings made through it.</p>\n  <p class=\"text-[#6B697E]\">You should read these terms and conditions each time you visit the website to ensure you are aware of all previous terms and conditions. Accordingly, continued use of the website is considered your acceptance of any changes to the terms and conditions.</p>\n</div>"
    },
    {
      "id": 4,
      "title": "Booking Terms",
      "content": "<div id=\"block-4\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">You should contact Moteelz if you wish to cancel your booking (which is cancellable) before the entry date, according to the cancellation policy of each unit. If you are likely to be late or unable to check-in on the booking date, you should inform customer service directly.</p>\n  <p class=\"text-[#6B697E]\">If you fail to check-in on the booking date without informing them, the remaining period of your booking may be canceled, and you may not be eligible for a refund, in accordance with the unit's terms and conditions.</p>\n</div>"
    },
    {
      "id": 5,
      "title": "Late Arrival or No-Show",
      "content": "<div id=\"block-5\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">The cancellation policy varies between units listed on the website. Some bookings are non-changeable or non-cancelable, while others may impose specific cancellation charges. Others may allow a full refund. Please note that some bookings at certain prices or special offers may not be eligible for change or cancellation. Additionally, unit policies may impose extra charges for late check-ins.</p>\n  <p class=\"text-[#6B697E]\">The change or cancellation policy of the units is available on the unit's web page or under the \"Booking Terms,\" \"Cancellation Policy,\" or similar section, in the booking confirmation email, and on the booking receipt. We advise you to read the unit's cancellation and no-show policies before completing the booking or contact customer service.</p>\n  <p class=\"text-[#6B697E]\">Regardless of the unit's change or cancellation policy, Moteelz reserves the right to impose certain charges on change or cancellation, as indicated on the website. Please check the details of the units' terms and conditions before booking.</p>\n  <p class=\"text-[#6B697E]\">If you wish to view, modify, or cancel your booking, please contact Moteelz customer service team.</p>\n</div>"
    },
    {
      "id": 6,
      "title": "Booking Change or Cancellation",
      "content": "<div id=\"block-6\" class=\"flex flex-col gap-5 max-w-fit justify-center items-center\">\n  <p class=\"text-[#6B697E]\">Moteelz uses all means to ensure the website's readiness and the availability of all associated services, but it cannot guarantee its continuous operation or uninterrupted availability.</p>\n</div>"
    },
    {
      "id": 7,
      "title": "Website Availability",
      "content": "<div id=\"block-7\" class=\"flex flex-col gap-5 max-w-fit\">\n  <p class=\"text-[#6B697E]\">We use cookies to enhance your experience on our website and gather data regarding your activities.</p>\n</div>"
    }
  ]

    }),
})