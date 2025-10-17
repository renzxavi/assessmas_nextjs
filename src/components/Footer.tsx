export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-orange-400 to-orange-300 text-white py-1 mt-auto shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm">
        {/* Texto principal */}
        <p className="mb-3 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold">Assessmas</span>. All rights reserved.
        </p>

        {/* Enlaces */}
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-white/90 text-center md:text-right">
          <p>
            <span className="font-semibold">Contact:</span>{" "}
            <a
              href="mailto:businessdata@assessmas.com"
              className="underline hover:text-white transition-colors"
            >
              businessdata@assessmas.com
            </a>
          </p>

          <a
            href="/policy"
            className="hover:text-orange-100 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
