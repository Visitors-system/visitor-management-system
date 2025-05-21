// ملف جافا سكريبت الرئيسي

// انتظار حتى تحميل صفحة DOM
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المتنقلة للهواتف المحمولة
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // تغيير أيقونة القائمة
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // تنفيذ علامات التبويب في قسم الفوائد
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // إزالة الفئة النشطة من جميع الأزرار والمحتويات
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // إضافة الفئة النشطة للزر المحدد والمحتوى المقابل
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // تنفيذ النوافذ المنبثقة
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // فتح النافذة المنبثقة عند النقر على الزر
    if (modalTriggers.length) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
                }
            });
        });
    }
    
    // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
    if (closeBtns.length) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // استعادة التمرير
                }
            });
        });
    }
    
    // إغلاق النافذة المنبثقة عند النقر خارج المحتوى
    if (modals.length) {
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = ''; // استعادة التمرير
                }
            });
        });
    }
    
    // تفعيل أزرار الاستعلام عن الطلب
    const inquiryButtons = document.querySelectorAll('.btn-primary');
    if (inquiryButtons.length) {
        inquiryButtons.forEach(button => {
            if (button.textContent.includes('استعلام')) {
                button.setAttribute('data-modal', 'inquiry-modal');
                button.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal');
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
    }
    
    // تنفيذ النماذج والتحقق منها
    const forms = document.querySelectorAll('form');
    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // يمكن إضافة التحقق من النموذج هنا
                
                // محاكاة الإرسال الناجح
                alert('تم إرسال النموذج بنجاح!');
                
                // إغلاق النافذة المنبثقة إذا كان النموذج داخل نافذة منبثقة
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // إعادة تعيين النموذج
                this.reset();
            });
        });
    }
    
    // تنفيذ التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    if (internalLinks.length) {
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (mobileMenuToggle) {
                            const icon = mobileMenuToggle.querySelector('i');
                            if (icon.classList.contains('fa-times')) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                    
                    // التمرير إلى العنصر المستهدف
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // تعويض لشريط التنقل العلوي
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // مؤثرات تحريك عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .benefit-item, .workflow-item, .tech-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تطبيق الأنماط الأولية للعناصر القابلة للتحريك
    const setupAnimations = function() {
        const elements = document.querySelectorAll('.feature-card, .benefit-item, .workflow-item, .tech-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.4s ease, transform 0.6s ease';
        });
    };
    
    // تنفيذ التحريك عند التمرير
    setupAnimations();
    animateOnScroll(); // تنفيذ مرة واحدة عند التحميل
    window.addEventListener('scroll', animateOnScroll);
    
    // تحديث عداد الزوار وأوقات الانتظار (محاكاة)
    const updateQueueStatus = function() {
        const waitTimeElement = document.getElementById('wait-time');
        const currentNumberElement = document.getElementById('current-number');
        const waitingCountElement = document.getElementById('waiting-count');
        
        if (waitTimeElement && currentNumberElement && waitingCountElement) {
            // تحديث بأرقام عشوائية لأغراض العرض التوضيحي
            setInterval(() => {
                const currentNumber = parseInt(currentNumberElement.textContent);
                const waitingCount = parseInt(waitingCountElement.textContent);

// ملف جافا سكريبت الرئيسي

// انتظار حتى تحميل صفحة DOM
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المتنقلة للهواتف المحمولة
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // تغيير أيقونة القائمة
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // تنفيذ علامات التبويب في قسم الفوائد
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // إزالة الفئة النشطة من جميع الأزرار والمحتويات
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // إضافة الفئة النشطة للزر المحدد والمحتوى المقابل
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // تنفيذ النوافذ المنبثقة
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const closeBtns = document.querySelectorAll('.close-modal');
    
    // فتح النافذة المنبثقة عند النقر على الزر
    if (modalTriggers.length) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // منع التمرير في الخلفية
                }
            });
        });
    }
    
    // إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
    if (closeBtns.length) {
        closeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = ''; // استعادة التمرير
                }
            });
        });
    }
    
    // إغلاق النافذة المنبثقة عند النقر خارج المحتوى
    if (modals.length) {
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = ''; // استعادة التمرير
                }
            });
        });
    }
    
    // تفعيل أزرار الاستعلام عن الطلب
    const inquiryButtons = document.querySelectorAll('.btn-primary');
    if (inquiryButtons.length) {
        inquiryButtons.forEach(button => {
            if (button.textContent.includes('استعلام')) {
                button.setAttribute('data-modal', 'inquiry-modal');
                button.addEventListener('click', function() {
                    const modalId = this.getAttribute('data-modal');
                    const modal = document.getElementById(modalId);
                    if (modal) {
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
    }
    
    // تنفيذ النماذج والتحقق منها
    const forms = document.querySelectorAll('form');
    if (forms.length) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // يمكن إضافة التحقق من النموذج هنا
                
                // محاكاة الإرسال الناجح
                alert('تم إرسال النموذج بنجاح!');
                
                // إغلاق النافذة المنبثقة إذا كان النموذج داخل نافذة منبثقة
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // إعادة تعيين النموذج
                this.reset();
            });
        });
    }
    
    // تنفيذ التمرير السلس للروابط الداخلية
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    if (internalLinks.length) {
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
                    if (mainNav && mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        if (mobileMenuToggle) {
                            const icon = mobileMenuToggle.querySelector('i');
                            if (icon.classList.contains('fa-times')) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                    
                    // التمرير إلى العنصر المستهدف
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // تعويض لشريط التنقل العلوي
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // مؤثرات تحريك عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .benefit-item, .workflow-item, .tech-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // تطبيق الأنماط الأولية للعناصر القابلة للتحريك
    const setupAnimations = function() {
        const elements = document.querySelectorAll('.feature-card, .benefit-item, .workflow-item, .tech-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.4s ease, transform 0.6s ease';
        });
    };
    
    // تنفيذ التحريك عند التمرير
    setupAnimations();
    animateOnScroll(); // تنفيذ مرة واحدة عند التحميل
    window.addEventListener('scroll', animateOnScroll);
    
    // تحديث عداد الزوار وأوقات الانتظار (محاكاة)
    const updateQueueStatus = function() {
        const waitTimeElement = document.getElementById('wait-time');
        const currentNumberElement = document.getElementById('current-number');
        const waitingCountElement = document.getElementById('waiting-count');
        
        if (waitTimeElement && currentNumberElement && waitingCountElement) {
            // تحديث بأرقام عشوائية لأغراض العرض التوضيحي
            setInterval(() => {
                const currentNumber = parseInt(currentNumberElement.textContent);
                const waitingCount = parseInt(waitingCountElement.textContent);
                
                // زيادة الرقم الحالي بشكل عشوائي
                if (Math.random() > 0.7) {
                    currentNumberElement.textContent = currentNumber + 1;
                    
                    // تحديث عدد المنتظرين
                    if (waitingCount > 0) {
                        waitingCountElement.textContent = waitingCount - 1;
                    }
                    
                    // تحديث وقت الانتظار
                    const newWaitTime = Math.max(5, Math.min(30, Math.round(waitingCount * 1.2)));
                    waitTimeElement.textContent = newWaitTime;
                    
                    // إضافة تأثير وميض عند التغيير
                    currentNumberElement.classList.add('flash');
                    setTimeout(() => {
                        currentNumberElement.classList.remove('flash');
                    }, 500);
                }
            }, 5000); // تحديث كل 5 ثوان
        }
    };
    
    // تشغيل تحديث حالة الطابور
    updateQueueStatus();
});