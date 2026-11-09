// All site content lives here. Edit this file to add projects or links.
window.SITE = {
  name: "Rayen Ben Abdelhafidh",
  role: "Telecommunications engineer building AI systems, cloud platforms and embedded Linux and automotive software.",
  location: "Sfax, Tunisia. Open to roles in Europe, Canada and remote.",
  links: {
    email: "legendbro1555@gmail.com",
    linkedin: "https://www.linkedin.com/in/rayenabdelhafidh/",
    github: "https://github.com/rayen-abdelhafidh",
    upwork: "https://www.upwork.com/freelancers/~0182cd6379e2c8bb48",
    cv: "cv/Rayen_BenAbdelhafidh_CV_EN.pdf"
  },

  tracks: {
    ai: {
      name: "AI & LLM engineering",
      short: "Fine-tuned LLMs, RAG, voice agents and computer vision running for real clients.",
      intro: "I build AI systems that run in production: language models trained on a company's own data, voice and chat agents that act on real tools, and vision models on live video. Most of this work was delivered to paying clients through Upwork, where I am Top Rated with 21 jobs and a 5.0 rating.",
      wave: "denoise"
    },
    cloud: {
      name: "Cloud, DevOps & networks",
      short: "Containerised platforms, reverse proxies, CI/CD and 5G network monitoring.",
      intro: "I design and run the infrastructure under the applications I ship: Docker Compose stacks behind Nginx or Caddy, CI/CD on GitHub Actions, PostgreSQL and Redis, and real-time services. My telecom training adds routing, switching and 5G quality-of-service work.",
      wave: "square"
    },
    automotive: {
      name: "Automotive & embedded",
      short: "Embedded Linux with Yocto, kernel drivers and secure boot, plus AUTOSAR and in-vehicle networks.",
      intro: "I build embedded Linux systems from the ground up: cross toolchains, U-Boot with secure boot, kernel modules and drivers, and Yocto images with OTA updates, on Raspberry Pi and QEMU. My final engineering year is the GT-ACE specialisation at ENET'Com, adding AUTOSAR architecture, in-vehicle networks, automotive safety and security, and CI/CD for vehicle software.",
      wave: "can"
    },
    security: {
      name: "Security",
      short: "Server and API hardening, payment and webhook security, AI agent security.",
      intro: "Security runs through the systems I deploy: hardened servers and APIs, verified payment webhooks, encrypted secrets and least-privilege access. I hold the eJPT penetration-testing certification and am focusing on securing AI agents and MCP servers.",
      wave: "burst"
    }
  },

  // status: live | client | academic | progress | planned
  projects: [
    {
      id: "mtm2", tracks: ["ai"], featured: true, status: "academic",
      title: "MTM-2 Methods Service",
      what: "Generates standard minute values and operation routings for garment factories from a product description, replacing hours of manual Methods-Time Measurement analysis.",
      how: "GPT fine-tuned on factory method data, retrieval over an element library, and multi-level validation of every generated time. Started as my second-year engineering project (defended April 2026) and grew into a multi-tenant service.",
      stack: ["Python", "GPT fine-tuning", "RAG", "Streamlit", "Azure"],
      links: {}
    },
    {
      id: "clinic", tracks: ["ai"], featured: true, status: "client",
      title: "AI phone receptionist for a clinic",
      what: "Answers patient calls, understands the request and books the appointment directly in the clinic's existing web booking form.",
      how: "Twilio voice in, Whisper transcription, GPT dialogue, then Playwright drives the booking site. Staff review calls and bookings in an admin dashboard.",
      stack: ["FastAPI", "Twilio", "OpenAI Whisper", "GPT", "Playwright", "SQLite"],
      links: {}
    },
    {
      id: "radar", tracks: ["ai"], status: "client",
      title: "Job Accès Radar and ATS migration",
      what: "AI prospecting agent for a Québec recruitment firm that finds and scores employers and syncs them to the CRM. Before that, I migrated their full recruiting history from Zoho Recruit to Manatal.",
      how: "PostgreSQL data vault, LLM scoring, GoHighLevel sync, and a tested migration of candidates, jobs, matches and résumés.",
      stack: ["Python", "PostgreSQL", "LLM agents", "GoHighLevel API", "pytest"],
      links: {}
    },
    {
      id: "course", tracks: ["ai"], status: "client",
      title: "AI course maker",
      what: "Turns a topic into a finished, narrated video course.",
      how: "An LLM writes the script, then TTS narration, generated diagrams and a talking-head presenter are assembled into MP4 lessons.",
      stack: ["Python", "OpenAI", "Replicate", "FFmpeg", "Docker"],
      links: {}
    },
    {
      id: "hachira", tracks: ["ai"], status: "academic",
      title: "HACHIRA real-time anomaly detection",
      what: "Detects abnormal behaviour on live camera streams and alerts a mobile app. Team project, awarded a certificate.",
      how: "YOLOv8 and YOLOv8-Pose on IP-camera video, a Flask inference service, Firebase for events and a Flutter companion app.",
      stack: ["YOLOv8", "PyTorch", "Flask", "Firebase", "Flutter"],
      links: {}
    },
    {
      id: "pdf", tracks: ["ai"], status: "client",
      title: "PDF to Excel extraction bot",
      what: "Reads batches of scanned PDFs and fills a sorted Excel workbook with the extracted fields.",
      how: "Tesseract OCR followed by LLM field extraction and validation.",
      stack: ["Python", "Tesseract", "OpenRouter", "pandas"],
      links: { repo: "https://github.com/rayen-abdelhafidh/Bot-to-scrape-PDFs-and-populate-Excel" }
    },
    {
      id: "trading", tracks: ["cloud"], featured: true, status: "client",
      title: "Trading signal analytics platform",
      what: "Receives TradingView alerts, paper-trades them and reports performance per strategy in a live dashboard.",
      how: "Async FastAPI and SQLAlchemy on PostgreSQL, Redis for queues and caching, a React and TypeScript front end, all shipped as a Docker Compose stack behind Nginx.",
      stack: ["FastAPI", "PostgreSQL", "Redis", "React", "TypeScript", "Docker", "Nginx"],
      links: {}
    },
    {
      id: "jobkonnektor", tracks: ["cloud"], featured: true, status: "live",
      title: "German Jobkonnektor",
      what: "Website for a recruitment agency placing candidates in Germany, in German, English, French and Arabic with full right-to-left support.",
      how: "Next.js 16 and TypeScript, containerised with Docker and Caddy, deployed by GitHub Actions.",
      stack: ["Next.js", "TypeScript", "Tailwind", "Docker", "Caddy", "GitHub Actions"],
      links: { live: "https://germanjobkonnektor.com/en/" }
    },
    {
      id: "neurospace", tracks: ["cloud"], status: "client",
      title: "NeuroSpace virtual classroom",
      what: "Live online classroom for NeuroProdige (Québec): video, a shared whiteboard and session tools for teachers and students.",
      how: "LiveKit for real-time video, an Excalidraw whiteboard synchronised with Yjs and Hocuspocus, Node 22 services and a React client. I led the IT team on this product.",
      stack: ["LiveKit", "Yjs", "Hocuspocus", "Node.js", "React"],
      links: {}
    },
    {
      id: "school", tracks: ["cloud"], status: "client",
      title: "Driving-school management platform",
      what: "MVP for a driving school in Québec: separate apps for students, instructors and the office, with lesson booking that follows SAAQ rules.",
      how: "Booking rules engine, payments, and a queued sync to QuickBooks for accounting.",
      stack: ["Node.js", "HTML", "QuickBooks API"],
      links: {}
    },
    {
      id: "scanner", tracks: ["cloud"], status: "client",
      title: "Crypto market scanner",
      what: "Scans every Binance USDT pair on a schedule and alerts on EMA-30 signals by Telegram, Discord and email.",
      how: "FastAPI with APScheduler workers, Redis and SQLAlchemy.",
      stack: ["FastAPI", "APScheduler", "Redis", "SQLAlchemy"],
      links: {}
    },
    {
      id: "qos", tracks: ["cloud"], status: "academic",
      title: "Smart 5G QoS dashboard",
      what: "Monitors quality of service across a 5G network in Sfax and flags degraded cells on a map.",
      how: "Isolation Forest anomaly detection and regression on network KPIs, mapped with Folium in Streamlit.",
      stack: ["Python", "scikit-learn", "Streamlit", "Folium"],
      links: {}
    },
    {
      id: "can-ids", tracks: ["automotive", "security"], featured: true, status: "planned",
      title: "CAN bus intrusion detection",
      what: "Detects injected and spoofed frames on a vehicle CAN bus.",
      how: "Planned for early 2027: capture and replay CAN traffic, then train a deep learning model on frame timing and payload patterns. Combines the automotive networks, security and deep learning courses.",
      stack: ["CAN", "Python", "PyTorch", "SocketCAN"],
      links: {}
    },
    {
      id: "autosar-swc", tracks: ["automotive"], status: "progress",
      title: "AUTOSAR software component lab",
      what: "Software components, ports and runnables designed and integrated on the AUTOSAR Classic layered architecture.",
      how: "Coursework and lab sessions in System Architecture (AUTOSAR), 2026/2027.",
      stack: ["AUTOSAR Classic", "C", "RTE"],
      links: {}
    },
    {
      id: "auto-cicd", tracks: ["automotive", "cloud"], status: "progress",
      title: "CI/CD for automotive software",
      what: "A pipeline that builds, unit-tests and statically checks embedded C on every commit.",
      how: "Built in the DevOps CI/CD for Automotive course, combined with what I already run in production with GitHub Actions and Docker.",
      stack: ["GitHub Actions", "Docker", "C", "Unit testing"],
      links: {}
    },
    {
      id: "webhook-sec", tracks: ["security"], featured: true, status: "client",
      title: "Payment and webhook security",
      what: "Secured the payment flow for NeuroProdige: the gateway integration, webhook signature verification and encryption of keys and customer data.",
      how: "Deployed behind Nginx with TLS, CI/CD and automated backups on a hardened VPS.",
      stack: ["Nginx", "TLS", "Webhook signatures", "Encryption at rest"],
      links: {}
    },
    {
      id: "hardening", tracks: ["security"], status: "client",
      title: "Hardening client deployments",
      what: "Security reviews and fixes for client servers and APIs I deploy: secret management, access control, rate limiting and TLS.",
      how: "Applied across the trading, scanner and SaaS projects listed on this site.",
      stack: ["Linux", "Nginx", "Docker", "Secrets management"],
      links: {}
    },
    {
      id: "mcp-sec", tracks: ["security", "ai"], status: "progress",
      title: "Security layer for MCP servers",
      what: "Defence in depth for AI agents that call tools through MCP servers: scoped tokens per tool, sandboxed execution and prompt-injection filtering.",
      how: "OAuth2 and JWT, Docker sandboxes with allow-lists, schema validation of tool calls, secret redaction and signed audit logs.",
      stack: ["MCP", "OAuth2", "JWT", "Docker", "Grafana"],
      links: {}
    }
  ],

  embedded: [
    { area: "Linux kernel development", items: "Kernel modules, character devices, GPIO, LED, I²C and SPI subsystems, sysfs, config fragments" },
    { area: "Yocto and BitBake", items: "Layers and metadata, machine configs, images, distros, RAUC over-the-air updates" },
    { area: "Bootloaders and secure boot", items: "U-Boot, dm-crypt, dm-verity" },
    { area: "Build systems and toolchains", items: "GCC, binutils, crosstool-ng, cross and Canadian-cross compilation, make, CMake" },
    { area: "OS internals", items: "Kbuild, system calls, device trees and overlays" },
    { area: "Peripheral interfaces", items: "I²C, SPI, GPIO, UART, with i2c-tools, spidev and libgpiod" },
    { area: "Root filesystems and libraries", items: "BusyBox, initramfs, static and shared libraries" },
    { area: "Platforms", items: "Raspberry Pi Zero 2 W, QEMU (ARM)" },
    { area: "Scripting and version control", items: "Bash, POSIX shell, Git submodules and patches" }
  ],

  coursework: [
    { name: "System architecture: AUTOSAR", detail: "Lectures and labs on the layered AUTOSAR Classic architecture." },
    { name: "Automotive communication networks", detail: "In-vehicle networks, with lab sessions." },
    { name: "Automotive safety and security", detail: "Functional safety and vehicle cybersecurity." },
    { name: "Automotive test techniques", detail: "Testing methods for vehicle software." },
    { name: "DevOps and CI/CD for automotive", detail: "Build and test pipelines for vehicle software." },
    { name: "Smart automotive mobility", detail: "Connected and intelligent mobility systems." },
    { name: "Deep learning", detail: "Lectures and labs." },
    { name: "Satellite data processing and space engineering", detail: "Signal and data processing for satellite systems." }
  ],

  experience: [
    { when: "2025 – now", title: "Cloud, AI and automation engineer", org: "Freelance on Upwork", note: "Top Rated, 21 jobs, 5.0 rating. AI agents, LLM fine-tuning, trading systems, CRM automation and secure deployments." },
    { when: "2025 – now", title: "IT manager", org: "NeuroProdige and SoluClient, Québec (remote)", note: "Run servers, CRM automation and operations for two fully remote companies." },
    { when: "2025 – now", title: "Co-founder, marketing lead", org: "AlgoMakers.ai, Saudi Arabia", note: "Lead a team of 9 building lead-generation bots, chatbots and cloud infrastructure for trading services." },
    { when: "Summer 2025", title: "IT team lead intern", org: "NeuroProdige, Québec (remote)", note: "Led the IT team, built the company website and its cloud setup, and secured the payment flow." },
    { when: "Summer 2025", title: "Development intern", org: "Softavera (Aures Konnect), Tunisia", note: "Task-management web app with WhatsApp and SMS notifications and a chatbot, in React, Node.js and PostgreSQL." }
  ],

  education: [
    { when: "2024 – 2027", title: "Telecommunications engineering degree, GT-ACE specialisation", org: "ENET'Com, National School of Electronics and Telecommunications of Sfax" },
    { when: "2022 – 2024", title: "Preparatory cycle, physics and chemistry", org: "IPEIM, Monastir" }
  ],

  certifications: ["eJPT, Junior Penetration Tester (INE)", "CCNA 1 and 2 (Cisco)", "HCIA-Datacom (Huawei)", "Cybersecurity Fundamentals (Google)"],
  languages: "Arabic (native), French (fluent), English (fluent)"
};

