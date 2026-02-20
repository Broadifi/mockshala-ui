import DOMPurify from "dompurify";

export default function HtmlSetterPlans({ html }: { html: string }) {
  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div
      className="
      ca-content
      text-slate-700
      leading-relaxed
      text-[12px]
      lg:text-[14.5px]
    "
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}