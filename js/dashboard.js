// ملف لوحات المعلومات والمراقبة

// البيانات الافتراضية للوحات المعلومات
const dashboardData = {
    visitor: {
        stats: {
            completedRequests: 3,
            pendingRequests: 1,
            upcomingAppointments: 1,
            newNotifications: 3
        },
        recentRequests: [
            {
                id: 'REQ-120589',
                subject: 'تحديث بيانات حساب',
                department: 'خدمة العملاء',
                createdAt: new Date(2025, 4, 15, 9, 30),
                status: 'جاري المعالجة'
            },
            {
                id: 'REQ-119875',
                subject: 'طلب دعم فني',
                department: 'الدعم الفني',
                createdAt: new Date(2025, 4, 10, 14, 20),
                status: 'مكتمل'
            },
            {
                id: 'REQ-119254',
                subject: 'استفسار عن الخدمات',
                department: 'خدمة العملاء',
                createdAt: new Date(2025, 4, 5, 11, 15),
                status: 'مكتمل'
            }
        ],
        appointments: [
            {
                id: 'APPT-123456',
                title: 'موعد مراجعة معاملة',
                date: new Date(2025, 4, 25, 10, 30),
                location: 'قسم خدمة العملاء - الطابق الثاني',
                staff: 'أصيلة البريكية',
                status: 'مؤكد'
            }
        ]
    },
    employee: {
        stats: {
            assignedRequests: 5,
            completedToday: 2,
            pendingRequests: 3,
            averageCompletionTime: 120 // بالدقائق
        },
        upcomingRequests: [
            {
                id: 'REQ-120589',
                visitorName: 'حصة البريكية',
                subject: 'تحديث بيانات حساب',
                visitorPhone: '0501234567',
                deadline: new Date(2025, 4, 22, 16, 0),
                priority: 'متوسطة',
                status: 'جاري المعالجة'
            },
            {
                id: 'REQ-120612',
                visitorName: 'فاطمة علي',
                subject: 'طلب تصحيح بيانات',
                visitorPhone: '0554321678',
                deadline: new Date(2025, 4, 20, 14, 0),
                priority: 'عالية',
                status: 'جديد'
            },
            {
                id: 'REQ-120634',
                visitorName: 'خالد ناصر',
                subject: 'مشكلة في جودة المنتج',
                visitorPhone: '0559876543',
                deadline: new Date(2025, 4, 23, 12, 0),
                priority: 'متوسطة',
                status: 'جديد'
            }
        ],
        appointments: [
            {
                id: 'APPT-123456',
                visitorName: 'حصة البريكية',
                title: 'موعد مراجعة معاملة',
                requestId: 'REQ-120589',
                date: new Date(2025, 4, 25, 10, 30),
                location: 'قسم خدمة العملاء - الطابق الثاني',
                status: 'مؤكد'
            },
            {
                id: 'APPT-123789',
                visitorName: 'فاطمة علي',
                title: 'متابعة طلب تصحيح بيانات',
                requestId: 'REQ-120612',
                date: new Date(2025, 4, 21, 13, 0),
                location: 'قسم خدمة العملاء - الطابق الثاني',
                status: 'مؤكد'
            }
        ],
        performance: {
            completionRate: 92, // نسبة مئوية
            satisfactionRate: 4.7, // من 5
            responseTime: 45, // بالدقائق
            weeklyRequests: [12, 15, 10, 8, 18], // الطلبات المكتملة في الأيام الخمسة الماضية
            weeklyRatings: [4.5, 4.8, 4.6, 5.0, 4.7] // تقييمات الأيام الخمسة الماضية
        }
    },
    manager: {
        stats: {
            totalRequests: 45,
            completedRequests: 32,
            pendingRequests: 12,
            delayedRequests: 3,
            averageSatisfaction: 4.6, // من 5
            averageCompletionTime: 110 // بالدقائق
        },
        departmentPerformance: [
            {
                employeeId: 'E-1234',
                name: 'أصيلة البريكية',
                position: 'أخصائي خدمة العملاء',
                completedRequests: 18,
                satisfactionRate: 4.8,
                averageResponseTime: 35
            },
            {
                employeeId: 'E-5678',
                name: 'فهد محمد',
                position: 'مدير خدمة العملاء',
                completedRequests: 12,
                satisfactionRate: 4.6,
                averageResponseTime: 40
            },
            {
                employeeId: 'E-9012',
                name: 'نورة علي',
                position: 'متخصص تحديث البيانات',
                completedRequests: 15,
                satisfactionRate: 4.7,
                averageResponseTime: 38
            },
            {
                employeeId: 'E-3456',
                name: 'عبدالله حمد',
                position: 'متخصص استقبال الشكاوى',
                completedRequests: 14,
                satisfactionRate: 4.3,
                averageResponseTime: 42
            }
        ],
        requestsDistribution: {
            byType: {
                'طلب خدمة': 25,
                'استفسار': 10,
                'شكوى': 8,
                'اقتراح': 2
            },
            byDepartment: {
                'خدمة العملاء': 20,
                'الدعم الفني': 15,
                'قسم الشكاوى': 8,
                'قسم المقترحات': 2
            },
            byPriority: {
                'عالية': 8,
                'متوسطة': 25,
                'منخفضة': 12
            },
            byStatus: {
                'جديد': 6,
                'جاري المعالجة': 7,
                'مكتمل': 32
            }
        },
        delayedRequests: [
            {
                id: 'REQ-119234',
                subject: 'مشكلة في دفع الفاتورة',
                assignedTo: 'عبدالله حمد',
                deadline: new Date(2025, 4, 15, 16, 0),
                actualStatus: 'جاري المعالجة',
                delay: 32 // ساعات التأخير
            },
            {
                id: 'REQ-119546',
                subject: 'طلب استرجاع منتج',
                assignedTo: 'نورة علي',
                deadline: new Date(2025, 4, 16, 14, 0),
                actualStatus: 'جاري المعالجة',
                delay: 24 // ساعات التأخير
            },
            {
                id: 'REQ-119873',
                subject: 'مشكلة في تسجيل الدخول',
                assignedTo: 'فهد محمد',
                deadline: new Date(2025, 4, 17, 12, 0),
                actualStatus: 'جاري المعالجة',
                delay: 8 // ساعات التأخير
            }
        ]
    },
    admin: {
        stats: {
            totalRequests: 142,
            totalVisitors: 98,
            completionRate: 87, // نسبة مئوية
            averageSatisfaction: 4.5, // من 5
            averageWaitTime: 15, // بالدقائق
            averageCompletionTime: 115 // بالدقائق
        },
        departmentsPerformance: [
            {
                department: 'خدمة العملاء',
                requestsCount: 65,
                completionRate: 92,
                satisfactionRate: 4.6,
                averageResponseTime: 37
            },
            {
                department: 'الدعم الفني',
                requestsCount: 45,
                completionRate: 85,
                satisfactionRate: 4.4,
                averageResponseTime: 43
            },
            {
                department: 'قسم الشكاوى',
                requestsCount: 25,
                completionRate: 80,
                satisfactionRate: 4.1,
                averageResponseTime: 52
            },
            {
                department: 'قسم المقترحات',
                requestsCount: 7,
                completionRate: 100,
                satisfactionRate: 4.9,
                averageResponseTime: 30
            }
        ],
        monthlySummary: {
            requests: [32, 45, 38, 52, 65, 58, 59, 47, 55, 62, 68, 58], // الطلبات الشهرية
            satisfaction: [4.3, 4.4, 4.5, 4.4, 4.6, 4.7, 4.5, 4.6, 4.5, 4.7, 4.5, 4.8], // الرضا الشهري
            completionTime: [125, 120, 118, 115, 110, 105, 112, 108, 105, 100, 98, 95] // متوسط وقت الإكمال الشهري
        },
        visitorsTrends: {
            daily: [35, 42, 38, 45, 50, 25, 30], // الزوار اليومي (أيام الأسبوع)
            hourly: [5, 8, 12, 15, 20, 25, 18, 15, 10, 8, 6, 4] // الزوار حسب الساعة (8 صباحًا - 8 مساءً)
        }
    }
};

