import { ResumeData } from "@/providers/ResumeProvider";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, themeColor } =
    data;

  return (
    <div className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-serif p-10 md:p-14">
      {/* Header */}
      <div className="border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
        <h1
          className="text-4xl font-bold uppercase tracking-wider mb-2"
          style={{ color: themeColor }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-xl font-medium text-slate-600 mb-4">
          {personalInfo.jobTitle}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="h-3.5 w-3.5" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Summary */}
        {summary && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
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
                    <span className="text-sm font-medium text-slate-600">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-2 italic">
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
              className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Education
            </h2>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800">{edu.school}</h3>
                    <div className="text-sm text-slate-700">
                      {edu.degree} in {edu.field}
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 border-b pb-1"
              style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-sm text-slate-700">{skill.name}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
