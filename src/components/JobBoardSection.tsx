import { Link } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { formatSalaryRange } from "@/lib/formatters";

const JobBoardSection = () => {
  const { data } = useJobs({ perPage: 4, sortBy: "date_desc" });
  const recentJobs = data?.data || [];

  return (
    <section className="section-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="heading-lg">IT-ВАКАНСИИ</h2>
            <p className="text-muted-foreground">
              {data?.meta?.total || "50"}+ вакансий от ведущих компаний России
            </p>
          </div>
          <Link to="/jobs" className="cta-text">
            Все вакансии →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentJobs.map((job) => {
            const companyName = typeof job.company === "string" ? job.company : job.company.name;
            return (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
              >
                <p className="font-bold text-sm mb-1">{job.title}</p>
                <p className="text-xs text-muted-foreground mb-1">
                  {companyName} · {job.city}
                </p>
                <p className="text-xs font-bold text-primary">
                  {formatSalaryRange(job.salaryFrom, job.salaryTo, job.currency)}
                </p>
              </Link>
            );
          })}
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