// دالة لجلب إحصائيات لوحة المعلومات حسب نوع المستخدم
function getDashboardStats(userType) {
    if (dashboardData[userType] && dashboardData[userType].stats) {
        return dashboardData[userType].stats;
    }
    return null;
}

// دالة لجلب الطلبات الحديثة للزائر
function getVisitorRequests() {
    return dashboardData.visitor.recentRequests || [];
}

// دالة لجلب المواعيد القادمة للزائر
function getVisitorAppointments() {
    return dashboardData.visitor.appointments || [];
}

// دالة لجلب الطلبات المسندة للموظف
function getEmployeeAssignedRequests() {
    return dashboardData.employee.upcomingRequests || [];
}

// دالة لجلب مواعيد الموظف
function getEmployeeAppointments() {
    return dashboardData.employee.appointments || [];
}

// دالة لجلب بيانات أداء الموظف
function getEmployeePerformance() {
    return dashboardData.employee.performance || null;
}

// دالة لجلب بيانات أداء الموظفين في القسم للمدير
function getDepartmentPerformance() {
    return dashboardData.manager.departmentPerformance || [];
}

// دالة لجلب توزيع الطلبات في القسم
function getRequestsDistribution() {
    return dashboardData.manager.requestsDistribution || null;
}

// دالة لجلب الطلبات المتأخرة في القسم
function getDelayedRequests() {
    return dashboardData.manager.delayedRequests || [];
}

