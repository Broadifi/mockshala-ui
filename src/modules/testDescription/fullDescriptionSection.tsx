import HtmlSetter from '@/components/htmlSetter';


interface TestDescriptionParams {
  description: string;
}

function FullDescriptionSection({ description }: TestDescriptionParams) {
  return (
    <div className=' bg-gray-100/50 p-4 md:p-6 rounded-lg shadow-lg border border-gray-200 '>
      <HtmlSetter html={description} />
    </div>
  );
}

export default FullDescriptionSection;