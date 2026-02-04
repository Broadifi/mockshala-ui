export function StickyTestHeader({ title }: { title: string }) {
  return (
    <div
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white border-b shadow-md
        px-4 py-3
        flex items-center
      "
    >
      <h2 className="text-sm font-semibold text-gray-900 truncate">
        {title}
      </h2>
    </div>
  );
}
