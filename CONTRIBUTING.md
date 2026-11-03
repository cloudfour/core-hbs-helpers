# Contributing

## Supported Node versions

`engines.node` in `package.json` is a promise to users: these helpers work on every Node version it allows. CI checks both ends of that range:

- **The newest.** The `test` job runs lint and the tests on the current Node version, the same one as `.nvmrc`. Renovate keeps both up to date.
- **The oldest.** The `test (Node …)` jobs run the tests on the oldest version each part of `engines.node` allows. For `>=22.13.0` that's 22.13.0, and a range like `^22.13.0 || >=24` gets a job for 22.13.0 and another for 24.0.0. They read those versions from `package.json` when they run, so the workflow has no version numbers to keep in step.

### When an oldest-version job fails

This usually happens on a Renovate PR: a dependency's new release needs a newer Node than we claim to support. Users on the old Node would get that release too, since our dependencies are ranges, so don't merge the PR as it is. Either:

- **Keep the older dependency.** Add a rule to `.renovaterc.json` that holds it back, with a `description` saying why and when it can be removed. This keeps our support as it is.
- **Raise the floor** in a breaking release, as described below.

Don't delete or skip the job to get the PR through. A red job means the range in `package.json` is wrong, and removing the job only hides that from us, not from users.

### Changing the range

Edit `engines.node` in `package.json`. The CI jobs follow it, so there's nothing else to update.

- **Raising the oldest version** drops support for someone, so it's a breaking change. While this package is below 1.0, that means a new **minor** version, such as 0.13.x to 0.14.0. Good reasons to raise it: that Node line has reached [end of life](https://nodejs.org/en/about/previous-releases), a dependency we need requires a newer one, or we want a newer Node API.
- **Lowering it**, or adding support for another Node line, is a new feature, as long as the new oldest-version job passes.

Either way, add the change to `CHANGELOG.md`.

## Releasing

Publishing a GitHub release publishes the package to npm. The [Release workflow](.github/workflows/release.yml) runs the tests and publishes the version in `package.json`, using npm's [trusted publishing](https://docs.npmjs.com/trusted-publishers), so nobody needs npm credentials on their machine.

1. **Pick the version.** While this package is below 1.0, a breaking change means a new minor version (0.13.1 to 0.14.0), and anything else is a patch (0.13.1 to 0.13.2).
2. **Update `CHANGELOG.md`** on an up-to-date `main`. Rename `## [Unreleased]` to the new version and today's date, such as `## [0.14.0] - 2026-11-03`. At the bottom, point its link at a comparison with the previous version, and add a new `[Unreleased]` link comparing the new version with `HEAD`. Commit the change.
3. **Run `npm version minor` or `npm version patch`.** This runs the tests, updates the version in `package.json` and `package-lock.json`, commits, and creates a tag with the bare version number, such as `0.14.0`.
4. **Push the commit and the tag:** `git push --follow-tags`.
5. **Publish a GitHub release from that tag.** On the [new release page](https://github.com/cloudfour/core-hbs-helpers/releases/new), choose the tag, use the version as the title, and paste the version's changelog section as the description. Or from the command line: `gh release create 0.14.0 --title 0.14.0 --notes-file notes.md`.
6. **Check it published.** The Release workflow should pass under **Actions**, and `npm view @cloudfour/hbs-helpers version` should print the new version. If the workflow failed on something temporary, such as a network error, re-run it. If it failed for any other reason before the publish step, nothing reached npm: delete the GitHub release and its tag, fix the problem on `main`, and start again from step 3.

The workflow refuses to publish if the release's tag doesn't match the version in `package.json`, which catches a release made from the wrong tag or one created before running `npm version`.

The day after the release, the [dependency drift check](https://github.com/cloudfour/.github#dependency-drift-check) closes its **unreleased dependencies** issue, if one was open.
