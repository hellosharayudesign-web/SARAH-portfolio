/* Data constants — ported 1:1 from the JSX source. Image constants now point at
   relative file paths (extracted from the original base64 data URIs) instead of
   inline data URIs. IMG() resolves a filename against the per-page image base
   (window.SY_IMG_BASE), which is set inline in each HTML file before this loads. */

function IMG(file) {
  return (window.SY_IMG_BASE || "assets/images/") + file;
}

const IMG_TREASURY = IMG("img-treasury.jpg");
const IMG_MSME = IMG("img-msme.jpg");
const IMG_POS = IMG("img-pos.jpg");

const LOGO_PWC = IMG("logo-pwc.png");
const LOGO_MONASH = IMG("logo-monash.png");
const LOGO_STERLING = IMG("logo-sterling.png");
const LOGO_CRIMSON = IMG("logo-crimson.png");
const LOGO_SMUGYOU = IMG("logo-smugyou.png");

const TREASURY_HERO = IMG("treasury-hero.png");
const TREASURY_FINALUI = IMG("treasury-finalui.png");
const TREASURY_WIREFRAME = IMG("treasury-wireframe.png");
const TREASURY_WORKFLOW = IMG("treasury-workflow.png");

const VMP_TREASURY = IMG("vmp-treasury.png");
const VMP_MSME = IMG("vmp-msme.png");
const VMP_POS = IMG("vmp-pos.png");

const MSME_HERO = IMG("msme-hero.png");
const MSME_WORKFLOW = IMG("msme-workflow.jpg");
const MSME_FINALUI = IMG("msme-finalui.jpg");
const MSME_AWARD = IMG("msme-award.png");
const MSME_EARLY_EXPLORATION = IMG("msme-early-exploration.jpg");

const POS_HERO = IMG("pos-hero.png");
const POS_QSR = IMG("pos-qsr.jpg");
const POS_FRANCHISE = IMG("pos-franchise.jpg");
const POS_COMPANY_OWNED = IMG("pos-company-owned.jpg");
const POS_AIRPORT = IMG("pos-airport.jpg");
const POS_RAILWAY = IMG("pos-railway.jpg");
const POS_METHODS_1 = IMG("pos-methods-1.jpg");
const POS_METHODS_2 = IMG("pos-methods-2.jpg");

const CRIMSON_SHOWCASE = IMG("crimson-showcase.jpg");
const CRIMSON_MAIN_IMAGE = IMG("crimson-main-image.jpg");

const ABOUT_COLLAGE = IMG("about-collage.jpg");

const PPCARD_TREASURY = IMG("ppcard-treasury.jpg");
const PPCARD_MSME = IMG("ppcard-msme.jpg");
const PPCARD_POS = IMG("ppcard-pos.jpg");
const PPCARD_MOODLE = IMG("ppcard-moodle.jpg");
const PPCARD_STERLING = IMG("ppcard-sterling.jpg");

const CRIMSON = "#B5252F";

/* ---- Home route data ---- */
const PROJECTS = [
  { id: "treasury", route: "projects/treasury.html", ctaPosition: "bottom-right", image: IMG_TREASURY, nativeWidth: 1280, nativeHeight: 538, title: "Government Treasury Finance Platform" },
  { id: "msme", route: "projects/msme-banking.html", ctaPosition: "bottom-left", image: IMG_MSME, nativeWidth: 845, nativeHeight: 538, title: "Designing MSME Banking At Scale" },
  { id: "pos", route: "projects/pos-research.html", ctaPosition: "bottom-right", image: IMG_POS, nativeWidth: 411, nativeHeight: 538, title: "Enhancing POS & Billing Experience For A Global Restaurant Corporation" },
];

const PRINCIPLES = ["Enterprise Design", "Product Strategy", "UX Research", "Collaboration", "Branding", "Freelance"];

