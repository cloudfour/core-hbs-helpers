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