// Visuals per project. kind "shot" = real screenshot, "diagram" = architecture diagram.
window.SITE.media = {
  mtm2:          { src: "img/shots/mtm2.webp", kind: "shot", bar: "MTM-2 Méthodes, draft review", alt: "MTM-2 draft screen showing a generated routing with standard minute values per operation" },
  neurospace:    { src: "img/shots/neurospace.webp", kind: "shot", bar: "NeuroSpace, live session", alt: "NeuroSpace classroom with a shared whiteboard, tutor and student video, and chat" },
  school:        { src: "img/shots/school.webp", kind: "shot", bar: "Côte-Nord platform, office dashboard", alt: "Driving-school dashboard with enrolments, revenue chart, today's lessons and alerts" },
  jobkonnektor:  { src: "img/shots/jobkonnektor.webp", kind: "shot", bar: "rayenbenabdelhafidh.github.io/German-Jobkonnektor", alt: "German Jobkonnektor homepage in German" },
  clinic:        { src: "img/diagrams/clinic.svg", kind: "diagram", alt: "Call flow: Twilio, Whisper, GPT agent, Playwright booking" },
  trading:       { src: "img/diagrams/trading.svg", kind: "diagram", alt: "TradingView alerts through Nginx to FastAPI, PostgreSQL, Redis and a React dashboard" },
  radar:         { src: "img/diagrams/radar.svg", kind: "diagram", alt: "Prospect sources into a PostgreSQL data vault, LLM scoring and CRM sync" },
  course:        { src: "img/diagrams/course.svg", kind: "diagram", alt: "Topic to LLM script to media generation to MP4 assembly" },
  hachira:       { src: "img/diagrams/hachira.svg", kind: "diagram", alt: "IP cameras to YOLOv8 detection to Flask rules to mobile alerts" },
  pdf:           { src: "img/diagrams/pdf.svg", kind: "diagram", alt: "PDFs through OCR and LLM extraction into Excel" },
  scanner:       { src: "img/diagrams/scanner.svg", kind: "diagram", alt: "Binance pairs scanned on a schedule for EMA signals, with alerts" },
  qos:           { src: "img/diagrams/qos.svg", kind: "diagram", alt: "5G KPIs into an anomaly model, map and dashboard" },
  "can-ids":     { src: "img/diagrams/canids.svg", kind: "diagram", alt: "CAN traffic captured with SocketCAN, features, deep learning detector" },
  "autosar-swc": { src: "img/diagrams/autosar.svg", kind: "diagram", alt: "AUTOSAR layers: application, RTE, basic software, microcontroller" },
  "auto-cicd":   { src: "img/diagrams/autocicd.svg", kind: "diagram", alt: "Commit, cross build, tests and static analysis, artifacts" },
  "webhook-sec": { src: "img/diagrams/webhook.svg", kind: "diagram", alt: "Payment flow with webhook signature verification" },
  hardening:     { src: "img/diagrams/hardening.svg", kind: "diagram", alt: "Layers of server hardening" },
  "mcp-sec":     { src: "img/diagrams/mcp.svg", kind: "diagram", alt: "AI agent to gateway, sandbox and MCP tools with guards" }
};

window.SITE.showcase = ["mtm2", "neurospace", "school", "jobkonnektor"];
window.SITE.more = ["clinic", "trading", "radar", "webhook-sec"];

window.SITE.proof = [
  { big: "Top Rated", small: "on Upwork, 5.0 client rating" },
  { big: "21 jobs", small: "completed for Upwork clients" },
  { big: "Remote clients", small: "in Canada, Germany and Saudi Arabia" },
  { big: "3 languages", small: "Arabic, French and English" }
];
