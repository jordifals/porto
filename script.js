// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
function highlightNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}
window.addEventListener('scroll', highlightNav);

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Typing Effect =====
const typingElement = document.getElementById('typing-text');
const roles = [
  'Backend Developer',
  'Data Engineer',
  'Database Specialist',
  'Pipeline Architect'
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseEnd = 0;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const now = Date.now();

  if (now < pauseEnd) {
    requestAnimationFrame(typeEffect);
    return;
  }

  if (!deleting) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      deleting = true;
      pauseEnd = now + 2000;
    }
  } else {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = deleting ? 40 : 80;
  setTimeout(() => requestAnimationFrame(typeEffect), speed);
}
typeEffect();

// ===== Contact Form Handler =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Pesan Terkirim!`;
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
    contactForm.reset();
  }, 3000);
});

// ===== Counter Animation =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = Date.now();

    function updateCounter() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      counter.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(updateCounter);
    }
    updateCounter();
  });
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ===== Smooth parallax on hero =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-image-wrapper');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});

// ===== Project Detail Modal =====
const projectsData = {
  1: {
    title: 'Data Pipeline Orchestration — Apache Airflow',
    image: 'project/Dags_Airflow.png',
    status: 'DEPLOYED',
    duration: 'Januari 2026 — Maret 2026',
    role: 'Data Engineer Intern',
    description: 'Proyek ini berfokus pada pembangunan dan pengelolaan DAGs (Directed Acyclic Graphs) pada Apache Airflow untuk mengotomasi seluruh pipeline data di lingkungan PT Wahana Express. Saya merancang arsitektur DAG yang modular dan scalable, yang mampu menjalankan proses ETL secara terjadwal dan paralel. Pipeline ini menghubungkan sumber data MariaDB, melakukan transformasi menggunakan dbt (data build tool), dan memuat hasilnya ke Apache Doris sebagai data warehouse analitik.',
    features: [
      'Membangun 4 DAGs utama: wahana_AGBAL, wahana_coba_two_dags, wahana_live, dan wahana_nama_karyawan_incremental',
      'Mengimplementasikan scheduling otomatis dengan cron expression untuk eksekusi pipeline setiap menit',
      'Mengintegrasikan Apache Airflow dengan dbt untuk menjalankan model transformasi data secara otomatis',
      'Menerapkan tag-based organization (dbt, doris, wahana) untuk memudahkan pengelolaan DAGs',
      'Monitoring pipeline melalui dashboard Airflow dengan visualisasi status run (success/failed)',
      'Mengoptimasi waktu eksekusi DAG hingga di bawah 15 detik per run'
    ],
    tech: ['Apache Airflow', 'dbt', 'Apache Doris', 'Python', 'Bash', 'SQL', 'Docker', 'Linux'],
    github: '#'
  },
  2: {
    title: 'Real-time Data Migration — Apache Flink',
    image: 'project/Transform_data.png',
    status: 'RUNNING',
    duration: 'Februari 2026 — Maret 2026',
    role: 'Data Engineer Intern',
    description: 'Proyek migrasi data real-time dari database MariaDB ke Apache Doris menggunakan Apache Flink CDC (Change Data Capture). Sistem ini dirancang untuk memastikan sinkronisasi data secara kontinu antara database sumber (OLTP) dan data warehouse (OLAP) dengan minimal downtime. Apache Flink berjalan sebagai streaming job yang terus aktif memantau perubahan data di MariaDB dan langsung mereplikasinya ke Apache Doris.',
    features: [
      'Mengkonfigurasi Apache Flink CDC connector untuk menangkap perubahan data secara real-time',
      'Menjalankan job migrasi yang berjalan kontinu selama lebih dari 2 hari tanpa downtime',
      'Memproses jutaan record dari multiple tabel database sumber secara paralel',
      'Mengimplementasikan Flink Dashboard untuk monitoring status job, task slots, dan performa',
      'Menangani skema tabel yang kompleks dengan berbagai tipe data dan constraint',
      'Memastikan konsistensi data antara sumber dan tujuan (exactly-once semantics)'
    ],
    tech: ['Apache Flink', 'Flink CDC', 'MariaDB', 'Apache Doris', 'Docker', 'YAML', 'SQL', 'Linux'],
    github: '#'
  },
  3: {
    title: 'Dashboard Visualisasi — Apache Superset',
    image: 'project/Visualisasi Data Apache Superset.png',
    status: 'LIVE',
    duration: 'Maret 2026',
    role: 'Data Engineer Intern',
    description: 'Membangun dashboard analitik interaktif menggunakan Apache Superset yang menampilkan visualisasi data penjualan dan performa bisnis secara real-time. Dashboard ini terhubung langsung dengan Apache Doris sebagai data source, memungkinkan eksekusi query analitik yang cepat pada dataset besar. Dashboard "Analysis Store" menyajikan berbagai metrik bisnis penting dalam satu tampilan yang mudah dipahami oleh stakeholder.',
    features: [
      'Membuat dashboard "Analysis Store" dengan 5 KPI utama: Total Pendapatan (Rp 2.49M+), Total Pesanan (1,500), Rata-Rata Pesanan (Rp 34.1M+), Total Pelanggan (1,500), dan Total Produk (80)',
      'Mengimplementasikan line chart Pendapatan Bulanan untuk analisis tren penjualan sepanjang tahun',
      'Membuat donut chart Status Pesanan untuk monitoring status (completed, shipped, processing, pending, cancelled)',
      'Membangun horizontal bar chart Store Category untuk analisis performa per kategori produk',
      'Mengembangkan TOP 10 Penjualan Kota dengan horizontal bar chart untuk identifikasi area potensial',
      'Menambahkan chart TOP Tren Per Days untuk analisis pola penjualan harian',
      'Mengimplementasikan filter interaktif (Filter Date, No Filter) untuk eksplorasi data dinamis'
    ],
    tech: ['Apache Superset', 'Apache Doris', 'SQL', 'Data Visualization', 'Analytics', 'Chart.js', 'Python'],
    github: '#'
  },
  4: {
    title: 'ETL Automation — Airflow + dbt',
    image: 'project/airflow_dbt.png',
    status: 'COMPLETED',
    duration: 'Februari 2026 — Maret 2026',
    role: 'Data Engineer Intern',
    description: 'Mengotomatisasi seluruh proses ETL (Extract, Transform, Load) menggunakan kombinasi Apache Airflow sebagai orchestrator dan dbt (data build tool) sebagai transformation engine. Proyek ini menjalankan model incremental dbt melalui BashOperator di Airflow, yang memungkinkan transformasi data berjalan secara terjadwal dan terpantau. Log execution menunjukkan proses yang berhasil menjalankan model dbt.AGBAL dengan 0 errors dan 0 warnings.',
    features: [
      'Mengintegrasikan dbt dengan Apache Airflow menggunakan BashOperator untuk eksekusi model transformasi',
      'Mengimplementasikan model incremental dbt untuk efisiensi pemrosesan data (hanya memproses data baru)',
      'Berhasil menjalankan pipeline dengan hasil: PASS=1, WARN=0, ERROR=0, SKIP=0, TOTAL=1',
      'Waktu eksekusi yang optimal: 1 model incremental selesai dalam 1.48 detik',
      'Menggunakan dbt adapter doris versi 0.4.0 untuk koneksi langsung ke Apache Doris',
      'Menerapkan scheduling otomatis dengan monitoring log yang detail untuk troubleshooting',
      'Registered 6 models dan 7 sources dengan 462 macros dalam satu project dbt'
    ],
    tech: ['Apache Airflow', 'dbt', 'Apache Doris', 'Python', 'Bash', 'SQL', 'BashOperator', 'Linux'],
    github: '#'
  }
};

// DOM Elements
const modalOverlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openProjectModal(projectId) {
  const project = projectsData[projectId];
  if (!project) return;

  // Populate modal content
  document.getElementById('modal-image').src = project.image;
  document.getElementById('modal-image').alt = project.title;
  document.getElementById('modal-status').textContent = project.status;
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-duration').textContent = project.duration;
  document.getElementById('modal-role').textContent = project.role;
  document.getElementById('modal-description').textContent = project.description;
  document.getElementById('modal-github').href = project.github;

  // Populate features
  const featuresList = document.getElementById('modal-features');
  featuresList.innerHTML = '';
  project.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Populate tech
  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = '';
  project.tech.forEach(tech => {
    const span = document.createElement('span');
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  // Show modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset scroll position of modal
  const modalContainer = modalOverlay.querySelector('.modal-container');
  if (modalContainer) modalContainer.scrollTop = 0;
}

function closeProjectModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal events
modalClose.addEventListener('click', closeProjectModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeProjectModal();
  }
});
