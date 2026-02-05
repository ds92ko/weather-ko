import { BiLogoGithub } from 'react-icons/bi'

const Footer = () => {
  return (
    <footer className="mt-auto w-full max-w-5xl pt-6">
      <div className="flex items-center justify-between border-t border-gray-800 py-4 text-xs text-gray-400">
        <span>© 오늘의 날씨 · 고다솜</span>
        <a
          href="https://github.com/ds92ko/weather-ko"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-gray-300 transition-colors hover:text-white"
          aria-label="GitHub 저장소 열기"
        >
          <BiLogoGithub className="h-5 w-5" aria-hidden="true" />
          GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
