import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
} from "lucide-react";

interface EnhancedProfessionalTemplateProps {
  data: ResumeData;
  themeColor?: string;
}

export function EnhancedProfessionalTemplate({
  data,
  themeColor = "#4A90E2",
}: EnhancedProfessionalTemplateProps) {
  const sidebarBg = `${themeColor}15`; // 15% opacity

  return (
    <div className="w-full h-full bg-white text-gray-900 font-sans">
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <div
          className="w-[35%] p-8 flex flex-col"
          style={{ backgroundColor: sidebarBg }}
        >
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl font-bold">
                {data.personalInfo.fullName.charAt(0) || "U"}
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 leading-tight">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <p className="text-lg font-medium" style={{ color: themeColor }}>
              {data.personalInfo.jobTitle || "Your Job Title"}
            </p>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: themeColor }}
            >
              Contact
            </h2>
            <div className="space-y-3">
              {data.personalInfo.email && (
                <div className="flex items-start gap-3">
                  <Mail
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: themeColor }}
                  />
                  <a
                    href={`tel:${data.personalInfo.email}`}
                    className="hover:underline text-sm break-all"
                  >
                    {data.personalInfo.email}
                  </a>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-start gap-3">
                  <Phone
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: themeColor }}
                  />
                  <a
                    href={`tel:${data.personalInfo.phone}`}
                    className="hover:underline text-sm"
                  >
                    Tel Phone: {data.personalInfo.phone}
                  </a>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: themeColor }}
                  />
                  <span className="text-sm">{data.personalInfo.location}</span>
                </div>
              )}
              {data.personalInfo.website && (
                <div className="flex items-start gap-3">
                  <Globe
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: themeColor }}
                  />
                  <a
                    href={data.personalInfo.website}
                    className="hover:underline break-all"
                    style={{ color: themeColor }}
                  >
                    {data.personalInfo.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-start gap-3">
                  <Linkedin
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: themeColor }}
                  />
                  <a
                    href={`tel:${data.personalInfo.linkedin}`}
                    className="hover:underline text-sm"
                  >
                    {data.personalInfo.linkedin.replace(
                      /^https?:\/\/(www\.)?linkedin\.com\/in\//,
                      ""
                    )}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <div className="space-y-4">
              {/* Group skills by level or show all */}
              {data.skills.length > 0 && (
                <>
                  <div>
                    <h3 className="font-semibold text-sm mb-2">
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {data.skills
                        .slice(0, Math.ceil(data.skills.length / 2))
                        .map((skill) => (
                          <span key={skill.id} className="text-xs">
                            {skill.name}
                            {data.skills.indexOf(skill) <
                              Math.ceil(data.skills.length / 2) - 1 && ","}
                          </span>
                        ))}
                    </div>
                  </div>
                  {data.skills.length > 5 && (
                    <div>
                      <h3 className="font-semibold text-sm mb-2">
                        Additional Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {data.skills
                          .slice(Math.ceil(data.skills.length / 2))
                          .map((skill) => (
                            <span key={skill.id} className="text-xs">
                              {skill.name}
                              {data.skills.indexOf(skill) <
                                data.skills.length - 1 && ","}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Projects */}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div>
              <h2
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: themeColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-sm mb-1">{edu.degree}</h3>
                    <p className="text-sm font-medium mb-1">{edu.school}</p>
                    {edu.field && (
                      <p className="text-xs text-gray-600 mb-1">{edu.field}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-8">
          {/* Professional Summary */}
          {data.summary && (
            <div className="mb-8">
              <div
                className="flex items-center gap-2 mb-4 pb-2 border-b-2"
                style={{ borderColor: themeColor }}
              >
                <User className="w-5 h-5" style={{ color: themeColor }} />
                <h2
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  Professional Summary
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-gray-700">
                {data.summary}
              </p>
            </div>
          )}

          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <div
                className="flex items-center gap-2 mb-4 pb-2 border-b-2"
                style={{ borderColor: themeColor }}
              >
                <Briefcase className="w-5 h-5" style={{ color: themeColor }} />
                <h2
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  Experience
                </h2>
              </div>
              <div className="space-y-6">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-base">{exp.position}</h3>
                        <p className="text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <p>
                          {exp.startDate} -{" "}
                          {exp.current ? "Present" : exp.endDate}
                        </p>
                        {exp.location && <p>{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {exp.description.split("\n").map((line, idx) => (
                          <p key={idx} className="mb-1 pl-4">
                            {line.trim().startsWith("•") ||
                            line.trim().startsWith("-") ? (
                              <span className="flex gap-2">
                                <span>•</span>
                                <span>{line.replace(/^[•\-]\s*/, "")}</span>
                              </span>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {data.projects.length > 0 && (
            <div>
              <div
                className="flex items-center gap-2 mb-4 pb-2 border-b-2"
                style={{ borderColor: themeColor }}
              >
                <FolderGit2 className="w-5 h-5" style={{ color: themeColor }} />
                <h2
                  className="text-lg font-bold uppercase tracking-wider"
                  style={{ color: themeColor }}
                >
                  Projects
                </h2>
              </div>
              <div className="space-y-6">
                {data.projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base">{project.name}</h3>
                      <p className="text-xs text-gray-600">
                        {project.url ? "Present" : "Completed"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Tech Stack:
                        </p>
                        <p className="text-xs text-gray-600">
                          {project.technologies.join(", ")}
                        </p>
                      </div>
                    )}
                    {project.url && (
                      <div className="flex gap-4 text-xs">
                        <a
                          href={project.url}
                          className="font-medium hover:underline"
                          style={{ color: themeColor }}
                        >
                          GitHub Repo
                        </a>
                        <a
                          href={project.url}
                          className="font-medium hover:underline"
                          style={{ color: themeColor }}
                        >
                          Live Demo
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