// دالة لجلب أداء الأقسام للإدارة العليا
function getDepartmentsPerformance() {
    return dashboardData.admin.departmentsPerformance || [];
}

// دالة لجلب ملخص شهري للإدارة العليا
function getMonthlySummary() {
    return dashboardData.admin.monthlySummary || null;
}

// دالة لجلب اتجاهات الزوار للإدارة العليا
function getVisitorsTrends() {
    return dashboardData.admin.visitorsTrends || null;
}

// دالة لإنشاء رسم بياني خطي
function createLineChart(canvasId, labels, data, title, color = '#2563eb') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    // تنظيف الرسم البياني إذا كان موجودًا
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم الإطار
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(50, 30, canvas.width - 70, canvas.height - 60);
    
    // الهوامش
    const marginLeft = 50;
    const marginRight = 20;
    const marginTop = 30;
    const marginBottom = 30;
    
    // حساب النطاق
    const chartWidth = canvas.width - marginLeft - marginRight;
    const chartHeight = canvas.height - marginTop - marginBottom;
    
    // حساب الحد الأقصى للبيانات
    const maxValue = Math.max(...data) * 1.1; // زيادة 10% للهامش العلوي
    
    // رسم العنوان
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Tajawal';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 20);
    
    // رسم محور Y
    const yStep = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
        const y = marginTop + chartHeight - (i * chartHeight / 5);
        const value = Math.round(i * yStep);
        
        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(marginLeft + chartWidth, y);
        ctx.stroke();
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Tajawal';
        ctx.textAlign = 'right';
        ctx.fillText(value, marginLeft - 5, y + 4);
    }
    
    // رسم محور X
    const xStep = chartWidth / (labels.length - 1);
    for (let i = 0; i < labels.length; i++) {
        const x = marginLeft + i * xStep;
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Tajawal';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, canvas.height - 10);
    }
    
    // رسم البيانات
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < data.length; i++) {
        const x = marginLeft + i * xStep;
        const y = marginTop + chartHeight - (data[i] / maxValue * chartHeight);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // رسم نقاط البيانات
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // عرض القيمة فوق النقطة
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Tajawal';
        ctx.textAlign = 'center';
        ctx.fillText(data[i], x, y - 10);
    }
    
    ctx.stroke();
    
    return true;
}

