# Contributing to Omarchy Hub

Thank you for your interest in contributing to Omarchy Hub! This community-driven website collects and shares themes, setups, resources, and tools for [Omarchy](https://omarchy.org).

## How to Contribute

### 1. Adding New Content

You can contribute by adding new content to any of these categories:

- **Setups**: Share your Omarchy workstation configurations
- **Themes**: Submit custom color schemes and visual themes  
- **Resources**: Add helpful documentation, guides, and tutorials
- **Links**: Suggest useful Omarchy-related links

### 2. Contribution Methods

#### Option A: GitHub Issues (Recommended for Beginners)
1. Go to [Issues](https://github.com/deepakness/omarchy-hub/issues)
2. Click "New Issue"
3. Choose the appropriate template:
   - 🖥️ **Setup Submission**
   - 🎨 **Theme Submission** 
   - 📚 **Resource Submission**
   - 🔗 **Link Submission**
4. Fill out the template with your content details
5. We'll add it to the website for you!

#### Option B: Direct Pull Request (For Developers)
1. Fork this repository
2. Add your content to the appropriate JSON file in `/data/`
3. Follow the data structure guidelines below
4. Submit a pull request

## Content Guidelines

### Setup Submissions

**Required Information:**
- Setup name
- Brief one-line description
- Device/hardware details
- High-quality screenshot (1920x1080 or higher)
- Link to your post/social media (Twitter, Reddit, etc.)
- Relevant tags

**Screenshot Requirements:**
- Minimum resolution: 1920x1080
- Show your actual Omarchy desktop
- Good lighting and clear visibility
- No personal information visible

**Data Structure:**
```json
{
  "id": "unique-id",
  "name": "Your Setup Name",
  "description": "Brief one-line description of your setup",
  "screenshot": "setups/your-setup.jpg",
  "link": "https://your-post-url.com",
  "device": "Hardware details",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Theme Submissions

**Required Information:**
- Theme name
- Category (Dark Theme, Light Theme, etc.)
- Author name
- GitHub repository or download link
- Screenshot/preview image
- Relevant tags

**Screenshot Requirements:**
- Show the theme in action (desktop, terminal, etc.)
- High quality and representative of the theme
- Can be hosted on GitHub or external CDN

**Data Structure:**
```json
{
  "id": "unique-id",
  "name": "Theme Name",
  "category": "Dark Theme",
  "link": "https://github.com/your-repo/theme",
  "author": "Your Name",
  "screenshot": "https://raw.githubusercontent.com/your-repo/screenshot.png",
  "tags": ["official", "popular", "custom"]
}
```

### Resource Submissions

**Required Information:**
- Resource name
- Brief one-line description
- Category (Documentation, Article, Tutorial, etc.)
- Author name
- Link to the resource
- Relevant tags

**Data Structure:**
```json
{
  "id": "unique-id",
  "name": "Resource Name",
  "description": "Brief one-line description of the resource",
  "category": "Documentation",
  "link": "https://resource-url.com",
  "author": "Author Name",
  "tags": ["guide", "tutorial", "official"]
}
```

### Link Submissions

**Required Information:**
- Link name
- URL
- Should be Omarchy-related

**Data Structure:**
```json
{
  "name": "Link Name",
  "url": "https://link-url.com"
}
```

## Image Guidelines

### For Setup Screenshots
1. **File Format**: JPG or PNG
2. **Resolution**: Minimum 1920x1080, prefer 2560x1440 or higher
3. **File Size**: Under 2MB
4. **Naming**: Use descriptive names like `setup-username-description.jpg`
5. **Upload**: Include in your issue or PR with the image file

### For Theme Screenshots
1. **File Format**: PNG or JPG
2. **Resolution**: Minimum 1920x1080
3. **Content**: Show the theme in action (desktop, terminal, applications)
4. **Hosting**: Can be hosted on GitHub, Imgur, or other reliable CDN

## Review Process

1. **Issues**: We review all issues within 48 hours
2. **Pull Requests**: We review PRs within 24 hours
3. **Content Quality**: We ensure all submissions meet our guidelines
4. **Approval**: Approved content is added to the website within 24 hours

## Code of Conduct

- Be respectful and constructive
- Provide accurate information
- Follow the content guidelines
- No spam or promotional content unrelated to Omarchy
- Respect others' intellectual property

## Getting Help

- **Questions**: Open a [Discussion](https://github.com/deepakness/omarchy-hub/discussions)
- **Issues**: Use [Issues](https://github.com/deepakness/omarchy-hub/issues)
- **Contact**: Reach out to [@deepakness](https://github.com/deepakness)

## Recognition

Contributors are recognized in:
- The website's contributor section
- GitHub contributor list
- Special mentions for exceptional contributions

Thank you for helping build the Omarchy community! 🚀
