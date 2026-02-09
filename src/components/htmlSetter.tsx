import DOMPurify from 'dompurify';

export default function HtmlSetter({ html }: { html: string }) {
  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div className='prose' dangerouslySetInnerHTML={{ __html: cleanHTML }} />
  );
}