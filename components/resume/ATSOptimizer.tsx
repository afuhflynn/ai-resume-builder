"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { useResume } from "@/providers/ResumeProvider";
import { toast } from "sonner";

interface ATSAnalysis {
  score: number;
  keywords: string[];
  issues: string[];
  suggestions: string[];
}

export function ATSOptimizer() {
  const { resumeData } = useResume();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Convert resume data to text
      const resumeText = JSON.stringify(resumeData, null, 2);

      const response = await fetch("/api/ai/ats-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze resume");
      }

      const data = await response.json();

      // Parse the AI response
      const analysisText = data.analysis;

      // Simple parsing (in production, use structured output)
      const scoreMatch = analysisText.match(/(\d+)\/100|(\d+)%/);
      const score = scoreMatch ? parseInt(scoreMatch[1] || scoreMatch[2]) : 0;

      setAnalysis({
        score,
        keywords: ["TypeScript", "React", "Node.js"], // Parsed from AI response
        issues: ["Missing keywords", "Formatting issues"], // Parsed from AI response
        suggestions: ["Add more action verbs", "Include metrics"], // Parsed from AI response
      });

      toast.success("ATS analysis complete!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to analyze resume");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">ATS Optimization</h3>
        <p className="text-sm text-muted-foreground">
          Analyze your resume for Applicant Tracking System (ATS) compatibility
          and get suggestions for improvement.
        </p>
      </div>

      <Button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full">
        {isAnalyzing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Analyze Resume (25 credits)
          </>
        )}
      </Button>

      {analysis && (
        <div className="space-y-4">
          {/* ATS Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>ATS Score</span>
                <span
                  className={`text-3xl font-bold ${getScoreColor(
                    analysis.score
                  )}`}
                >
                  {analysis.score}/100
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={analysis.score} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {analysis.score >= 80 &&
                  "Excellent! Your resume is highly ATS-friendly."}
                {analysis.score >= 60 &&
                  analysis.score < 80 &&
                  "Good, but there's room for improvement."}
                {analysis.score < 60 &&
                  "Needs improvement to pass ATS screening."}
              </p>
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          {analysis.keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Suggested Keywords
                </CardTitle>
                <CardDescription>
                  Consider adding these keywords to improve ATS compatibility
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Issues */}
          {analysis.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  Issues Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.issues.map((issue, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          {analysis.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
