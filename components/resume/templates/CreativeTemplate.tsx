import { ResumeData } from "@/providers/ResumeProvider";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, themeColor } =
    data;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-800 font-sans flex">
      {/* Sidebar */}
      <div
        className="w-1/3 text-white p-8 flex flex-col gap-8"
        style={{ backgroundColor: themeColor }}
      >
        <div className="flex flex-col gap-4">
          <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
            {personalInfo.fullName.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-center leading-tight">
            {personalInfo.fullName}
          </h1>
          <p className="text-center text-white/80 font-medium uppercase tracking-widest text-sm">
            {personalInfo.jobTitle}
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/90">
          {personalInfo.email && (
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-md">
                <Mail className="h-3.5 w-3.5" />
              </div>
              <a
                href={`tel:${personalInfo.email}`}
                className="hover:underline text-sm break-all"
              >
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-md">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <a
                href={`tel:${personalInfo.phone}`}
                className="hover:underline text-sm"
              >
                Tel Phone: {personalInfo.phone}
              </a>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-md">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-md">
                <Linkedin className="h-3.5 w-3.5" />
              </div>
              <a
                href={`tel:${personalInfo.linkedin}`}
                className="hover:underline text-sm"
              >
                {personalInfo.linkedin.replace(
                  /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                  ""
                )}
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-1.5 rounded-md">
                <Globe className="h-3.5 w-3.5" />
              </div>
              <a
                href={personalInfo.website}
                className="hover:underline break-all"
              >
                {personalInfo.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>

        {/* Skills in Sidebar */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-white/30 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-xs font-medium px-2 py-1 rounded bg-white/20"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Projects */}

        {/* Education in Sidebar */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4 border-b border-white/30 pb-2">
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm">{edu.school}</h3>
                  <div className="text-xs text-white/80 mb-1">{edu.degree}</div>
                  <div className="text-xs text-white/60">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-10 flex flex-col gap-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2
              className="text-xl font-bold uppercase tracking-widest mb-4 flex items-center gap-3"
              style={{ color: themeColor }}
            >
              <span className="w-8 h-1 bg-current rounded-full" />
              Profile
            </h2>
            <p className="text-slate-600 leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-3"
              style={{ color: themeColor }}
            >
              <span className="w-8 h-1 bg-current rounded-full" />
              Experience
            </h2>
            <div className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-bold text-lg text-slate-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                    {exp.company} | {exp.location}
                  </div>
                  <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
