"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from "lucide-react";
import { AIEnhancer } from "./AIEnhancer";
import { useResumeStore } from "@/lib/store/resume-store";

export function ResumeEditor() {
  const {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
  } = useResumeStore();

  return (
    <div className="space-y-6 p-6 h-full overflow-auto">
      <Accordion
        type="multiple"
        defaultValue={[
          "personal-info",
          "summary",
          "experience",
          "education",
          "skills",
          "projects",
        ]}
      >
        {/* Personal Info */}
        <AccordionItem value="personal-info">
          <AccordionTrigger>Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    updatePersonalInfo({ fullName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={resumeData.personalInfo.jobTitle}
                  onChange={(e) =>
                    updatePersonalInfo({ jobTitle: e.target.value })
                  }
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    updatePersonalInfo({ email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    updatePersonalInfo({ phone: e.target.value })
                  }
                  placeholder="+1 234 567 890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    updatePersonalInfo({ location: e.target.value })
                  }
                  placeholder="New York, NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) =>
                    updatePersonalInfo({ website: e.target.value })
                  }
                  placeholder="johndoe.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    updatePersonalInfo({ linkedin: e.target.value })
                  }
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Summary */}
        <AccordionItem value="summary">
          <AccordionTrigger>Professional Summary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={resumeData.summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Experienced software engineer with a passion for building scalable applications..."
                className="min-h-[100px]"
              />
              <AIEnhancer
                text={resumeData.summary}
                onEnhance={updateSummary}
                type="summary"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger>Work Experience</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.experience.map((exp) => (
              <div
                key={exp.id}
                className="border rounded-lg p-4 space-y-4 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, { position: e.target.value })
                      }
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { startDate: e.target.value })
                      }
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(exp.id, { endDate: e.target.value })
                      }
                      placeholder="Present"
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(exp.id, { description: e.target.value })
                    }
                    placeholder="• Led a team of 5 developers..."
                    className="min-h-[100px]"
                  />
                  <AIEnhancer
                    text={exp.description}
                    onEnhance={(newText) =>
                      updateExperience(exp.id, { description: newText })
                    }
                    type="experience"
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addExperience}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 border rounded-md p-2 group relative"
                >
                  <div className="flex-1 space-y-1">
                    <Input
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, { name: e.target.value })
                      }
                      placeholder="Skill name (e.g. React)"
                      className="h-8"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          level: e.target.value as any,
                        })
                      }
                      className="w-full text-xs border rounded px-2 py-1 bg-background"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                    onClick={() => removeSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addSkill}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Projects */}
        <AccordionItem value="projects">
          <AccordionTrigger>Projects</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 space-y-4 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={project.name}
                      onChange={(e) =>
                        updateProject(project.id, { name: e.target.value })
                      }
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      value={project.url}
                      onChange={(e) =>
                        updateProject(project.id, { url: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Technologies (comma separated)</Label>
                  <Input
                    value={project.technologies.join(", ")}
                    onChange={(e) =>
                      updateProject(project.id, {
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="React, Node.js, TypeScript"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, { description: e.target.value })
                    }
                    placeholder="Project description..."
                    className="min-h-[80px]"
                  />
                  <AIEnhancer
                    text={project.description}
                    onEnhance={(newText) =>
                      updateProject(project.id, { description: newText })
                    }
                    type="experience" // Reusing experience prompt for now as it's similar
                  />
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addProject}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger>Education</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.education.map((edu) => (
              <div
                key={edu.id}
                className="border rounded-lg p-4 space-y-4 relative group"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>School</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(edu.id, { school: e.target.value })
                      }
                      placeholder="University of Technology"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, { degree: e.target.value })
                      }
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(edu.id, { field: e.target.value })
                      }
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, { location: e.target.value })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { startDate: e.target.value })
                      }
                      placeholder="Sep 2016"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, { endDate: e.target.value })
                      }
                      placeholder="May 2020"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addEducation}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