// دالة لإنشاء رسم بياني دائري
function createPieChart(canvasId, data, labels, colors, title) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    // تنظيف الرسم البياني إذا كان موجودًا
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // المتغيرات
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 30;
    
    // حساب مجموع البيانات
    const total = data.reduce((sum, value) => sum + value, 0);
    
    // رسم العنوان
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Tajawal';
    ctx.textAlign = 'center';
    ctx.fillText(title, centerX, 20);
    
    // رسم المخطط الدائري
    let startAngle = 0;
    
    for (let i = 0; i < data.length; i++) {
        const sliceAngle = (data[i] / total) * 2 * Math.PI;
        
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        
        // حساب موقع التسمية
        const labelAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        // حساب النسبة المئوية
        const percentage = Math.round((data[i] / total) * 100);
        
        // رسم النسبة المئوية
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Tajawal';
        ctx.textAlign = 'center';
        ctx.fillText(`${percentage}%`, labelX, labelY);
        
        startAngle += sliceAngle;
    }
    
    // رسم مفتاح الرسم البياني
    const legendY = canvas.height - (data.length * 20) - 10;
    
    for (let i = 0; i < data.length; i++) {
        const legendX = 20;
        const y = legendY + i * 20;
        
        // رسم مربع اللون
        ctx.fillStyle = colors[i];
        ctx.fillRect(legendX, y, 15, 15);
        
        // رسم التسمية
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px Tajawal';
        ctx.textAlign = 'start';
        ctx.fillText(`${labels[i]} (${data[i]})`, legendX + 20, y + 12);
    }
    
    return true;
}

// دالة لإنشاء رسم بياني شريطي
function createBarChart(canvasId, labels, data, title, color = '#2563eb') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    
    // تنظيف الرسم البياني إذا كان موجودًا
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // الهوامش
    const marginLeft = 50;
    const marginRight = 20;
    const marginTop = 30;
    const marginBottom = 50;
    
    // حساب النطاق
    const chartWidth = canvas.width - marginLeft - marginRight;
    const chartHeight = canvas.height - marginTop - marginBottom;
    
    // حساب الحد الأقصى للبيانات
    const maxValue = Math.max(...data) * 1.1; // زيادة 10% للهامش العلوي
    
    // رسم العنوان
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px Tajawal';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 20);
    
    // رسم محور Y
    const yStep = maxValue / 5;
    for (let i = 0; i <= 5; i++) {
        const y = marginTop + chartHeight - (i * chartHeight / 5);
        const value = Math.round(i * yStep);
        
        ctx.strokeStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(marginLeft + chartWidth, y);
        ctx.stroke();
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Tajawal';
        ctx.textAlign = 'right';
        ctx.fillText(value, marginLeft - 5, y + 4);
    }
    
    // رسم محور X
    const barWidth = (chartWidth / labels.length) * 0.7;
    const barSpacing = (chartWidth / labels.length) * 0.3;
    
    for (let i = 0; i < labels.length; i++) {
        const x = marginLeft + (i * (barWidth + barSpacing)) + (barWidth / 2);
        
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Tajawal';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x, canvas.height - 25);
    }
    
    // رسم الأشرطة
    for (let i = 0; i < data.length; i++) {
        const x = marginLeft + (i * (barWidth + barSpacing));
        const barHeight = (data[i] / maxValue) * chartHeight;
        const y = marginTop + chartHeight - barHeight;
        
        // رسم الشريط
        ctx.fillStyle = typeof color === 'string' ? color : (color[i] || '#2563eb');
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // عرض القيمة فوق الشريط
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Tajawal';
        ctx.textAlign = 'center';
        ctx.fillText(data[i], x + barWidth / 2, y - 5);
    }
    
    return true;
}

