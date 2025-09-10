# Omarchy Hub

A community-driven website for collecting and sharing themes, setups, resources, and links for [Omarchy](https://omarchy.org) - the opinionated Arch + Hyprland setup by DHH.

🌐 **Live Website**: [https://omarchy.deepakness.com](https://omarchy.deepakness.com)

<!-- Badges -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4bf623c-783c-4a5e-af63-f655043ace6b/deploy-status)](https://app.netlify.com/projects/omarchy-hub/deploys)
[![License](https://img.shields.io/github/license/deepakness/omarchy-hub?color=64748b)](LICENSE)


## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage with featured content
│   ├── themes/page.tsx     # Themes listing page
│   ├── setups/page.tsx     # Setups listing page
│   └── resources/page.tsx  # Resources listing page
├── components/             # Reusable React components
│   ├── Card.tsx            # Content card component
│   ├── OmarchyLogo.tsx     # Main logo component
│   ├── PixelButton.tsx     # Retro-style button component
│   ├── Header.tsx          # Navigation header
│   └── Breadcrumb.tsx      # Navigation breadcrumb
├── data/                   # JSON data files
│   ├── themes.json         # Themes data
│   ├── setups.json         # Setups data
│   ├── resources.json      # Resources data
│   ├── releases.json       # Omarchy releases, scrapes automatically
│   └── links.json          # Links data
├── public/                 # Static assets
│   └── setups/             # Setup screenshots
└── .github/                # GitHub templates and workflows
    ├── ISSUE_TEMPLATE/     # Issue templates for contributions
    └── pull_request_template.md
```


## Contributing Content

We welcome contributions from the community! There are several ways to contribute:

### 🚀 Quick Contribution (Recommended)

**For Beginners**: Use our GitHub issue templates for easy submission:

- 🖥️ **[Submit a Setup](https://github.com/deepakness/omarchy-hub/issues/new?template=setup-submission.yml)** - Share your Omarchy workstation
- 🎨 **[Submit a Theme](https://github.com/deepakness/omarchy-hub/issues/new?template=theme-submission.yml)** - Share custom color schemes
- 📚 **[Submit a Resource](https://github.com/deepakness/omarchy-hub/issues/new?template=resource-submission.yml)** - Share guides and tutorials
- 🔗 **[Submit a Link](https://github.com/deepakness/omarchy-hub/issues/new?template=link-submission.yml)** - Suggest useful links

### 🔧 Developer Contribution

**For Developers**: Submit pull requests directly:

1. Fork the repository
2. Add your content to the appropriate JSON file in `/data/`
3. Follow the data structure guidelines below
4. Submit a pull request

### 📋 Data Structure Examples

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

### 📖 Detailed Guidelines

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