import { spawnSync } from "node:child_process";

const dryRun = process.argv.includes("--dry-run");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function read(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

const branch = process.env.GITHUB_REF_NAME ?? read("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
const commitHash = process.env.GITHUB_SHA ?? read("git", ["rev-parse", "HEAD"]);
const deployedAt = new Date().toISOString();

run("corepack", ["yarn", "build"], {
  env: {
    ...process.env,
    VERCEL_GIT_COMMIT_SHA: commitHash,
    VITE_APP_BASE_PATH: "/whiteboard/",
    VITE_APP_DISABLE_SENTRY: "true",
    VITE_APP_ENABLE_TRACKING: "false",
    VITE_APP_ENABLE_ESLINT: "false",
  },
});

const deployArgs = [
  "wrangler",
  "deploy",
  "--config",
  "wrangler.jsonc",
  "--var",
  `DEPLOY_BRANCH:${branch}`,
  "--var",
  `DEPLOY_COMMIT_HASH:${commitHash}`,
  "--var",
  `DEPLOYED_AT:${deployedAt}`,
  "--message",
  `${branch}@${commitHash}`,
];

if (dryRun) {
  deployArgs.push("--dry-run");
}

run("npx", deployArgs);
