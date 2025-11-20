import React from 'react';
import { Check, MessageCircle, Car, ChevronLeft } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const openWhatsApp = () => {
    window.open("https://wa.me/966500000000", "_blank");
  };

  return (
    <section id="hero" className="pt-32 pb-16 relative overflow-hidden">
      <div className="w-full max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-[11px] text-gold-soft px-3 py-1 rounded-full bg-black/40 border border-gold/40 mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.9)]"></span>
              إدارة أسطول احترافية – حجوزات فورية – دعم على مدار الساعة
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.4] mb-4">
              تجربة تأجير سيارات <span className="text-gold-soft">فاخرة</span><br />
              لإدارة أعمالك بهدوء وثقة.
            </h1>

            <p className="text-[13px] text-gray-400 leading-relaxed max-w-md mb-6">
              دوس لتأجير السيارات – أسطول حديث، عقود واضحة، متابعة ذكية من لحظة الحجز
              وحتى تسليم المركبة، مع إمكانية الربط مع أنظمة الدفع والواتساب.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button onClick={openWhatsApp}>
                <MessageCircle size={16} />
                احجز الآن عبر الواتساب
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('fleet')?.scrollIntoView({ behavior: 'smooth' })}>
                <Car size={16} />
                استعرض السيارات
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
              {['أسطول أعمال وشركات', 'تسليم واستلام من المطار', 'إدارة عقود طويلة الأجل'].map((badge) => (
                <span key={badge} className="px-3 py-1.5 rounded-full border border-white/5 bg-white/5">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Card */}
          <div className="order-1 lg:order-2 relative z-10">
            <div className="relative rounded-[14px] border border-gold/30 bg-[radial-gradient(circle_at_top,#202034,#050509)] p-5 shadow-soft overflow-hidden isolate">
              {/* Glow Effect */}
              <div className="absolute -inset-1/2 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.15),transparent_60%)] -z-10 pointer-events-none"></div>

              <div className="text-[13px] text-gold-soft mb-3 font-medium">عرض خاص – سيارة سيدان فاخرة</div>

              <div className="flex items-end justify-between gap-4 mb-4">
                {/* Abstract Car Shape */}
                <div className="flex-1 h-28 rounded-2xl bg-gradient-to-br from-black to-[#202020] border border-white/5 relative overflow-hidden group">
                   <div className="absolute inset-[12%] rounded-[60%_40%_60%_40%] bg-[radial-gradient(circle_at_20%_0,rgba(255,255,255,0.1),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(212,175,55,0.4),transparent_55%)] blur-[1px]"></div>
                   <div className="absolute bottom-2 left-[10%] right-[10%] h-4 bg-black/80 blur-md rounded-full"></div>
                </div>

                {/* Price Tag */}
                <div className="min-w-[110px] rounded-xl bg-black/80 border border-gold/30 p-3 backdrop-blur-sm">
                  <div className="text-[11px] text-gray-400 mb-1">ابتداءً من</div>
                  <div className="text-lg font-bold text-gold-soft">189 ر.س</div>
                  <div className="text-[10px] text-gray-500">يومياً</div>
                </div>
              </div>

              {/* Features */}
              <div className="flex justify-between text-[11px] text-gray-400 mb-4 border-t border-white/5 pt-3">
                {[
                  'تأمين شامل',
                  'صيانة دورية',
                  'دعم فني',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                    {item}
                  </div>
                ))}
              </div>

              {/* Footer of Card */}
              <div className="flex justify-between items-center text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[70%] h-full bg-gradient-to-r from-gold-soft to-gold"></div>
                  </div>
                  <span>جاهزية الأسطول</span>
                </div>
                <span>+300 مركبة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};