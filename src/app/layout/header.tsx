const Header = () => {
  return (
    <header className="mb-6 w-full max-w-5xl">
      <h1 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-400">
        <img
          src="/favicon.svg"
          alt="오늘의 날씨 로고"
          className="h-6 w-6 shrink-0"
        />
        <span>
          <span className="text-white">오늘의 날씨</span> — 대한민국 날씨
        </span>
      </h1>
    </header>
  )
}

export default Header
