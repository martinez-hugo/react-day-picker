// eslint-disable-next-line import/default
import nextra from 'nextra';
import currentGitBranchName from 'current-git-branch';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
});

export default withNextra({
  reactStrictMode: true,
  env: {
    GIT_BRANCH: currentGitBranchName()
  }
});
