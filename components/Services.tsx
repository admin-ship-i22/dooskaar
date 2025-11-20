import React from 'react';
import { ServiceItem } from '../types';
import { Building2, Users, Zap } from 'lucide-react';

const services: (ServiceItem & { icon: React.ReactNode })[] = [
  {
    id: 'corporate',
    badge: 'شركات ومؤسسات',
    title: 'عقود شهرية وسنوية',
    description: 'إدارة أساطيل للشركات برواتب شهرية ثابتة، مع متابعة للصيانة، تغيير الزيت، والتقارير الدورية عن استخدام المركبات.',
    icon: <Building2 className="text-gold mb-2" size={20} />
  },
  {
    id: 'individuals',
    badge: 'أفراد وضيوف',
    title: 'تأجير يومي وأسبوعي',
    description: 'خيارات تأجير مرنة تبدأ من يوم واحد، مع إمكانية الاستلام والتسليم من المطار أو من موقع العميل داخل جدة.',
    icon: <Users className="text-gold mb-2" size={20} />
  },
  {
    id: 'digital',
    badge: 'تحوّل رقمي',
    title: 'ربط مع الواتساب وأنظمة الدفع',
    description: 'استقبال طلبات الحجز عبر الواتساب، إرسال العقود رقمياً، الدفع أونلاين، وإشعارات تلقائية قبل انتهاء العقد.',
    icon: <Zap className="text-gold mb-2" size={20} />
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-16">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-white">خدمات دوس لتأجير السيارات</h2>
          <p className="text-xs text-gray-400">حلول مرنة تناسب الأفراد والشركات، مع إمكانية تخصيص العقود.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-dark-section border border-white/5 p-5 rounded-[10px] shadow-lg hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block text-[10px] px-2 py-0.5 rounded-full border border-gold/40 text-gold-soft">
                  {service.badge}
                </span>
                {service.icon}
              </div>
              <h3 className="text-[13px] font-bold text-gold-soft mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};