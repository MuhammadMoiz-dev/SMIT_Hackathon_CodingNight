import React, { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, getAuth } from "../Config/Auth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [landingHTML, setLandingHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const scrollRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });

  const handleGenerate = async () => {
    if (!brandName.trim() || !brandDescription.trim() || !industry.trim()) return;

    setLoading(true);
    setShowLanding(false);
    setAiResult(null);
    setLandingHTML("");
    setIsCardExpanded(false);

    const prompt = `Brand Name: ${brandName}
Brand Description: ${brandDescription}
Industry: ${industry}

Please generate for this brand:
- Name
- Tagline
- Pitch
- Target Audience

Then create a full landing page section (with HTML using TailwindCSS classes) for the brand that includes the following parts:
- Navbar with the brand name and navigation links
- Hero section
- Features section
- Call-to-action section
- Footer with relevant links and brand info

Provide only the HTML within <section> tags, and ensure the markup is clean and uses TailwindCSS classes.`;

    try {
      const result = await model.generateContent(prompt);
      const aiText = await result.response.text();

      console.log("AI raw response:", aiText);

      let extractedHTML = "";
      const codeBlockMatch = aiText.match(/```html([\s\S]*?)```/i);
      if (codeBlockMatch && codeBlockMatch[1]) {
        extractedHTML = codeBlockMatch[1].trim();
      } else {
        // fallback to extract all <section>...</section> blocks and join them
        const allSections = aiText.match(/<section[\s\S]*?<\/section>/gi);
        if (allSections) {
          extractedHTML = allSections.join("\n");
        }
      }

      console.log("Extracted HTML:", extractedHTML);

      setAiResult({ fullText: aiText });
      setLandingHTML(extractedHTML);

      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error("AI error:", err);
      setAiResult({
        fullText: "⚠️ Something went wrong while generating the brand idea. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b flex justify-between items-center bg-white">
          <h1 className="text-xl font-semibold text-gray-800">Brand & Landing Page Generator</h1>
          {loading && (
            <span className="text-sm text-blue-500 italic animate-pulse">Generating…</span>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 grid gap-4 md:grid-cols-2">
          <div className="col-span-2">
            <label className="block text-gray-700">Brand Name</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. StellarWidgets"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700">Industry</label>
            <input
              type="text"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. Fintech"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700">Brand Description</label>
            <textarea
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 resize-none"
              placeholder="What does your brand do?"
              value={brandDescription}
              onChange={(e) => setBrandDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="col-span-2 text-right">
            <button
              onClick={handleGenerate}
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={loading || !brandName || !brandDescription || !industry}
            >
              Generate
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div ref={scrollRef} className="px-4 py-4 border-t bg-gray-50 max-h-[60vh] overflow-y-auto">
          {aiResult && (
            <div
              className="bg-white border rounded-md shadow-sm p-4 cursor-pointer"
              onClick={() => setIsCardExpanded((prev) => !prev)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Brand Idea</h2>
                <span className="text-sm text-blue-500">{isCardExpanded ? "Hide" : "Expand"}</span>
              </div>

              {!isCardExpanded && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {aiResult.fullText.slice(0, 200)}...
                </p>
              )}

              {isCardExpanded && (
                <div className="mt-3">
                  <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
                    {aiResult.fullText}
                  </pre>

                  <div className="text-right mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowLanding(!showLanding);
                      }}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      {showLanding ? "Hide" : "Show"} Landing Page Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Responsive Landing Preview */}
          {isCardExpanded && showLanding && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Live Landing Page Preview</h3>
              <div className="w-full border rounded-lg  bg-white p-4">
                <div className="max-w-full ">
                  {landingHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: landingHTML }} />
                  ) : (
                    <p className="text-red-500">No preview available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
