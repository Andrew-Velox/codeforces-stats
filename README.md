# Codeforces Stats

An API that generates beautiful statistics of your Codeforces profile as an SVG image, perfect for showcasing your competitive programming skills and achievements on Github.

Check the [docs](https://Andrew-Velox.github.io/codeforces-stats-vlx/) for information on how to use the API.

## Features

- 📈 Clean and simple Codeforces stats
- 🎨 Multiple themes - [Theme](docs/themes.md)
- ⚙️ Fully customizable - [Customization](docs/customization.md)
- 🍀 Open source - [MIT License](https://github.com/Andrew-Velox/codeforces-stats-vlx/blob/master/LICENSE)

Want to contribute? Feel free to open a pull request!

## Usage

### Stats card

Simply copy the code below, paste it into your `README.md`, and change the username query parameter to your Codeforces username (case-insensitive).

```md
![Codeforces Stats](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)
```

Preview:

<p align="center">
  <img alt="Codeforces Stats" src="https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz" />
</p>

Want a hyperlink? Try this:

```md
[![Codeforces Stats](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)](https://codeforces.com/profile/yalniz)
```

## Themes

|   |   |   |   |   |
|:---:|:---:|:---:|:---:|:---:|
|default|dark|nord_bright|nord_dark|transparent|
|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=default)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=dark)| ![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=nord_bright)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=nord_dark)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=transparent)|
<!-- |gruvbox|monokai|nord_bright|nord_dark|radical|
|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)| ![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)  |![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|
|solarized|solarized_dark|tokyonight|vue|zenburn|
|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)| ![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)  |![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz)|
|transparent|
|![](https://codeforces-stats-vlx.vercel.app/api/card?username=yalniz&theme=transparent)| -->

[More themes](https://github.com/vn7n24fzkq/codeforces-stats-vlx-example/tree/master/profile-summary-card-output)


### Rating badge

Rating badge can also be added to your `README.md`, by coping and pasting the code below 

```md
![Codeforces Badge](https://codeforces-stats-vlx.vercel.app/api/badge?username=yalniz)
```

Preview:

<p align="center">
  <img alt="Codeforces Badge" style="height:30px" src="https://codeforces-stats-vlx.vercel.app/api/badge?username=yalniz" />
</p>

## Contributing

Please kindly follow [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## Acknowledgements

### Inspirations

- [sudiptob2/cf-stats](https://github.com/sudiptob2/cf-stats): SVG design
- [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats): API design and themes
- [JacobLinCool/LeetCode-Stats-Card](https://github.com/JacobLinCool/LeetCode-Stats-Card): Miscellaneous