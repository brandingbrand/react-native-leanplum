# [4.0.0](https://github.com/brandingbrand/react-native-leanplum/compare/v3.0.1...v4.0.0) (2019-10-24)


### Bug Fixes

* fix react native autolinking ([bff2ebc](https://github.com/brandingbrand/react-native-leanplum/commit/bff2ebc))


### BREAKING CHANGES

* React Native's autolinking feature calls the package constructor with no parameters. This removes
the application dependency from the package/modules, so it should autolink correctly.

## [3.0.1](https://github.com/brandingbrand/react-native-leanplum/compare/v3.0.0...v3.0.1) (2019-08-06)


### Bug Fixes

* update packages for security alerts ([61dd29d](https://github.com/brandingbrand/react-native-leanplum/commit/61dd29d))

# [3.0.0](https://github.com/brandingbrand/react-native-leanplum/compare/v2.0.3...v3.0.0) (2019-07-18)


### chore

* update android to sdk 28 ([90caefd](https://github.com/brandingbrand/react-native-leanplum/commit/90caefd))


### BREAKING CHANGES

* This updates the Android SDK to 28 and updates gradle settings to enable 64 bit releases.

## [2.0.3](https://github.com/brandingbrand/react-native-leanplum/compare/v2.0.2...v2.0.3) (2019-01-08)


### Bug Fixes

* **android:** guard against null json value ([9e7f83d](https://github.com/brandingbrand/react-native-leanplum/commit/9e7f83d))

## [2.0.2](https://github.com/brandingbrand/react-native-leanplum/compare/v2.0.1...v2.0.2) (2018-10-04)


### Bug Fixes

* guard against null parameters in user attributes and tracking ([cbfe671](https://github.com/brandingbrand/react-native-leanplum/commit/cbfe671))

## [2.0.1](https://github.com/brandingbrand/react-native-leanplum/compare/v2.0.0...v2.0.1) (2018-10-04)


### Bug Fixes

* check if user attributes is null in start ([98b7371](https://github.com/brandingbrand/react-native-leanplum/commit/98b7371))

# [2.0.0](https://github.com/brandingbrand/react-native-leanplum/compare/v1.0.1...v2.0.0) (2018-10-03)


### Features

* refactor API to match Leanplum Android and iOS SDKs ([66459af](https://github.com/brandingbrand/react-native-leanplum/commit/66459af))


### BREAKING CHANGES

* All API methods have been replaced with a version that more closely matches the Android and iOS SDKs.

## [1.0.1](https://github.com/brandingbrand/react-native-leanplum/compare/v1.0.0...v1.0.1) (2018-09-26)


### Bug Fixes

* check that setAppId is defined before attempting execution ([5bce770](https://github.com/brandingbrand/react-native-leanplum/commit/5bce770))

# [1.0.0](https://github.com/brandingbrand/react-native-leanplum/compare/v0.1.2...v1.0.0) (2018-09-26)


### Bug Fixes

* resolve inboxMessages with empty inbox ([2fe1490](https://github.com/brandingbrand/react-native-leanplum/commit/2fe1490))


### BREAKING CHANGES

* inboxMessages will always resolve, regardless of whether or not the user has messages.

We shouldn’t reject the inboxMessages promise just because the inbox is empty. This change causes the inbox to always resolve even if the user doesn’t have any messages.

## [0.1.2](https://github.com/brandingbrand/react-native-leanplum/compare/v0.1.1...v0.1.2) (2018-09-26)


### Bug Fixes

* remove commitlint/config-lerna-scopes ([1319340](https://github.com/brandingbrand/react-native-leanplum/commit/1319340))

## [0.1.1](https://github.com/brandingbrand/react-native-leanplum/compare/v0.1.0...v0.1.1) (2018-07-02)


### Bug Fixes

* **ci:** add changelog plugin ([eb4ab61](https://github.com/brandingbrand/react-native-leanplum/commit/eb4ab61))
* **ci:** add git plugin ([42a7754](https://github.com/brandingbrand/react-native-leanplum/commit/42a7754))
* **ci:** update package.json and CHANGELOG.md ([e3a18ea](https://github.com/brandingbrand/react-native-leanplum/commit/e3a18ea))
