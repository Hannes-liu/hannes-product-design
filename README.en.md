# Hannes Product Design

[简体中文](README.md) | **English**

> Turn early requirements into product proposals with consistent business logic, working interactions, and verifiable outcomes.

A collection of Agent Skills for product modeling and interactive prototyping. Start with a brief requirement, an existing specification, reference screenshots, or an existing interface to analyze the business, design pages, or iterate on a prototype.

**Current status:** Primarily used with Codex and under active development. The toolkit includes two independently usable Skills, three fictional cases, three style previews, and an Ant Design component catalog. Compatibility with other Agent environments has not been independently verified.

This README is available in English. The detailed Skill guides, demo interfaces, and screenshots are currently in Chinese.

[Try the cases online](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/examples/product-cases.html) · [Style previews](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/style-preview.html) · [Component catalog](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/library.html)

[Positioning](#positioning-and-capabilities) · [Choose a Skill](#choose-a-skill) · [Download and use](#download-and-use) · [Quick start](#quick-start) · [Examples](#usage-examples) · [Design resources](#design-resources) · [FAQ](#faq) · [Development](#development-and-maintenance) · [License](#license-and-sources)

## Positioning and capabilities

The core problem this toolkit addresses is turning **requirements with an established direction into a product proposal that people can operate, inspect, and discuss**.

Using the five planes of user experience as a reference, the toolkit focuses on the middle three:

| Plane | Questions to answer | Core capabilities and outputs |
| --- | --- | --- |
| **Scope** | What is needed? Where are the boundaries? What takes priority in this iteration? | Identify core tasks and primary roles; define functional and content requirements, included and excluded scope, priorities, and acceptance criteria |
| **Structure** | How do objects, roles, rules, and processes relate? | Develop business models, role permissions, state machines, information architecture, and user tasks; express flows through flowcharts or swimlanes across participants |
| **Skeleton** | How do users understand the information and complete tasks on each page? | Produce page specifications, page and component decisions, interactive prototypes, and validation results; check that interactions follow the rules |

The strategy plane provides the user, problem, and goal context. The surface plane supports clear, consistent presentation through design baselines, typography, and components. The five planes are perspectives for assessing a proposal, rather than mandatory stages to repeat for every task.

The two Skills contribute distinct capabilities: **the modeling Skill clarifies business relationships and rules; the design Skill implements those rules in pages and interactions, then checks their consistency.** Start from early requirements, reuse an existing specification, or continue an existing prototype. Deliverables depend on the task. Design delivery focuses on runnable pages, component reuse, and consistent interactions, with the corresponding maintained source and run instructions.

## Choose a Skill

| What you need | Skill | Main outputs |
| --- | --- | --- |
| Clarify objects, roles, permissions, states, and business rules; analyze changes or inconsistencies | [hannes-product-modeling](skills/hannes-product-modeling/README.md) | Business models, rule specifications, change impact analysis, and consistency reviews |
| Translate requirements into pages; build or iterate on an interactive prototype | [hannes-requirement-to-design](skills/hannes-requirement-to-design/README.md) | Task flows, page specifications, design notes, interactive prototypes, and validation results, as needed |

**To build pages, start with the design Skill. Use the modeling Skill as needed when business rules involve complex relationships.** Each Skill works independently; you do not need to learn or install the other first.

## Download and use

### 1. Download the complete package

1. On this repository's GitHub page, click the green **Code** button.
2. Select **Download ZIP**, then extract the archive to a convenient location.
3. Open the extracted directory, go to `skills/`, and locate `hannes-product-modeling/` or `hannes-requirement-to-design/`.

You can use either Skill on its own, but keep its **entire folder**, including `SKILL.md`, `agents/`, `references/`, and any existing `assets/` or other resources. Downloading only `SKILL.md` leaves out referenced materials. Reading the Skill instructions or opening the bundled HTML demos does not require npm dependencies.

### 2. Try a Skill by providing its local path

In a Codex session that can read local files, provide the full path to the entry file and describe your task. Replace the example path with the actual location of the extracted folder:

```text
Read and use:
/path/to/hannes-product-design/skills/hannes-product-modeling/SKILL.md

Analyze the objects, primary roles, states, and conflict rules for shared-resource reservations.
For this task, respond in the conversation only. List unspecified business rules as open questions.
```

To build pages, use `skills/hannes-requirement-to-design/SKILL.md` instead, then describe the requirements and output location. Providing the full path lets you try a Skill without copying it to an installation directory.

### 3. Optional: install for regular use in Codex

Copy the **Skill folder** you want into one of the locations below, depending on its scope. The immediate subfolder must be the Skill's name; do not nest the entire repository inside it.

| Scope | Entry file after copying |
| --- | --- |
| One project | `<target-project>/.agents/skills/<skill-name>/SKILL.md` |
| Multiple projects for your user account | `~/.agents/skills/<skill-name>/SKILL.md` |

For example, a project installation of the design Skill has this entry file:

```text
<target-project>/.agents/skills/hannes-requirement-to-design/SKILL.md
```

Copy both Skills or just the one you need. `~` means your user account's home directory. Open the target project in Codex; once the Skill is recognized, invoke it explicitly:

```text
Use $hannes-requirement-to-design to create a desktop prototype from the requirements I provide.
Follow the project's existing design guidelines, save outputs in the target project,
and report the validation you actually performed.
```

Codex automatically discovers local Skills. If a Skill does not appear, restart Codex and try again, or continue using its full path. Installation locations and discovery behavior follow the [official Codex Skill documentation](https://learn.chatgpt.com/docs/build-skills). This repository currently provides Skill folders directly; it is not packaged as a plugin.

## Quick start

### Try the cases online without downloading or installing

1. Open the [interactive cases online](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/examples/product-cases.html) directly in your browser.
2. Use the navigation at the top to switch between the initial reservation, existing-specification, and incremental-change cases.
3. In a reservation case, click a slot labeled **Available** (`可预约`), enter a purpose, and save. In the item case, open a record's details and edit it. **Reset this case** (`重置本案例`) restores the initial data.

**Offline use:** Download and extract the repository, then open `skills/hannes-requirement-to-design/assets/examples/product-cases.html` in your browser to try the same cases. Node.js and npm are not required. The style previews and component catalog also work offline after downloading.

### Start with your own requirements

After loading or installing a Skill as described above, provide your requirements in the conversation. Here is a complete example; replace the output path with your target location:

```text
Use hannes-requirement-to-design.
Create a desktop prototype for shared-resource reservations:
view occupancy, choose an available slot, make a reservation, and cancel it.
A resource cannot have overlapping reservations. Members can only cancel their own reservations before they start.
Approvals and resource administration are out of scope. List other unspecified rules;
do not invent additional roles.

First define the scope and key flow, then build an interactive prototype
and report the validation you actually performed.
Save outputs to /path/to/your-project, outside the Skill folder.
```

If you already have a specification, replace the requirement description with the **actual document path and the current task**. For an existing project, also provide its location, the pages to change, and what to preserve. For business analysis alone, use `skills/hannes-product-modeling/SKILL.md` and describe the question to analyze.

## Usage examples

The short prompts below assume the relevant Skill has already been loaded or recognized. All cases use fictional materials created for this toolkit. Screenshots come from the bundled HTML demos running in a browser. See the [case index](skills/hannes-requirement-to-design/references/examples/README.md) for detailed inputs, decisions, and reproduction steps.

### 1. Early requirements → an interactive proposal

**What to look for:** The resource timeline helps users find an available time by comparing occupancy before choosing a slot. Hatched areas are not open for booking.

```text
Use hannes-requirement-to-design to create a shared-resource reservation prototype.
Members need to view occupancy, select an available slot, book, and cancel.
Approvals and resource administration are out of scope.
Clarify the roles, scope, and rules, then provide flows, pages, and an interactive demo.
```

![Initial reservation case: resource timeline, occupancy, and available slots](skills/hannes-requirement-to-design/assets/examples/screenshots/reservation-v1-occupancy.png)

[Read the case specification](skills/hannes-requirement-to-design/references/examples/reservation.md) · [Try it online](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=reservation-v1#/list)

<details>
<summary>2. Existing specification → search, details, and editing (expand for prompt and screenshot)</summary>

**What to look for:** Reuse a confirmed specification while keeping the list, details, and editor connected to the same data. The screenshot shows a record from page 2; its form changes have not been saved yet.

```text
Use hannes-requirement-to-design to implement search, details, and editing
from the confirmed item specification. Keep the existing design baseline.
Preserve filters and pagination; synchronize the list, details, and statistics after saving.
Fill only the gaps needed for this task, without rewriting the entire PRD.
```

![Item case: an edit form above the detail view, with status and description changes](skills/hannes-requirement-to-design/assets/examples/screenshots/items-edit-dialog.png)

[Read the case specification](skills/hannes-requirement-to-design/references/examples/existing-spec.md) · [Try it online](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=items#/list)

</details>

<details>
<summary>3. Rule change → update affected pages (expand for prompt and screenshot)</summary>

**What to look for:** The cancellation threshold changes to at least 60 minutes before the start. With the demo clock fixed at 09:00, a reservation starting at 09:30 cannot be canceled; one starting at 10:00 meets the boundary.

```text
Use hannes-product-modeling to analyze the impact of changing cancellation
from "any time before the start" to "at least 60 minutes before the start,
including exactly 60 minutes."
Then use hannes-requirement-to-design to update the existing specification,
action conditions, and feedback. Change only the affected parts and validate the time boundary.
```

![Rule change: details explain the cancellation condition and disable an ineligible action](skills/hannes-requirement-to-design/assets/examples/screenshots/reservation-v2-cancel-rule.png)

[Read the change case](skills/hannes-requirement-to-design/references/examples/incremental-change.md) · [Try it online](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/examples/product-cases.html?case=reservation-v2#/list)

</details>

## How the two Skills work together

The modeling Skill clarifies business relationships and constraints. The design Skill implements them as task flows, pages, and interactions. Continue from existing materials and confirmed decisions, using the capabilities needed to address the current gaps.

**When both Skills serve one project, maintain one shared project specification.** Update business rules where they are defined and reference them from page descriptions. When rules change, synchronize the related pages, demo data, and acceptance criteria. For visual changes, update design variables and components.

For complex projects, keep a **Current work status** section in the existing project documentation: valid sources, confirmed decisions, open questions, source and preview locations, actual validation results, and next steps. A new session reads this information before working on the differences.

After delivery, you can choose whether to retain lessons from the task. Compare them with existing guidance first, then choose to improve, replace, adjust, add, or defer an update. When both Skills are used, ask only once. Do not write lessons into the toolkit without authorization.

## Design resources

| Resource | Purpose |
| --- | --- |
| [Three style previews](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/style-preview.html) | Compare desktop and mobile styles inspired by Ant Design, TDesign, and Apple Web |
| [Ant Design component catalog](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/library.html) | Try basic controls and combined filtering, table, detail, and editing interactions |
| [Design specification](skills/hannes-requirement-to-design/design-spec.md) | Reference typography, colors, spacing, and component behavior |
| [Design knowledge](skills/hannes-requirement-to-design/references/design-knowledge.json) · [Decision method](skills/hannes-requirement-to-design/references/design-decisions.md) | Select patterns by task, with applicability, anti-patterns, and sources |
| [Component reuse and build guide](skills/hannes-requirement-to-design/references/component-library.md) | Find modular source code, dependencies, and build commands |
| [Reservation modeling case](skills/hannes-product-modeling/references/examples/reservation-model.md) | Try role, object, state, and rule analysis independently |

Existing projects take precedence: use their technology stack and design guidelines. The Ant Design component catalog uses actual component dependencies. The three style previews and cases are custom implementations. Apple Web takes inspiration from Apple HIG; these style demos do not use the corresponding official component libraries.

## FAQ

**Do I need a complete PRD and model for every task?**  
Add documentation according to task complexity. Reuse existing specifications and limit local changes to the affected parts. The modeling Skill also supports standalone rule specifications, change analysis, and consistency reviews; see its README for details.

**What should I provide?**  
At minimum, describe the problem and the current task. Include any existing requirements, specifications, screenshots, or project files. A clear target device, output location, and preservation scope make it easier to start. You can also state what remains undecided.

**Is the prototype a complete business system?**  
Simulated data, frontend permissions, and save feedback do not constitute real APIs, authentication, persistence, or a production system. Demo data is stored in memory and resets on refresh.

**Where do project outputs go?**  
In the target project specified by the user. This toolkit stores general methods, resources, and fictional cases, rather than real business materials or raw conversations.

**How can I judge whether validation is sufficient?**  
Check which task paths were actually exercised, in which environment, and with what results. Distinguish static checks, scenario walkthroughs, browser testing, and independent behavior evaluations. Passing browser checks does not establish usability with real users. Record actual checks and limitations in the target project for each task.

## Development and maintenance

<details>
<summary>Repository structure and maintenance entry points</summary>

```text
hannes-product-design/
├── README.md
├── README.en.md
├── LICENSE
├── .gitignore
└── skills/
    ├── hannes-product-modeling/
    │   ├── SKILL.md
    │   ├── README.md
    │   ├── LICENSE
    │   ├── agents/openai.yaml
    │   └── references/
    └── hannes-requirement-to-design/
        ├── SKILL.md
        ├── README.md
        ├── LICENSE
        ├── agents/openai.yaml
        ├── design-spec.md
        ├── THIRD_PARTY_NOTICES.md
        ├── references/
        └── assets/
            ├── style-preview.html
            ├── library.html
            ├── component-library/
            └── examples/
                ├── product-cases.html
                └── screenshots/
```

`SKILL.md` contains metadata and execution instructions. `agents/openai.yaml` supplies display and invocation metadata; it is not configuration for automatically spawning subagents.

- Maintain Skill rules and usage instructions in their respective folders. Each Skill stays self-contained; both share one Git repository at the root.
- Distribute reusable guidance, fictional cases, maintained source, and required licenses. Keep internal research, test scripts and fixtures, evaluation scenarios and outputs, validation reports, and validation summaries in ignored local directories.
- Edit the component library's source, then rebuild `library.html` instead of maintaining a second implementation by hand. See the [component reuse guide](skills/hannes-requirement-to-design/references/component-library.md) for commands and environment requirements.
- Update screenshots and descriptions when case pages change. When behavior changes, update the relevant rules and case acceptance steps.

</details>

When giving feedback, include fictional or anonymized input, expected and actual behavior, the affected page, and reproduction steps. The [modeling guide](skills/hannes-product-modeling/README.md) and [design guide](skills/hannes-requirement-to-design/README.md) provide detailed usage instructions and capability limits.

## License and sources

Original code, documentation, and fictional cases in this toolkit are licensed under the [MIT License](LICENSE), with the notice `Copyright (c) 2026 Hannes-liu`. Use, modification, redistribution, and commercial use are permitted subject to the license conditions, including retention of copyright and license notices. Third-party materials remain under their respective licenses; see [THIRD_PARTY_NOTICES.md](skills/hannes-requirement-to-design/THIRD_PARTY_NOTICES.md). MIT does not grant rights to Apple or other third-party trademarks, fonts, or assets. Both Skill folders contain a copy of the same MIT license for standalone use.

### Third-party copyright and license notices

The following summary covers distributed materials, retained license texts, and the dependency lockfile. Rights in third-party code, documentation, and assets remain with their respective holders. This table does not replace the full licenses or relicense upstream materials.

| Third-party project | Use and scope in this package | Copyright and license |
| --- | --- | --- |
| **Ant Design** | Design reference and the `antd@6.6.7` runtime used by the component catalog | `Copyright (c) 2015-present Ant UED`; [full MIT text](skills/hannes-requirement-to-design/references/licenses/ant-design-MIT.txt) |
| **React / React DOM** | `react@19.2.0` and `react-dom@19.2.0`, bundled in the component catalog | `Copyright (c) Meta Platforms, Inc. and affiliates.`; MIT, with full texts retained in the catalog |
| **dayjs** | `dayjs@1.11.13`, used by the component catalog | `Copyright (c) 2018-present, iamkun`; MIT, with the full text retained in the catalog |
| **TDesign** | Reference for design principles and theme organization; the style preview is custom-built and does not bundle the official TDesign runtime | `Copyright (c) 2021-present TDesign`; [full MIT text](skills/hannes-requirement-to-design/references/licenses/tdesign-MIT.txt) |
| **Other component runtime dependencies** | Transitive dependencies actually distributed in `library.html` | Each author's copyright and applicable license are retained; the current artifact embeds full notices for 54 runtime packages, available in the catalog |

The **Dependency versions and full license notices** (`依赖版本与完整许可声明`) control at the bottom of the [component catalog](https://hannes-liu.github.io/hannes-product-design/skills/hannes-requirement-to-design/assets/library.html) opens the complete runtime notices offline. The HTML also retains the same text. Exact versions are recorded in the [dependency lockfile](skills/hannes-requirement-to-design/assets/component-library/package-lock.json). The build tool esbuild uses MIT. It is not distributed as a runtime in that HTML; distributing the tool itself separately still requires compliance with its license.

### Apple-inspired styling, documentation, and trademarks

**Apple Design / Apple Web** in this project means a custom Web style inspired by the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/). It is a demo implemented for this toolkit, rather than an official Apple component library or design resource. It is not endorsed, sponsored, or approved by Apple. Apple and its related product names and trademarks belong to Apple Inc.; other third-party marks belong to their respective holders.

Apple HIG text, official code, screenshots, logos, fonts, SF Symbols, and design resource packages do not become MIT-licensed through a reference in this project or through this project's adoption of MIT. This package does not distribute those official Apple assets or mirrored HIG text. The preview uses fonts already available on the device and does not bundle font files. Any future inclusion of specific assets requires compliance with their applicable terms. Learning general design principles and writing an independent implementation does not authorize copying Apple's distinctive website design or trade dress. See the [Apple trademark guidelines](https://www.apple.com/legal/intellectual-property/guidelinesfor3rdparties.html) and [Apple website terms](https://www.apple.com/legal/internet-services/terms/site.html).


### Copying, redistribution, and future reuse

- When copying or distributing third-party code or substantial portions covered by its license, retain the applicable copyrights, full licenses, and required notices. Bundling, minification, or format changes do not automatically remove these obligations.
- Attribution and non-affiliation statements in this README do not grant third-party trademark, patent, font, or asset rights, or substitute for missing permission. The applicable license for each file still governs.
- Source versions, adopted scope, and complete license files are recorded in [THIRD_PARTY_NOTICES.md](skills/hannes-requirement-to-design/THIRD_PARTY_NOTICES.md). Original toolkit content is licensed under [MIT](LICENSE); third-party materials remain under their respective licenses.
