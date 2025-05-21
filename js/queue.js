// نظام الطابور الذكي

// البيانات الافتراضية للطابور
const queueData = {
    startNumber: 1,              // الرقم البدائي للطابور
    currentNumber: 43,           // الرقم الحالي الذي تتم خدمته
    lastNumber: 55,              // آخر رقم تم إصداره
    avgServiceTime: 3,           // متوسط وقت الخدمة (بالدقائق)
    maxWaitTime: 40,             // أقصى وقت انتظار متوقع (بالدقائق)
    departments: [
        { id: 1, name: 'خدمة العملاء', currentNumber: 15, lastNumber: 25 },
        { id: 2, name: 'استفسارات فنية', currentNumber: 8, lastNumber: 12 },
        { id: 3, name: 'الشكاوى', currentNumber: 20, lastNumber: 28 }
    ]
};

// دالة لحساب وقت الانتظار المتوقع
function calculateWaitTime(currentNumber, userNumber, avgServiceTime) {
    const peopleAhead = userNumber - currentNumber;
    return peopleAhead > 0 ? peopleAhead * avgServiceTime : 0;
}

// دالة لإصدار رقم طابور جديد
function issueNewQueueNumber(departmentId = null) {
    if (departmentId) {
        const department = queueData.departments.find(dep => dep.id === departmentId);
        if (department) {
            department.lastNumber++;
            return {
                departmentId: department.id,
                queueNumber: department.lastNumber,
                waitTime: calculateWaitTime(department.currentNumber, department.lastNumber, queueData.avgServiceTime)
            };
        }
    } else {
        queueData.lastNumber++;
        return {
            departmentId: 0,  // قسم افتراضي
            queueNumber: queueData.lastNumber,
            waitTime: calculateWaitTime(queueData.currentNumber, queueData.lastNumber, queueData.avgServiceTime)
        };
    }
    
    return null;
}

// دالة لتحديث الرقم الحالي
function updateCurrentNumber(departmentId = null) {
    if (departmentId) {
        const department = queueData.departments.find(dep => dep.id === departmentId);
        if (department && department.currentNumber < department.lastNumber) {
            department.currentNumber++;
            return department.currentNumber;
        }
    } else {
        if (queueData.currentNumber < queueData.lastNumber) {
            queueData.currentNumber++;
            return queueData.currentNumber;
        }
    }
    
    return null;
}

// دالة للحصول على عدد الأشخاص في الانتظار
function getWaitingCount(departmentId = null) {
    if (departmentId) {
        const department = queueData.departments.find(dep => dep.id === departmentId);
        if (department) {
            return Math.max(0, department.lastNumber - department.currentNumber);
        }
    } else {
        return Math.max(0, queueData.lastNumber - queueData.currentNumber);
    }
    
    return 0;
}

// دالة لاستعلام عن حالة رقم طابور
function checkQueueStatus(queueNumber, departmentId = null) {
    if (departmentId) {
        const department = queueData.departments.find(dep => dep.id === departmentId);
        if (department) {
            if (queueNumber < department.currentNumber) {
                return { status: 'completed', message: 'تمت معالجة الطلب' };
            } else if (queueNumber === department.currentNumber) {
                return { status: 'current', message: 'جاري معالجة الطلب حالياً' };
            } else {
                const waitTime = calculateWaitTime(department.currentNumber, queueNumber, queueData.avgServiceTime);
                return {
                    status: 'waiting',
                    position: queueNumber - department.currentNumber,
                    waitTime: waitTime,
                    message: `أنت في الانتظار. المدة المتوقعة: ${waitTime} دقيقة`
                };
            }
        }
    } else {
        if (queueNumber < queueData.currentNumber) {
            return { status: 'completed', message: 'تمت معالجة الطلب' };
        } else if (queueNumber === queueData.currentNumber) {
            return { status: 'current', message: 'جاري معالجة الطلب حالياً' };
        } else {
            const waitTime = calculateWaitTime(queueData.currentNumber, queueNumber, queueData.avgServiceTime);
            return {
                status: 'waiting',
                position: queueNumber - queueData.currentNumber,
                waitTime: waitTime,
                message: `أنت في الانتظار. المدة المتوقعة: ${waitTime} دقيقة`
            };
        }
    }
    
    return { status: 'unknown', message: 'رقم الطابور غير صالح' };
}

// دالة للحجز المسبق
function preBookAppointment(departmentId, date, time, userDetails) {
    // تحقق من توفر الموعد
    const isAvailable = checkAppointmentAvailability(departmentId, date, time);
    
    if (isAvailable) {
        // في حالة التطبيق الحقيقي، سيتم حفظ بيانات الموعد في قاعدة البيانات
        const appointmentId = generateAppointmentId();
        
        return {
            success: true,
            appointmentId: appointmentId,
            departmentId: departmentId,
            date: date,
            time: time,
            userDetails: userDetails,
            message: 'تم حجز الموعد بنجاح'
        };
    }
    
    return {
        success: false,
        message: 'الموعد المطلوب غير متاح. يرجى اختيار موعد آخر'
    };
}

// دالة مساعدة للتحقق من توفر الموعد
function checkAppointmentAvailability(departmentId, date, time) {
    // في التطبيق الحقيقي، سيتم التحقق من قاعدة البيانات
    // للعرض التوضيحي، نفترض أن الموعد متاح بنسبة 80%
    return Math.random() > 0.2;
}

// دالة مساعدة لإنشاء معرف موعد فريد
function generateAppointmentId() {
    return 'APPT-' + Math.floor(100000 + Math.random() * 900000);
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.queueSystem = {
    issueNewQueueNumber,
    updateCurrentNumber,
    getWaitingCount,
    checkQueueStatus,
    preBookAppointment
};

// محاكاة تحديث الطابور كل فترة
setInterval(() => {
    // تحديث الأرقام الحالية بشكل عشوائي
    if (Math.random() > 0.7) {
        updateCurrentNumber();
        
        // تحديث الأقسام أيضاً
        queueData.departments.forEach(department => {
            if (Math.random() > 0.6 && department.currentNumber < department.lastNumber) {
                department.currentNumber++;
            }
        });
        
        // تحديث العرض إذا كانت العناصر موجودة في الصفحة
        const waitTimeElement = document.getElementById('wait-time');
        const currentNumberElement = document.getElementById('current-number');
        const waitingCountElement = document.getElementById('waiting-count');
        
        if (waitTimeElement && currentNumberElement && waitingCountElement) {
            currentNumberElement.textContent = queueData.currentNumber;
            waitingCountElement.textContent = getWaitingCount();
            waitTimeElement.textContent = Math.round(getWaitingCount() * queueData.avgServiceTime);
        }
    }
}, 8000); // تحديث كل 8 ثوان