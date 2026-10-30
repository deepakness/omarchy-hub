# Omarchy plugins collection

Welcome to the collection of Omarchy plugins! This page showcases hand-picked shell plugins for Omarchy 4 (Quattro), each one installable with a single command.

🧩 **Prefer a visual experience?** Check out these plugins [as beautiful cards on the website](https://omarchy.deepakness.com/plugins).

## Statistics

- **Total plugins:** 26
- **Bar widgets:** 18
- **Panels:** 3
- **Overlays:** 3
- **Services:** 1
- **Bars:** 1

## About these plugins

Plugins are the parts of the Omarchy desktop: the bar, its widgets, panels, overlays and background services all run inside one long-lived Quickshell process. Anything you add yourself lives in `~/.config/omarchy/plugins/`, and the full community catalog is at [plugins.omarchy.org](https://plugins.omarchy.org/).

Plugins run unsandboxed with your user permissions, so read the source before you enable anything.

---

## Plugin gallery

### 1. FileBlade

Customizable IDE-like sidebars for managing files and referencing information while you work.

**Kind:** Services

**Category:** Developer Tools

**Author:** data-goblin

<img src="/public/plugins/fileblade-1.webp" alt="FileBlade" width="450">

**Tags:** `files`, `sidebar`, `dev-tools`

**Install:**

```bash
omarchy plugin add https://github.com/data-goblin/fileblade.git --enable
```

**Source:** [View plugin repository](https://github.com/data-goblin/fileblade)

---

### 2. Okomart

A storefront and manager to browse, install, enable, update and remove Omarchy plugins from inside the shell.

**Kind:** Panels

**Category:** System

**Author:** brianblakely

<img src="/public/plugins/okomart-1.webp" alt="Okomart" width="450">

**Tags:** `plugins`, `store`, `manager`

**Install:**

```bash
omarchy plugin add https://github.com/brianblakely/omarchy-plugins.git --enable
```

**Source:** [View plugin repository](https://github.com/brianblakely/omarchy-plugins)

---

### 3. Omaland

Edit Hyprland's visual look and feel from a panel, with live preview.

**Kind:** Panels

**Category:** Appearance

**Author:** bobby-nicholas

<img src="/public/plugins/omaland-1.webp" alt="Omaland" width="450">

**Tags:** `hyprland`, `look-and-feel`, `panel`

**Install:**

```bash
omarchy plugin add https://github.com/bobby-nicholas/omaland.git --enable
```

**Source:** [View plugin repository](https://github.com/bobby-nicholas/omaland)

---

### 4. Omapager

A stacking, grouping replacement for Omarchy notifications, with inline reply, source icons and per-source snooze.

**Kind:** Bar widgets

**Category:** Desktop

**Author:** njpatel

<img src="/public/plugins/omapager-1.webp" alt="Omapager" width="450">

**Tags:** `notifications`, `desktop`, `bar`

**Install:**

```bash
omarchy plugin add https://github.com/njpatel/omapager.git --enable
```

**Source:** [View plugin repository](https://github.com/njpatel/omapager)

---

### 5. hyprmoncfg

Saves a monitor profile per setup and applies it automatically on hotplug, lid events and resume, with an editor for scale, HDR, brightness and rotation.

**Kind:** Bar widgets

**Category:** Hardware

**Author:** crmne

<img src="/public/plugins/hyprmoncfg-1.webp" alt="hyprmoncfg" width="450">

**Tags:** `monitors`, `multi-monitor`, `hyprland`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-hyprmoncfg.git --enable
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-hyprmoncfg)

---

### 6. Omastorm

Live NEXRAD weather radar on your desktop, built with Rust and Quickshell.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** wesleygrimes

<img src="/public/plugins/omastorm-1.webp" alt="Omastorm" width="450">

**Tags:** `weather`, `radar`, `bar`

**Install:**

```bash
omarchy plugin add https://github.com/wesleygrimes/omastorm.git --enable
```

**Source:** [View plugin repository](https://github.com/wesleygrimes/omastorm)

---

### 7. Infomarchy

Turns the wallpaper into a live information desk for AI sessions, rate limits, repository health, Ollama controls and machine telemetry.

**Kind:** Overlays

**Category:** Desktop

**Author:** nixfred

<img src="/public/plugins/infomarchy-1.webp" alt="Infomarchy" width="450">

**Tags:** `ai`, `wallpaper`, `overlay`

**Install:**

```bash
omarchy plugin add https://github.com/nixfred/infomarchy.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/nixfred/infomarchy)

---

### 8. Time Machine

Scheduled restic backups with a destination picker and a snapshot browser in the bar.

**Kind:** Bar widgets

**Category:** System

**Author:** jankeesvw

<img src="/public/plugins/time-machine-1.webp" alt="Time Machine" width="450">

**Tags:** `backups`, `restic`, `system`

**Install:**

```bash
omarchy plugin add https://github.com/jankeesvw/omarchy-time-machine.git --enable
```

**Source:** [View plugin repository](https://github.com/jankeesvw/omarchy-time-machine)

---

### 9. Mihoro

Control the Mihomo (Clash.Meta) proxy core from the bar: node selection with delay tests, TUN toggling and subscription switching.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** huacnlee

<img src="/public/plugins/mihoro-1.webp" alt="Mihoro" width="450">

**Tags:** `proxy`, `clash`, `network`

**Install:**

```bash
omarchy plugin add https://github.com/huacnlee/omarchy-mihoro.git --enable
```

**Source:** [View plugin repository](https://github.com/huacnlee/omarchy-mihoro)

---

### 10. Lock Screen Explorer

Lock screen designs with a picker to preview and switch between them, plus a designer for building your own.

**Kind:** Overlays

**Category:** Appearance

**Author:** SirJul1337

<img src="/public/plugins/lock-screen-explorer-1.webp" alt="Lock Screen Explorer" width="450">

**Tags:** `lock-screen`, `designs`, `customization`

**Install:**

```bash
omarchy plugin add https://github.com/SirJul1337/omarchy-lock-explorer.git --enable
```

**Source:** [View plugin repository](https://github.com/SirJul1337/omarchy-lock-explorer)

---

### 11. AirPods

AirPods in the bar: per-bud and case battery, listening mode, adaptive noise level and one-bud ANC.

**Kind:** Bar widgets

**Category:** Hardware

**Author:** thisisgm

<img src="/public/plugins/airpods-1.webp" alt="AirPods" width="450">

**Tags:** `airpods`, `bluetooth`, `hardware`

**Install:**

```bash
omarchy plugin add https://github.com/thisisgm/omarchy-pods --enable
```

**Source:** [View plugin repository](https://github.com/thisisgm/omarchy-pods)

---

### 12. Omarchy Spotify

Spotify in the shell with a mini player and keyboard shortcuts. About 60 MB of RAM instead of the desktop client's 950 MB.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** stappmus

<img src="/public/plugins/omarchy-spotify-1.webp" alt="Omarchy Spotify" width="450">

**Tags:** `spotify`, `music`, `bar`

**Install:**

```bash
omarchy plugin add https://github.com/stappmus/Omarchy-Spotify.git --enable
```

**Source:** [View plugin repository](https://github.com/stappmus/Omarchy-Spotify)

---

### 13. Omamail

Read, triage and reply to Gmail, HEY, JMAP and IMAP mail in a native window, with several accounts at once.

**Kind:** Bar widgets

**Category:** Productivity

**Author:** huacnlee

<img src="/public/plugins/omamail-1.webp" alt="Omamail" width="450">

**Tags:** `email`, `productivity`, `bar`

**Install:**

```bash
omarchy plugin add https://github.com/huacnlee/omamail.git --enable
```

**Source:** [View plugin repository](https://github.com/huacnlee/omamail)

---

### 14. AI Usage

Live Claude, Codex, GLM and OpenRouter plan usage and balances in the panel, with reset countdowns and provider tabs.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** akitaonrails

<img src="/public/plugins/ai-usage-1.webp" alt="AI Usage" width="450">

**Tags:** `ai`, `usage`, `bar`

**Install:**

```bash
omarchy pkg aur add ai-usagebar-bin && omarchy plugin add https://github.com/akitaonrails/ai-usagebar.git --enable
```

**Source:** [View plugin repository](https://github.com/akitaonrails/ai-usagebar)

---

### 15. Vessel

A marine radar for Omarchy. Put a name to the boats on your horizon, with a little robot keeping watch.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** simoz

<img src="/public/plugins/vessel-1.webp" alt="Vessel" width="450">

**Tags:** `marine`, `radar`, `ais`

**Install:**

```bash
omarchy plugin add https://github.com/simoz/omarchy-vessel.git --enable
```

**Source:** [View plugin repository](https://github.com/simoz/omarchy-vessel)

---

### 16. Active Window + Icon

Shows the focused window title and application icon in the bar, with adjustable icon saturation.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** crmne

<img src="/public/plugins/active-window-1.webp" alt="Active Window + Icon" width="450">

**Tags:** `bar`, `window-title`, `app-icons`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-active-window.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-active-window)

---

### 17. Files

Searches files and folders from an overlay with actions to open, copy, share, or move results to the Trash.

**Kind:** Overlays

**Category:** Productivity

**Author:** crmne

<img src="/public/plugins/files-1.webp" alt="Files" width="450">

**Tags:** `file-search`, `launcher`, `overlay`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-files.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-files)

---

### 18. Lyrics Synced with Music

Displays lyrics for the current media player track and highlights each line as the song plays.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** crmne

<img src="/public/plugins/lyrics-synced-with-music-1.webp" alt="Lyrics Synced with Music" width="450">

**Tags:** `lyrics`, `music`, `mpris`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-lyrics.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-lyrics)

---

### 19. MOZA

Controls MOZA racing hardware through native Boxflat settings and telemetry-driven rev lights.

**Kind:** Bar widgets

**Category:** Hardware

**Author:** crmne

<img src="/public/plugins/moza-1.webp" alt="MOZA" width="450">

**Tags:** `moza`, `sim-racing`, `hardware`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-moza.git --enable
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-moza)

---

### 20. Media Controls + Album Art

Shows album art, track details, and playback controls for MPRIS media players in the bar.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** crmne

<img src="/public/plugins/media-controls-album-art-1.webp" alt="Media Controls + Album Art" width="450">

**Tags:** `mpris`, `media-controls`, `album-art`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-mpris.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-mpris)

---

### 21. OmaCal

Adds calendar events, quick add, reminders, and time tracking to the stock clock and calendar, with a HEY backend.

**Kind:** Bar widgets

**Category:** Productivity

**Author:** crmne

<img src="/public/plugins/omacal-1.webp" alt="OmaCal" width="450">

**Tags:** `calendar`, `hey`, `productivity`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omacal.git --enable
```

**Source:** [View plugin repository](https://github.com/crmne/omacal)

---

### 22. OmaStats

Monitors CPU, GPU, memory, disks, network, temperatures, fans, and battery with bar graphs and detailed panels.

**Kind:** Bar widgets

**Category:** System

**Author:** crmne

<img src="/public/plugins/omastats-1.webp" alt="OmaStats" width="450">

**Tags:** `system-monitor`, `graphs`, `sensors`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omastats.git --enable
```

**Source:** [View plugin repository](https://github.com/crmne/omastats)

---

### 23. OmaTasks for Todoist

Brings Todoist tasks, Quick Add, editing, and drag-to-reorder into the Omarchy bar.

**Kind:** Bar widgets

**Category:** Productivity

**Author:** crmne

<img src="/public/plugins/omatasks-1.webp" alt="OmaTasks for Todoist" width="450">

**Tags:** `todoist`, `tasks`, `productivity`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omatasks.git --enable
```

**Source:** [View plugin repository](https://github.com/crmne/omatasks)

---

### 24. Ultimate Guitar Tabs

Finds guitar tabs for the current media player track, with auto-scroll, version switching, and text sizing.

**Kind:** Bar widgets

**Category:** Widgets

**Author:** crmne

<img src="/public/plugins/ultimate-guitar-tabs-1.webp" alt="Ultimate Guitar Tabs" width="450">

**Tags:** `guitar-tabs`, `music`, `mpris`

**Install:**

```bash
omarchy plugin add https://github.com/crmne/omarchy-ultimate-guitar.git --enable --yes
```

**Source:** [View plugin repository](https://github.com/crmne/omarchy-ultimate-guitar)

---

### 25. OmaMessenger

Keyboard-first Telegram and WhatsApp client in one window inside omarchy-shell, with messages stored locally.

**Kind:** Panels

**Category:** Productivity

**Author:** timlittle

<img src="/public/plugins/omamessenger-1.webp" alt="OmaMessenger" width="450">

**Tags:** `telegram`, `whatsapp`, `messaging`

**Install:**

```bash
omarchy plugin add https://github.com/timlittle/omamessenger --enable
```

**Source:** [View plugin repository](https://github.com/timlittle/omamessenger)

---

### 26. Ilha

Floating island bar that replaces the default Omarchy bar: a clock at rest, one status line on hover and one panel at a time.

**Kind:** Bars

**Category:** Desktop

**Author:** Esegnorelli

<img src="/public/plugins/ilha-1.webp" alt="Ilha" width="450">

**Tags:** `bar`, `quickshell`, `workspaces`

**Install:**

```bash
omarchy plugin add https://github.com/Esegnorelli/omarchy-ilha.git --enable
```

**Source:** [View plugin repository](https://github.com/Esegnorelli/omarchy-ilha)


---

*Automatically generated by: `scripts/generate-docs.js`*
