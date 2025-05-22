// نظام تتبع الطلبات

// مجموعة من البيانات الافتراضية للطلبات
const requestsData = [
    {
        id: 'REQ-120589',
        visitorId: 'V-23456',
        visitorName: 'محمد أحمد',
        visitorPhone: '0501234567',
        requestType: 'طلب خدمة',
        subject: 'تحديث بيانات حساب',
        description: 'طلب تحديث بيانات الاتصال ورقم الهاتف المسجل في الحساب',
        status: 'جاري المعالجة',
        priority: 'متوسطة',
        createdAt: new Date(2025, 4, 15, 9, 30),
        updatedAt: new Date(2025, 4, 16, 11, 45),
        deadline: new Date(2025, 4, 22, 16, 0),
        department: 'خدمة العملاء',
        assignedTo: [
            { employeeId: 'E-1234', name: 'أصيلة البريكية ', role: 'مستقبل الطلب', status: 'مكتمل', startTime: new Date(2025, 4, 15, 9, 30), endTime: new Date(2025, 4, 15, 9, 45) },
            { employeeId: 'E-5678', name: 'طلال العدوي', role: 'مدير القسم', status: 'مكتمل', startTime: new Date(2025, 4, 15, 10, 0), endTime: new Date(2025, 4, 15, 10, 30) },
            { employeeId: 'E-9012', name: 'نورة علي', role: 'متخصص تحديث البيانات', status: 'قيد التنفيذ', startTime: new Date(2025, 4, 16, 11, 45), endTime: null }
        ],
        timeline: [
            { stage: 'استلام الطلب', status: 'مكتمل', time: new Date(2025, 4, 15, 9, 30), employeeId: 'E-1234', employeeName: 'أصيلة البريكية ', notes: 'تم استلام الطلب وتسجيله في النظام' },
            { stage: 'مراجعة أولية', status: 'مكتمل', time: new Date(2025, 4, 15, 10, 30), employeeId: 'E-5678', employeeName: 'طلال العدوي', notes: 'تمت مراجعة الطلب والموافقة عليه' },
            { stage: 'تحويل للقسم المختص', status: 'مكتمل', time: new Date(2025, 4, 15, 11, 0), employeeId: 'E-5678', employeeName: 'طلال العدوي', notes: 'تم تحويل الطلب إلى قسم البيانات والحسابات' },
            { stage: 'بدء المعالجة', status: 'مكتمل', time: new Date(2025, 4, 16, 11, 45), employeeId: 'E-9012', employeeName: 'نورة علي', notes: 'جاري العمل على تحديث البيانات' },
            { stage: 'مراجعة نهائية', status: 'منتظر', time: null, employeeId: null, employeeName: null, notes: '' },
            { stage: 'إغلاق الطلب', status: 'منتظر', time: null, employeeId: null, employeeName: null, notes: '' }
        ],
        feedback: null,
        rating: null
    },
    {
        id: 'REQ-120634',
        visitorId: 'V-34567',
        visitorName: 'خالد ناصر',
        visitorPhone: '0559876543',
        requestType: 'شكوى',
        subject: 'مشكلة في جودة المنتج',
        description: 'المنتج المستلم به عيوب تصنيعية واضحة ولا يعمل بشكل صحيح',
        status: 'مكتمل',
        priority: 'عالية',
        createdAt: new Date(2025, 4, 10, 14, 20),
        updatedAt: new Date(2025, 4, 15, 16, 30),
        deadline: new Date(2025, 4, 17, 14, 0),
        department: 'قسم الشكاوى',
        assignedTo: [
            { employeeId: 'E-3456', name: 'عبدالله حمد', role: 'مستقبل الشكوى', status: 'مكتمل', startTime: new Date(2025, 4, 10, 14, 20), endTime: new Date(2025, 4, 10, 14, 45) },
            { employeeId: 'E-7890', name: 'منى سعد', role: 'أخصائي جودة المنتجات', status: 'مكتمل', startTime: new Date(2025, 4, 11, 9, 0), endTime: new Date(2025, 4, 12, 15, 30) },
            { employeeId: 'E-2345', name: 'أحمد محمد', role: 'مدير وحدة الشكاوى', status: 'مكتمل', startTime: new Date(2025, 4, 13, 10, 15), endTime: new Date(2025, 4, 15, 16, 30) }
        ],
        timeline: [
            { stage: 'استلام الشكوى', status: 'مكتمل', time: new Date(2025, 4, 10, 14, 20), employeeId: 'E-3456', employeeName: 'عبدالله حمد', notes: 'تم استلام الشكوى وتسجيلها في النظام' },
            { stage: 'تقييم أولي', status: 'مكتمل', time: new Date(2025, 4, 10, 14, 45), employeeId: 'E-3456', employeeName: 'عبدالله حمد', notes: 'تم تقييم الشكوى وتصنيفها كذات أولوية عالية' },
            { stage: 'تحويل لفريق الجودة', status: 'مكتمل', time: new Date(2025, 4, 10, 15, 0), employeeId: 'E-3456', employeeName: 'عبدالله حمد', notes: 'تم تحويل الشكوى إلى فريق الجودة للفحص' },
            { stage: 'فحص المنتج', status: 'مكتمل', time: new Date(2025, 4, 12, 15, 30), employeeId: 'E-7890', employeeName: 'منى سعد', notes: 'تم فحص المنتج وتأكيد وجود عيوب تصنيعية' },
            { stage: 'قرار التعويض', status: 'مكتمل', time: new Date(2025, 4, 13, 11, 45), employeeId: 'E-2345', employeeName: 'أحمد محمد', notes: 'تمت الموافقة على استبدال المنتج واعتذار للعميل' },
            { stage: 'تنفيذ القرار', status: 'مكتمل', time: new Date(2025, 4, 15, 16, 0), employeeId: 'E-2345', employeeName: 'أحمد محمد', notes: 'تم استبدال المنتج وإرساله للعميل' },
            { stage: 'إغلاق الشكوى', status: 'مكتمل', time: new Date(2025, 4, 15, 16, 30), employeeId: 'E-2345', employeeName: 'أحمد محمد', notes: 'تم إغلاق الشكوى بعد التأكد من استلام العميل للمنتج البديل' }
        ],
        feedback: 'أشكركم على سرعة الاستجابة والتعامل الاحترافي مع المشكلة',
        rating: 4.5
    }
];