const TESTIMONIALS = [
  { quote: "Sharayu consistently delivered thoughtful design solutions while managing multiple stakeholders and tight project timelines. Her ability to balance business objectives with user needs made her a valuable contributor across complex enterprise engagements.", name: "Prateek Sinha", role: "Partner, Experience Consulting · PwC" },
  { quote: "Recognised with the Above and Beyond Award for demonstrating exceptional product thinking, UX leadership, stakeholder collaboration, and problem-solving while delivering a complex MSME banking platform.", name: "Kunjal Thakkar", role: "Director, Experience Consulting · PwC" },
  { quote: "Sharayu led AI-focused research for Moodle, combining user discovery and platform analysis to deliver insights that directly influenced our AI roadmap.", name: "Trev Wood", role: "Senior Manager, Educational Platforms · Monash University" },
  { quote: "Sharayu demonstrated exceptional resilience, communication and teamwork throughout the project, adapting quickly to unexpected challenges while consistently supporting the wider team.", name: "Dr. Joel Moore", role: "Director, Monash Innovation Guarantee · Monash University" },
  { quote: "Sharayu translated every requirement into a thoughtful and distinctive brand identity. The final logo captured the strategic intent behind the practice while delivering a professional identity that exceeded expectations.", name: "Dr. Parthvi Ravat", role: "Consultant Neurologist, Crimson Neurology · Flinders Private Hospital" },
  { quote: "Sharayu delivered high-quality design outcomes within a very short timeframe, demonstrating professionalism, responsiveness and a strong understanding of the project requirements.", name: "Mr. KC", role: "Director, Sterling Homes" },
];

const LOGOS = [
  { name: "pwc", src: LOGO_PWC },
  { name: "Monash University", src: LOGO_MONASH },
  { name: "Sterling Homes", src: LOGO_STERLING },
  { name: "Crimson Neurology", src: LOGO_CRIMSON },
  { name: "Smug You", src: LOGO_SMUGYOU },
];

const VIEW_MORE_ITEMS = [
  { id: "treasury", route: "projects/treasury.html", image: VMP_TREASURY, title: "Government Treasury Finance Platform" },
  { id: "msme", route: "projects/msme-banking.html", image: VMP_MSME, title: "Designing MSME Banking At Scale" },
  { id: "pos", route: "projects/pos-research.html", image: VMP_POS, title: "Scaling Enterprise POS Under Pressure" },
];

/* ---- Treasury case study data ---- */
const TREASURY_META = [
  { label: "ROLE", value: "Associate UI/UX Designer", icon: "user" },
  { label: "COMPANY", value: "PwC · IFMS Project", icon: "building" },
  { label: "DURATION", value: "4 Months", icon: "clock" },
  { label: "COPYRIGHT", value: "PwC & It's Client", icon: "award" },
];

const TREASURY_CHALLENGE_CARDS = [
  { title: "Complex Approvals", description: "Multiple approval layers increased friction across critical processes.", tint: "#F1E7F5", icon: "layers" },
  { title: "Role-Based Access", description: "Different users required tailored experiences while maintaining strong governance.", tint: "#E7F5F3", icon: "shield" },
  { title: "Audit Compliance", description: "Every interaction needed to remain transparent, secure and traceable.", tint: "#FAF3E2", icon: "fileCheck" },
];

const TREASURY_PROCESS_STEPS = [
  { label: "Research", icon: "search", color: "#7A5FC4", pastel: "#D9CCEA" },
  { label: "Workflow Mapping", icon: "map", color: "#2E6DA4", pastel: "#C3DDF2" },
  { label: "Wireframing", icon: "layout", color: "#2F8A68", pastel: "#C6EAE1" },
  { label: "Validation", icon: "checkCircle", color: "#A87418", pastel: "#F4E8C4" },
  { label: "UI Design", icon: "penTool", color: "#B03D6E", pastel: "#F6C9DC" },
  { label: "Developer Handoff", icon: "code", color: "#8A2E90", pastel: "#E6C6EA" },
];

const TREASURY_TABS = [
  { label: "Workflow", image: TREASURY_WORKFLOW },
  { label: "Wireframe", image: TREASURY_WIREFRAME },
  { label: "Final UI", image: TREASURY_FINALUI },
];

const TREASURY_CONTRIBUTION = [
  { title: "Stakeholder Interviews", description: "Understanding real operational needs.", icon: "user" },
  { title: "Workflow Analysis", description: "Simplifying complex financial journeys.", icon: "map" },
  { title: "Wireframe Validation", description: "Testing ideas before development.", icon: "layout" },
  { title: "Cross-Functional Collaboration", description: "Aligning design with engineering.", icon: "puzzle" },
];

