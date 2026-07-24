/**
 * Patches the remaining language translation files with the new keys:
 *   - up_hint_* (9 upload hints)
 *   - up_reassureTitle, up_reassureDesc
 *   - legal_cookie, legal_cookieBody
 *   - legal_aiTransparency, legal_aiTransparencyBody
 *   - legal_responsibleAi, legal_responsibleAiBody
 *   - legal_financial, legal_financialBody
 *
 * Each language gets accurate, professional translations.
 * Run: node /home/z/my-project/scripts/patch-i18n.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const I18N_DIR = join(__dirname, "..", "src", "lib", "i18n");

const PATCHES = {
  fr: {
    up_hints: {
      up_hint_medical: "Traitement privé",
      up_hint_legal: "Privilégié",
      up_hint_gov: "Vérifié",
      up_hint_bank: "Chiffré",
      up_hint_financial: "Lecture seule",
      up_hint_contract: "Conscient des clauses",
      up_hint_invoice: "Analysé",
      up_hint_email: "PII supprimée",
      up_hint_suspicious: "Score de risque",
      up_reassureTitle: "Votre vie privée passe d'abord",
      up_reassureDesc:
        "Les fichiers sont traités pour votre analyse et supprimés sur votre commande. Pas d'entraînement sur vos données. Pas de partage avec des tiers.",
    },
    legal: {
      legal_cookie: "Politique de cookies",
      legal_cookieBody:
        "Klario utilise un nombre limité de cookies essentiels pour maintenir votre session et mémoriser votre langue. Nous n'utilisons pas de cookies publicitaires ou de suivi intersites. Votre choix de langue est stocké localement dans votre navigateur ; votre jeton de session est un cookie interne strictement nécessaire. Vous pouvez effacer tous les cookies depuis votre navigateur à tout moment, et Klario continuera de fonctionner — il vous sera simplement demandé de choisir votre langue à nouveau.",
      legal_aiTransparency: "Transparence de l'IA",
      legal_aiTransparencyBody:
        "Klario utilise de grands modèles de langage pour lire, résumer et expliquer vos documents. Nous vous disons, en termes clairs, ce que le modèle a fait et sur quelles parties de votre document il s'est appuyé. Chaque analyse inclut un niveau de confiance et, le cas échéant, une note quand le modèle est incertain ou le texte ambigu. Nous ne présentons jamais la sortie de l'IA comme une certitude. Quand Klario ne sait pas, il le dit. Quand un constat pourrait affecter votre santé, vos droits ou votre argent, nous vous invitons à confirmer avec un professionnel.",
      legal_responsibleAi: "IA responsable",
      legal_responsibleAiBody:
        "Klario est conçu pour informer, pas pour décider à votre place. Nous ne construisons pas de fonctionnalités qui poussent l'utilisateur vers des actions risquées. Nous montrons le raisonnement derrière chaque score de risque et chaque verdict d'arnaque, pour que vous puissiez juger vous-même. Nous testons les biais sur les types de documents et langues courants, et nous publions honnêtement ce que nous trouvons. Nous ne prétendons pas à la perfection — nous prétendons à l'honnêteté sur nos limites. Si une fonctionnalité améliorait la beauté mais réduisait la clarté, nous gardons la clarté.",
      legal_financial: "Avis financier",
      legal_financialBody:
        "Klario peut lire les relevés bancaires, factures, contrats et documents financiers et expliquer ce qu'ils disent en mots clairs. Sa sortie n'est pas un conseil financier, d'investissement, fiscal ou comptable, et ce n'est pas une recommandation d'acheter, vendre, conserver ou signer quoi que ce soit. Klario n'est pas un conseiller financier régulé. Ne prenez pas de décisions financières uniquement sur la base de sa sortie. Confirmez toujours avec un professionnel agréé dans votre juridiction avant d'agir sur quoi que ce soit qui affecte votre argent.",
    },
  },
  de: {
    up_hints: {
      up_hint_medical: "Private Verarbeitung",
      up_hint_legal: "Privilegiert",
      up_hint_gov: "Verifiziert",
      up_hint_bank: "Verschlüsselt",
      up_hint_financial: "Nur Lesen",
      up_hint_contract: "Klauselbewusst",
      up_hint_invoice: "Geparst",
      up_hint_email: "PII entfernt",
      up_hint_suspicious: "Risikobewertet",
      up_reassureTitle: "Deine Privatsphäre zuerst",
      up_reassureDesc:
        "Dateien werden für deine Analyse verarbeitet und auf deinen Befehl gelöscht. Kein Training mit deinen Daten. Keine Weitergabe an Dritte.",
    },
    legal: {
      legal_cookie: "Cookie-Richtlinie",
      legal_cookieBody:
        "Klario verwendet eine kleine Anzahl essentieller Cookies, um deine Sitzung aufrechtzuerhalten und deine Sprache zu merken. Wir verwenden keine Werbe- oder seitenübergreifenden Tracking-Cookies. Deine Sprachwahl wird lokal in deinem Browser gespeichert; dein Sitzungs-Token ist ein eigenes, zwingend notwendiges Cookie. Du kannst jederzeit alle Cookies aus deinem Browser löschen, und Klario funktioniert weiterhin — du wirst nur erneut gebeten, deine Sprache zu wählen.",
      legal_aiTransparency: "KI-Transparenz",
      legal_aiTransparencyBody:
        "Klario nutzt große Sprachmodelle, um deine Dokumente zu lesen, zusammenzufassen und zu erklären. Wir sagen dir in klaren Worten, was das Modell getan hat und auf welche Teile deines Dokuments es sich gestützt hat. Jede Analyse enthält ein Konfidenzniveau und, falls relevant, einen Hinweis, wenn das Modell unsicher ist oder der Text mehrdeutig ist. Wir geben KI-Ausgaben nie als Gewissheit aus. Wenn Klario es nicht weiß, sagt es das. Wenn ein Befund deine Gesundheit, Rechte oder dein Geld betreffen könnte, bitten wir dich, dies mit einem Fachmann zu bestätigen.",
      legal_responsibleAi: "Verantwortungsvolle KI",
      legal_responsibleAiBody:
        "Klario ist gebaut, um zu informieren — nicht, um für dich zu entscheiden. Wir bauen keine Funktionen, die Nutzer zu riskanten Handlungen drängen. Wir zeigen den Gedankengang hinter jedem Risikowert und jedem Betrugsurteil, damit du selbst urteilen kannst. Wir testen auf Verzerrung bei gängigen Dokumenttypen und Sprachen und veröffentlichen ehrlich, was wir finden. Wir behaupten nicht, perfekt zu sein — wir behaupten Ehrlichkeit über unsere Grenzen. Wenn ein Feature die Schönheit erhöht, aber die Klarheit verringert, behalten wir die Klarheit.",
      legal_financial: "Finanzieller Hinweis",
      legal_financialBody:
        "Klario kann Bankauszüge, Rechnungen, Verträge und Finanzdokumente lesen und in klaren Worten erklären, was sie sagen. Seine Ausgabe ist keine Finanz-, Investitions-, Steuer- oder Buchführungsberatung und keine Empfehlung, etwas zu kaufen, verkaufen, zu halten oder zu unterschreiben. Klario ist kein regulierter Finanzberater. Treffe keine finanziellen Entscheidungen nur aufgrund seiner Ausgabe. Bestätige immer bei einem zugelassenen Fachmann in deiner Rechtsordnung, bevor du etwas tust, das dein Geld betrifft.",
    },
  },
  pt: {
    up_hints: {
      up_hint_medical: "Tratamento privado",
      up_hint_legal: "Privilegiado",
      up_hint_gov: "Verificado",
      up_hint_bank: "Criptografado",
      up_hint_financial: "Somente leitura",
      up_hint_contract: "Ciente de cláusulas",
      up_hint_invoice: "Analisado",
      up_hint_email: "PII removido",
      up_hint_suspicious: "Com pontuação de risco",
      up_reassureTitle: "Sua privacidade em primeiro lugar",
      up_reassureDesc:
        "Os arquivos são processados para sua análise e excluídos por seu comando. Sem treinamento com seus dados. Sem compartilhamento com terceiros.",
    },
    legal: {
      legal_cookie: "Política de cookies",
      legal_cookieBody:
        "O Klario usa um número pequeno de cookies essenciais para manter sua sessão e lembrar seu idioma. Não usamos cookies de publicidade ou rastreamento entre sites. Sua escolha de idioma é armazenada localmente no seu navegador; seu token de sessão é um cookie próprio estritamente necessário. Você pode limpar todos os cookies do seu navegador a qualquer momento, e o Klario continuará funcionando — você só precisará escolher seu idioma novamente.",
      legal_aiTransparency: "Transparência da IA",
      legal_aiTransparencyBody:
        "O Klario usa grandes modelos de linguagem para ler, resumir e explicar seus documentos. Dizemos a você, em termos claros, o que o modelo fez e em quais partes do seu documento ele se baseou. Cada análise inclui um nível de confiança e, quando relevante, uma nota quando o modelo está incerto ou o texto é ambíguo. Nunca apresentamos a saída da IA como certeza. Quando o Klario não sabe, ele diz. Quando um achado pode afetar sua saúde, direitos ou dinheiro, dizemos para confirmar com um profissional.",
      legal_responsibleAi: "IA responsável",
      legal_responsibleAiBody:
        "O Klario é construído para informar, não para decidir por você. Não construímos recursos que empurram o usuário a ações arriscadas. Mostramos o raciocínio por trás de cada pontuação de risco e cada veredito de golpe, para que você mesmo possa julgar. Testamos vieses em tipos de documentos e idiomas comuns e publicamos honestamente o que encontramos. Não afirmamos perfeição — afirmamos honestidade sobre nossos limites. Se um recurso melhorasse a beleza mas reduzisse a clareza, mantemos a clareza.",
      legal_financial: "Aviso financeiro",
      legal_financialBody:
        "O Klario pode ler extratos bancários, faturas, contratos e documentos financeiros e explicar o que dizem em palavras claras. Sua saída não é orientação financeira, de investimento, tributária ou contábil, e não é uma recomendação de comprar, vender, manter ou assinar algo. O Klario não é um consultor financeiro regulamentado. Não tome decisões financeiras baseando-se apenas em sua saída. Confirme sempre com um profissional licenciado na sua jurisdição antes de agir em algo que afete seu dinheiro.",
    },
  },
  it: {
    up_hints: {
      up_hint_medical: "Trattamento privato",
      up_hint_legal: "Privilegiato",
      up_hint_gov: "Verificato",
      up_hint_bank: "Cifrato",
      up_hint_financial: "Sola lettura",
      up_hint_contract: "Consapevole delle clausole",
      up_hint_invoice: "Analizzato",
      up_hint_email: "PII rimosso",
      up_hint_suspicious: "Con punteggio di rischio",
      up_reassureTitle: "La tua privacy prima di tutto",
      up_reassureDesc:
        "I file sono elaborati per la tua analisi ed eliminati su tuo comando. Nessun addestramento sui tuoi dati. Nessuna condivisione con terzi.",
    },
    legal: {
      legal_cookie: "Policy sui cookie",
      legal_cookieBody:
        "Klario usa un numero limitato di cookie essenziali per mantenere la sessione e ricordare la tua lingua. Non usiamo cookie pubblicitari o di tracciamento cross-site. La tua scelta di lingua è memorizzata localmente nel tuo browser; il tuo token di sessione è un cookie di prima parte strettamente necessario. Puoi cancellare tutti i cookie dal tuo browser in qualsiasi momento e Klario continuerà a funzionare — ti verrà solo chiesto di scegliere di nuovo la lingua.",
      legal_aiTransparency: "Trasparenza dell'IA",
      legal_aiTransparencyBody:
        "Klario usa modelli linguistici di grandi dimensioni per leggere, riassumere e spiegare i tuoi documenti. Ti diciamo, in parole chiare, cosa ha fatto il modello e su quali parti del tuo documento si è basato. Ogni analisi include un livello di confidenza e, dove rilevante, una nota quando il modello è incerto o il testo è ambiguo. Non presentiamo mai l'output dell'IA come certezza. Quando Klario non sa, lo dice. Quando un risultato potrebbe influire sulla tua salute, diritti o denaro, ti diciamo di confermare con un professionista.",
      legal_responsibleAi: "IA responsabile",
      legal_responsibleAiBody:
        "Klario è costruito per informare, non per decidere per te. Non costruiamo funzioni che spingono l'utente verso azioni rischiose. Mostriamo il ragionamento dietro ogni punteggio di rischio e ogni verdetto di truffa, così puoi giudicare tu stesso. Testiamo i bias rispetto a tipi di documento e lingue comuni, e pubblichiamo onestamente cosa troviamo. Non rivendichiamo perfezione — rivendichiamo onestà sui nostri limiti. Se una funzione migliorasse la bellezza ma riducesse la chiarezza, manteniamo la chiarezza.",
      legal_financial: "Avviso finanziario",
      legal_financialBody:
        "Klario può leggere estratti conto, fatture, contratti e documenti finanziari e spiegare cosa dicono in parole chiare. Il suo output non è consulenza finanziaria, di investimento, fiscale o contabile, e non è una raccomandazione a comprare, vendere, mantenere o firmare alcunché. Klario non è un consulente finanziario regolamentato. Non prendere decisioni finanziarie basandoti solo sul suo output. Conferma sempre con un professionista autorizzato nella tua giurisdizione prima di agire su qualcosa che riguarda il tuo denaro.",
    },
  },
  nl: {
    up_hints: {
      up_hint_medical: "Privé verwerkt",
      up_hint_legal: "Bevoorrecht",
      up_hint_gov: "Geverifieerd",
      up_hint_bank: "Versleuteld",
      up_hint_financial: "Alleen-lezen",
      up_hint_contract: "Clausulebewust",
      up_hint_invoice: "Geparseerd",
      up_hint_email: "PII verwijderd",
      up_hint_suspicious: "Risico-gescoord",
      up_reassureTitle: "Jouw privacy eerst",
      up_reassureDesc:
        "Bestanden worden voor jouw analyse verwerkt en op jouw commando verwijderd. Geen training op jouw data. Geen delen met derden.",
    },
    legal: {
      legal_cookie: "Cookiebeleid",
      legal_cookieBody:
        "Klario gebruikt een klein aantal essentiële cookies om je sessie te behouden en je taal te onthouden. We gebruiken geen advertentie- of cross-site trackingcookies. Je taalkeuze wordt lokaal in je browser opgeslagen; je sessietoken is een eigen, strikt noodzakelijke cookie. Je kunt op elk moment alle cookies uit je browser wissen en Klario blijft werken — je wordt alleen gevraagd je taal opnieuw te kiezen.",
      legal_aiTransparency: "AI-transparantie",
      legal_aiTransparencyBody:
        "Klario gebruikt grote taalmodellen om je documenten te lezen, samen te vatten en uit te leggen. We vertellen je in gewone taal wat het model deed en op welke delen van je document het zich baseerde. Elke analyse bevat een betrouwbaarheidsniveau en, waar relevant, een notitie wanneer het model onzeker is of de tekst dubbelzinnig is. We presenteren AI-output nooit als zekerheid. Als Klario het niet weet, zegt hij dat. Als een bevinding je gezondheid, rechten of geld zou kunnen beïnvloeden, zeggen we dat je het met een professional moet bevestigen.",
      legal_responsibleAi: "Verantwoorde AI",
      legal_responsibleAiBody:
        "Klario is gebouwd om te informeren, niet om voor jou te beslissen. We bouwen geen functies die gebruikers naar riskante acties duwen. We tonen de redenering achter elke risicoscore en elke scamverdict, zodat je zelf kunt oordelen. We testen op bias bij veelvoorkomende documenttypen en talen, en publiceren eerlijk wat we vinden. We claimen geen perfectie — we claimen eerlijkheid over onze grenzen. Als een functie schoonheid zou verbeteren maar duidelijkheid zou verminderen, houden we de duidelijkheid.",
      legal_financial: "Financiële disclaimer",
      legal_financialBody:
        "Klario kan bankafschriften, facturen, contracten en financiële documenten lezen en uitleggen wat ze zeggen in gewone woorden. De output is geen financieel, investerings-, belasting- of boekhoudadvies, en geen aanbeveling om iets te kopen, verkopen, houden of tekenen. Klario is geen geregistreerde financieel adviseur. Neem geen financiële beslissingen enkel op basis van de output. Bevestig altijd bij een erkende professional in jouw rechtsgebied voordat je handelt op iets dat jouw geld betreft.",
    },
  },
  ar: {
    up_hints: {
      up_hint_medical: "معالجة خاصة",
      up_hint_legal: "متميّز",
      up_hint_gov: "موثّق",
      up_hint_bank: "مشفّر",
      up_hint_financial: "للقراءة فقط",
      up_hint_contract: "مدرك للبنود",
      up_hint_invoice: "محلَّل",
      up_hint_email: "بدون معلومات شخصية",
      up_hint_suspicious: "بدرجة مخاطر",
      up_reassureTitle: "خصوصيتك أولاً",
      up_reassureDesc:
        "تُعالج الملفات لتحليلك وتُحذف بأمرك. لا تدريب على بياناتك. لا مشاركة مع أطراف ثالثة.",
    },
    legal: {
      legal_cookie: "سياسة ملفات تعريف الارتباط",
      legal_cookieBody:
        "يستخدم Klario عددًا محدودًا من ملفات تعريف الارتباط الأساسية للحفاظ على جلستك وتذكّر لغتك. لا نستخدم ملفات إعلانات أو تتبّع بين المواقع. يُحفظ اختيار لغتك محليًا في متصفحك؛ رمز جلستك هو ملف تعريف ارتباط أساسي من الطرف الأول. يمكنك مسح جميع ملفات تعريف الارتباط من متصفحك في أي وقت، وسيستمر Klario في العمل — سيُطلب منك فقط اختيار لغتك مرة أخرى.",
      legal_aiTransparency: "شفافية الذكاء الاصطناعي",
      legal_aiTransparencyBody:
        "يستخدم Klario نماذج لغوية كبيرة لقراءة مستنداتك وتلخيصها وشرحها. نخبرك بكلمات واضحة بما فعله النموذج وأي أجزاء من مستندك اعتمد عليها. يتضمن كل تحليل مستوى ثقة، وعند الاقتضاء، ملاحظة عندما يكون النموذج غير متأكد أو النص غامضًا. لا نقدم مخرجات الذكاء الاصطناعي كحقائق مؤكدة. عندما لا يعرف Klario، يقول ذلك. عندما قد يؤثر نتيجة على صحتك أو حقوقك أو أموالك، نخبرك بتأكيدها مع مختص.",
      legal_responsibleAi: "ذكاء اصطناعي مسؤول",
      legal_responsibleAiBody:
        "صُمِّم Klario لإعلامك، لا للقرار نيابة عنك. لا نبني ميزات تدفع المستخدم نحو إجراءات خطرة. نُظهر المنطق وراء كل درجة مخاطر وكل حكم احتيال، لتحكم بنفسك. نختبر التحيز ضد أنواع المستندات واللغات الشائعة، وننشر ما نجده بصدق. لا ندّعي الكمال — ندّعي الصدق حول حدودنا. إذا كانت ميزة تحسّن الجمال لكنها تقلل الوضوح، نحتفظ بالوضوح.",
      legal_financial: "إخلاء مسؤولية مالية",
      legal_financialBody:
        "يستطيع Klario قراءة كشوف الحسابات البنكية والفواتير والعقود والمستندات المالية وشرح ما تقوله بكلمات واضحة. مخرجاته ليست نصيحة مالية أو استثمارية أو ضريبية أو محاسبية، وليست توصية بشراء أو بيع أو الاحتفاظ أو التوقيع على أي شيء. Klario ليس مستشارًا ماليًا منظّمًا. لا تتخذ قرارات مالية بناءً على مخرجاته وحدها. أكد دائمًا مع مختص مرخّص في نطاقك القضائي قبل التصرف في أي شيء يخص أموالك.",
    },
  },
  ur: {
    up_hints: {
      up_hint_medical: "نجی پروسیسنگ",
      up_hint_legal: "محفوظ",
      up_hint_gov: "تصدید شدہ",
      up_hint_bank: "خفیہ کردہ",
      up_hint_financial: "صرف پڑھنے کے لیے",
      up_hint_contract: "شروط سے آگاہ",
      up_hint_invoice: "تجزیہ کردہ",
      up_hint_email: "PII ہٹا دیا",
      up_hint_suspicious: "خطرہ اسکور کے ساتھ",
      up_reassureTitle: "آپ کی رازداری پہلے",
      up_reassureDesc:
        "فائلیں آپ کے تجزیے کے لیے پروسیس ہوتی ہیں اور آپ کے حکم پر حذف ہو جاتی ہیں۔ آپ کے ڈیٹا پر کوئی تربیت نہیں۔ تیسری پارٹیوں کے ساتھ کوئی اشتراک نہیں۔",
    },
    legal: {
      legal_cookie: "کوکی پالیسی",
      legal_cookieBody:
        "Klario آپ کے سیشن کو برقرار رکھنے اور آپ کی زبان یاد رکھنے کے لیے چند ضروری کوکیز استعمال کرتا ہے۔ ہم اشتہاری یا کراس سائٹ ٹریکنگ کوکیز استعمال نہیں کرتے۔ آپ کی زبان کا انتخاب آپ کے براؤزر میں مقامی طور پر محفوظ ہے؛ آپ کا سیشن ٹوکن ایک فرسٹ پارٹی، لازمی کوکی ہے۔ آپ کسی بھی وقت اپنے براؤزر سے تمام کوکیز صاف کر سکتے ہیں، اور Klario کام کرتا رہے گا — آپ سے صرف دوبارہ اپنی زبان منتخب کرنے کے لیے کہا جائے گا۔",
      legal_aiTransparency: "AI شفافیت",
      legal_aiTransparencyBody:
        "Klario آپ کے دستاویزات پڑھنے، خلاصہ کرنے اور سمجھانے کے لیے بڑے زبان ماڈل استعمال کرتا ہے۔ ہم آپ کو سادہ الفاظ میں بتاتے ہیں کہ ماڈل نے کیا کیا اور آپ کی دستاویز کے کن حصوں پر انحصار کیا۔ ہر تجزیہ میں اعتماد کی سطح شامل ہے، اور جہاں متعلقہ ہو، ایک نوٹ جب ماڈل غیر یقینی ہو یا متن مبہم ہو۔ ہم AI کے آؤٹ پٹ کو یقین کے طور پر پیش نہیں کرتے۔ جب Klario نہیں جانتا، تو وہ کہتا ہے۔ جب کوئی نتیجہ آپ کی صحت، حقوق یا پیسے کو متاثر کر سکتا ہے، ہم آپ کو کسی پیشہ ور کے ساتھ تصدیق کرنے کے لیے کہتے ہیں۔",
      legal_responsibleAi: "ذمہ دار AI",
      legal_responsibleAiBody:
        "Klario آپ کو بتانے کے لیے بنا ہے، آپ کے لیے فیصلہ کرنے کے لیے نہیں۔ ہم ایسی خصوصیات نہیں بناتے جو صارف کو خطرناک اقدامات کی طرف دھکیلیں۔ ہم ہر خطرہ اسکور اور ہر اسکام وردیک کے پیچھے منطق دکھاتے ہیں، تاکہ آپ خود فیصلہ کر سکیں۔ ہم عام دستاویز کی اقسام اور زبانوں کے خلاف تعصب کی جانچ کرتے ہیں، اور جو ہم پاتے ہیں اسے ایمانداری سے شائع کرتے ہیں۔ ہم کمال کا دعویٰ نہیں کرتے — ہم اپنی حدود کے بارے میں ایمانداری کا دعویٰ کرتے ہیں۔ اگر کوئی خصوصیت خوبصورتی بڑھاتی ہے لیکن وضاحت کم کرتی ہے، تو ہم وضاحت رکھتے ہیں۔",
      legal_financial: "مالی ڈس کلیمر",
      legal_financialBody:
        "Klario بینک بیان، انوائس، کنٹریکٹس اور مالی دستاویزات پڑھ سکتا ہے اور سادہ الفاظ میں سمجھا سکتا ہے کہ وہ کیا کہتے ہیں۔ اس کا آؤٹ پٹ مالی، سرمایہ کاری، ٹیکس یا اکاؤنٹنگ مشورہ نہیں ہے، اور نہ ہی کوئی چیز خریدنے، فروخت کرنے، رکھنے یا دستخط کرنے کی سفارش ہے۔ Klario ایک ریگولیٹڈ مالی مشیر نہیں ہے۔ اپنے آؤٹ پٹ پر مبنی مالی فیصلے نہ کریں۔ اپنے پیسے سے متعلق کچھ بھی کرنے سے پہلے ہمیشہ اپنے دائرہ اختیار میں لائسنس یافتہ پیشہ ور سے تصدیق کریں۔",
    },
  },
  hi: {
    up_hints: {
      up_hint_medical: "निजी प्रसंस्करण",
      up_hint_legal: "विशेषाधिकार प्राप्त",
      up_hint_gov: "सत्यापित",
      up_hint_bank: "एन्क्रिप्टेड",
      up_hint_financial: "केवल पढ़ने हेतु",
      up_hint_contract: "खंड-जागरूक",
      up_hint_invoice: "विश्लेषित",
      up_hint_email: "PII हटाया गया",
      up_hint_suspicious: "जोखिम-स्कोर किया गया",
      up_reassureTitle: "आपकी निजता पहले",
      up_reassureDesc:
        "फ़ाइलें आपके विश्लेषण के लिए संसाधित होती हैं और आपके आदेश पर हटाई जाती हैं। आपके डेटा पर कोई प्रशिक्षण नहीं। तृतीय पक्षों के साथ कोई साझाकरण नहीं।",
    },
    legal: {
      legal_cookie: "कुकी नीति",
      legal_cookieBody:
        "Klario आपके सत्र को बनाए रखने और आपकी भाषा याद रखने के लिए कुछ आवश्यक कुकीज़ का उपयोग करता है। हम विज्ञापन या क्रॉस-साइट ट्रैकिंग कुकीज़ का उपयोग नहीं करते। आपकी भाषा की पसंद आपके ब्राउज़र में स्थानीय रूप से संग्रहीत होती है; आपका सत्र टोकन एक फर्स्ट-पार्टी, सख्ती से आवश्यक कुकी है। आप किसी भी समय अपने ब्राउज़र से सभी कुकीज़ साफ़ कर सकते हैं, और Klario तब भी काम करेगा — आपको बस अपनी भाषा फिर से चुनने के लिए कहा जाएगा।",
      legal_aiTransparency: "AI पारदर्शिता",
      legal_aiTransparencyBody:
        "Klario आपके दस्तावेज़ों को पढ़ने, सारांश देने और समझाने के लिए बड़े भाषा मॉडल का उपयोग करता है। हम सादे शब्दों में बताते हैं कि मॉडल ने क्या किया और आपके दस्तावेज़ के किन हिस्सों पर उसने भरोसा किया। हर विश्लेषण में एक आत्मविश्वास स्तर शामिल होता है और, जहाँ प्रासंगिक हो, एक नोट जब मॉडल अनिश्चित हो या पाठ अस्पष्ट हो। हम AI आउटपुट को निश्चितता के रूप में प्रस्तुत नहीं करते। जब Klario नहीं जानता, तो वह कहता है। जब कोई निष्कर्ष आपके स्वास्थ्य, अधिकारों या धन को प्रभावित कर सकता है, तो हम कहते हैं कि इसे किसी पेशेवर के साथ पुष्टि करें।",
      legal_responsibleAi: "ज़िम्मेदार AI",
      legal_responsibleAiBody:
        "Klario सूचित करने के लिए बना है, आपके लिए निर्णय लेने के लिए नहीं। हम ऐसी सुविधाएँ नहीं बनाते जो उपयोगकर्ताओं को जोखिम भरे कार्यों की ओर धकेलती हैं। हम हर जोखिम स्कोर और हर स्कैम वर्डिक्ट के पीछे की तर्क दिखाते हैं, ताकि आप स्वयं निर्णय ले सकें। हम सामान्य दस्तावेज़ प्रकारों और भाषाओं के विरुद्ध पूर्वाग्रह का परीक्षण करते हैं, और जो हम पाते हैं उसे ईमानदारी से प्रकाशित करते हैं। हम पूर्णता का दावा नहीं करते — हम अपनी सीमाओं के प्रति ईमानदारी का दावा करते हैं। यदि कोई सुविधा सुंदरता बढ़ाती है लेकिन स्पष्टता कम करती है, तो हम स्पष्टता रखते हैं।",
      legal_financial: "वित्तीय अस्वीकरण",
      legal_financialBody:
        "Klario बैंक विवरण, चालान, अनुबंध और वित्तीय दस्तावेज़ पढ़ सकता है और सरल शब्दों में समझा सकता है कि वे क्या कहते हैं। इसका आउटपुट वित्तीय, निवेश, कर या लेखा सलाह नहीं है, और न ही कुछ खरीदने, बेचने, रखने या हस्ताक्षर करने की सिफारिश है। Klario एक विनियमित वित्तीय सलाहकार नहीं है। केवल इसके आउटपुट पर आधारित वित्तीय निर्णय न लें। अपने धन को प्रभावित करने वाली किसी भी चीज़ पर कार्रवाई करने से पहले हमेशा अपने क्षेत्राधिकार में किसी लाइसेंस प्राप्त पेशेवर के साथ पुष्टि करें।",
    },
  },
  zh: {
    up_hints: {
      up_hint_medical: "私密处理",
      up_hint_legal: "受保护",
      up_hint_gov: "已验证",
      up_hint_bank: "已加密",
      up_hint_financial: "只读",
      up_hint_contract: "条款感知",
      up_hint_invoice: "已解析",
      up_hint_email: "已去除个人隐私",
      up_hint_suspicious: "风险评分",
      up_reassureTitle: "您的隐私优先",
      up_reassureDesc: "文件仅用于您的分析，并在您指示时删除。绝不使用您的数据训练模型，绝不与第三方共享。",
    },
    legal: {
      legal_cookie: "Cookie 政策",
      legal_cookieBody:
        "Klario 使用少量必要的 Cookie 来维持您的登录状态并记住您的语言偏好。我们不使用广告或跨站追踪 Cookie。您的语言选择本地存储在浏览器中；会话令牌是第一方、严格必要的 Cookie。您可以随时从浏览器清除所有 Cookie，Klario 仍会正常工作——只是会请您再次选择语言。",
      legal_aiTransparency: "AI 透明度",
      legal_aiTransparencyBody:
        "Klario 使用大语言模型来阅读、总结和解释您的文档。我们会用通俗的话告诉您模型做了什么，以及它依据了您文档的哪些部分。每次分析都包含置信度，并在相关时标注模型不确定或文本有歧义的情况。我们绝不把 AI 输出当作确定的事实。当 Klario 不确定时，它会如实说明。当某项发现可能影响您的健康、权利或金钱时，我们会建议您向专业人士确认。",
      legal_responsibleAi: "负责任的 AI",
      legal_responsibleAiBody:
        "Klario 的设计目的是为您提供信息，而非替您做决定。我们不构建引导用户采取高风险行为的功能。我们展示每个风险评分和诈骗判定背后的推理，让您自行判断。我们针对常见文档类型和语言进行偏见测试，并如实公布结果。我们不声称完美——我们只承诺对自身局限保持诚实。如果某个功能会增加美感但降低清晰度，我们保留清晰度。",
      legal_financial: "财务免责声明",
      legal_financialBody:
        "Klario 可以阅读银行对账单、发票、合同和财务文档，并用通俗的语言解释其内容。其输出不构成财务、投资、税务或会计建议，也不构成买入、卖出、持有或签署任何内容的建议。Klario 不是受监管的财务顾问。请勿仅依据其输出做出财务决策。在采取任何影响您资金的行动之前，请务必向您所在司法管辖区的持牌专业人士确认。",
    },
  },
  ja: {
    up_hints: {
      up_hint_medical: "非公開処理",
      up_hint_legal: "特権",
      up_hint_gov: "確認済み",
      up_hint_bank: "暗号化",
      up_hint_financial: "読み取り専用",
      up_hint_contract: "条項対応",
      up_hint_invoice: "解析済み",
      up_hint_email: "PII削除済み",
      up_hint_suspicious: "リスク評価",
      up_reassureTitle: "あなたのプライバシーを最優先に",
      up_reassureDesc: "ファイルはあなたの分析のために処理され、あなたの指示で削除されます。データでの学習なし。第三者との共有なし。",
    },
    legal: {
      legal_cookie: "Cookieポリシー",
      legal_cookieBody:
        "Klarioは、セッションを維持し言語を記憶するために少数の必須Cookieを使用します。広告やクロスサイトトラッキングCookieは使用しません。言語の選択はブラウザにローカルに保存され、セッショントークンはファーストパーティの厳格に必要なCookieです。いつでもブラウザからすべてのCookieを削除でき、Klarioは引き続き機能します。ただ言語を再度選ぶよう求められます。",
      legal_aiTransparency: "AI透明性",
      legal_aiTransparencyBody:
        "Klarioは大規模言語モデルを使用して、あなたの書類を読み、要約し、説明します。モデルが何をしたか、書類のどの部分に依存したかを平易な言葉で伝えます。すべての分析には信頼度が含まれ、関連する場合、モデルが不確実なときやテキストが曖昧なときの注記があります。AIの出力を確実な事実として提示することはありません。Klarioがわからないときはそう言います。所見があなたの健康、権利、お金に影響する可能性がある場合、専門家に確認するよう伝えます。",
      legal_responsibleAi: "責任あるAI",
      legal_responsibleAiBody:
        "Klarioは情報を伝えるために作られ、あなたの代わりに決定するためではありません。ユーザーをリスクの高い行動に誘導する機能は作りません。すべてのリスクスコアと詐欺判定の背後にある推論を示し、あなたが自分で判断できるようにします。一般的な書類の種類と言語についてバイアスをテストし、見つけたことを正直に公開します。完璧さを主張しません——限界についての正直さを主張します。機能が美しさを高めても明確さを減らすなら、明確さを保ちます。",
      legal_financial: "財務に関する免責",
      legal_financialBody:
        "Klarioは銀行明細書、請求書、契約書、財務書類を読み、平易な言葉で説明できます。その出力は財務、投資、税務、会計の助言ではなく、何かを買う、売る、保有する、署名するための推奨でもありません。Klarioは規制された財務アドバイザーではありません。出力のみに基づいて財務上の決定を下さないでください。お金に関わる行動をとる前は、必ずあなたの管轄の有資格の専門家に確認してください。",
    },
  },
  ko: {
    up_hints: {
      up_hint_medical: "비공개 처리",
      up_hint_legal: "특권",
      up_hint_gov: "확인됨",
      up_hint_bank: "암호화됨",
      up_hint_financial: "읽기 전용",
      up_hint_contract: "조항 인식",
      up_hint_invoice: "분석됨",
      up_hint_email: "PII 제거됨",
      up_hint_suspicious: "위험 점수",
      up_reassureTitle: "당신의 프라이버시가 먼저",
      up_reassureDesc: "파일은 분석을 위해 처리되고 당신의 명령으로 삭제됩니다. 데이터로 학습하지 않습니다. 제3자와 공유하지 않습니다.",
    },
    legal: {
      legal_cookie: "쿠키 정책",
      legal_cookieBody:
        "Klario는 세션을 유지하고 언어를 기억하기 위해 소수의 필수 쿠키를 사용합니다. 광고 또는 크로스 사이트 추적 쿠키는 사용하지 않습니다. 언어 선택은 브라우저에 로컬로 저장되며, 세션 토큰은 자체 엄격히 필요한 쿠키입니다. 언제든지 브라우저에서 모든 쿠키를 삭제할 수 있으며 Klario는 계속 작동합니다 — 단지 언어를 다시 선택하라는 요청만 받습니다.",
      legal_aiTransparency: "AI 투명성",
      legal_aiTransparencyBody:
        "Klario는 대규모 언어 모델을 사용하여 문서를 읽고 요약하고 설명합니다. 모델이 무엇을 했고 문서의 어떤 부분에 의존했는지 평이한 말로 알려줍니다. 모든 분석에는 신뢰도가 포함되며, 관련될 때 모델이 불확실하거나 텍스트가 모호할 때의 메모가 있습니다. AI 출력을 확실한 것으로 제시하지 않습니다. Klario가 모를 때는 그렇게 말합니다. 소견이 건강, 권리 또는 돈에 영향을 미칠 수 있을 때는 전문가와 확인하라고 알려줍니다.",
      legal_responsibleAi: "책임감 있는 AI",
      legal_responsibleAiBody:
        "Klario는 정보를 제공하기 위해 만들어졌고, 당신을 대신해 결정하기 위해 만들어지지 않았습니다. 사용자를 위험한 행동으로 유도하는 기능은 만들지 않습니다. 모든 위험 점수와 사기 판정 뒤의 추론을 보여 스스로 판단할 수 있게 합니다. 일반적인 문서 유형과 언어에 대해 편향을 테스트하고, 발견한 것을 정직하게 공개합니다. 완벽함을 주장하지 않습니다 — 한계에 대한 정직함을 주장합니다. 기능이 아름다움은 높이지만 명확성은 줄인다면, 명확성을 유지합니다.",
      legal_financial: "재무 면책 고지",
      legal_financialBody:
        "Klario는 은행 명세서, 청구서, 계약서 및 재무 문서를 읽고 그것이 무엇을 말하는지 평이한 말로 설명할 수 있습니다. 그 출력은 재무, 투자, 세무 또는 회계 조언이 아니며, 무언가를 사고, 팔고, 보유하거나 서명하라는 권고도 아닙니다. Klario는 규제받는 재무 자문가가 아닙니다. 출력만으로 재무 결정을 내리지 마세요. 돈에 영향을 미치는 사안에 행동하기 전에 항상 관할권의 면허 있는 전문가와 확인하세요.",
    },
  },
  tr: {
    up_hints: {
      up_hint_medical: "Özel işleme",
      up_hint_legal: "Ayrıcalıklı",
      up_hint_gov: "Doğrulanmış",
      up_hint_bank: "Şifreli",
      up_hint_financial: "Salt okunur",
      up_hint_contract: "Madde farkındalıklı",
      up_hint_invoice: "Ayrıştırıldı",
      up_hint_email: "PII çıkarıldı",
      up_hint_suspicious: "Risk puanlı",
      up_reassureTitle: "Önce gizliliğin",
      up_reassureDesc:
        "Dosyalar analiziniz için işlenir ve komutunuzla silinir. Verilerinizle eğitim yok. Üçüncü taraflarla paylaşım yok.",
    },
    legal: {
      legal_cookie: "Çerez politikası",
      legal_cookieBody:
        "Klario, oturumunu korumak ve dilini hatırlamak için az sayıda temel çerez kullanır. Reklam veya siteler arası takip çerezi kullanmayız. Dil seçimin tarayıcında yerel olarak saklanır; oturum belirtecin birinci taraf, kesinlikle gerekli bir çerezdir. İstediğin zaman tarayıcıdan tüm çerezleri silebilirsin ve Klario çalışmaya devam eder — yalnızca dilini tekrar seçmen istenir.",
      legal_aiTransparency: "AI şeffaflığı",
      legal_aiTransparencyBody:
        "Klario, belgelerini okumak, özetlemek ve açıklamak için büyük dil modelleri kullanır. Modele ne yaptığını ve belgenin hangi bölümlerine dayandığını sade kelimelerle söyleriz. Her analiz bir güven düzeyi içerir ve ilgili olduğunda, modelin emin olmadığı veya metnin belirsiz olduğu durumlar için bir not ekleriz. AI çıktısını kesinlik olarak sunmayız. Klario bilmiyorsa, söyler. Bir bulgu sağlığını, haklarını veya parayı etkileyebilecekse, bir profesyonelle doğrulamana söyleriz.",
      legal_responsibleAi: "Sorumlu AI",
      legal_responsibleAiBody:
        "Klario bilgilendirmek için yapıldı, senin yerine karar vermek için değil. Kullanıcıları riskli eylemlere iten özellikler yapmayız. Her risk puanı ve her dolandırıcılık kararı ardındaki gerekçeyi gösteririz, böylece kendin karar verebilirsin. Yaygın belge türleri ve diller için önyargıyı test ederiz, bulduğumuzu dürüstçe yayımlarız. Kusursuzluğu iddia etmeyiz — sınırlarımız hakkında dürüstlüğü iddia ederiz. Bir özellik güzelliği artırsa da netliği azaltıyorsa, netliği tutarız.",
      legal_financial: "Finansal sorumluluk reddi",
      legal_financialBody:
        "Klario banka ekstrelerini, faturaları, sözleşmeleri ve finansal belgeleri okuyabilir ve ne dediklerini sade kelimelerle açıklayabilir. Çıktısı finansal, yatırım, vergi veya muhasebe tavsiyesi değildir ve bir şey satın almak, satmak, tutmak veya imzalamak için bir tavsiye değildir. Klario düzenlemeye tabi bir finansal danışman değildir. Yalnızca çıktısına dayanarak finansal kararlar alma. Parayı etkileyen herhangi bir şey üzerinde harekete geçmeden önce her zaman kendi yargı bölgendeki lisanslı bir profesyonelle doğrula.",
    },
  },
  ru: {
    up_hints: {
      up_hint_medical: "Приватная обработка",
      up_hint_legal: "Привилегированный",
      up_hint_gov: "Проверено",
      up_hint_bank: "Зашифровано",
      up_hint_financial: "Только чтение",
      up_hint_contract: "Учитывает пункты",
      up_hint_invoice: "Разобран",
      up_hint_email: "PII удалены",
      up_hint_suspicious: "Оценка риска",
      up_reassureTitle: "Ваша приватность прежде всего",
      up_reassureDesc:
        "Файлы обрабатываются для вашего анализа и удаляются по вашей команде. Без обучения на ваших данных. Без передачи третьим лицам.",
    },
    legal: {
      legal_cookie: "Политика файлов cookie",
      legal_cookieBody:
        "Klario использует небольшое количество необходимых файлов cookie для поддержания сессии и запоминания вашего языка. Мы не используем рекламные или межсайтовые отслеживающие cookie. Ваш выбор языка хранится локально в браузере; ваш токен сессии — собственный, строго необходимый cookie. Вы можете очистить все cookie из браузера в любой момент, и Klario продолжит работать — вас лишь попросят заново выбрать язык.",
      legal_aiTransparency: "Прозрачность ИИ",
      legal_aiTransparencyBody:
        "Klario использует большие языковые модели для чтения, краткого изложения и объяснения ваших документов. Мы простыми словами сообщаем, что сделала модель и на какие части вашего документа она опиралась. Каждый анализ включает уровень уверенности и, где уместно, пометку, когда модель не уверена или текст неоднозначен. Мы никогда не выдаём вывод ИИ за истину. Когда Klario не знает, он так и говорит. Когда вывод может повлиять на ваше здоровье, права или деньги, мы советуем подтвердить его с профессионалом.",
      legal_responsibleAi: "Ответственный ИИ",
      legal_responsibleAiBody:
        "Klario создан информировать, а не решать за вас. Мы не делаем функций, подталкивающих пользователей к рискованным действиям. Мы показываем рассуждения за каждой оценкой риска и каждым вердиктом о мошенничестве, чтобы вы могли судить сами. Мы тестируем на предвзятость по распространённым типам документов и языкам и честно публикуем результаты. Мы не утверждаем совершенство — мы утверждаем честность о наших пределах. Если функция улучшит красоту, но снизит ясность, мы сохраняем ясность.",
      legal_financial: "Финансовый отказ от ответственности",
      legal_financialBody:
        "Klario может читать банковские выписки, счета, договоры и финансовые документы и объяснять простыми словами, что в них сказано. Его вывод не является финансовой, инвестиционной, налоговой или бухгалтерской консультацией и не является рекомендацией покупать, продавать, удерживать или подписывать что-либо. Klario — не регулируемый финансовый консультант. Не принимайте финансовые решения только на основе его вывода. Всегда подтверждайте с лицензированным профессионалом в вашей юрисдикции перед действиями, затрагивающими ваши деньги.",
    },
  },
  id: {
    up_hints: {
      up_hint_medical: "Pemrosesan privat",
      up_hint_legal: "Istimewa",
      up_hint_gov: "Terverifikasi",
      up_hint_bank: "Terenkripsi",
      up_hint_financial: "Hanya baca",
      up_hint_contract: "Sadari klausul",
      up_hint_invoice: "Diurai",
      up_hint_email: "PII dihapus",
      up_hint_suspicious: "Skor risiko",
      up_reassureTitle: "Privasi Anda diutamakan",
      up_reassureDesc:
        "File diproses untuk analisis Anda dan dihapus atas perintah Anda. Tanpa pelatihan pada data Anda. Tanpa berbagi dengan pihak ketiga.",
    },
    legal: {
      legal_cookie: "Kebijakan cookie",
      legal_cookieBody:
        "Klario menggunakan sejumlah kecil cookie esensial untuk menjaga sesi Anda dan mengingat bahasa Anda. Kami tidak menggunakan cookie iklan atau pelacakan lintas situs. Pilihan bahasa Anda disimpan secara lokal di peramban Anda; token sesi Anda adalah cookie pihak pertama yang ketat diperlukan. Anda dapat menghapus semua cookie dari peramban kapan saja, dan Klario akan tetap berfungsi — Anda hanya akan diminta memilih bahasa lagi.",
      legal_aiTransparency: "Transparansi AI",
      legal_aiTransparencyBody:
        "Klario menggunakan model bahasa besar untuk membaca, meringkas, dan menjelaskan dokumen Anda. Kami memberi tahu Anda, dalam kata sederhana, apa yang dilakukan model dan bagian mana dokumen Anda yang menjadi rujukannya. Setiap analisis menyertakan tingkat kepercayaan dan, jika relevan, catatan ketika model tidak yakin atau teks ambigu. Kami tidak pernah menyajikan output AI sebagai kepastian. Saat Klario tidak tahu, ia mengatakannya. Saat temuan dapat memengaruhi kesehatan, hak, atau uang Anda, kami menyuruh Anda mengonfirmasi dengan profesional.",
      legal_responsibleAi: "AI yang bertanggung jawab",
      legal_responsibleAiBody:
        "Klario dibuat untuk menginformasikan, bukan memutuskan untuk Anda. Kami tidak membangun fitur yang mendorong pengguna ke tindakan berisiko. Kami menunjukkan penalaran di balik setiap skor risiko dan setiap keputusan penipuan, agar Anda bisa menilai sendiri. Kami menguji bias terhadap jenis dokumen dan bahasa umum, dan mempublikasikan apa yang kami temukan dengan jujur. Kami tidak mengklaim kesempurnaan — kami mengklaim kejujuran tentang batas kami. Jika fitur meningkatkan keindahan tetapi mengurangi kejelasan, kami mempertahankan kejelasan.",
      legal_financial: "Sangkalan finansial",
      legal_financialBody:
        "Klario dapat membaca rekening bank, faktur, kontrak, dan dokumen finansial dan menjelaskan apa yang mereka katakan dalam kata sederhana. Outputnya bukan saran finansial, investasi, pajak, atau akuntansi, dan bukan rekomendasi untuk membeli, menjual, menyimpan, atau menandatangani sesuatu. Klario bukan penasihat finansial yang diatur. Jangan membuat keputusan finansial hanya berdasarkan outputnya. Selalu konfirmasikan dengan profesional berlisensi di yurisdiksi Anda sebelum bertindak atas apa pun yang memengaruhi uang Anda.",
    },
  },
};

const FILE_MAP = {
  "translations-eu.ts": ["fr", "de", "pt", "it", "nl"],
  "translations-rtl.ts": ["ar", "ur", "hi"],
  "translations-cjk.ts": ["zh", "ja", "ko"],
  "translations-other.ts": ["tr", "ru", "id"],
};

function buildHintBlock(lang) {
  const p = PATCHES[lang];
  return Object.entries(p.up_hints)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");
}

function buildLegalBlock(lang) {
  const p = PATCHES[lang];
  return Object.entries(p.legal)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
    .join("\n");
}

function patchFile(filename, langs) {
  const filepath = join(I18N_DIR, filename);
  let content = readFileSync(filepath, "utf8");
  let modified = false;

  for (const lang of langs) {
    const patch = PATCHES[lang];
    if (!patch) continue;

    const blockStartRe = new RegExp(`(export const ${lang}: Translation = \\{)`);
    const blockStartMatch = content.match(blockStartRe);
    if (!blockStartMatch) {
      console.warn(`[${filename}] Could not find block for language: ${lang}`);
      continue;
    }

    const blockStartIdx = blockStartMatch.index + blockStartMatch[0].length;
    const rest = content.slice(blockStartIdx);
    const endMatch = rest.match(/\n\};/);
    if (!endMatch) {
      console.warn(`[${filename}] Could not find end of block for language: ${lang}`);
      continue;
    }
    const blockEndIdx = blockStartIdx + endMatch.index + endMatch[0].length;
    const block = content.slice(blockStartIdx, blockEndIdx);

    let newBlock = block;

    const upAnchorRe = /(\n  up_type_suspicious: [^\n]+,?\n)/;
    const upAnchorMatch = newBlock.match(upAnchorRe);
    if (upAnchorMatch && !newBlock.includes("up_hint_medical")) {
      const hintBlock = buildHintBlock(lang);
      newBlock = newBlock.replace(upAnchorMatch[0], upAnchorMatch[0] + hintBlock + "\n");
    }

    const legalAnchorRe = /(\n  legal_disclaimerBody:\n    "[^"]+",\n)/;
    const legalAnchorMatch = newBlock.match(legalAnchorRe);
    if (legalAnchorMatch && !newBlock.includes("legal_cookie:")) {
      const legalBlock = buildLegalBlock(lang);
      newBlock = newBlock.replace(legalAnchorMatch[0], legalAnchorMatch[0] + legalBlock + "\n");
    }

    if (newBlock !== block) {
      content = content.slice(0, blockStartIdx) + newBlock + content.slice(blockEndIdx);
      modified = true;
      console.log(`[${filename}] Patched ${lang}`);
    } else {
      console.log(`[${filename}] ${lang} already patched or anchors not found`);
    }
  }

  if (modified) {
    writeFileSync(filepath, content, "utf8");
    console.log(`[${filename}] Written.`);
  }
}

for (const [filename, langs] of Object.entries(FILE_MAP)) {
  patchFile(filename, langs);
}

console.log("\nDone. Verify with: bun run lint");
