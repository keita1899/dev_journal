type PageIndicatorProps = {
  current: number
  total: number
}

export const PageIndicator = ({ current, total }: PageIndicatorProps) => (
  <div className="mt-4 text-right">
    <span className="text-3xl font-semibold text-white">{current}</span> /{' '}
    <span className="text-xl text-white">{total}</span> ページ
  </div>
)
