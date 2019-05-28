# Make a release
## Modify CHANGELOG.md
- Update the changelog.md file with your modifications since last release
- Commit these changes

## Version the code
- Run the command `npm version major/minor/patch -m "Release x.x.x tag=develop"`
Don't forget to choose between a major, minor or patch change and don't forget to modify the tag
For a public release, tag should be equal to "latest"
For an internal release, tag should be equal to "develop"
- Run the command `git push --follow-tags`


