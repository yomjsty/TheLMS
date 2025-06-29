"use client";

import { useState, useEffect } from "react";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export function RenderDescription({ json }: { json: JSONContent }) {
    const [htmlOutput, setHtmlOutput] = useState<string>("");
    const [isClient, setIsClient] = useState(false);
    const [parsedContent, setParsedContent] = useState<React.ReactNode>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const generateHTML = async () => {
            try {
                const { generateHTML } = await import("@tiptap/react");
                const output = generateHTML(json, [
                    StarterKit,
                    TextAlign.configure({
                        types: ['heading', 'paragraph']
                    })
                ]);
                setHtmlOutput(output);
            } catch (error) {
                console.error("Error generating HTML:", error);
                setHtmlOutput("");
            }
        };

        generateHTML();
    }, [json, isClient]);

    useEffect(() => {
        if (!htmlOutput || !isClient) return;

        const parseHTML = async () => {
            try {
                const parse = (await import("html-react-parser")).default;
                setParsedContent(parse(htmlOutput));
            } catch (error) {
                console.error("Error parsing HTML:", error);
                setParsedContent(null);
            }
        };

        parseHTML();
    }, [htmlOutput, isClient]);

    // Don't render anything during SSR
    if (!isClient) {
        return <div className="prose dark:prose-invert prose-li:marker:text-primary" />;
    }

    return (
        <div className="prose dark:prose-invert prose-li:marker:text-primary">
            {parsedContent}
        </div>
    );
}