const TREASURY_IMPACT = [
  { title: "Validated Workflows", description: "Reviewed with treasury stakeholders.", icon: "checkCircle" },
  { title: "Simplified Approvals", description: "Faster, clearer financial processes.", icon: "fileCheck" },
  { title: "Production-Ready UI", description: "Ready for engineering handoff.", icon: "code" },
  { title: "Compliance By Design", description: "Built for governance and audit.", icon: "shield" },
];

/* ---- MSME case study data ---- */
const MSME_META = [
  { label: "ROLE", value: "Associate UI Designer", icon: "user" },
  { label: "COMPANY", value: "PwC · Private Banking", icon: "building" },
  { label: "DURATION", value: "7 Months", icon: "clock" },
  { label: "COPYRIGHT", value: "PwC & Its Client", icon: "award" },
];

const MSME_OPPORTUNITY_CARDS = [
  { title: "Everyday Banking", description: "Reduce friction across the most frequently used banking journeys.", tint: "#F1E7F5", icon: "user" },
  { title: "Product Ecosystem", description: "Create a connected experience across multiple financial products.", tint: "#E7F5F3", icon: "layers" },
  { title: "Scalable Experience", description: "Build reusable interface patterns that support long-term product growth.", tint: "#FAF3E2", icon: "target" },
];

const MSME_TABS = [
  { label: "Workflow", image: MSME_WORKFLOW },
  { label: "Early Exploration", image: MSME_EARLY_EXPLORATION },
];

const MSME_CONTRIBUTION = [
  { title: "Led UI Design", description: "Led UI execution for the Account & Statement Generation experience.", icon: "penTool" },
  { title: "Information Architecture", description: "Translated technical workflows into intuitive customer journeys.", icon: "map" },
  { title: "Interactive Prototypes", description: "Delivered high-fidelity prototypes for stakeholder reviews and developer handoff.", icon: "layout" },
  { title: "Collaboration", description: "Worked closely with technology teams, business stakeholders and design leadership throughout delivery.", icon: "puzzle" },
];

const MSME_IMPACT = [
  { title: "Production-Ready Deliverables", description: "Delivered high-fidelity prototypes for stakeholder alignment and engineering handoff.", tint: "#F1E7F5", icon: "fileCheck" },
  { title: "Scalable Product Foundations", description: "Established reusable interface patterns across multiple banking journeys.", tint: "#E7F5F3", icon: "layers" },
  { title: "Cross-Functional Delivery", description: "Worked with product, engineering and business teams to deliver a cohesive enterprise banking experience.", tint: "#FAF3E2", icon: "puzzle" },
];

/* ---- POS research case study data ---- */
const POS_META = [
  { label: "ROLE", value: "Associate UX Researcher", icon: "user" },
  { label: "TEAM", value: "Experience Consulting", icon: "puzzle" },
  { label: "DURATION", value: "3 Months", icon: "clock" },
  { label: "TYPE", value: "Field-led Enterprise Research", icon: "search" },
];

const POS_CHALLENGE_CARDS = [
  { title: "Operational Complexity", description: "Multiple store formats operating under different workflows.", tint: "#F1E7F5", icon: "layers" },
  { title: "Manual Workarounds", description: "Staff compensating for system limitations during service.", tint: "#E7F5F3", icon: "penTool" },
  { title: "Growing Scale", description: "Legacy processes no longer supporting business growth.", tint: "#FAF3E2", icon: "target" },
];

const POS_JOURNEY = [
  { label: "QSR Outlets", image: POS_QSR },
  { label: "Franchise Stores", image: POS_FRANCHISE },
  { label: "Company-Owned Stores", image: POS_COMPANY_OWNED },
  { label: "Airport Outlets", image: POS_AIRPORT },
  { label: "Railway Coach Outlets", image: POS_RAILWAY },
];

const POS_METHODS = [
  { title: "Ethnographic Observation", description: "Shadowed live billing and payment workflows.", icon: "search" },
  { title: "Mystery Shopping", description: "Experienced customer journeys across different outlets.", icon: "target" },
  { title: "Interviews", description: "Spoke with managers, frontline staff and customers.", icon: "user" },
  { title: "Synthesis Workshops", description: "Translated behavioural observations into enterprise insights.", icon: "puzzle" },
];

const POS_METHODS_IMAGES = [POS_METHODS_1, POS_METHODS_2];

const POS_FINDINGS_EMPLOYEE = [
  { title: "Manual Recovery", description: "Staff developed informal workarounds when the system failed.", icon: "penTool", tint: "#F1E7F5" },
  { title: "Cognitive Load", description: "Employees balanced multiple systems under constant time pressure.", icon: "layers", tint: "#E7F5F3" },
];

