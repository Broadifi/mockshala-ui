function JoinOurTeam() {
  return (
    <>
      <div className="pb-8">
        {/* Animated Gradient Border Wrapper */}
        <div className="relative p-0.5 rounded-2xl bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 animate-border">
          {/* Main Card */}
          <div
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 to-blue-600 
        px-6 py-10 md:py-12 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            {/* SHIMMER EFFECT */}
            <div className="absolute inset-0 shimmerFooter" />

            {/* FLOATING PARTICLES */}
            <div className="absolute inset-0 pointer-events-none">
              <span className="particle left-[10%] top-[30%]" />
              <span className="particle left-[40%] top-[60%]" />
              <span className="particle left-[70%] top-[20%]" />
              <span className="particle left-[85%] top-[50%]" />
            </div>

            {/* TEXT */}
            <div className="relative z-10 max-w-xl">
              <h2 className="text-white text-2xl md:text-3xl font-semibold">
                Join Our Team
              </h2>

              <p className="text-blue-100 mt-2 text-sm md:text-base">
                Be part of our mission to revolutionize education and help
                students achieve their dreams.
              </p>
            </div>

            {/* GLOW BUTTON */}
            <div className="relative z-10">
              <button className="glow-btn cursor-pointer">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinOurTeam;
