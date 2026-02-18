function JoinOurTeam() {
  return (
    <>
      <div className="pb-2 lg:pb-4 pt-5">
        {/* Animated Gradient Border Wrapper */}
        <div className="relative p-0.5 rounded-2xl bg-linear-to-r from-blue-400 via-cyan-400 to-blue-600 animate-border">
          {/* Main Card */}
          <div
            className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 to-blue-600 
            px-4 py-8 md:px-8 md:py-10  lg:py-12 lg:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
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
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc2k8dHWa-PRRxfc9zIjUaXANyJLC_Kt0ohA9b1XNOnkwqFfA/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="glow-btn cursor-pointer px-5 py-2 md:px-7 md:py-3">
                  Apply Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinOurTeam;
