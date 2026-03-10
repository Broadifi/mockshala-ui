type GradientButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function GradientButton({
  children,
  onClick,
  className = '',
}: GradientButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative inline-flex items-center justify-center
        rounded-xl px-6 py-3
        font-semibold text-white
        transition-all duration-300 ease-out
        bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
        hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600
        hover:scale-[1.03]
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
        active:scale-[0.98]
        shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {/* Glow */}
      <span
        className="
          absolute inset-0 -z-10 rounded-xl
          bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500
          blur-lg opacity-40
        "
      />
      {children}
    </button>
  );
}