// دالة للبحث عن طلب بواسطة المعرف
function findRequestById(requestId) {
    return requestsData.find(request => request.id === requestId) || null;
}

// دالة للبحث عن طلب بواسطة معلومات الزائر
function findRequestsByVisitor(visitorPhone) {
    return requestsData.filter(request => request.visitorPhone === visitorPhone) || [];
}

// دالة لإنشاء طلب جديد
function createNewRequest(requestData) {
    // إنشاء معرف فريد للطلب
    const requestId = generateRequestId();
    
    // إنشاء الطلب الجديد
    const newRequest = {
        id: requestId,
        visitorId: requestData.visitorId || generateVisitorId(),
        visitorName: requestData.visitorName,
        visitorPhone: requestData.visitorPhone,
        requestType: requestData.requestType,
        subject: requestData.subject,
        description: requestData.description,
        status: 'جديد',
        priority: requestData.priority || 'متوسطة',
        createdAt: new Date(),
        updatedAt: new Date(),
        deadline: calculateDeadline(requestData.priority),
        department: requestData.department,
        assignedTo: [],
        timeline: [
            {
                stage: 'استلام الطلب',
                status: 'مكتمل',
                time: new Date(),
                employeeId: requestData.receivedBy.employeeId,
                employeeName: requestData.receivedBy.employeeName,
                notes: 'تم استلام الطلب وتسجيله في النظام'
            }
        ],
        feedback: null,
        rating: null
    };
    
    // تعيين الموظف المستقبل للطلب
    if (requestData.receivedBy) {
        newRequest.assignedTo.push({
            employeeId: requestData.receivedBy.employeeId,
            name: requestData.receivedBy.employeeName,
            role: 'مستقبل الطلب',
            status: 'مكتمل',
            startTime: new Date(),
            endTime: new Date()
        });
    }
    
    // إضافة الطلب إلى مجموعة البيانات
    requestsData.push(newRequest);
    
    return newRequest;
}

// دالة لتحديث حالة طلب
function updateRequestStatus(requestId, newStatus, employeeId, employeeName, notes) {
    const request = findRequestById(requestId);
    
    if (!request) {
        return { success: false, message: 'لم يتم العثور على الطلب' };
    }
    
    // تحديث حالة الطلب
    request.status = newStatus;
    request.updatedAt = new Date();
    
    // إضافة خطوة جديدة في المخطط الزمني
    request.timeline.push({
        stage: `تحديث حالة الطلب إلى "${newStatus}"`,
        status: 'مكتمل',
        time: new Date(),
        employeeId: employeeId,
        employeeName: employeeName,
        notes: notes
    });
    
    return { success: true, message: 'تم تحديث حالة الطلب بنجاح', request };
}

