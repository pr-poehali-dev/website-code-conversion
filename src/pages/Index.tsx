import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    starName: '',
  });
  const { toast } = useToast();

  const packages = [
    { id: 1, name: '50 звезд', stars: 50, price: 78, description: 'Стартовый пакет', popular: false },
    { id: 2, name: '100 звезд', stars: 100, price: 150, description: 'Базовый пакет', popular: false },
    { id: 3, name: '150 звезд', stars: 150, price: 220, description: 'Популярный выбор', popular: true },
    { id: 4, name: '250 звезд', stars: 250, price: 350, description: 'Расширенный пакет', popular: false },
    { id: 5, name: '500 звезд', stars: 500, price: 680, description: 'Премиум пакет', popular: false },
    { id: 6, name: '750 звезд', stars: 750, price: 1010, description: 'VIP пакет', popular: false },
    { id: 7, name: '1000 звезд', stars: 1000, price: 1350, description: 'Максимум выгоды', popular: true },
    { id: 8, name: '1500 звезд', stars: 1500, price: 2000, description: 'Элитный пакет', popular: false },
    { id: 9, name: '2500 звезд', stars: 2500, price: 3350, description: 'Платиновый пакет', popular: false },
    { id: 10, name: '5000 звезд', stars: 5000, price: 6650, description: 'Бриллиантовый пакет', popular: false },
    { id: 11, name: '10000 звезд', stars: 10000, price: 13250, description: 'Космический пакет', popular: true },
    { id: 12, name: '25000 звезд', stars: 25000, price: 33100, description: 'Галактический пакет', popular: false },
  ];

  const handleBuyClick = (pkg: any) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '🌟 Заявка принята!',
      description: `Спасибо, ${formData.name}! Мы свяжемся с вами в течение 24 часов.`,
    });
    setIsModalOpen(false);
    setFormData({ name: '', email: '', starName: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Sparkles" className="text-[#00dbde]" size={48} />
            <h1 className="text-5xl md:text-7xl font-bold cosmic-text">
              Купи Звезду
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Подари частичку космоса! Именная звезда с официальным сертификатом и координатами на небе
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {packages.map((pkg, index) => (
            <Card
              key={pkg.id}
              className={`relative bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-2 transition-all duration-300 hover:scale-105 hover:glow-cyan animate-fade-in ${
                pkg.popular ? 'border-[#fc00ff] glow-cyan-strong' : 'border-[#00dbde]'
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="cosmic-gradient px-4 py-1 rounded-full text-xs font-bold text-white">
                    ХИТ
                  </span>
                </div>
              )}
              <CardHeader className="text-center pt-6 pb-3">
                <CardTitle className="text-2xl font-bold text-[#00dbde] mb-1">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-gray-300 text-sm">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4 pb-6">
                <div className="flex items-center justify-center gap-2 text-3xl font-bold">
                  <Icon name="Star" className="text-[#FFD700] fill-[#FFD700]" size={24} />
                  <span className="text-[#00dbde]">{pkg.stars}</span>
                </div>
                <div className="text-3xl font-bold cosmic-text">
                  {pkg.price.toLocaleString('ru-RU')} ₽
                </div>
                <div className="text-xs text-gray-400">
                  {(pkg.price / pkg.stars).toFixed(2)} ₽ за звезду
                </div>
                <Button
                  onClick={() => handleBuyClick(pkg)}
                  className="w-full cosmic-gradient hover:opacity-90 text-white font-bold py-4 rounded-full transition-all duration-300 hover:scale-105 glow-cyan"
                >
                  Купить
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 md:p-12 border-2 border-[#00dbde]/30 glow-cyan mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#00dbde] mb-6 flex items-center gap-3">
            <Icon name="Rocket" size={32} />
            Как купить звезду?
          </h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4">
              <span className="cosmic-gradient rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                1
              </span>
              <span>Выберите пакет звёзд и нажмите "Купить сейчас"</span>
            </li>
            <li className="flex gap-4">
              <span className="cosmic-gradient rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                2
              </span>
              <span>Заполните форму с вашими данными и желаемым именем звезды</span>
            </li>
            <li className="flex gap-4">
              <span className="cosmic-gradient rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                3
              </span>
              <span>Мы свяжемся с вами для подтверждения и оплаты</span>
            </li>
            <li className="flex gap-4">
              <span className="cosmic-gradient rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                4
              </span>
              <span>Получите сертификат с координатами вашей звезды на небе!</span>
            </li>
          </ol>
        </div>

        <div className="text-center border-t border-gray-700 pt-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-[#00dbde] mb-4">Есть вопросы?</h3>
          <p className="text-gray-300 mb-6">Свяжитесь с нами в Telegram</p>
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0088cc] hover:bg-[#0077b3] px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105"
          >
            <Icon name="Send" size={24} />
            Написать в Telegram
          </a>
        </div>
      </div>

{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative bg-gradient-to-b from-[#1a1a2e] to-[#16213e] border-2 border-[#00dbde] rounded-3xl p-8 max-w-md w-full mx-4 glow-cyan-strong animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#fc00ff] transition-colors"
            >
              <Icon name="X" size={28} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-3xl font-bold cosmic-text mb-2">
                Оформление заказа
              </h2>
              <p className="text-gray-300">
                {selectedPackage?.name} — {selectedPackage?.price.toLocaleString('ru-RU')} ₽
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#00dbde]">
                  Ваше имя
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/10 border-[#00dbde]/30 text-white placeholder:text-gray-500"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#00dbde]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/10 border-[#00dbde]/30 text-white placeholder:text-gray-500"
                  placeholder="ivan@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="starName" className="text-[#00dbde]">
                  Имя для звезды
                </Label>
                <Input
                  id="starName"
                  value={formData.starName}
                  onChange={(e) => setFormData({ ...formData, starName: e.target.value })}
                  className="bg-white/10 border-[#00dbde]/30 text-white placeholder:text-gray-500"
                  placeholder="Моя Звезда"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full cosmic-gradient hover:opacity-90 text-white font-bold text-lg py-6 rounded-full transition-all duration-300"
              >
                Отправить заявку
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;