// دالة لتحديث الساعة في الوقت الفعلي
function updateClock() {
    const clockElement = document.getElementById('current-time');
    if (clockElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// دالة لتنسيق التاريخ
function formatDate(date) {
    if (!date) return '';
    
    // تحويل التاريخ إلى كائن Date إذا كان نصًا
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// دالة لتنسيق الوقت
function formatTime(date) {
    if (!date) return '';
    
    // تحويل التاريخ إلى كائن Date إذا كان نصًا
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

// دالة لتهيئة لوحات المعلومات عند تحميل الصفحة
function initDashboards() {
    // تحديث الساعة كل ثانية
    setInterval(updateClock, 1000);
    updateClock(); // تشغيل فوري عند التحميل
    
    // تفعيل التمرير السلس للروابط
    initSmoothScrolling();
    
    // تفعيل التبديل بين أقسام لوحة التحكم
    initTabSwitching();
    
    // تهيئة الرسوم البيانية إذا كانت موجودة
    initCharts();
}

// دالة لتفعيل التمرير السلس للروابط
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// دالة لتفعيل التبديل بين أقسام لوحة التحكم
function initTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // إزالة الفئة النشطة من جميع الأزرار والمحتويات
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد والمحتوى المقابل
            this.classList.add('active');
            
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.classList.add('active');
            }
        });
    });
}

// دالة لتهيئة الرسوم البيانية
function initCharts() {
    // تهيئة الرسوم البيانية للموظف
    if (document.getElementById('employee-requests-chart')) {
        const employeePerformance = getEmployeePerformance();
        if (employeePerformance) {
            createLineChart(
                'employee-requests-chart',
                ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                employeePerformance.weeklyRequests,
                'الطلبات المكتملة في الأسبوع',
                '#2563eb'
            );
            
            createLineChart(
                'employee-ratings-chart',
                ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                employeePerformance.weeklyRatings,
                'تقييمات الزوار في الأسبوع',
                '#10b981'
            );
        }
    }
    
    // تهيئة الرسوم البيانية للمدير
    if (document.getElementById('requests-distribution-chart')) {
        const distribution = getRequestsDistribution();
        if (distribution) {
            createPieChart(
                'requests-distribution-chart',
                Object.values(distribution.byType),
                Object.keys(distribution.byType),
                ['#2563eb', '#10b981', '#f59e0b', '#ef4444'],
                'توزيع الطلبات حسب النوع'
            );
            
            createPieChart(
                'requests-status-chart',
                Object.values(distribution.byStatus),
                Object.keys(distribution.byStatus),
                ['#3b82f6', '#f59e0b', '#10b981'],
                'توزيع الطلبات حسب الحالة'
            );
        }
    }
    
    // تهيئة الرسوم البيانية للإدارة العليا
    if (document.getElementById('monthly-requests-chart')) {
        const summary = getMonthlySummary();
        if (summary) {
            createBarChart(
                'monthly-requests-chart',
                ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                summary.requests,
                'إجمالي الطلبات الشهرية',
                '#2563eb'
            );
            
            createLineChart(
                'satisfaction-chart',
                ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
                summary.satisfaction,
                'متوسط رضا الزوار الشهري',
                '#10b981'
            );
        }
        
        const trends = getVisitorsTrends();
        if (trends) {
            createBarChart(
                'daily-visitors-chart',
                ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                trends.daily,
                'توزيع الزوار اليومي',
                '#f59e0b'
            );
            
            createBarChart(
                'hourly-visitors-chart',
                ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                trends.hourly,
                'توزيع الزوار حسب الساعة',
                '#ef4444'
            );
        }
    }
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.dashboardUtils = {
    getDashboardStats,
    getVisitorRequests,
    getVisitorAppointments,
    getEmployeeAssignedRequests,
    getEmployeeAppointments,
    getEmployeePerformance,
    getDepartmentPerformance,
    getRequestsDistribution,
    getDelayedRequests,
    getDepartmentsPerformance,
    getMonthlySummary,
    getVisitorsTrends,
    createLineChart,
    createPieChart,
    createBarChart,
    formatDate,
    formatTime,
    initDashboards
};

// تهيئة لوحات المعلومات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initDashboards);
