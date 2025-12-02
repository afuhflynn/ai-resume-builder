import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function ModernTemplate({
  data,
  template,
}: {
  data: ResumeData;
  template: ResumeTemplate | null;
}) {
  const { personalInfo, summary, experience, education, skills, themeColor } =
    data;

  return (
    <div
      className="w-full h-full min-h-[297mm] bg-white text-slate-900 font-sans p-8 md:p-12"
      style={{
        fontFamily: template?.designJson.fonts.body,
        backgroundColor: template?.designJson.colors.background,
      }}
    >
      {/* Header */}
      <div className="p-8 px-0">
        <h1
          className="text-4xl font-bold  mb-2 tracking-tight uppercase"
          style={{
            color: themeColor,
            fontFamily: template?.designJson.fonts.heading,
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p className="text-xl font-medium mb-6">{personalInfo.jobTitle}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:underline"
              >
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                Tel Phone: {personalInfo.phone}
              </a>
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
              <a href={personalInfo.linkedin} className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" />
              <a href={personalInfo.website} className="hover:underline">
                {personalInfo.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="backdrop-blur-sm bg-white/60 border border-white/60 rounded-xl mb-4 shadow-sm">
          <h2
            className="text-lg uppercase font-bold mb-3 flex items-center gap-2"
            style={{ color: themeColor }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
        </div>
      )}
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
