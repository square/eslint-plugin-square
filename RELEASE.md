# Release Instructions

We are using [Block OSPO Releaser](https://github.com/block/ospo/tree/main/actions/releaser) to handle the release process.

To release a new version, just go to the current temporary release PR, review if the changelogs make sense, and merge it.

Once it's merged, the release will be automatically published to NPM, with the GitHub Release and tags being created too.

## Temporary Release PRs

A single temporary PR is created once the CI detects relevant pushes (feat, fix, etc.).

Every new push will be aggregated into the same PR, and the changelog will be updated _automagically_ with the new changes.

### Bumping dependencies

If you just want to release a new patch with bumped dependencies, open a PR with an empty commit:

`git commit --allow-empty -m "fix(deps): bump deps to cut a new release"`

Once you merge it, the release PR will be created, you can go ahead and just merge it!
