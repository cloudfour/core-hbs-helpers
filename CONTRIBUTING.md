# Contributing

## Supported versions

`engines.node` and the `handlebars` peer dependency in `package.json` are promises to users: these helpers work with every Node and Handlebars version they allow. CI checks both ends of those ranges:

- **The newest.** The `test` job runs lint and the tests on the current Node version, the same one as `.nvmrc`, with the Handlebars version in the lockfile. Renovate keeps all of them up to date.
- **The oldest.** The `test (Node …)` jobs run the tests on the oldest version each part of `engines.node` allows, with the oldest published Handlebars the peer range allows. For `>=22.13.0` that's Node 22.13.0, and a range like `^22.13.0 || >=24` gets a job for 22.13.0 and another for 24.0.0. They read those versions from `package.json` when they run, so the workflow has no version numbers to keep in step.

### When an oldest-version job fails

This usually happens in one of two ways. A change here might use a Handlebars feature newer than our peer range, in which case the range needs raising, as below. Or a Renovate PR updates a dependency whose new release needs a newer Node than we claim to support. Users on the old Node would get that release too, since our dependencies are ranges, so don't merge the PR as it is. Either:

- **Keep the older dependency.** Add a rule to `.renovaterc.json` that holds it back, with a `description` saying why and when it can be removed. This keeps our support as it is.
- **Raise the floor** in a breaking release, as described below.

Don't delete or skip the job to get the PR through. A red job means a range in `package.json` is wrong, and removing the job only hides that from us, not from users.

### Changing a range

Edit `engines.node` or `peerDependencies` in `package.json`. The CI jobs follow them, so there's nothing else to update.

- **Raising the oldest version** drops support for someone, so it's a breaking change. While this package is below 1.0, that means a new **minor** version, such as 0.13.x to 0.14.0. Good reasons to raise it: that Node line has reached [end of life](https://nodejs.org/en/about/previous-releases), a dependency we need requires a newer one, or we want a newer Node or Handlebars API.
- **Lowering it**, or adding support for another Node line or Handlebars major, is a new feature, as long as the new oldest-version job passes.

Either way, add the change to `CHANGELOG.md`.
