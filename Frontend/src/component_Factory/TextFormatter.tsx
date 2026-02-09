import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

type FormattedResponseProps = {
  response: string;
};

const FormattedResponse: React.FC<FormattedResponseProps> = ({ response }) => {
  if (!response) return null;

  return (
    <div className="w-full text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          // Paragraphs
          p: ({ ...props }) => <p className="mb-3 text-gray-200" {...props} />,

          // Unordered list
          ul: ({ ...props }) => (
            <ul
              className="list-disc ml-6 mb-3 space-y-1 text-gray-200"
              {...props}
            />
          ),

          // Ordered list
          ol: ({ ...props }) => (
            <ol
              className="list-decimal ml-6 mb-3 space-y-1 text-gray-200"
              {...props}
            />
          ),

          // List item
          li: ({ ...props }) => <li className="leading-relaxed" {...props} />,

          // Bold text
          strong: ({ ...props }) => (
            <strong className="font-semibold text-white" {...props} />
          ),

          // Italic text
          em: ({ ...props }) => (
            <em className="italic text-gray-300" {...props} />
          ),

          // Blockquotes
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-blue-500 pl-4 my-3 text-gray-300 italic"
              {...props}
            />
          ),

          // Links
          a: ({ ...props }) => (
            <a
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
        }}
      >
        {response}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedResponse;
