const axios = require("axios");
const cheerio = require("cheerio");

const GITHUB_TOKEN = "";
const headers = { Authorization: `token ${GITHUB_TOKEN}` };

const repos = [
    { owner: "ReactiveX", repo: "rxjs" },
    { owner: "baconjs", repo: "bacon.js" },
    { owner: "cujojs", repo: "most" },
    { owner: "staltz", repo: "xstream" },
    { owner: "kefirjs", repo: "kefir" },
    { owner: "mostjs", repo: "core" },
];

async function scrapeContributors(owner, repo) {
    const url = `https://github.com/${owner}/${repo}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0", // Avoid GitHub bot detection
            },
        });

        const $ = cheerio.load(response.data);
        
        // Extract contributor count from GitHub page
        const contributorText = $('a[href$="/graphs/contributors"] span.Counter').text().trim();
        const contributorCount = parseInt(contributorText.replace(/,/g, ""), 10) || 0;

        return contributorCount;
    } catch (error) {
        console.error(`Error scraping contributors for ${owner}/${repo}:`, error.message);
        return 0;
    }
}

// Function to fetch all pages from a GitHub API endpoint
async function fetchAllPages(url) {
    let results = [];
    let page = 1;
    let perPage = 100; // Max allowed per request

    while (true) {
        try {
            const response = await axios.get(`${url}per_page=${perPage}&page=${page}`, { headers });
            if (response.data.length === 0) break; // Stop if no more results
            results = results.concat(response.data);
            page++;
        } catch (error) {
            console.error(`Error fetching ${url}:`, error.message);
            break;
        }
    }

    return results;
}

// Function to get GitHub data for branches, issues, and contributors
async function getGitHubData(owner, repo) {
    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    const branches = await fetchAllPages(`${baseUrl}/branches?`);
    const openIssues = await fetchAllPages(`${baseUrl}/issues?state=open&`);
    
    const contributorCount = await scrapeContributors(owner, repo);
    const branchCount = branches.length;
    const openIssuesCount = openIssues.filter(issue => !issue.pull_request).length;

    return { repo, branches: branchCount, issues: openIssuesCount, contributors: contributorCount };
}

// Normalize function using min-max scaling
function normalize(data, key) {
    const values = data.map(repo => repo[key]);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);

    return data.map(repo => ({
        ...repo,
        [`norm_${key}`]: maxVal > minVal ? (repo[key] - minVal) / (maxVal - minVal) : 0
    }));
}

async function main() {
    console.log("Fetching repository data...");
    const repoStats = await Promise.all(repos.map(r => getGitHubData(r.owner, r.repo)));

    // Normalize branch count, issues, and contributors
    let normalizedStats = normalize(repoStats, "branches");
    normalizedStats = normalize(normalizedStats, "issues");
    normalizedStats = normalize(normalizedStats, "contributors");

    // Calculate popularity score (equal weight)
    normalizedStats = normalizedStats.map(repo => ({
        ...repo,
        popularity_score: repo.norm_branches + repo.norm_issues + repo.norm_contributors
    }));

    // Sort by popularity score
    normalizedStats.sort((a, b) => b.popularity_score - a.popularity_score);

    // Display results
    console.table(normalizedStats);
}

main();
