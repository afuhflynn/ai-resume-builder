import { ResumeData } from "@/providers/ResumeProvider";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, themeColor } =
    data;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans p-8 md:p-12">
      {/* Header */}
      <div
        className="flex justify-between items-start border-b-2 pb-8 mb-8"
        style={{ borderColor: themeColor }}
      >
        <div className="flex-1">
          <h1
            className="text-4xl font-bold uppercase tracking-tight mb-2"
            style={{ color: themeColor }}
          >
            {personalInfo.fullName}
          </h1>
          <p className="text-xl font-medium text-slate-600 mb-4">
            {personalInfo.jobTitle}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            {summary}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-600 items-end">
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <span>{personalInfo.email}</span>
              <Mail className="h-4 w-4" />
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <span>{personalInfo.phone}</span>
              <Phone className="h-4 w-4" />
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <span>{personalInfo.location}</span>
              <MapPin className="h-4 w-4" />
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <span>LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <span>Portfolio</span>
              <Globe className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="col-span-8 flex flex-col gap-8">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                Work Experience
              </h2>
              <div className="flex flex-col gap-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-lg text-slate-800">
                        {exp.position}
                      </h3>
                      <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-600 mb-2">
                      {exp.company}, {exp.location}
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                Education
              </h2>
              <div className="flex flex-col gap-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-800">{edu.school}</h3>
                      <span className="text-sm text-slate-600">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <div className="text-sm text-slate-700">
                      {edu.degree} in {edu.field}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="col-span-4 flex flex-col gap-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2
                className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2"
                style={{ color: themeColor }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-sm font-medium px-3 py-1.5 rounded bg-slate-100 text-slate-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
