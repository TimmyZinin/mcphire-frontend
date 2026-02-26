import { Link } from "react-router-dom";
import { mockJobs } from "@/data/mockJobs";

const formatSalary = (salary: number): string => {
  return new Intl.NumberFormat("ru-RU").format(salary);
};

const JobBoardSection = () => {
  const recentJobs = mockJobs.slice(0, 4);

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="heading-lg">IT-ВАКАНСИИ</h2>
            <p className="text-muted-foreground">
              50+ вакансий от ведущих компаний России
            </p>
          </div>
          <Link to="/jobs" className="cta-text">
            Все вакансии →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
            >
              <p className="font-bold text-sm mb-1">{job.title}</p>
              <p className="text-xs text-muted-foreground mb-1">
                {job.company} · {job.city}
              </p>
              <p className="text-xs font-bold text-primary">
                {formatSalary(job.salaryFrom)} – {formatSalary(job.salaryTo)} ₽
              </p>
            </Link>
          ))}
        </div>
        <div className="flex gap-4 mt-6">
          <Link to="/jobs" className="cta-primary-nrc text-sm">
            Смотреть вакансии
          </Link>
          <Link to="/employers" className="cta-text text-sm">
            Для работодателей →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobBoardSection;
