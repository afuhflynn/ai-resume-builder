// app/api/seed/templates/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Allow seeding in development without authentication
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seeding is not allowed in production" },
      { status: 403 }
    );
  }

  try {
    // Modern Template - Software Engineer
    const modernTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Modern" },
      update: {},
      create: {
        name: "Modern",
        description:
          "Clean, contemporary design perfect for tech and creative industries",
        designJson: {
          layout: "single-column",
          colors: {
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#0ea5e9",
            background: "#ffffff",
            text: "#1e293b",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
            headingWeight: "700",
            bodyWeight: "400",
          },
          spacing: {
            margin: "24px",
            lineHeight: "1.6",
            sectionGap: "32px",
          },
          style: {
            headerStyle: "centered",
            sectionHeaders: "underlined",
            bulletStyle: "disc",
            borderRadius: "8px",
          },
          // Sample resume data
          sampleData: {
            personalInfo: {
              fullName: "Alex Rivera",
              jobTitle: "Senior Software Engineer",
              email: "alex.rivera@email.com",
              phone: "+1 (555) 123-4567",
              location: "San Francisco, CA",
              linkedin: "linkedin.com/in/alexrivera",
              website: "alexrivera.dev",
              x: "@alexrivera",
            },
            summary:
              "Results-driven Software Engineer with 7+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Passionate about creating elegant solutions to complex problems and mentoring junior developers.",
            experience: [
              {
                id: "exp1",
                company: "TechCorp Inc.",
                position: "Senior Software Engineer",
                location: "San Francisco, CA",
                startDate: "Jan 2021",
                endDate: "Present",
                current: true,
                description:
                  "Leading development of microservices architecture serving 2M+ users. Reduced API response time by 40% through optimization. Mentoring team of 5 junior engineers.",
              },
              {
                id: "exp2",
                company: "StartupXYZ",
                position: "Full Stack Developer",
                location: "Remote",
                startDate: "Jun 2018",
                endDate: "Dec 2020",
                current: false,
                description:
                  "Built customer-facing dashboard using React and TypeScript. Implemented CI/CD pipeline reducing deployment time by 60%. Collaborated with design team on UX improvements.",
              },
              {
                id: "exp3",
                company: "WebDev Solutions",
                position: "Junior Developer",
                location: "Austin, TX",
                startDate: "Aug 2016",
                endDate: "May 2018",
                current: false,
                description:
                  "Developed responsive web applications for various clients. Maintained legacy codebases and implemented new features. Participated in agile development processes.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "University of California, Berkeley",
                degree: "Bachelor of Science",
                field: "Computer Science",
                location: "Berkeley, CA",
                startDate: "2012",
                endDate: "2016",
                current: false,
                description:
                  "GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems",
              },
            ],
            skills: [
              { id: "skill1", name: "JavaScript/TypeScript", level: "Expert" },
              { id: "skill2", name: "React & Next.js", level: "Expert" },
              { id: "skill3", name: "Node.js & Express", level: "Advanced" },
              { id: "skill4", name: "PostgreSQL & MongoDB", level: "Advanced" },
              { id: "skill5", name: "AWS & Docker", level: "Intermediate" },
              { id: "skill6", name: "Python", level: "Intermediate" },
            ],
            projects: [
              {
                id: "proj1",
                name: "E-Commerce Platform",
                description:
                  "Built full-stack e-commerce platform with real-time inventory management and payment processing",
                url: "github.com/alex/ecommerce",
                technologies: ["React", "Node.js", "Stripe", "PostgreSQL"],
              },
              {
                id: "proj2",
                name: "AI Chat Assistant",
                description:
                  "Developed AI-powered chatbot using OpenAI API with custom training data and context management",
                url: "chatassist.dev",
                technologies: ["Next.js", "OpenAI API", "Prisma", "Tailwind"],
              },
            ],
          },
        },
        thumbnail: "/templates/modern.png",
        isPremium: false,
        isActive: true,
      },
    });

    // Glass Template - Product Designer
    const glassTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Glass" },
      update: {},
      create: {
        name: "Glass",
        description: "Sleek glassmorphism design with modern aesthetics",
        designJson: {
          layout: "two-column",
          columns: {
            left: "35%",
            right: "65%",
            leftSections: ["skills", "education", "contact"],
            rightSections: ["summary", "experience", "projects"],
          },
          colors: {
            primary: "#2563eb",
            secondary: "#64748b",
            accent: "#3b82f6",
            background: "#f8fafc",
            sidebarBg: "#1e293b",
            text: "#0f172a",
          },
          fonts: {
            heading: "Inter",
            body: "Inter",
            headingWeight: "600",
            bodyWeight: "400",
          },
          spacing: {
            margin: "20px",
            lineHeight: "1.5",
            sectionGap: "28px",
          },
          style: {
            headerStyle: "sidebar",
            sectionHeaders: "colored-bg",
            bulletStyle: "chevron",
            borderRadius: "12px",
            glassEffect: true,
          },
          sampleData: {
            personalInfo: {
              fullName: "Jordan Chen",
              jobTitle: "Senior Product Designer",
              email: "jordan.chen@design.com",
              phone: "+1 (555) 234-5678",
              location: "New York, NY",
              linkedin: "linkedin.com/in/jordanchen",
              website: "jordanchen.design",
              x: "@jordandesigns",
            },
            summary:
              "Award-winning Product Designer with 6+ years creating delightful user experiences for SaaS products. Expertise in user research, prototyping, and design systems. Led design initiatives that increased user engagement by 85%.",
            experience: [
              {
                id: "exp1",
                company: "DesignFirst Labs",
                position: "Senior Product Designer",
                location: "New York, NY",
                startDate: "Mar 2020",
                endDate: "Present",
                current: true,
                description:
                  "Leading design for B2B SaaS platform with 500K+ users. Created comprehensive design system adopted across 12 products. Conducted user research studies improving feature adoption by 60%.",
              },
              {
                id: "exp2",
                company: "Creative Studios",
                position: "Product Designer",
                location: "Brooklyn, NY",
                startDate: "Jan 2018",
                endDate: "Feb 2020",
                current: false,
                description:
                  "Designed mobile-first experiences for consumer apps. Collaborated with engineering teams on implementation. Won 'Best Design' award at 2019 Product Conference.",
              },
              {
                id: "exp3",
                company: "Freelance",
                position: "UX/UI Designer",
                location: "Remote",
                startDate: "Jun 2016",
                endDate: "Dec 2017",
                current: false,
                description:
                  "Worked with startups and established companies on web and mobile projects. Delivered 20+ client projects with 100% satisfaction rate.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "Rhode Island School of Design",
                degree: "Bachelor of Fine Arts",
                field: "Graphic Design",
                location: "Providence, RI",
                startDate: "2012",
                endDate: "2016",
                current: false,
                description:
                  "Focus on digital design and interactive media. Dean's List all semesters.",
              },
            ],
            skills: [
              { id: "skill1", name: "Figma & Sketch", level: "Expert" },
              { id: "skill2", name: "User Research", level: "Expert" },
              { id: "skill3", name: "Prototyping", level: "Advanced" },
              { id: "skill4", name: "Design Systems", level: "Advanced" },
              { id: "skill5", name: "HTML/CSS", level: "Intermediate" },
              { id: "skill6", name: "Adobe Creative Suite", level: "Advanced" },
            ],
            projects: [
              {
                id: "proj1",
                name: "FinanceApp Redesign",
                description:
                  "Complete redesign of mobile banking app, increasing daily active users by 45%",
                url: "behance.net/jordan/financeapp",
                technologies: ["Figma", "User Research", "Prototyping"],
              },
              {
                id: "proj2",
                name: "HealthTrack Dashboard",
                description:
                  "Designed comprehensive health monitoring dashboard for fitness enthusiasts",
                url: "dribbble.com/jordan/healthtrack",
                technologies: ["Sketch", "InVision", "Design System"],
              },
            ],
          },
        },
        thumbnail: "/templates/glass.png",
        isPremium: true,
        isActive: true,
      },
    });

    // Professional Template - Business Analyst
    const professionalTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Professional" },
      update: {},
      create: {
        name: "Professional",
        description: "Traditional, ATS-friendly design for corporate positions",
        designJson: {
          layout: "single-column",
          colors: {
            primary: "#0f172a",
            secondary: "#334155",
            accent: "#475569",
            background: "#ffffff",
            text: "#1e293b",
          },
          fonts: {
            heading: "Georgia",
            body: "Times New Roman",
            headingWeight: "700",
            bodyWeight: "400",
          },
          spacing: {
            margin: "20px",
            lineHeight: "1.4",
            sectionGap: "24px",
          },
          style: {
            headerStyle: "left-aligned",
            sectionHeaders: "bold-line",
            bulletStyle: "square",
            borderRadius: "0px",
            dividerStyle: "full-width",
          },
          sampleData: {
            personalInfo: {
              fullName: "Michael Thompson",
              jobTitle: "Senior Business Analyst",
              email: "m.thompson@business.com",
              phone: "+1 (555) 345-6789",
              location: "Chicago, IL",
              linkedin: "linkedin.com/in/michaelthompson",
              website: "michaelthompson.pro",
              x: "",
            },
            summary:
              "Strategic Business Analyst with 8+ years of experience driving data-driven decision making in Fortune 500 companies. Proven track record of identifying opportunities that resulted in $5M+ cost savings. Expert in stakeholder management and process optimization.",
            experience: [
              {
                id: "exp1",
                company: "Global Finance Corp",
                position: "Senior Business Analyst",
                location: "Chicago, IL",
                startDate: "Sep 2019",
                endDate: "Present",
                current: true,
                description:
                  "Lead analyst for digital transformation initiatives affecting 10,000+ employees. Conducted gap analysis resulting in 30% efficiency improvement. Manage cross-functional teams and present findings to C-suite executives.",
              },
              {
                id: "exp2",
                company: "Consulting Partners LLC",
                position: "Business Analyst",
                location: "Chicago, IL",
                startDate: "Apr 2017",
                endDate: "Aug 2019",
                current: false,
                description:
                  "Analyzed business requirements for enterprise clients. Created detailed process documentation and workflow diagrams. Facilitated workshops with stakeholders to gather requirements.",
              },
              {
                id: "exp3",
                company: "RetailCo Inc.",
                position: "Junior Analyst",
                location: "Milwaukee, WI",
                startDate: "Jun 2015",
                endDate: "Mar 2017",
                current: false,
                description:
                  "Supported senior analysts in market research and competitive analysis. Generated weekly reports on KPIs and business metrics. Maintained databases and created data visualizations.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "Northwestern University",
                degree: "Master of Business Administration",
                field: "Business Analytics",
                location: "Evanston, IL",
                startDate: "2013",
                endDate: "2015",
                current: false,
                description:
                  "Concentration in Data Analytics and Operations Management. Graduated with Honors.",
              },
              {
                id: "edu2",
                school: "University of Illinois",
                degree: "Bachelor of Science",
                field: "Business Administration",
                location: "Urbana-Champaign, IL",
                startDate: "2009",
                endDate: "2013",
                current: false,
                description:
                  "Minor in Economics. Dean's List. Member of Business Analytics Club.",
              },
            ],
            skills: [
              { id: "skill1", name: "SQL & Data Analysis", level: "Expert" },
              { id: "skill2", name: "Tableau & Power BI", level: "Advanced" },
              { id: "skill3", name: "Process Modeling", level: "Advanced" },
              { id: "skill4", name: "Requirements Gathering", level: "Expert" },
              { id: "skill5", name: "Project Management", level: "Advanced" },
              { id: "skill6", name: "Excel & VBA", level: "Expert" },
            ],
            projects: [
              {
                id: "proj1",
                name: "Supply Chain Optimization",
                description:
                  "Led analysis project that reduced supply chain costs by $2M annually through process improvements",
                url: "",
                technologies: ["SQL", "Tableau", "Process Mapping"],
              },
              {
                id: "proj2",
                name: "Customer Segmentation Analysis",
                description:
                  "Developed customer segmentation model increasing targeted marketing ROI by 35%",
                url: "",
                technologies: ["Python", "Power BI", "Statistical Analysis"],
              },
            ],
          },
        },
        thumbnail: "/templates/professional.png",
        isPremium: false,
        isActive: true,
      },
    });

    // Creative Template - Marketing Manager
    const creativeTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Creative" },
      update: {},
      create: {
        name: "Creative",
        description:
          "Bold, vibrant design for creative professionals and designers",
        designJson: {
          layout: "asymmetric",
          columns: {
            left: "40%",
            right: "60%",
            leftSections: ["contact", "skills", "education"],
            rightSections: ["summary", "experience", "projects"],
          },
          colors: {
            primary: "#ec4899",
            secondary: "#f59e0b",
            accent: "#8b5cf6",
            background: "#fefce8",
            sidebarBg: "#0f172a",
            text: "#1e293b",
          },
          fonts: {
            heading: "Poppins",
            body: "Roboto",
            headingWeight: "700",
            bodyWeight: "400",
          },
          spacing: {
            margin: "28px",
            lineHeight: "1.7",
            sectionGap: "36px",
          },
          style: {
            headerStyle: "creative-split",
            sectionHeaders: "gradient-bg",
            bulletStyle: "custom-icon",
            borderRadius: "16px",
            colorAccents: true,
          },
          sampleData: {
            personalInfo: {
              fullName: "Sophia Martinez",
              jobTitle: "Creative Marketing Manager",
              email: "sophia.m@creative.agency",
              phone: "+1 (555) 456-7890",
              location: "Los Angeles, CA",
              linkedin: "linkedin.com/in/sophiamartinez",
              website: "sophiamartinez.com",
              x: "@sophiacreates",
            },
            summary:
              "Dynamic Marketing Manager with 5+ years creating viral campaigns for lifestyle brands. Expert in social media strategy, content creation, and brand storytelling. Campaigns have generated 50M+ impressions and 200% increase in brand awareness.",
            experience: [
              {
                id: "exp1",
                company: "Creative Minds Agency",
                position: "Marketing Manager",
                location: "Los Angeles, CA",
                startDate: "Jan 2021",
                endDate: "Present",
                current: true,
                description:
                  "Managing integrated marketing campaigns for 8+ premium brands. Created TikTok campaign that went viral with 20M views. Lead team of 6 content creators and designers. Increased client retention rate to 95%.",
              },
              {
                id: "exp2",
                company: "BrandBoost Co.",
                position: "Social Media Strategist",
                location: "Santa Monica, CA",
                startDate: "Jun 2019",
                endDate: "Dec 2020",
                current: false,
                description:
                  "Developed and executed social media strategies across Instagram, TikTok, and YouTube. Grew follower base from 10K to 250K in 18 months. Managed influencer partnerships and brand collaborations.",
              },
              {
                id: "exp3",
                company: "StartUp Studios",
                position: "Content Creator",
                location: "Remote",
                startDate: "Mar 2018",
                endDate: "May 2019",
                current: false,
                description:
                  "Created engaging content for various client brands. Produced video content, graphics, and written copy. Managed content calendar and posting schedule.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "UCLA Extension",
                degree: "Certificate",
                field: "Digital Marketing",
                location: "Los Angeles, CA",
                startDate: "2017",
                endDate: "2018",
                current: false,
                description:
                  "Specialized in Social Media Marketing and Content Strategy",
              },
              {
                id: "edu2",
                school: "University of Southern California",
                degree: "Bachelor of Arts",
                field: "Communications",
                location: "Los Angeles, CA",
                startDate: "2013",
                endDate: "2017",
                current: false,
                description:
                  "Focus on Media Studies and Public Relations. Summa Cum Laude.",
              },
            ],
            skills: [
              { id: "skill1", name: "Social Media Marketing", level: "Expert" },
              { id: "skill2", name: "Content Creation", level: "Expert" },
              { id: "skill3", name: "Brand Strategy", level: "Advanced" },
              { id: "skill4", name: "Adobe Creative Suite", level: "Advanced" },
              { id: "skill5", name: "Video Production", level: "Intermediate" },
              {
                id: "skill6",
                name: "Analytics & Reporting",
                level: "Advanced",
              },
            ],
            projects: [
              {
                id: "proj1",
                name: "#SummerVibes Campaign",
                description:
                  "Viral summer campaign generating 25M impressions and 300% increase in sales for beachwear brand",
                url: "instagram.com/summervibes",
                technologies: ["Instagram", "TikTok", "Canva", "Premiere Pro"],
              },
              {
                id: "proj2",
                name: "Eco-Friendly Brand Launch",
                description:
                  "Complete brand launch for sustainable products company, building community of 100K+ followers",
                url: "ecobrand.com",
                technologies: [
                  "Brand Strategy",
                  "Content Marketing",
                  "Influencer Relations",
                ],
              },
            ],
          },
        },
        thumbnail: "/templates/creative.png",
        isPremium: true,
        isActive: true,
      },
    });

    // Minimalist Template - Data Scientist
    const minimalistTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Minimalist" },
      update: {},
      create: {
        name: "Minimalist",
        description:
          "Ultra-clean, typography-focused design with maximum impact",
        designJson: {
          layout: "single-column",
          colors: {
            primary: "#000000",
            secondary: "#666666",
            accent: "#333333",
            background: "#ffffff",
            text: "#1a1a1a",
          },
          fonts: {
            heading: "Helvetica Neue",
            body: "Helvetica",
            headingWeight: "300",
            bodyWeight: "300",
          },
          spacing: {
            margin: "32px",
            lineHeight: "1.8",
            sectionGap: "40px",
          },
          style: {
            headerStyle: "minimal-center",
            sectionHeaders: "uppercase-spaced",
            bulletStyle: "none",
            borderRadius: "0px",
            whitespace: "generous",
          },
          sampleData: {
            personalInfo: {
              fullName: "Dr. Emily Watson",
              jobTitle: "Senior Data Scientist",
              email: "e.watson@datalab.ai",
              phone: "+1 (555) 567-8901",
              location: "Seattle, WA",
              linkedin: "linkedin.com/in/emilywatson",
              website: "emilywatson.ai",
              x: "",
            },
            summary:
              "PhD-level Data Scientist with 6+ years applying machine learning to solve complex business problems. Published researcher with expertise in predictive modeling, NLP, and computer vision. Led ML initiatives that generated $10M+ in revenue.",
            experience: [
              {
                id: "exp1",
                company: "AI Innovations Inc.",
                position: "Senior Data Scientist",
                location: "Seattle, WA",
                startDate: "Feb 2020",
                endDate: "Present",
                current: true,
                description:
                  "Leading ML team developing recommendation systems serving 5M+ users. Built deep learning model improving prediction accuracy by 35%. Published 3 papers at top-tier ML conferences. Mentoring junior data scientists.",
              },
              {
                id: "exp2",
                company: "TechAnalytics Corp",
                position: "Data Scientist",
                location: "San Francisco, CA",
                startDate: "Jul 2018",
                endDate: "Jan 2020",
                current: false,
                description:
                  "Developed NLP models for sentiment analysis and text classification. Created automated data pipeline processing 1TB+ daily. Collaborated with product team on feature development.",
              },
              {
                id: "exp3",
                company: "University Research Lab",
                position: "Research Assistant",
                location: "Boston, MA",
                startDate: "Sep 2015",
                endDate: "Jun 2018",
                current: false,
                description:
                  "Conducted research in machine learning and computer vision. Co-authored 5 peer-reviewed papers. Developed novel algorithms for image recognition.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "Massachusetts Institute of Technology",
                degree: "Doctor of Philosophy",
                field: "Computer Science (Machine Learning)",
                location: "Cambridge, MA",
                startDate: "2015",
                endDate: "2018",
                current: false,
                description:
                  "Dissertation: 'Novel Approaches to Deep Learning for Natural Language Processing'. Advisor: Prof. John Smith",
              },
              {
                id: "edu2",
                school: "Stanford University",
                degree: "Master of Science",
                field: "Computer Science",
                location: "Stanford, CA",
                startDate: "2013",
                endDate: "2015",
                current: false,
                description:
                  "Specialization in Artificial Intelligence and Machine Learning. GPA: 4.0/4.0",
              },
            ],
            skills: [
              { id: "skill1", name: "Python & R", level: "Expert" },
              { id: "skill2", name: "TensorFlow & PyTorch", level: "Expert" },
              { id: "skill3", name: "Machine Learning", level: "Expert" },
              { id: "skill4", name: "Deep Learning", level: "Advanced" },
              { id: "skill5", name: "SQL & NoSQL", level: "Advanced" },
              {
                id: "skill6",
                name: "Cloud ML (AWS/GCP)",
                level: "Intermediate",
              },
            ],
            projects: [
              {
                id: "proj1",
                name: "Customer Churn Prediction",
                description:
                  "Built ML model predicting customer churn with 92% accuracy, saving company $3M annually",
                url: "github.com/emily/churn-prediction",
                technologies: ["Python", "XGBoost", "Scikit-learn", "AWS"],
              },
              {
                id: "proj2",
                name: "Real-time Fraud Detection",
                description:
                  "Developed deep learning system for real-time fraud detection processing 10K transactions/second",
                url: "github.com/emily/fraud-detection",
                technologies: ["TensorFlow", "Keras", "Apache Kafka", "Docker"],
              },
            ],
          },
        },
        thumbnail: "/templates/minimalist.png",
        isPremium: false,
        isActive: true,
      },
    });

    // Executive Template - VP of Operations
    const executiveTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Executive" },
      update: {},
      create: {
        name: "Executive",
        description: "Sophisticated design for C-level and senior management",
        designJson: {
          layout: "two-column",
          columns: {
            left: "30%",
            right: "70%",
            leftSections: ["contact", "skills", "certifications"],
            rightSections: [
              "summary",
              "experience",
              "education",
              "achievements",
            ],
          },
          colors: {
            primary: "#1e3a8a",
            secondary: "#475569",
            accent: "#334155",
            background: "#f8fafc",
            sidebarBg: "#0f172a",
            text: "#0f172a",
          },
          fonts: {
            heading: "Playfair Display",
            body: "Source Sans Pro",
            headingWeight: "700",
            bodyWeight: "400",
          },
          spacing: {
            margin: "24px",
            lineHeight: "1.6",
            sectionGap: "32px",
          },
          style: {
            headerStyle: "executive-banner",
            sectionHeaders: "serif-elegant",
            bulletStyle: "diamond",
            borderRadius: "4px",
            premium: true,
          },
          sampleData: {
            personalInfo: {
              fullName: "Robert J. Anderson",
              jobTitle: "Vice President of Operations",
              email: "r.anderson@executive.com",
              phone: "+1 (555) 678-9012",
              location: "Boston, MA",
              linkedin: "linkedin.com/in/robertanderson",
              website: "robertanderson.executive",
              x: "",
            },
            summary:
              "Strategic operations executive with 15+ years leading large-scale transformations for Fortune 500 companies. Proven track record of driving operational excellence, reducing costs by $50M+, and building high-performing teams of 200+ employees. Expert in change management and process optimization.",
            experience: [
              {
                id: "exp1",
                company: "GlobalTech Corporation",
                position: "Vice President of Operations",
                location: "Boston, MA",
                startDate: "Jan 2018",
                endDate: "Present",
                current: true,
                description:
                  "Direct global operations across 15 countries with $500M budget. Led digital transformation reducing operational costs by $30M annually. Manage 200+ employees and 5 direct reports. Implemented Six Sigma methodology improving efficiency by 45%.",
              },
              {
                id: "exp2",
                company: "Manufacturing Leaders Inc.",
                position: "Director of Operations",
                location: "Boston, MA",
                startDate: "Mar 2013",
                endDate: "Dec 2017",
                current: false,
                description:
                  "Managed multi-site operations with 80+ staff. Spearheaded lean manufacturing initiative saving $15M. Negotiated vendor contracts reducing supply costs by 25%. Achieved 99.5% on-time delivery rate.",
              },
              {
                id: "exp3",
                company: "Strategic Consulting Group",
                position: "Senior Operations Manager",
                location: "New York, NY",
                startDate: "Jun 2008",
                endDate: "Feb 2013",
                current: false,
                description:
                  "Led operations improvement projects for Fortune 500 clients. Managed teams of consultants on complex engagements. Delivered projects resulting in $100M+ client savings.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "Harvard Business School",
                degree: "Master of Business Administration",
                field: "Operations Management",
                location: "Boston, MA",
                startDate: "2006",
                endDate: "2008",
                current: false,
                description:
                  "Baker Scholar (Top 5% of class). President of Operations Club.",
              },
              {
                id: "edu2",
                school: "Cornell University",
                degree: "Bachelor of Science",
                field: "Industrial Engineering",
                location: "Ithaca, NY",
                startDate: "2000",
                endDate: "2004",
                current: false,
                description: "Magna Cum Laude. Captain of Varsity Rowing Team.",
              },
            ],
            skills: [
              { id: "skill1", name: "Strategic Planning", level: "Expert" },
              { id: "skill2", name: "P&L Management", level: "Expert" },
              { id: "skill3", name: "Six Sigma & Lean", level: "Expert" },
              { id: "skill4", name: "Change Management", level: "Expert" },
              { id: "skill5", name: "Team Leadership", level: "Expert" },
              { id: "skill6", name: "Supply Chain", level: "Advanced" },
            ],
            projects: [
              {
                id: "proj1",
                name: "Global Operations Transformation",
                description:
                  "Led enterprise-wide transformation across 15 countries, achieving $30M cost savings and 45% efficiency improvement",
                url: "",
                technologies: [
                  "Six Sigma",
                  "Lean Manufacturing",
                  "Change Management",
                ],
              },
            ],
          },
        },
      },
    });

    // Technical Template - DevOps Engineer
    const technicalTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Technical" },
      update: {},
      create: {
        name: "Technical",
        description:
          "Structured, data-focused design for engineers and developers",
        designJson: {
          layout: "single-column",
          colors: {
            primary: "#059669",
            secondary: "#6b7280",
            accent: "#10b981",
            background: "#ffffff",
            codeBg: "#f3f4f6",
            text: "#111827",
          },
          fonts: {
            heading: "Roboto",
            body: "Roboto",
            code: "Fira Code",
            headingWeight: "500",
            bodyWeight: "400",
          },
          spacing: {
            margin: "20px",
            lineHeight: "1.5",
            sectionGap: "28px",
          },
          style: {
            headerStyle: "tech-compact",
            sectionHeaders: "monospace-accent",
            bulletStyle: "arrow",
            borderRadius: "6px",
            codeBlocks: true,
            technicalEmphasis: true,
          },
          sampleData: {
            personalInfo: {
              fullName: "David Kim",
              jobTitle: "Senior DevOps Engineer",
              email: "david.kim@devops.io",
              phone: "+1 (555) 789-0123",
              location: "Austin, TX",
              linkedin: "linkedin.com/in/davidkim",
              website: "davidkim.dev",
              x: "@daviddevops",
            },
            summary:
              "DevOps Engineer with 8+ years automating infrastructure and streamlining deployment processes. Expert in Kubernetes, AWS, and CI/CD pipelines. Reduced deployment time by 75% and improved system reliability to 99.99% uptime.",
            experience: [
              {
                id: "exp1",
                company: "CloudScale Technologies",
                position: "Senior DevOps Engineer",
                location: "Austin, TX",
                startDate: "Apr 2020",
                endDate: "Present",
                current: true,
                description:
                  "Architected and maintained Kubernetes infrastructure supporting 100+ microservices. Built CI/CD pipelines reducing deployment time from 2 hours to 15 minutes. Implemented monitoring stack with Prometheus and Grafana. Managed AWS infrastructure with Terraform.",
              },
              {
                id: "exp2",
                company: "TechStartup Inc.",
                position: "DevOps Engineer",
                location: "Remote",
                startDate: "Aug 2017",
                endDate: "Mar 2020",
                current: false,
                description:
                  "Migrated legacy monolith to microservices architecture on AWS. Implemented Docker containerization and orchestration. Created automated backup and disaster recovery procedures. Reduced infrastructure costs by 40% through optimization.",
              },
              {
                id: "exp3",
                company: "WebServices Co.",
                position: "Systems Administrator",
                location: "Dallas, TX",
                startDate: "Jan 2015",
                endDate: "Jul 2017",
                current: false,
                description:
                  "Managed Linux servers and network infrastructure. Automated routine tasks with Bash and Python scripts. Implemented centralized logging and monitoring solutions.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "University of Texas at Austin",
                degree: "Bachelor of Science",
                field: "Computer Science",
                location: "Austin, TX",
                startDate: "2011",
                endDate: "2015",
                current: false,
                description:
                  "Focus on Systems and Networks. Senior Project: Distributed Container Orchestration System",
              },
            ],
            skills: [
              { id: "skill1", name: "Kubernetes & Docker", level: "Expert" },
              { id: "skill2", name: "AWS & GCP", level: "Expert" },
              { id: "skill3", name: "Terraform & Ansible", level: "Advanced" },
              {
                id: "skill4",
                name: "CI/CD (Jenkins, GitLab)",
                level: "Expert",
              },
              { id: "skill5", name: "Python & Bash", level: "Advanced" },
              {
                id: "skill6",
                name: "Monitoring (Prometheus, Grafana)",
                level: "Advanced",
              },
            ],
            projects: [
              {
                id: "proj1",
                name: "Multi-Cloud Infrastructure",
                description:
                  "Designed and deployed multi-cloud infrastructure across AWS and GCP with automated failover",
                url: "github.com/davidkim/multi-cloud",
                technologies: ["Kubernetes", "Terraform", "AWS", "GCP"],
              },
              {
                id: "proj2",
                name: "GitOps Pipeline",
                description:
                  "Built complete GitOps workflow using ArgoCD and FluxCD for automated deployments",
                url: "github.com/davidkim/gitops",
                technologies: ["ArgoCD", "FluxCD", "Kubernetes", "Helm"],
              },
            ],
          },
        },
        thumbnail: "/templates/technical.png",
        isPremium: false,
        isActive: true,
      },
    });

    // Academic Template - Research Scientist
    const academicTemplate = await prisma.resumeTemplate.upsert({
      where: { name: "Academic" },
      update: {},
      create: {
        name: "Academic",
        description:
          "Scholarly design for academics, researchers, and educators",
        designJson: {
          layout: "single-column",
          colors: {
            primary: "#7c3aed",
            secondary: "#64748b",
            accent: "#8b5cf6",
            background: "#ffffff",
            text: "#1e293b",
          },
          fonts: {
            heading: "Merriweather",
            body: "Lora",
            headingWeight: "700",
            bodyWeight: "400",
          },
          spacing: {
            margin: "24px",
            lineHeight: "1.7",
            sectionGap: "32px",
          },
          style: {
            headerStyle: "academic-formal",
            sectionHeaders: "serif-bold",
            bulletStyle: "decimal",
            borderRadius: "0px",
            citations: true,
            publications: true,
          },
          sampleData: {
            personalInfo: {
              fullName: "Dr. Sarah Johnson",
              jobTitle: "Associate Professor of Biology",
              email: "s.johnson@university.edu",
              phone: "+1 (555) 890-1234",
              location: "Cambridge, MA",
              linkedin: "linkedin.com/in/dr-sarahjohnson",
              website: "sarahjohnson.research.edu",
              x: "@drsjohnson",
            },
            summary:
              "Molecular biologist with 12+ years researching gene regulation and cancer therapeutics. Published 35+ peer-reviewed papers with 2,500+ citations. Secured $5M in research funding. Passionate about mentoring graduate students and advancing cancer treatment research.",
            experience: [
              {
                id: "exp1",
                company: "Harvard Medical School",
                position: "Associate Professor of Biology",
                location: "Cambridge, MA",
                startDate: "Jul 2018",
                endDate: "Present",
                current: true,
                description:
                  "Leading research lab investigating epigenetic mechanisms in cancer. Teaching graduate courses in Molecular Biology and Cancer Biology. Supervising 8 PhD students and 4 postdocs. Published 18 papers in high-impact journals including Nature and Science.",
              },
              {
                id: "exp2",
                company: "Stanford University",
                position: "Assistant Professor",
                location: "Stanford, CA",
                startDate: "Aug 2013",
                endDate: "Jun 2018",
                current: false,
                description:
                  "Established independent research program studying gene expression. Secured NIH R01 grant ($1.8M). Published 12 peer-reviewed papers. Taught undergraduate and graduate courses. Mentored 5 PhD students to completion.",
              },
              {
                id: "exp3",
                company: "MIT",
                position: "Postdoctoral Fellow",
                location: "Cambridge, MA",
                startDate: "Sep 2010",
                endDate: "Jul 2013",
                current: false,
                description:
                  "Conducted research in chromatin biology and gene regulation. Published 5 first-author papers. Awarded prestigious NIH F32 fellowship. Presented research at international conferences.",
              },
            ],
            education: [
              {
                id: "edu1",
                school: "Johns Hopkins University",
                degree: "Doctor of Philosophy",
                field: "Molecular Biology",
                location: "Baltimore, MD",
                startDate: "2005",
                endDate: "2010",
                current: false,
                description:
                  "Dissertation: 'Epigenetic Regulation of Gene Expression in Cancer Cells'. Advisor: Prof. Jane Smith. Multiple awards for research excellence.",
              },
              {
                id: "edu2",
                school: "Yale University",
                degree: "Bachelor of Science",
                field: "Biology",
                location: "New Haven, CT",
                startDate: "2001",
                endDate: "2005",
                current: false,
                description:
                  "Summa Cum Laude. Phi Beta Kappa. Senior Thesis on Gene Regulation.",
              },
            ],
            skills: [
              { id: "skill1", name: "Molecular Biology", level: "Expert" },
              { id: "skill2", name: "Research Design", level: "Expert" },
              { id: "skill3", name: "Grant Writing", level: "Expert" },
              { id: "skill4", name: "Scientific Writing", level: "Expert" },
              { id: "skill5", name: "Bioinformatics", level: "Advanced" },
              { id: "skill6", name: "Lab Management", level: "Expert" },
            ],
            projects: [
              {
                id: "proj1",
                name: "Cancer Epigenetics Study",
                description:
                  "NIH-funded research project investigating epigenetic changes in breast cancer, published in Nature",
                url: "nature.com/articles/cancer-epi-2023",
                technologies: [
                  "CRISPR",
                  "RNA-seq",
                  "ChIP-seq",
                  "Bioinformatics",
                ],
              },
              {
                id: "proj2",
                name: "Gene Regulation Database",
                description:
                  "Collaborative project creating comprehensive database of gene regulatory elements",
                url: "genereg.database.org",
                technologies: [
                  "Bioinformatics",
                  "Database Design",
                  "Python",
                  "R",
                ],
              },
            ],
          },
        },
        thumbnail: "/templates/academic.png",
        isPremium: true,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Resume templates with complete sample data seeded successfully",
      count: 8,
      templates: [
        {
          id: modernTemplate.id,
          name: modernTemplate.name,
          type: "Software Engineer",
        },
        {
          id: glassTemplate.id,
          name: glassTemplate.name,
          type: "Product Designer",
        },
        {
          id: professionalTemplate.id,
          name: professionalTemplate.name,
          type: "Business Analyst",
        },
        {
          id: creativeTemplate.id,
          name: creativeTemplate.name,
          type: "Marketing Manager",
        },
        {
          id: minimalistTemplate.id,
          name: minimalistTemplate.name,
          type: "Data Scientist",
        },
        {
          id: executiveTemplate.id,
          name: executiveTemplate.name,
          type: "VP of Operations",
        },
        {
          id: technicalTemplate.id,
          name: technicalTemplate.name,
          type: "DevOps Engineer",
        },
        {
          id: academicTemplate.id,
          name: academicTemplate.name,
          type: "Research Scientist",
        },
      ],
    });
  } catch (error) {
    console.error("Error seeding templates:", error);
    return NextResponse.json(
      { error: "Failed to seed templates", details: error },
      { status: 500 }
    );
  }
}
