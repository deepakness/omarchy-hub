# Omarchy Hub

A community-driven website for collecting and sharing themes, setups, resources, and links for [Omarchy](https://omarchy.org) - the opinionated Arch + Hyprland setup by DHH. <!--STATS:START-->
Currently, omarchy-hub showcases **93 workstation setups**, **52 beautiful themes**, **10 useful resources** and more from the community.
<!--STATS:END-->

🌐 **Live website**: [omarchy.deepakness.com](https://omarchy.deepakness.com)  
📸 **Workstation setup gallery**: [SETUPS.md](SETUPS.md)  
🎨 **Theme collection**: [THEMES.md](THEMES.md)

<!-- Badges -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4bf623c-783c-4a5e-af63-f655043ace6b/deploy-status)](https://app.netlify.com/projects/omarchy-hub/deploys)
[![License](https://img.shields.io/github/license/deepakness/omarchy-hub?color=64748b)](LICENSE)


## Project structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Homepage with featured content
│   ├── themes/             # Themes section
│   │   ├── layout.tsx      # Themes layout
│   │   └── page.tsx        # Themes listing page
│   ├── setups/             # Setups section
│   │   ├── layout.tsx      # Setups layout
│   │   └── page.tsx        # Setups listing page
│   └── resources/          # Resources section
│       ├── layout.tsx      # Resources layout
│       └── page.tsx        # Resources listing page
├── data/                   # JSON data files
│   ├── themes.json         # Themes data
│   ├── setups.json         # Setups data
│   ├── resources.json      # Resources data
│   ├── releases.json       # Omarchy releases, scrapes automatically
│   └── links.json          # Links data
├── scripts/                # Automation scripts
│   ├── generate-docs.js    # Generate documentation from JSON data
│   ├── fetch-releases.js   # Fetch latest Omarchy releases
│   └── optimize-images.js  # Optimize setup images
├── public/                 # Static assets
│   └── setups/             # Setup screenshots
├── SETUPS.md               # Setup gallery
├── THEMES.md               # Theme collection
├── RESOURCES.md            # Resources collection
└── CONTRIBUTING.md         # Contribution guidelines
```


## Contributing content

We welcome contributions from the community! There are several ways to contribute:

### 🚀 Quick contribution (recommended)

**For Beginners**: Use our GitHub issue templates for easy submission:

- 🖥️ **[Submit a Setup](https://github.com/deepakness/omarchy-hub/issues/new?template=setup-submission.yml)** - Share your Omarchy workstation
- 🎨 **[Submit a Theme](https://github.com/deepakness/omarchy-hub/issues/new?template=theme-submission.yml)** - Share custom color schemes
- 📚 **[Submit a Resource](https://github.com/deepakness/omarchy-hub/issues/new?template=resource-submission.yml)** - Share guides and tutorials
- 🔗 **[Submit a Link](https://github.com/deepakness/omarchy-hub/issues/new?template=link-submission.yml)** - Suggest useful links

### 🔧 Developer contribution

**For Developers**: Submit pull requests directly:

1. Fork the repository
2. Add your content to the appropriate JSON file in `/data/`
3. Follow the data structure guidelines below
4. Submit a pull request

### 📋 Data structure examples

**Setups** (`data/setups.json`):
```json
{
  "id": "unique-id",
  "name": "Setup Name",
  "description": "Brief one-line description of your setup",
  "screenshot": "setups/setup-image.jpg",
  "link": "https://social-post-url.com",
  "device": "Hardware details",
  "category": "Desktop",
  "tags": ["tag1", "tag2"]
}
```

**Themes** (`data/themes.json`):
```json
{
  "id": "unique-id",
  "name": "Theme Name",
  "category": "Dark Theme | Light Theme",
  "link": "https://github.com/username/theme",
  "author": "Author Name",
  "screenshot": "https://screenshot-url.com",
  "tags": ["official", "popular"]
}
```

**Resources** (`data/resources.json`):
```json
{
  "id": "unique-id",
  "name": "Resource Name",
  "description": "Brief one-line description of the resource",
  "category": "Documentation | Article | Discussion | Video | Tool",
  "link": "https://resource-url.com",
  "author": "Author Name",
  "tags": ["guide", "tutorial"]
}
```

**Links** (`data/links.json`):
```json
{
  "name": "Link Name",
  "url": "https://link-url.com"
}
```

### 📖 Detailed guidelines

For complete contribution guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).


## Community

- 💬 **Discussions**: [GitHub Discussions](https://github.com/deepakness/omarchy-hub/discussions)
- 🐛 **Issues**: [GitHub Issues](https://github.com/deepakness/omarchy-hub/issues)
- 📧 **Contact**: [@deepakness](https://github.com/deepakness)

## Acknowledgments

- [DHH](https://dhh.dk) for creating Omarchy
- The [Arch Linux](https://archlinux.org/) and [Hyprland](https://github.com/hyprwm/Hyprland) communities for their amazing work
- All contributors who share their setups, themes, and resources

## License

This project is open source and available under the [MIT License](LICENSE).