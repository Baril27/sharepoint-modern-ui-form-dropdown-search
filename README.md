## SharePoint Modern UI Dropdown Search

This extension gives the ability to search dropdowns within the modern SharePoint form ui.

![alt text](https://raw.githubusercontent.com/baril27/sharepoint-modern-ui-form-dropdown-search/master/examples/usage.gif)


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

* gulp clean
* gulp test
* gulp serve
* gulp bundle --ship
* gulp package-solution --ship
