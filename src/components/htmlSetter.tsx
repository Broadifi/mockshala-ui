import DOMPurify from "dompurify";

export default function HtmlSetter({ html }: { html: string }) {
  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div
      className="
      ca-content
      text-slate-700
      leading-7
      text-[15.5px]
      lg:text-[16.5px]
    "
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  );
}