import DOMPurify from "dompurify";

export default function HtmlSetterExam({ html }: { html?: string }) {
  if (!html) return null;

  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div
      className="text-slate-700 text-[14px] lg:text-[15px]"
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}
