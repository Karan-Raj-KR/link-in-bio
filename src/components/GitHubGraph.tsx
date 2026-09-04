import { site } from '@/config/site';

// Contribution graph, rendered on the server. Reads the fine-grained PAT from
// GITHUB_PAT. If the token is missing or the call fails, it degrades to a link —
// the page still ships, no error surfaced to the visitor.

type Day = { count: number; date: string };

async function getContributions(): Promise<{ weeks: Day[][]; total: number } | null> {
  const token = process.env.GITHUB_PAT;
  if (!token) return null;

  const query = `query($login:String!){
    user(login:$login){
      contributionsCollection{
        contributionCalendar{
          totalContributions
          weeks{ contributionDays{ contributionCount date } }
        }
      }
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { login: site.github.username } }),
      next: { revalidate: 3600 }, // refresh hourly
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;
    const weeks: Day[][] = cal.weeks.map((w: { contributionDays: { contributionCount: number; date: string }[] }) =>
      w.contributionDays.map((d) => ({ count: d.contributionCount, date: d.date }))
    );
    return { weeks, total: cal.totalContributions };
  } catch {
    return null;
  }
}

function level(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

// Tint each cell with the accent at increasing opacity — ties the graph to the
// one accent color instead of GitHub's green.
const cellBg = ['rgba(255,255,255,0.05)', 0.28, 0.5, 0.72, 1] as const;

export default async function GitHubGraph() {
  const data = await getContributions();

  return (
    <section aria-label="GitHub activity">
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ink-2)]">
          GitHub activity
        </span>
        {data && (
          <span className="text-[11px] tabular-nums text-[var(--ink-2)]">
            {data.total.toLocaleString()} in the last year
          </span>
        )}
      </div>

      {data ? (
        // Show the most recent ~18 weeks so it fits a phone without scrolling.
        <div className="flex gap-[3px]">
          {data.weeks.slice(-18).map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-[3px]">
              {week.map((day) => {
                const l = level(day.count);
                const bg = l === 0 ? (cellBg[0] as string) : `color-mix(in oklab, var(--accent) ${(cellBg[l] as number) * 100}%, transparent)`;
                return (
                  <div
                    key={day.date}
                    className="aspect-square w-full rounded-[2px]"
                    style={{ background: bg }}
                    title={`${day.count} on ${day.date}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ) : (
        <a
          href={site.github.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-[var(--card-border)] px-4 py-3 text-sm text-[var(--ink-1)] transition-colors hover:border-[var(--card-border-hover)] hover:text-[var(--ink-0)]"
        >
          See what I&apos;m building on GitHub →
        </a>
      )}
    </section>
  );
}