const POS_FINDINGS_CUSTOMER = [
  { title: "Fragmented Experiences", description: "Customers experienced inconsistent service across different store formats.", icon: "map", tint: "#FAF3E2" },
  { title: "Limited Visibility", description: "Operational issues remained invisible until they surfaced in the customer experience.", icon: "search", tint: "#F1E7F5" },
];

const POS_RECOMMENDATIONS = [
  { title: "Role-Based Operational Dashboards", description: "Tailored visibility into daily operations for each store role.", tint: "#F1E7F5", icon: "layout" },
  { title: "Unified System Integration", description: "Connected POS, billing and inventory systems into a single operational view.", tint: "#E7F5F3", icon: "puzzle" },
  { title: "Centralised Customer Data", description: "A shared customer record across all store formats and channels.", tint: "#FAF3E2", icon: "user" },
  { title: "Digitised QSR Ordering", description: "Reduced manual order-taking through digital ordering pathways.", tint: "#F1E7F5", icon: "target" },
  { title: "Standardised Loyalty And Refund Framework", description: "Consistent loyalty and refund handling across every outlet.", tint: "#E7F5F3", icon: "checkCircle" },
];

const POS_IMPACT = [
  { title: "Enterprise Priorities", description: "Contributed to enterprise conversations around future POS modernisation.", tint: "#F1E7F5", icon: "target" },
  { title: "Cross-Functional Collaboration", description: "Aligned stakeholders across operations, technology and business teams.", tint: "#E7F5F3", icon: "puzzle" },
  { title: "Scalable Recommendations", description: "Findings translated into recommendations for a scalable, modernised POS framework.", tint: "#FAF3E2", icon: "layers" },
];

/* ---- Projects listing page ---- */
const PROJECTS_PAGE_ITEMS = [
  { id: "treasury", category: "product", route: "projects/treasury.html", image: PPCARD_TREASURY, title: "Government Treasury Finance Platform", subtitle: "Enterprise UX" },
  { id: "msme", category: "product", route: "projects/msme-banking.html", image: PPCARD_MSME, title: "Designing MSME Banking At Scale.", subtitle: "Product Design" },
  { id: "pos", category: "product", route: "projects/pos-research.html", image: PPCARD_POS, title: "Scaling Enterprise POS Under Pressure.", subtitle: "UX Research" },
  { id: "moodle", category: "product", route: "projects/moodle-hive.html", image: PPCARD_MOODLE, title: "Monash University Student Platform", subtitle: "Educational Design | Monash" },
  { id: "crimson", category: "visual", route: "projects/crimson-neurology.html", image: CRIMSON_SHOWCASE, title: "Crimson Neurology", subtitle: "Flinders Private Hospital Based Clinic" },
  { id: "sterling", category: "visual", route: "projects/sterling-homes.html", image: PPCARD_STERLING, title: "Sterling Homes | Print Design", subtitle: "South Australia's Leading Builders" },
];

/* ---- About page ---- */
const ABOUT_STATS = [
  { value: "4+", label: "Years", detail: "Product & UX Design" },
  { value: "20+", label: "Projects", detail: "Enterprise & Consumer" },
  { value: "5+", label: "Domains", detail: "Finance, Government, Education, Healthcare, Consumer" },
];

const ABOUT_STRENGTHS = [
  { title: "User Centered Mindset", icon: "user" },
  { title: "Systems Thinking", icon: "layers" },
  { title: "Design Craft", icon: "penTool" },
  { title: "Cross-Functional Collaboration", icon: "puzzle" },
  { title: "Data Informed Decision", icon: "target" },
];

/* ---- Contact page ---- */
const CONTACT_ITEMS = [
  { label: "EMAIL", value: "hello.sharayu.design@gmail.com", icon: "mail", href: "mailto:hello.sharayu.design@gmail.com" },
  { label: "LINKEDIN", value: "linkedin.com/in/sharayu-design/", icon: "linkExternal", href: "https://www.linkedin.com/in/sharayu-design/" },
  { label: "RESUME", value: "Download CV", icon: "fileCheck", href: "assets/resume/Sharayu.Design_Resume.pdf.pdf", download: true },
  { label: "LOCATION", value: "Melbourne, Australia", icon: "map", href: null },
];
