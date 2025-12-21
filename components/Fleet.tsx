import React from 'react';
import { FleetItem } from '../types';
import { ChevronLeft, Fuel, Users, Settings } from 'lucide-react';

const fleet: FleetItem[] = [
  {
    id: 'eco',
    name: 'سيدان اقتصادية',
    badge: 'الأكثر طلبًا',
    price: 129,
    features: ['مكيّف', 'أوتوماتيك', 'توفير وقود'],
  },
  {
    id: 'suv',
    name: 'SUV عائلية',
    badge: 'عائلات',
    price: 249,
    features: ['7 مقاعد', 'مساحة واسعة', 'رحلات'],
  },
  {
    id: 'vip',
    name: 'فاخرة للأعمال',
    badge: 'VIP',
    price: 399,
    features: ['مقاعد جلد', 'أمان متقدم', 'سائق اختياري'],
  },
];

export const Fleet: React.FC = () => {
  return (
    <section id="fleet" className="py-16">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-2 text-white">نماذج من أسطول السيارات</h2>
          <p className="text-xs text-gray-400">
            أمثلة تجريبية – يمكن لاحقًا ربطها بقاعدة بيانات وعرض الحالة الفعلية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleet.map((car) => (
            <div 
              key={car.id}
              className="bg-[radial-gradient(circle_at_top,#202034,#050509)] border border-gold/30 rounded-[10px] p-4 shadow-soft group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[13px] font-bold text-gold-soft">{car.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-gray-300">
                  {car.badge}
                </span>
              </div>

              <div className="text-2xl font-bold text-white mb-1">
                {car.price} <span className="text-xs font-normal text-gold text-opacity-80">ر.س / يوم</span>
              </div>

              <div className="flex gap-3 my-4 text-[10px] text-gray-400 border-t border-white/5 pt-3">
                {car.features.map((feature, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-gold rounded-full"></span>
                    {feature}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => {
                  // Prevent reverse-tabnabbing by disabling `window.opener`.
                  const newWindow = window.open("https://wa.me/966500000000", "_blank", "noopener,noreferrer");
                  if (newWindow) newWindow.opener = null;
                }}
                className="w-full flex items-center justify-between text-[11px] text-gold-soft hover:text-white transition-colors group-hover:translate-x-[-4px] duration-200"
              >
                احجز هذه الفئة الآن
                <ChevronLeft size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};