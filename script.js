document.addEventListener('DOMContentLoaded', function () {
    // Theme Toggle
    const themeSwitcher = document.getElementById('theme-switcher');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle theme toggle visibility when menu is open
        if (navLinks.classList.contains('active')) {
            themeToggle.style.display = 'none';
        } else {
            themeToggle.style.display = 'block';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80; // Height of your navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Horizontal Timeline Navigation
    const timeline = document.querySelector('.timeline');
    const prevBtn = document.querySelector('.timeline-prev');
    const nextBtn = document.querySelector('.timeline-next');

    if (timeline && prevBtn && nextBtn) {
        const timelineScroll = document.querySelector('.timeline-scroll');
        const itemWidth = document.querySelector('.timeline-item').offsetWidth;
        const gap = 30; // Gap between items

        nextBtn.addEventListener('click', () => {
            timelineScroll.scrollBy({
                left: itemWidth + gap,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            timelineScroll.scrollBy({
                left: -(itemWidth + gap),
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('message-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');

            // Reset form
            this.reset();
        });
    }

    // Lightbox functionality - moved to global scope
    window.openLightbox = function (projectId) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-image');
        const caption = document.querySelector('.lightbox-caption');

        // Set image source based on project
        let imgSrc = '';
        let captionText = '';

        switch (projectId) {
            case 'rootEditor':
                imgSrc = 'images/rooteditor-screenshot.jpg';
                captionText = 'rootEditor - Java Swing Code Editor';
                break;
            case 'varsityEvent':
                imgSrc = 'images/varsity-event-screenshot.jpg';
                captionText = 'Varsity Event Manager - Java EJB System';
                break;
            case 'jobConnect':
                imgSrc = 'images/jobconnect-screenshot.jpg';
                captionText = 'JobConnect - Freelance Platform';
                break;
            case 'atsSimulator':
                imgSrc = 'images/ats-screenshot.jpg';
                captionText = 'ATS Simulator - CV Analysis Tool';
                break;
            case 'TCS_Certificate':
                imgSrc = 'images/Certificate of participation (2).PNG';
                captionText = 'TCS Certificate';
                break;
            case 'IBM_Cert':
                imgSrc = 'images/IBM DATATHON Cert_250802_223615.jpg';
                captionText = 'Hackathon Winner Certificate';
                break;
            default:
                return; // Exit if projectId doesn't match
        }

        lightboxImg.src = imgSrc;
        caption.textContent = captionText;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    window.closeLightbox = function () {
        document.getElementById('lightbox').style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    // Close lightbox when clicking outside image
    document.getElementById('lightbox').addEventListener('click', function (event) {
        if (event.target === this) {
            closeLightbox();
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', function (evt) {
        evt = evt || window.event;
        if (evt.key === 'Escape') {
            closeLightbox();
        }
    });

    // Code animation
    const codeDisplay = document.getElementById('code-display');
    const codeSnippets = [
        `// Fibonacci in JavaScript\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log(fibonacci(10));`,
        `# Binary Search in Python\ndef binary_search(arr, target):\n  low, high = 0, len(arr) - 1\n  while low <= high:\n    mid = (low + high) // 2\n    if arr[mid] == target:\n      return mid\n    elif arr[mid] < target:\n      low = mid + 1\n    else:\n      high = mid - 1\n  return -1`,
        `// React Component\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
        `/* CSS Animation */\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.element {\n  animation: fadeIn 1s ease-in-out;\n}`,
        // Java Swing GUI Example (relates to your rootEditor project)
        `// Java Swing Text Editor\nimport javax.swing.*;\nimport java.awt.*;\n\npublic class SimpleEditor extends JFrame {\n    public SimpleEditor() {\n        setTitle("Text Editor");\n        setSize(600, 400);\n        setDefaultCloseOperation(EXIT_ON_CLOSE);\n        \n        JTextArea textArea = new JTextArea();\n        JScrollPane scrollPane = new JScrollPane(textArea);\n        \n        add(scrollPane, BorderLayout.CENTER);\n        setVisible(true);\n    }\n    \n    public static void main(String[] args) {\n        new SimpleEditor();\n    }\n}`,
        // Java EJB Example (relates to your VarsityEventManager)
        `// EJB Session Bean\n@Stateless\npublic class EventManagerBean {\n    @PersistenceContext\n    private EntityManager em;\n    \n    public void registerStudent(Student student, Event event) {\n        Registration reg = new Registration(student, event);\n        em.persist(reg);\n    }\n    \n    public List<Event> getUpcomingEvents() {\n        return em.createQuery("SELECT e FROM Event e WHERE e.date > CURRENT_DATE", Event.class)\n                .getResultList();\n    }\n}`,
        // Spring Boot Example (relates to your ATS Simulator)
        `// Spring Boot Controller\n@RestController\n@RequestMapping("/api/applications")\npublic class ApplicationController {\n    \n    @Autowired\n    private ApplicationService appService;\n    \n    @PostMapping("/analyze")\n    public ResponseEntity<AnalysisResult> analyzeApplication(\n            @RequestBody Application application) {\n        AnalysisResult result = appService.analyze(application);\n        return ResponseEntity.ok(result);\n    }\n    \n    @GetMapping("/{id}")\n    public ResponseEntity<Application> getApplication(@PathVariable Long id) {\n        return ResponseEntity.ok(appService.findById(id));\n    }\n}`
    ];

    let currentSnippet = 0;

    function typeWriter(text, i, cb) {
        if (i < text.length) {
            codeDisplay.innerHTML = text.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
            setTimeout(() => typeWriter(text, i + 1, cb), 20 + Math.random() * 30);
        } else if (cb) {
            setTimeout(cb, 1500);
        }
    }

    function eraseText(cb) {
        let text = codeDisplay.textContent;
        let i = text.length;

        function erase() {
            if (i > 0) {
                codeDisplay.innerHTML = text.substring(0, i - 1) + '<span class="blinking-cursor">|</span>';
                i--;
                setTimeout(erase, 10);
            } else if (cb) {
                cb();
            }
        }

        erase();
    }

    function cycleCodeSnippets() {
        typeWriter(codeSnippets[currentSnippet], 0, () => {
            setTimeout(() => {
                eraseText(() => {
                    currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                    cycleCodeSnippets();
                });
            }, 2000);
        });
    }

    // Start the code animation
    cycleCodeSnippets();

    // Update copyright year automatically
    document.getElementById('current-year').textContent = new Date().getFullYear();
});