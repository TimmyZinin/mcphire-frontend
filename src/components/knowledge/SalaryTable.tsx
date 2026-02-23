interface SalaryRow {
  grade: string;
  moscow: number | null;
  spb: number | null;
  russia: number | null;
  remote: number | null;
}

interface SalaryTableProps {
  data: SalaryRow[];
}

const fmt = (n: number | null) => {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("ru-RU") + " ₽";
};

const SalaryTable = ({ data }: SalaryTableProps) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="text-left py-3 pr-4 font-bold uppercase text-xs tracking-wider">Грейд</th>
            <th className="text-right py-3 px-4 font-bold uppercase text-xs tracking-wider">Москва</th>
            <th className="text-right py-3 px-4 font-bold uppercase text-xs tracking-wider">СПб</th>
            <th className="text-right py-3 px-4 font-bold uppercase text-xs tracking-wider">Россия</th>
            <th className="text-right py-3 pl-4 font-bold uppercase text-xs tracking-wider">Удалёнка</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.grade} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="py-3 pr-4 font-semibold">{row.grade}</td>
              <td className="text-right py-3 px-4 tabular-nums">{fmt(row.moscow)}</td>
              <td className="text-right py-3 px-4 tabular-nums">{fmt(row.spb)}</td>
              <td className="text-right py-3 px-4 tabular-nums">{fmt(row.russia)}</td>
              <td className="text-right py-3 pl-4 tabular-nums">{fmt(row.remote)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-muted-foreground mt-2">
        Данные: hh.ru API, медиана зарплат, февраль 2026
      </p>
    </div>
  );
};

export default SalaryTable;
