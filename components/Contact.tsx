import React, { useState } from 'react';
import { Button } from './ui/Button';
import { MessageSquare, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-16 mb-8">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-white">تواصل معنا</h2>
          <p className="text-xs text-gray-400">
            أرسل طلبك وسيتم الرد عليك من فريق خدمة العملاء في أقرب وقت.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Form */}
          <div className="bg-dark-section border border-white/5 p-5 rounded-[10px] shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-[11px] text-gray-400 mb-1.5">الاسم الكامل</label>
                <input 
                  id="name" 
                  type="text" 
                  required
                  placeholder="اكتب اسمك هنا"
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:border-gold/70 focus:outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-[11px] text-gray-400 mb-1.5">رقم الجوال</label>
                <input 
                  id="phone" 
                  type="tel" 
                  required
                  placeholder="05XXXXXXXX"
                  dir="ltr"
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white text-right placeholder:text-gray-600 focus:border-gold/70 focus:outline-none focus:ring-1 focus:ring-gold/40 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[11px] text-gray-400 mb-1.5">تفاصيل الطلب</label>
                <textarea 
                  id="message" 
                  rows={4}
                  placeholder="مثال: أحتاج 3 سيارات سيدان لمدة شهر لشركة في جدة."
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:border-gold/70 focus:outline-none focus:ring-1 focus:ring-gold/40 transition-all resize-none"
                ></textarea>
              </div>

              <div className="mt-2">
                <Button type="submit" className="w-full justify-center">
                  {submitted ? 'تم الإرسال بنجاح' : 'إرسال الطلب (تجريبي)'}
                </Button>
                <p className="text-[10px] text-gray-500 mt-2 text-center">
                  لن يتم إرسال أي بيانات حقيقية في هذه النسخة التجريبية.
                </p>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="bg-[radial-gradient(circle_at_top,#202034,#050509)] border border-gold/30 p-5 rounded-[10px] shadow-soft h-full">
            <h3 className="text-sm font-bold text-gold-soft mb-4">معلومات التواصل</h3>
            
            <div className="flex flex-col gap-3 mb-6 text-xs text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gold" />
                <span>جدة – قريب من مطار الملك عبدالعزيز</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold" />
                <span dir="ltr">0500 000 000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gold" />
                <span>info@doosrent.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-gold" />
                <span>9 صباحًا – 11 مساءً</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              <Button variant="outline" onClick={() => window.open("https://wa.me/966500000000", "_blank")}>
                <MessageSquare size={14} />
                تواصل عبر الواتساب
              </Button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-4 py-2 rounded-full border border-white/10 text-xs text-gray-400 hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                رجوع للأعلى
                <ArrowUp size={14} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};