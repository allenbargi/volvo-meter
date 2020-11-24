# Web Impressions

## What we do

1. We enable other teams building products faster and better
   by providing shared and global components and tools.

- Site Navigation (Delivered v. 1.0.0)
- Site Footer (Delivered v. 1.0.0)
- Sticky Navigation (In progress)
- Chat (In investigation)

2. We own a couple of global pages

- Location Selector

3. Campaigns

- Why do we do campaigns?

## Our Stakeholders

- CbV
- CbV-b2b
- Car info
- Build and Price
- Test Drive
- Digital Customer Support
- Webpages in mobile apps
- Anyone who builds web pages in react

## We do we want to do

- volvo page SDK (a.k.a create-volvo-page)

  - Why?

    - React Pages are not built in the same way
    - Teams will face same problems and need to spend time and fix it for themselves.
    - Users experience is not consistent across the site
    - VCC-UI upgrade pains

  - What?

    - we need a data-provider
    - we need more shared-components
    - we need consistant configurations

  - How?
    - Accessibility checks built-in
    - Code linting built-in
    - Integration problems solved
    - How to make better, faster, more accessible pages (how to bake it into the SDK)

### Potential new areas for the team

- "find a dealer" component? (it's a shared component)
- homepage?

  - it's very important to markets
  - it's also highly important for impression
  - CBV situation! (no prominent link to cbv in markets that have them)

## How to transition Editorial pages to React

- We need to understand the current editorial pages
- We built a tool called 'volvo-meter' to gain insight

## Volvo Meter

- Analyzed all pages available in sitemap.xml
- Detects all OXP modules
- Categorize them by type/team
- Run them though Lighthouse and gather metrics

  - Accessibility
  - Performance
  - Search Engine Optimization
  - Best Practices

- Allows us to answer questions like:
  - What are the most used oxp-modules?
  - What are the oxp-modules used to build the homepage? what react components should be built?
  - Is our react implementation better?

## Some Stats

- 3406 Ghost pages (a ghost page is an empty page with only site-nav and footer and no content)
- 188 "404 pages"

#### USAGE OF OXP MODULES :

| module_id                                             | count | %     | total % |
| ----------------------------------------------------- | ----- | ----- | ------- |
| exteriorFeatureTwo                                    | 20795 | 14.73 | 14.73   |
| exteriorFeatureOne                                    | 14731 | 10.44 | 25.17   |
| listItem                                              | 13829 | 9.80  | 34.96   |
| new-secondary-navigation                              | 13181 | 9.34  | 44.30   |
| pdphero                                               | 8619  | 6.11  | 50.41   |
| standardHero                                          | 8513  | 6.03  | 56.44   |
| oxp-other-profile-header                              | 4466  | 3.16  | 59.60   |
| oxp-other-profile-wrapper                             | 4463  | 3.16  | 62.76   |
| video                                                 | 3593  | 2.55  | 65.31   |
| specification-wrapper                                 | 3472  | 2.46  | 67.77   |
| slidergallery                                         | 2474  | 1.75  | 69.52   |
| dcs-subnavigation-dcs-body                            | 1964  | 1.39  | 70.91   |
| dcs-sub-footer-dcs-body                               | 1958  | 1.39  | 72.30   |
| specsAtAglance                                        | 1707  | 1.21  | 73.51   |
| storytelling                                          | 1633  | 1.16  | 74.67   |
| our-innovation-brands                                 | 1589  | 1.13  | 75.79   |
| topWrapper-hiddenForm                                 | 1250  | 0.89  | 76.68   |
| dcs-items-collection-dcs-body                         | 1231  | 0.87  | 77.55   |
| storygridlink                                         | 1065  | 0.75  | 78.30   |
| featuregrid                                           | 1036  | 0.73  | 79.04   |
| inlinedealer                                          | 814   | 0.58  | 79.61   |
| oxp-other-sticky-sticky-dock-offer-sticky-chatWrapper | 784   | 0.56  | 80.17   |
| editorialQuote                                        | 776   | 0.55  | 80.72   |
| V2nav-search                                          | 763   | 0.54  | 81.26   |
| galleryOld                                            | 670   | 0.47  | 81.73   |
| dcs-support-category-dcs-body                         | 643   | 0.46  | 82.19   |
| gallery                                               | 618   | 0.44  | 82.63   |
| UNKNOWN                                               | 5035  | 3.57  | 86.19   |
| SideNavLinksId                                        | 585   | 0.41  | 86.61   |

## Average scores for all pages on the site

| Metric         | Score |
| -------------- | ----- |
| SEO            | 92.12 |
| Accessibility  | 75.55 |
| Best Practices | 53.73 |
| Performance    | 29.14 |

For markets' homepage

| Metric         | Score |
| -------------- | ----- |
| SEO            | 93.51 |
| Accessibility  | 72.98 |
| Best Practices | 50.23 |
| Performance    | 27.83 |

Accessibility for Israel is a requirement enforced by law.
We claim we do have good score while our average score is 69.36
it's no ones fault, it the way we work.

## Again, how to transition Editorial pages to React?

1. Build React Components (easy)
2. Use React components to build the page (hard)

## 1. Editorial components

We're building a library of components called 'volvo-editorial-components' based on the data we gathered from volvo-meter

- 5 top components covers 50% of all modules
- 10 top components covers 68% of all modules
- 20 top components covers 79% of all modules

- Baked in analytics into components
- Reusable everywhere

- Have 6 components at the moment

## 2. Current situation

- We want tighter control over how users navigate the site
- Bring users' attention to what's improtant
- But we have no control
- Why?

### Current Way of Working

- Send all car parts to the customer
- Ask them to assemble it themselves
- Expect it to perform as good as a Ferrari
- While in reality it is as good as a Lada

### Two different implementations! (OXP-Modules and React Components)

- How to solve this?
  - Upgrade to site-core 9 and use JSS (Platform team strategy)
  - Use react component in OXP modules
  - Make Content Delivery API return CMS managed pages data (They're under staffed and don't have enough resources)
  - Rebuild pages from scratch and ignore what's managed through CMS for now

## Team Issues

- Product owner is leaving
- No Support from Dev-OPs
