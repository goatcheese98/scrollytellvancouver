import type { ReactNode } from 'react';
import rawEvidence from '@/public/data/sources.json';
import { chapters, costs, totalCosts, order, money, parseMenuEvidence, safeSourceUrl } from '@/lib/story';
import { ChapterNav, ContinueLink, StoryControls } from './StoryControls';
import { MenuComparison } from './MenuComparison';
import { RestaurantMap } from './RestaurantMap';

function Source({ url, children }: { url: unknown; children: ReactNode }) {
  const safe = safeSourceUrl(url);
  return safe ? <a href={safe}>{children}</a> : <span>{children} · source link unavailable</span>;
}
function Chapter({ index, children }: { index: number; children: ReactNode }) {
  const chapter = chapters[index];
  const next = chapters[index + 1];
  return <section className="story-chapter" aria-labelledby={`${chapter.id}-title`}>
    <p className="eyebrow">Chapter {index + 1} of 5</p>
    <h2 id={chapter.id} tabIndex={-1}><span id={`${chapter.id}-title`}>{chapter.title}</span></h2>
    {children}
    <div className="chapter-end"><ContinueLink id={next?.id ?? 'sources'}>{next ? `Continue to ${next.title.toLowerCase()}` : 'Read the sources'}</ContinueLink></div>
  </section>;
}
export function StoryReader() {
  const evidence = parseMenuEvidence(rawEvidence);
  const price = evidence?.priceComparison;
  return <div className="story-shell">
    <a className="skip-link" href="#story">Skip to story</a>
    <header className="story-header">
      <a className="story-brand" href="#story">Vancouver Restaurant Squeeze</a>
      <nav aria-label="Story tools"><a href="#chapters">Chapters</a><a href="#sources">Sources</a></nav>
      <StoryControls />
    </header>
    <main id="story" tabIndex={-1}>
      <div className="story-opening">
        <p className="eyebrow">Vancouver / A data story / 2015–2025</p>
        <h1>The price of a<br className="desktop-break" /> familiar meal</h1>
        <p>Vancouver’s go-to comfort bowl now costs nearly double. Explore how a simple large pho went from an easy weeknight staple to a luxury line item.</p>
        <p className="opening-note">Five chapters · Menus, costs, changing habits and delivery</p>
      </div>
      <div className="story-layout" id="chapters" tabIndex={-1}>
        <ChapterNav /><ChapterNav mobile />
        <article className="story-body" aria-label="Vancouver restaurant story">
          <Chapter index={0}>
            <h3>The Sticker Shock</h3>
            <p>The same restaurant, ten years apart. These are the project’s recorded menu prices, not live prices.</p>
            <MenuComparison />
            {price && evidence ? <>
              <table><caption>{price.signatureDish} · Pho Goodness, Vancouver</caption><thead><tr><th scope="col">Menu year</th><th scope="col">Recorded price</th></tr></thead><tbody>
                <tr><th scope="row">2015</th><td>{money(price.price2015)}</td></tr><tr><th scope="row">2025</th><td>{money(price.price2025)}</td></tr>
              </tbody></table>
              <p className="result"><strong className="quantity">+{price.percentageIncrease}%</strong> over {price.yearSpan} years for the signature dish.</p>
              <ul className="source-links"><li><Source url={evidence.menuSources['2015'].archiveUrl}>2015 menu · archived {evidence.menuSources['2015'].archiveDate}</Source></li><li><Source url={evidence.menuSources['2025'].currentUrl}>2025 menu · accessed {evidence.menuSources['2025'].accessDate}</Source></li></ul>
            </> : <p className="state-note" role="status">Menu price data unavailable. The original menus and remaining chapters are still available.</p>}
          </Chapter>
          <Chapter index={1}>
            <p>Three forces creating the perfect storm: labour, supply and the costs of doing business.</p>
            <dl className="pressure-list">
              <div><dt>Labour Crisis</dt><dd>The original investigation records a 16,000 worker shortage and a 70.8% wage increase. These figures belong to the 2015–2025 research period.</dd></div>
              <div><dt>Supply Shock</dt><dd>The project’s research describes meat costs rising about 36% and vegetables about 30%, alongside disruption from B.C.’s 2021 floods and port strikes.</dd></div>
              <div><dt>Admin Burden</dt><dd>Insurance, taxes and sick-day requirements add to the pressures. The original investigation records insurance increases of up to 200%.</dd></div>
            </dl>
            <p className="state-note">Historical research notes, not current quotes or a live cost index. See the research plan for each claim’s scope and supporting material.</p>
            <ContinueLink id="cost-sources">References for costs behind the counter</ContinueLink>
          </Chapter>
          <Chapter index={2}>
            <p>When costs rise faster than customers can afford, something has to give. The original cost scene illustrates the squeeze using every $100 of revenue.</p>
            <figure className="cost-chart"><figcaption>Illustrative costs per $100 of revenue</figcaption>
              <div className="cost-bars" aria-hidden="true">{costs.map(cost => <div key={cost.label}><span>{cost.label} · {cost.percent}%</span><div><i style={{ width: `${cost.percent}%` }} /></div></div>)}</div>
              <table><caption>Equivalent cost breakdown</caption><thead><tr><th scope="col">Cost</th><th scope="col">Share of revenue</th></tr></thead><tbody>{costs.map(cost => <tr key={cost.label}><th scope="row">{cost.label}</th><td>{cost.percent}%</td></tr>)}</tbody><tfoot><tr><th scope="row">Total costs</th><td>{totalCosts}%</td></tr></tfoot></table>
            </figure>
            <p className="result"><strong className="quantity">{totalCosts - 100}% over revenue.</strong> This is the story’s illustrative allocation, not a measured average for every restaurant.</p>
            <h3>The vicious cycle</h3>
            <ol><li>Rising costs erase thin margins.</li><li>Operators raise prices, reduce staff or cut hours.</li><li>Sticker shock drives customers away.</li><li>Lower volume puts further pressure on prices.</li></ol>
            <ContinueLink id="cost-sources">References for the cost chapter</ContinueLink>
          </Chapter>
          <Chapter index={3}>
            <h3>Who’s Cutting Back?</h3>
            <p>The original story records 81% of 18–34 year-olds cutting back, and 75% of Canadians reducing restaurant visits. The September 2025 report also describes 41% of B.C. restaurants operating at a loss or breaking even.</p>
            <p><Source url="https://vancouver.citynews.ca/2025/09/22/restaurants-struggle-as-more-canadians-look-for-value-dine-out-less-report/">CityNews · September 22, 2025</Source></p>
            <h3>The Map of Loss</h3><RestaurantMap />
            <h3>The Hollowing Out</h3>
            <p>The original story describes a barbell-shaped market: luxury dining at the top, chains at the bottom and independent mid-market restaurants caught between rising costs and price-sensitive customers.</p>
            <dl className="pressure-list"><div><dt>High-End Dining</dt><dd>$100+ per person · Hawksworth, Boulevard, Published on Main.</dd></div><div><dt>Mid-Market Casual</dt><dd>$15–30 per person · Local diners, family restaurants, neighbourhood bistros.</dd></div><div><dt>Quick Service</dt><dd>$10–15 per person · McDonalds, Subway, Chipotle.</dd></div></dl>
            <p className="control-note">Original story examples and price bands, not current menu quotations.</p>
          </Chapter>
          <Chapter index={4}>
            <h3>The Accelerant</h3>
            <p>During COVID-19, delivery apps promised to help struggling restaurants. The story examines how delivery fees added another pressure on both sides of the counter.</p>
            <table><caption>Original delivery-order illustration · tip not included</caption><thead><tr><th scope="col">Item</th><th scope="col">Amount</th></tr></thead><tbody>{order.map(item => <tr key={item.label}><th scope="row">{item.label}</th><td>{money(item.cents / 100)}</td></tr>)}</tbody><tfoot><tr><th scope="row">Total</th><td>{money(order.reduce((sum, item) => sum + item.cents, 0) / 100)}</td></tr></tfoot></table>
            <p className="state-note">Illustrative fee stack from the existing story, not a live order or a promise about any platform’s current fees.</p>
            <h3>The Provincial Fee Cap</h3>
            <p>The project’s 2025 research describes B.C.’s permanent 20% delivery-service fee cap, introduced in 2023, and platforms’ regulatory response fees. This historical policy description has not been updated to claim the law or fees in effect today.</p>
            <ContinueLink id="delivery-sources">Policy references · research accessed October 30, 2025</ContinueLink>
            <h3>The Math No Longer Adds Up</h3>
            <p>When a bowl of pho doubles in price but restaurants still struggle, the pressures reach beyond a single receipt. Vancouver’s restaurant industry is at a crossroads.</p>
          </Chapter>
          <section className="story-chapter source-section" aria-labelledby="sources"><h2 id="sources" tabIndex={-1}>Sources and research</h2>
            <p>This is the project’s 2015–2025 research, with original dates retained. Source links open independently; a source going offline does not remove the chapter.</p>
            <h3 id="cost-sources" tabIndex={-1}>Cost references</h3><ul className="source-links">
              <li><Source url="https://www.bcbc.com/insight/sticker-shock-food-prices-in-bc">Business Council of B.C. · Sticker shock: food prices in B.C.</Source></li>
              <li><Source url="https://news.gov.bc.ca/releases/2025LBR0001-000113">B.C. government · 2025 minimum wage increases</Source></li>
              <li><Source url="https://www.insurancebusinessmag.com/ca/news/sme/are-restaurants-facing-an-insurance-affordability-crisis-495506.aspx">Insurance Business Canada · Restaurant insurance affordability</Source></li>
            </ul><p className="control-note">Research access date: October 30, 2025. The allocation chart is the original Scene3 illustration.</p>
            <h3 id="delivery-sources" tabIndex={-1}>Delivery policy references</h3><ul className="source-links">
              <li><Source url="https://www2.gov.bc.ca/gov/content/employment-business/business/small-business/summary-of-the-food-delivery-service-fee-act">Province of B.C. · Summary of the Food Delivery Service Fee Act</Source></li>
              <li><Source url="https://foodondemand.com/01052023/canadas-first-permanent-delivery-fee-cap-kicks-off-in-british-columbia/">Food On Demand · January 5, 2023 fee-cap reporting</Source></li>
            </ul>
            <h3>Location research</h3><p><Source url="https://www.cbc.ca/news/canada/british-columbia/kent-s-kitchen-vancouver-chinatown-closing-1.6778600">CBC · Kent’s Kitchen closure</Source></p>
            <p>Individual closure records need editorial verification before use as a current registry. No location dates have been silently corrected.</p>
            <p><a href="/data/sources.json">Original menu source data (JSON)</a> · <a href="https://github.com/goatcheese98/scrollytellvancouver/blob/main/Vancouver%20Restaurant%20Squeeze%20Research%20Plan.md">Full research plan and bibliography</a></p>
          </section>
        </article>
      </div>
    </main>
    <footer className="story-footer">Vancouver Restaurant Squeeze · Research period 2015–2025</footer>
  </div>;
}