// دالة لتعيين موظف جديد للطلب
function assignEmployeeToRequest(requestId, employeeData) {
    const request = findRequestById(requestId);
    
    if (!request) {
        return { success: false, message: 'لم يتم العثور على الطلب' };
    }
    
    // إضافة الموظف إلى قائمة المعينين
    request.assignedTo.push({
        employeeId: employeeData.employeeId,
        name: employeeData.name,
        role: employeeData.role,
        status: 'قيد التنفيذ',
        startTime: new Date(),
        endTime: null
    });
    
    // تحديث الطلب
    request.updatedAt = new Date();
    
    // إضافة خطوة جديدة في المخطط الزمني
    request.timeline.push({
        stage: `تعيين "${employeeData.name}" (${employeeData.role})`,
        status: 'مكتمل',
        time: new Date(),
        employeeId: employeeData.assignedBy.employeeId,
        employeeName: employeeData.assignedBy.name,
        notes: `تم تعيين "${employeeData.name}" كـ ${employeeData.role} للعمل على الطلب`
    });
    
    return { success: true, message: 'تم تعيين الموظف بنجاح', request };
}

// دالة لإضافة تعليق أو تقييم من الزائر
function addVisitorFeedback(requestId, feedback, rating) {
    const request = findRequestById(requestId);
    
    if (!request) {
        return { success: false, message: 'لم يتم العثور على الطلب' };
    }
    
    // إضافة التعليق والتقييم
    request.feedback = feedback;
    request.rating = rating;
    
    // تحديث الطلب
    request.updatedAt = new Date();
    
    return { success: true, message: 'تم إضافة التعليق والتقييم بنجاح', request };
}

// دالة مساعدة لإنشاء معرف فريد للطلب
function generateRequestId() {
    const prefix = 'REQ-';
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return prefix + randomNum;
}

// دالة مساعدة لإنشاء معرف فريد للزائر
function generateVisitorId() {
    const prefix = 'V-';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return prefix + randomNum;
}

// دالة مساعدة لحساب الموعد النهائي للطلب
function calculateDeadline(priority) {
    const now = new Date();
    const deadline = new Date(now);
    
    // تحديد المدة بناءً على الأولوية
    switch (priority) {
        case 'عالية':
            deadline.setDate(deadline.getDate() + 3);
            break;
        case 'متوسطة':
            deadline.setDate(deadline.getDate() + 7);
            break;
        case 'منخفضة':
            deadline.setDate(deadline.getDate() + 14);
            break;
        default:
            deadline.setDate(deadline.getDate() + 7);
    }
    
    return deadline;
}

// دالة لعرض نسبة إكمال الطلب
function getRequestCompletionPercentage(requestId) {
    const request = findRequestById(requestId);
    
    if (!request) {
        return 0;
    }
    
    // حساب نسبة الإكمال بناءً على المراحل المكتملة
    const totalStages = request.timeline.length;
    const completedStages = request.timeline.filter(stage => stage.status === 'مكتمل').length;
    
    return Math.round((completedStages / totalStages) * 100);
}

// دالة لتقدير الوقت المتبقي لإكمال الطلب
function getEstimatedCompletionTime(requestId) {
    const request = findRequestById(requestId);
    
    if (!request || request.status === 'مكتمل') {
        return 0;
    }
    
    // حساب نسبة الإكمال
    const completionPercentage = getRequestCompletionPercentage(requestId);
    
    // حساب الوقت المنقضي
    const elapsedTime = new Date() - request.createdAt;
    
    // تقدير الوقت الإجمالي
    const totalEstimatedTime = (elapsedTime / (completionPercentage / 100));
    
    // حساب الوقت المتبقي
    const remainingTime = totalEstimatedTime - elapsedTime;
    
    // تحويل الوقت إلى ساعات
    return Math.round(remainingTime / (1000 * 60 * 60));
}

// تصدير الدوال للاستخدام في ملفات أخرى
window.trackingSystem = {
    findRequestById,
    findRequestsByVisitor,
    createNewRequest,
    updateRequestStatus,
    assignEmployeeToRequest,
    addVisitorFeedback,
    getRequestCompletionPercentage,
    getEstimatedCompletionTime
};
