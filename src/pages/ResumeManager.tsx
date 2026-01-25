import React, { useEffect, useRef, useState } from "react";
import { Upload, Eye, Trash2, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useLazyViewResumeQuery,
  useRemoveResumeMutation,
  useUploadResumeMutation,
} from "@/app/queries/profileApi";
import { toast } from "sonner";

type Resume = {
  id: number;
  originalName: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: string;
};

type ResumeManagerProps = {
  resumes: Resume[];
};

const ResumeManager: React.FC<ResumeManagerProps> = ({ resumes }) => {
  // API calls
  const [uploadResume] = useUploadResumeMutation();
  const [viewResume] = useLazyViewResumeQuery();
  const [removeResume] = useRemoveResumeMutation();

  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const latestRequestIdRef = useRef<number | null>(null);

  const revokePreviewUrl = (url?: string | null) => {
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const clearPreview = () => {
    latestRequestIdRef.current = null;
    revokePreviewUrl(previewUrl);
    setPreviewUrl(null);
    setSelectedResume(null);
  };

  const handleView = async (resume: Resume) => {
    latestRequestIdRef.current = resume.id;
    setSelectedResume(resume);

    // Clean up previous blob URL
    revokePreviewUrl(previewUrl);
    setPreviewUrl(null);

    try {
      const { data, error } = await viewResume({ resumeId: resume.id });

      if (error) {
        throw new Error("Failed to fetch resume");
      }

      if (data && latestRequestIdRef.current === resume.id) {
        setPreviewUrl(data); // data is already a blob URL string
      } else if (data) {
        // Stale response - revoke the unused blob URL
        revokePreviewUrl(data);
      }
    } catch (error) {
      console.error("Error loading resume:", error);
      toast.error("Failed to load resume preview");
      setSelectedResume(null);
    }
  };

  // Cleanup blob URLs
  useEffect(() => {
    return () => revokePreviewUrl(previewUrl);
  }, [previewUrl]);

  const handleDelete = async (resumeId: number) => {
    if (selectedResume?.id === resumeId) {
      clearPreview();
    }
    try {
      await removeResume(resumeId).unwrap();
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    const maxBytes = 5 * 1024 * 1024;
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file.size > maxBytes || !allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF or DOCX file up to 5MB.");
      input.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await uploadResume(formData).unwrap();
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume.");
    } finally {
      input.value = "";
    }
  };

  return (
    <div className="flex gap-y-4 md:gap-x-4 md:flex-row flex-col-reverse h-screen bg-slate-50">
      {/* Left Panel */}
      <div className="w-full md:w-96  overflow-y-auto">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-12 mb-6 transition-all duration-200
            `}
        >
          <div className="flex flex-col items-center text-center">
            <div className={`rounded-full p-4 mb-4 transition-colors`}>
              <Upload className={`w-8 h-8`} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Upload Your Resume
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Supported formats: PDF, DOCX <br /> Maximum size: 5MB
            </p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Resume List */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Your Resumes {resumes.length}
          </h2>

          <div className="space-y-3">
            {resumes.map((resume) => (
              <Card
                key={resume.id}
                className={`p-4 ${
                  selectedResume?.id === resume.id
                    ? "border-blue-500 border-2 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-800 truncate">
                        {resume.originalName}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 text-left">
                      {(resume.fileSize / (1024 * 1024)).toFixed(1)} MB •
                      Uploaded {resume.uploadedAt}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(resume)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(resume.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - PDF Preview */}
      <div className="flex-1">
        {selectedResume ? (
          <div className="h-96 md:h-full flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-800">
                  {selectedResume.originalName}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => clearPreview()}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* PDF Preview Area */}
            <div className="flex-1 bg-slate-700">
              {previewUrl ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-full rounded border-2 border-slate-600"
                  title={selectedResume.originalName}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-24 h-24 text-slate-400 mx-auto mb-4" />
                    <p>Loading...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-slate-500">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a resume to preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeManager;
