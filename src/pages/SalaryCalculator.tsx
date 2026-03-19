import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles, cities, levels, getSalary, type Role, type City, type Level } from "@/data/salaryDatabase";

const SalaryCalculator = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Python Developer");
  const [selectedCity, setSelectedCity] = useState<City>("Москва");
  const [selectedLevel, setSelectedLevel] = useState<Level>("Middle");

  const salary = useMemo(() => {
    return getSalary(selectedRole, selectedCity, selectedLevel);
  }, [selectedRole, selectedCity, selectedLevel]);

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat("ru-RU").format(value);
  };

  const getBarPosition = () => {
    if (!salary) return 50;
    const range = salary.max - salary.min;
    const medianPos = salary.median - salary.min;
    return Math.round((medianPos / range) * 100);
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Калькулятор зарплаты IT-специалиста 2026 | MCPHire</title>
        <meta
          name="description"
          content="Узнай рыночную зарплату для своей роли, города и уровня. Данные hh.ru, февраль 2026."
        />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border">
        <div className="section-container py-4 flex items-center justify-between">
          <Link to="/" className="font-black text-xl uppercase tracking-tight">
            MCPHire
          </Link>
          <a href="/#pricing" className="cta-text text-sm">
            Тарифы
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="section-white">
        <div className="section-container">
          <h1 className="heading-xl mb-4">КАЛЬКУЛЯТОР ЗАРПЛАТЫ</h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            Узнай рыночную зарплату для своей роли. Данные hh.ru 2026.
          </p>

          {/* Selectors */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                Роль
              </label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setSelectedRole(value as Role)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                Город
              </label>
              <Select
                value={selectedCity}
                onValueChange={(value) => setSelectedCity(value as City)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-wide mb-2">
                Уровень
              </label>
              <Select
                value={selectedLevel}
                onValueChange={(value) => setSelectedLevel(value as Level)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите уровень" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result Card */}
          {salary && (
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6 md:p-10 mb-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-sm font-bold uppercase text-muted-foreground mb-2">
                    Минимум
                  </p>
                  <p className="text-2xl md:text-3xl font-black">
                    от {formatSalary(salary.min)} ₽
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold uppercase text-muted-foreground mb-2">
                    Медиана
                  </p>
                  <p className="text-3xl md:text-4xl font-black" style={{ color: "hsl(174, 62%, 55%)" }}>
                    {formatSalary(salary.median)} ₽
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold uppercase text-muted-foreground mb-2">
                    Максимум
                  </p>
                  <p className="text-2xl md:text-3xl font-black">
                    до {formatSalary(salary.max)} ₽
                  </p>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="relative mb-6">
                <div className="h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${getBarPosition()}%`,
                      background: "hsl(174, 62%, 55%)",
                    }}
                  />
                </div>
                <div
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-1"
                  style={{ left: `${getBarPosition()}%` }}
                >
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px]" style={{ borderTopColor: "hsl(174, 62%, 55%)" }} />
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                {selectedRole} • {selectedCity} • {selectedLevel}
              </p>
            </div>
          )}

          <p className="text-sm text-muted-foreground text-center mb-10">
            Данные собраны из 10 000+ вакансий на hh.ru, февраль 2026
          </p>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg mb-4">Хочешь больше?</p>
            <a
              href="https://t.me/mcphire_bot"
              className="cta-primary-nrc inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Запишись в MCPHire
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t border-foreground">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-muted-foreground">
            <div>
              <Link to="/" className="font-bold text-foreground hover:text-muted-foreground transition-colors">
                MCPHire
              </Link>
              <p>AI-powered IT job marketplace</p>
            </div>
            <Link to="/" className="cta-text text-sm">
              На главную
            </Link>
            <p>&copy; MCPHire 2026</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default SalaryCalculator;
