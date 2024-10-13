export const CampaignDetailSkeleton = () => {
  return (
    <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="max-lg:hidden">
          <div className="h-6 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <div className="w-32 h-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            <div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              </div>
              <div className="mt-2 h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        </div>

        <div className="mt-6 h-16 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div key={index}>
              <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="mt-6 h-6 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="mt-3 h-8 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
              <div className="mt-3 h-4 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
        <div className="mt-4 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr>
                    {[...Array(4)].map((_, index) => (
                      <th key={index} className="py-3.5 px-3 text-left">
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(5)].map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {[...Array(4)].map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="whitespace-nowrap py-4 px-3"
                        >
                          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
