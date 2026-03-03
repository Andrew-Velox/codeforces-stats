
# Codeforces Stats

An API that generates beautiful statistics of your Codeforces profile as an SVG image, perfect for showcasing your competitive programming skills and achievements on Github.

## Features

- 📈 Clean and simple Codeforces stats
- 🎨 Multiple themes - [Theme](./themes.md)
- ⚙️ Fully customizable - [Customization](./customization.md)
- 🍀 Open source - [MIT License](https://github.com/Andrew-Velox/codeforces-stats/blob/master/LICENSE)

Want to contribute? Feel free to open a pull request!

## Usage

### Stats card

Simply copy the code below, paste it into your `README.md`, and change the username query parameter to your Codeforces username (case-insensitive).

```md
![Codeforces Stats](https://codeforces-stats.vercel.app/api/card?username=yalniz)
```

Preview:

<p align="center">
  <img alt="Codeforces Stats" src="https://codeforces-stats.vercel.app/api/card?username=yalniz" />
</p>

Want a hyperlink? Try this:

```md
[![Codeforces Stats](https://codeforces-stats.vercel.app/api/card?username=yalniz)](https://codeforces.com/profile/yalniz)
```

### Rating badge

Rating badge can also be added to your `README.md`, by coping and pasting the code below 

```md
![Codeforces Badge](https://codeforces-stats.vercel.app/api/badge?username=yalniz)
```

Preview:

<p align="center">
  <img alt="Codeforces Badge" style="height:30px" src="https://codeforces-stats.vercel.app/api/badge?username=yalniz" />
</p>
