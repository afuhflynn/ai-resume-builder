import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

export function GlassTemplate({
  data,
  template,
}: {
  data: ResumeData;
  template: ResumeTemplate | null;
}) {
  const { personalInfo, summary, experience, education, skills, themeColor } =
    data;
  console.log({ template });

  return (
    <div
      className="w-full h-full min-h-[297mm] relative overflow-hidden"
      style={{
        fontFamily: template?.designJson.fonts.body,
        backgroundColor: "white",
      }}
    >
      {/* Background Elements */}
      <div
        className="absolute top-0 left-0 w-full h-64"
        style={{
          background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
        }}
      />

      <div className="relative z-10 p-8 md:p-12 flex flex-col gap-6">
        {/* Header Card */}
        <div
          className={cn(
            "backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-8 shadow-xl"
          )}
        >
          <h1
            className="text-4xl font-bold text-white mb-2 tracking-tight"
            style={{ fontFamily: template?.designJson.fonts.heading }}
          >
            {personalInfo.fullName}
          </h1>
          <p className="text-xl text-white/90 font-medium mb-6">
            {personalInfo.jobTitle}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-white/80">
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
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="hover:underline"
                >
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

        <div className="grid grid-cols-12 gap-6">
          {/* Main Column */}
          <div className="col-span-8 flex flex-col gap-6">
            {/* Summary */}
            {summary && (
              <div className="backdrop-blur-sm bg-white/60 border border-white/60 rounded-xl p-6 shadow-sm">
                <h2
                  className="text-lg font-bold mb-3 flex items-center gap-2"
                  style={{ color: themeColor }}
                >
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  {summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="backdrop-blur-sm bg-white/60 border border-white/60 rounded-xl p-6 shadow-sm">
                <h2
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ color: themeColor }}
                >
                  Work Experience
                </h2>
                <div className="flex flex-col gap-6">
                  {experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="relative pl-4 border-l-2"
                      style={{ borderColor: `${themeColor}40` }}
                    >
                      <div
                        className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
                        style={{ backgroundColor: themeColor }}
                      />
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-slate-800">
                          {exp.position}
                        </h3>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-600 mb-2">
                        {exp.company} • {exp.location}
                      </div>
                      <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="backdrop-blur-sm bg-white/60 border border-white/60 rounded-xl p-6 shadow-sm">
                <h2
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ color: themeColor }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}

            {/* Education */}
            {education.length > 0 && (
              <div className="backdrop-blur-sm bg-white/60 border border-white/60 rounded-xl p-6 shadow-sm">
                <h2
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ color: themeColor }}
                >
                  Education
                </h2>
                <div className="flex flex-col gap-4">
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-bold text-sm text-slate-800">
                        {edu.school}
                      </h3>
                      <div className="text-xs text-slate-600 mb-1">
                        {edu.degree} in {edu.field}
                      </div>
                      <div className="text-xs text-slate-400">
                        {edu.startDate} -{" "}
                        {edu.current ? "Present" : edu.endDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
