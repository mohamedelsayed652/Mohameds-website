// Main JavaScript functionality for Mohamed's Portfolio

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSkillsRadar();
    initProjectTimeline();
    initContactForm();
    initHeroParticles();
    initNavigation();
});

// Smooth scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Skills radar chart initialization
function initSkillsRadar() {
    const radarContainer = document.getElementById('skills-radar');
    if (!radarContainer) return;

    const skillsData = [
        {
            name: 'Programming',
            value: 85,
            items: ['Python', 'Java', 'C', 'JavaScript']
        },
        {
            name: 'Databases',
            value: 90,
            items: ['SQL', 'MySQL', 'MongoDB', 'Redshift']
        },
        {
            name: 'Analytics',
            value: 88,
            items: ['Pandas', 'NumPy', 'Scikit-learn']
        },
        {
            name: 'Big Data',
            value: 82,
            items: ['Spark', 'Databricks', 'Hive']
        },
        {
            name: 'Visualization',
            value: 80,
            items: ['Power BI', 'Matplotlib', 'ECharts']
        },
        {
            name: 'Cloud/Tools',
            value: 75,
            items: ['AWS', 'Git', 'Jupyter']
        }
    ];

    const chart = echarts.init(radarContainer);
    
    const option = {
        title: {
            text: 'Technical Skills',
            textStyle: {
                color: '#2d3748',
                fontSize: 24,
                fontWeight: 'bold'
            }
        },
        radar: {
            indicator: skillsData.map(skill => ({
                name: skill.name,
                max: 100
            })),
            radius: '70%',
            axisName: {
                color: '#2d3748',
                fontSize: 14
            },
            splitLine: {
                lineStyle: {
                    color: '#e2e8f0'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#cbd5e0'
                }
            }
        },
        series: [{
            type: 'radar',
            data: [{
                value: skillsData.map(skill => skill.value),
                name: 'Skills Proficiency',
                areaStyle: {
                    color: 'rgba(49, 130, 206, 0.3)'
                },
                lineStyle: {
                    color: '#3182ce',
                    width: 3
                },
                itemStyle: {
                    color: '#00d4ff'
                }
            }],
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    };

    chart.setOption(option);

    // Add hover interaction
    chart.on('mouseover', function(params) {
        if (params.componentType === 'radar' && params.name) {
            const skill = skillsData[params.dataIndex];
            showSkillDetails(skill);
        }
    });

    // Resize chart on window resize
    window.addEventListener('resize', () => {
        chart.resize();
    });
}

// Show skill details on hover
function showSkillDetails(skill) {
    const detailsContainer = document.getElementById('skill-details');
    if (!detailsContainer) return;

    detailsContainer.innerHTML = `
        <div class="skill-detail-card">
            <h3 class="text-xl font-bold text-gray-800 mb-2">${skill.name}</h3>
            <div class="proficiency-bar mb-3">
                <div class="proficiency-fill" style="width: ${skill.value}%"></div>
            </div>
            <p class="text-gray-600 mb-3">Proficiency: ${skill.value}%</p>
            <div class="skill-items">
                <h4 class="font-semibold text-gray-700 mb-2">Technologies:</h4>
                <div class="flex flex-wrap gap-2">
                    ${skill.items.map(item => 
                        `<span class="skill-tag">${item}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;

    anime({
        targets: detailsContainer,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutCubic'
    });
}

// Project timeline functionality
function initProjectTimeline() {
    const timeline = document.getElementById('project-timeline');
    if (!timeline) return;

    const projects = [
        {
            id: 'nyc-taxi',
            title: 'NYC Taxi Big Data Analysis',
            period: '2024',
            technologies: ['Apache Spark', 'Databricks', 'SQL'],
            description: 'Analyzed NYC taxi data using Spark and Databricks to extract insights on trip patterns, peak hours, and geographic distributions.',
            achievements: [
                'Processed 10GB+ of taxi data efficiently',
                'Built ML pipelines for classification and regression',
                'Improved model performance through hyperparameter tuning'
            ],
            image: 'resources/project-1.jpg'
        },
        {
            id: 'image-classification',
            title: 'Image Classification: ANN vs CNN',
            period: '2024',
            technologies: ['Python', 'Torch', 'Torchvision'],
            description: 'Developed and compared image classifiers using Artificial Neural Networks and Convolutional Neural Networks.',
            achievements: [
                'Achieved 95%+ accuracy with CNN model',
                'Conducted comparative analysis of training epochs',
                'Implemented both architectures from scratch'
            ],
            image: 'resources/project-2.jpg'
        },
        {
            id: 'covid-analysis',
            title: 'COVID-19 Vaccination Analysis',
            period: '2023',
            technologies: ['Python', 'Pandas', 'Matplotlib'],
            description: 'Analyzed COVID-19 vaccination trends in Ontario using government data to identify patterns and insights.',
            achievements: [
                'Created comprehensive time-series visualizations',
                'Identified vaccination spikes and patterns',
                'Contributed to public health insights'
            ],
            image: 'resources/project-3.jpg'
        },
        {
            id: 'student-database',
            title: 'Student Record Database System',
            period: '2023',
            technologies: ['SQL', 'ER Diagrams', 'Database Design'],
            description: 'Designed and implemented a comprehensive student record database with optimized performance and advanced SQL techniques.',
            achievements: [
                'Created comprehensive ER diagrams',
                'Optimized database performance',
                'Managed extensive student information system'
            ],
            image: 'resources/project-4.jpg'
        }
    ];

    // Render timeline
    timeline.innerHTML = projects.map((project, index) => `
        <div class="timeline-item animate-on-scroll" data-project="${project.id}">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="project-card" onclick="expandProject('${project.id}')">
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-period">${project.period}</p>
                        <div class="project-tech">
                            ${project.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>
                <div class="project-details" id="details-${project.id}">
                    <div class="details-content">
                        <h4>Key Achievements:</h4>
                        <ul>
                            ${project.achievements.map(achievement => 
                                `<li>${achievement}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add filter functionality
    initProjectFilters(projects);
}

// Expand project details
function expandProject(projectId) {
    const details = document.getElementById(`details-${projectId}`);
    const isExpanded = details.classList.contains('expanded');
    
    // Close all other expanded projects
    document.querySelectorAll('.project-details.expanded').forEach(el => {
        if (el !== details) {
            el.classList.remove('expanded');
            anime({
                targets: el,
                height: 0,
                opacity: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });

    if (!isExpanded) {
        details.classList.add('expanded');
        anime({
            targets: details,
            height: 'auto',
            opacity: 1,
            duration: 500,
            easing: 'easeOutCubic'
        });
    } else {
        details.classList.remove('expanded');
        anime({
            targets: details,
            height: 0,
            opacity: 0,
            duration: 300,
            easing: 'easeOutCubic'
        });
    }
}

// Project filtering
function initProjectFilters(projects) {
    const filterContainer = document.getElementById('project-filters');
    if (!filterContainer) return;

    const allTechnologies = [...new Set(projects.flatMap(p => p.technologies))];
    
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All Projects</button>
        ${allTechnologies.map(tech => 
            `<button class="filter-btn" data-filter="${tech}">${tech}</button>`
        ).join('')}
    `;

    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            
            // Update active button
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active')
            );
            e.target.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projects);
        }
    });
}

// Filter projects by technology
function filterProjects(filter, projects) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const projectId = item.dataset.project;
        const project = projects.find(p => p.id === projectId);
        
        if (filter === 'all' || project.technologies.includes(filter)) {
            item.style.display = 'block';
            anime({
                targets: item,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutCubic'
            });
        } else {
            anime({
                targets: item,
                opacity: 0,
                translateY: -20,
                duration: 300,
                easing: 'easeOutCubic',
                complete: () => {
                    item.style.display = 'none';
                }
            });
        }
    });
}

// Contact form functionality
const CONTACT_API_URL = "https://lge11geo31.execute-api.us-east-1.amazonaws.com/prod/contact";

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission (now actually calls AWS API)
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;

    // validate all required fields
    const isValid = validateForm(form);
    if (!isValid) {
        showFormError("Please fix the highlighted fields.");
        return;
    }

    const formData = new FormData(form);
    const payload = {
        name: formData.get("name")?.trim(),
        email: formData.get("email")?.trim(),
        subject: formData.get("subject")?.trim(),
        message: formData.get("message")?.trim(),
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : null;

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
    }

    try {
        const response = await fetch(CONTACT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.error || "Failed to send message. Please try again.");
        }

        // Success – show overlay + reset form
        showFormSuccess();
        form.reset();
    } catch (err) {
        console.error(err);
        showFormError(err.message || "Something went wrong. Please try again later.");
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target || e; // supports both event + direct call
    const value = field.value.trim();
    const fieldName = field.name;

    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

// Validate entire form
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

// Clear field error
function clearFieldError(e) {
    const field = e.target || e;
    const fieldContainer = field.parentNode;
    const existingError = fieldContainer.querySelector('.field-error');

    if (existingError) {
        existingError.remove();
    }

    field.classList.remove('error');
}

// Show form success overlay (unchanged, just used after API success)
function showFormSuccess() {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
    `;

    document.body.appendChild(successDiv);

    anime({
        targets: successDiv,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        easing: 'easeOutCubic',
        complete: () => {
            setTimeout(() => {
                anime({
                    targets: successDiv,
                    opacity: 0,
                    scale: 0.8,
                    duration: 300,
                    easing: 'easeOutCubic',
                    complete: () => {
                        successDiv.remove();
                    }
                });
            }, 3000);
        }
    });
}

// Show form error overlay
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-success';
    errorDiv.innerHTML = `
        <div class="success-content">
            <h3>Oops, something went wrong</h3>
            <p>${message || 'Please try again later.'}</p>
        </div>
    `;

    document.body.appendChild(errorDiv);

    anime({
        targets: errorDiv,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        easing: 'easeOutCubic',
        complete: () => {
            setTimeout(() => {
                anime({
                    targets: errorDiv,
                    opacity: 0,
                    scale: 0.8,
                    duration: 300,
                    easing: 'easeOutCubic',
                    complete: () => {
                        errorDiv.remove();
                    }
                });
            }, 3000);
        }
    });
}


// Hero particles background
function initHeroParticles() {
    const hero = document.getElementById('hero-particles');
    if (!hero) return;

    // Create particle system using CSS animations
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        hero.appendChild(particle);
    }
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight current page
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility function for smooth animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);