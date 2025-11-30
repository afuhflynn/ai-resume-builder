import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function MinimalistTemplate({ data }: { data: ResumeData }) {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
    themeColor,
    projects,
  } = data;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans p-12">
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-5xl font-light tracking-tight mb-4 text-slate-900">
          {personalInfo.fullName}
        </h1>
        <p className="text-xl text-slate-500 font-light mb-6 tracking-wide uppercase">
          {personalInfo.jobTitle}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-light">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:underline"
            >
              {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          {personalInfo.website && (
            <a href={personalInfo.website} className="hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              About
            </h2>
            <p className="text-slate-700 leading-relaxed max-w-2xl">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Experience
            </h2>
            <div className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-sm text-slate-500 font-medium">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </div>
                  <div className="col-span-9">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {exp.position}
                    </h3>
                    <div className="text-sm text-slate-500 mb-3">
                      {exp.company}, {exp.location}
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-sm text-slate-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Projects
            </h2>
            <div className="flex flex-col gap-8">
              {projects.map((prt) => (
                <div key={prt.id} className="gap-4 ">
                  <div className="col-span-9">
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {prt.name}
                    </h3>
                    <div className="text-sm text-slate-500 mb-3">
                      <a href={prt.url} className="cursor-pointer">
                        Live Demo
                      </a>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm my-2">
                    {prt.description}
                  </p>
                  <div className="flex gap-2 items-center text-sm">
                    <h3 className="font-semibold">Tech Stack: </h3>
                    {prt.technologies.map((tech, index) => (
                      <span key={index}>
                        {`${
                          index === prt.technologies.length - 1
                            ? `${tech}`
                            : `${tech}, `
                        }`}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              Education
            </h2>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-sm text-slate-500 font-medium">
                    {edu.startDate} — {edu.endDate}
                  </div>
                  <div className="col-span-9">
                    <h3 className="font-semibold text-slate-900">
                      {edu.school}
                    </h3>
                    <div className="text-sm text-slate-600">
                      {edu.degree} in {edu.field}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
