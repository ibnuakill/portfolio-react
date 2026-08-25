export interface GithubProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  repoUrl: string;
  demoUrl?: string;
  date: Date;
  stars: number;
  isGithub: true;
}

const USERNAME = 'ibnuakill';

function toTitle(name: string) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function ogImage(fullName: string) {
  return `https://opengraph.githubassets.com/1/${fullName}`;
}

export async function getGithubProjects(limit = 6): Promise<GithubProject[]> {
  const token = import.meta.env.GITHUB_TOKEN ?? import.meta.env.PUBLIC_GITHUB_TOKEN ?? '';
  const headers: Record<string,string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`,
      { headers }
    );
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    const repos = await res.json() as any[];

    return repos
      .filter(r => !r.fork && !r.archived && !r.private)
      .sort((a,b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at).valueOf() - new Date(a.pushed_at).valueOf()))
      .slice(0, limit)
      .map(r => ({
        title: toTitle(r.name),
        description: r.description ?? 'Tanpa deskripsi — lihat README di GitHub.',
        image: ogImage(r.full_name),
        tags: [r.language, ...(r.topics ?? [])].filter(Boolean).slice(0, 4) as string[],
        repoUrl: r.html_url,
        demoUrl: r.homepage && r.homepage.startsWith('http') ? r.homepage : undefined,
        date: new Date(r.pushed_at),
        stars: r.stargazers_count,
        isGithub: true as const,
      }));
  } catch {
    return [];
  }
}
