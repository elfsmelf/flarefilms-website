import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // === Blog posts with matching new pages ===
      {
        source: '/how-much-does-a-videographer-cost-per-hour',
        destination: '/blog/how-much-does-a-wedding-videographer-cost-per-hour',
        permanent: true,
      },
      {
        source: '/should-you-hire-a-wedding-videographer-for-your-wedding',
        destination: '/blog/should-you-hire-a-wedding-videographer',
        permanent: true,
      },
      {
        source: '/what-should-my-wedding-video-budget-be',
        destination: '/blog/what-should-my-wedding-video-budget-be',
        permanent: true,
      },
      {
        source: '/how-many-hours-of-wedding-videography-do-you-need',
        destination: '/blog/how-many-hours-of-wedding-videography-do-you-need',
        permanent: true,
      },
      {
        source: '/how-many-videographers-are-needed-for-a-wedding',
        destination: '/blog/how-many-videographers-are-needed-for-a-wedding',
        permanent: true,
      },
      // === Blog posts without direct match → /blog ===
      {
        source: '/how-to-set-your-wedding-videography-budget',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/is-a-wedding-videographer-worth-it',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/questions-to-ask-your-wedding-videographer',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/5-ways-to-make-your-wedding-videographers-job-easier',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/how-long-is-the-average-wedding-video',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/should-a-wedding-videographer-be-paid-in-full-before-the-wedding',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/a-guide-to-choosing-the-right-wedding-videographer-in-brisbane',
        destination: '/blog',
        permanent: true,
      },
      // === Pricing pages → /pricing ===
      {
        source: '/investment',
        destination: '/pricing',
        permanent: true,
      },
      // === Promotional pages → /promotion ===
      {
        source: '/wedding-videographer-promotion',
        destination: '/promotion',
        permanent: true,
      },
      {
        source: '/regional-qld-wedding-video-promotion',
        destination: '/promotion',
        permanent: true,
      },
      {
        source: '/win-a-discounted-wedding-collection',
        destination: '/promotion',
        permanent: true,
      },
      // === Other pages ===
      {
        source: '/wedding-guide',
        destination: '/blog',
        permanent: true,
      },

      // =====================================================
      // OLD WORDPRESS STRUCTURE REDIRECTS
      // =====================================================

      // === Main section redirects ===
      {
        source: '/wedding-video',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-venue',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/weddings',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/',
        destination: '/films',
        permanent: true,
      },

      // === Service page redirects ===
      {
        source: '/brisbane-wedding-videographer',
        destination: '/',
        permanent: true,
      },
      {
        source: '/brisbane-wedding-videographer/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/regional-qld-wedding-videographer',
        destination: '/',
        permanent: true,
      },
      {
        source: '/regional-qld-wedding-videographer/',
        destination: '/',
        permanent: true,
      },

      // === About page ===
      {
        source: '/about-richard',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about-richard/',
        destination: '/about',
        permanent: true,
      },

      // === Home variations ===
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/Wedding',
        destination: '/films',
        permanent: true,
      },

      // === Old content pages ===
      {
        source: '/wedding-advice',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/wedding-advice/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/wedding-videographer-tips',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/wedding-videographer-tips/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/wedding-videographer-brisbane/coming-soon',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wedding-videographer-brisbane/coming-soon/',
        destination: '/',
        permanent: true,
      },

      // === Shop/Product pages ===
      {
        source: '/shop',
        destination: '/',
        permanent: true,
      },
      {
        source: '/shop/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/digital-wedding-planner',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/digital-wedding-planner/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/album',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product/album/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-category/uncategorized',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-category/uncategorized/',
        destination: '/',
        permanent: true,
      },

      // === Gallery redirects ===
      {
        source: '/weddings/gallery-1',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-1/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-2',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-2/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-3',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-3/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-4',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/weddings/gallery-4/',
        destination: '/films',
        permanent: true,
      },

      // === Date archive ===
      {
        source: '/2020/11/21',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/2020/11/21/',
        destination: '/blog',
        permanent: true,
      },

      // === Category redirects ===
      {
        source: '/category/gold-coast-wedding-videographer',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/category/gold-coast-wedding-videographer/',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/category/gold-coast-wedding-videographer/page/:page*',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/category/wedding-videographer-brisbane',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/wedding-videographer-brisbane/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/wedding-videographer-brisbane/page/:page*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/wedding-videography-cost',
        destination: '/wedding-videographer-cost',
        permanent: true,
      },
      {
        source: '/category/wedding-videography-cost/',
        destination: '/wedding-videographer-cost',
        permanent: true,
      },
      {
        source: '/category/vows',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/vows/',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/engagements',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/category/engagements/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/category/for-photographers',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/category/for-photographers/',
        destination: '/blog',
        permanent: true,
      },

      // === Location/Venue category redirects ===
      {
        source: '/location/gold-coast',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/location/gold-coast/',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/venue-location/gold-coast',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/venue-location/gold-coast/',
        destination: '/gold-coast-wedding-videographer',
        permanent: true,
      },
      {
        source: '/venue-location/brisbane',
        destination: '/',
        permanent: true,
      },
      {
        source: '/venue-location/brisbane/',
        destination: '/',
        permanent: true,
      },
      {
        source: '/venue-categories/golf-club',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/venue-categories/golf-club/',
        destination: '/venues',
        permanent: true,
      },

      // =====================================================
      // WEDDING FILM REDIRECTS (old /wedding-video/ to /films/)
      // =====================================================
      {
        source: '/wedding-video/surat-wedding-film-elena-and-lachlan',
        destination: '/films/surat-wedding-film-elena-and-lachlan',
        permanent: true,
      },
      {
        source: '/wedding-video/surat-wedding-film-elena-and-lachlan/',
        destination: '/films/surat-wedding-film-elena-and-lachlan',
        permanent: true,
      },
      {
        source: '/wedding-video/st-george-wedding-film-jess-and-braydan',
        destination: '/films/st-george-wedding-film-jess-and-braydan',
        permanent: true,
      },
      {
        source: '/wedding-video/st-george-wedding-film-jess-and-braydan/',
        destination: '/films/st-george-wedding-film-jess-and-braydan',
        permanent: true,
      },
      {
        source: '/wedding-video/the-valley-estate-josh-and-nicole',
        destination: '/films/the-valley-estate-nicole-josh',
        permanent: true,
      },
      {
        source: '/wedding-video/the-valley-estate-josh-and-nicole/',
        destination: '/films/the-valley-estate-nicole-josh',
        permanent: true,
      },
      {
        source: '/wedding-video/coolibah-downs-wedding-film-danielle-and-peter',
        destination: '/films/coolibah-downs-wedding-film-danielle-and-peter',
        permanent: true,
      },
      {
        source: '/wedding-video/coolibah-downs-wedding-film-danielle-and-peter/',
        destination: '/films/coolibah-downs-wedding-film-danielle-and-peter',
        permanent: true,
      },
      {
        source: '/wedding-video/roma-street-parklands-wedding-ben-and-sierra',
        destination: '/films/roma-street-parklands-wedding-ben-and-sierra',
        permanent: true,
      },
      {
        source: '/wedding-video/roma-street-parklands-wedding-ben-and-sierra/',
        destination: '/films/roma-street-parklands-wedding-ben-and-sierra',
        permanent: true,
      },
      {
        source: '/wedding-video/austinvilla-estate-wedding-film-dani-and-adam',
        destination: '/films/austinvilla-estate-wedding-film-dani-and-adam',
        permanent: true,
      },
      {
        source: '/wedding-video/austinvilla-estate-wedding-film-dani-and-adam/',
        destination: '/films/austinvilla-estate-wedding-film-dani-and-adam',
        permanent: true,
      },
      {
        source: '/wedding-video/brisbane-marriot-hotel-wedding-dasuni-and-luke',
        destination: '/films/brisbane-marriot-hotel-wedding-dasuni-and-luke',
        permanent: true,
      },
      {
        source: '/wedding-video/brisbane-marriot-hotel-wedding-dasuni-and-luke/',
        destination: '/films/brisbane-marriot-hotel-wedding-dasuni-and-luke',
        permanent: true,
      },
      {
        source: '/wedding-video/hillstone-st-lucia-wedding-ben-and-maddy',
        destination: '/films/hillstone-st-lucia-wedding-ben-and-maddy',
        permanent: true,
      },
      {
        source: '/wedding-video/hillstone-st-lucia-wedding-ben-and-maddy/',
        destination: '/films/hillstone-st-lucia-wedding-ben-and-maddy',
        permanent: true,
      },
      {
        source: '/wedding-video/riverlife-wedding-venue-matt-and-rebecca',
        destination: '/films/riverlife-wedding-venue-matt-and-rebecca',
        permanent: true,
      },
      {
        source: '/wedding-video/riverlife-wedding-venue-matt-and-rebecca/',
        destination: '/films/riverlife-wedding-venue-matt-and-rebecca',
        permanent: true,
      },
      {
        source: '/wedding-video/factory-51-wedding-film-lewis-and-kristen',
        destination: '/films/factory-51-wedding-film-lewis-and-kristen',
        permanent: true,
      },
      {
        source: '/wedding-video/factory-51-wedding-film-lewis-and-kristen/',
        destination: '/films/factory-51-wedding-film-lewis-and-kristen',
        permanent: true,
      },
      {
        source: '/wedding-video/burleigh-heads-surf-club-brianna-and-jaelen-wedding-film',
        destination: '/films/brianna-and-jaelen',
        permanent: true,
      },
      {
        source: '/wedding-video/burleigh-heads-surf-club-brianna-and-jaelen-wedding-film/',
        destination: '/films/brianna-and-jaelen',
        permanent: true,
      },
      {
        source: '/wedding-video/plainlands-wedding-lauren-and-mitch',
        destination: '/films/plainlands-wedding-lauren-and-mitch',
        permanent: true,
      },
      {
        source: '/wedding-video/plainlands-wedding-lauren-and-mitch/',
        destination: '/films/plainlands-wedding-lauren-and-mitch',
        permanent: true,
      },
      {
        source: '/wedding-video/sunshine-coast-hinterland-wedding-jon-and-tiffanie',
        destination: '/films/sunshine-coast-hinterland-wedding-jon-and-tiffanie',
        permanent: true,
      },
      {
        source: '/wedding-video/sunshine-coast-hinterland-wedding-jon-and-tiffanie/',
        destination: '/films/sunshine-coast-hinterland-wedding-jon-and-tiffanie',
        permanent: true,
      },
      {
        source: '/wedding-video/bunnyconnellen-wedding-film-simone-and-ged',
        destination: '/films/bunnyconnellen-wedding-film-simone-and-ged',
        permanent: true,
      },
      {
        source: '/wedding-video/bunnyconnellen-wedding-film-simone-and-ged/',
        destination: '/films/bunnyconnellen-wedding-film-simone-and-ged',
        permanent: true,
      },
      {
        source: '/wedding-video/cherbon-waters-wedding-film-kasun-and-paula',
        destination: '/films/cherbon-waters-kasun-paula',
        permanent: true,
      },
      {
        source: '/wedding-video/cherbon-waters-wedding-film-kasun-and-paula/',
        destination: '/films/cherbon-waters-kasun-paula',
        permanent: true,
      },
      {
        source: '/wedding-video/casuarina-gold-coast-wedding-film-natasha-and-jono',
        destination: '/films/osteria-weddings-natasha-jono',
        permanent: true,
      },
      {
        source: '/wedding-video/casuarina-gold-coast-wedding-film-natasha-and-jono/',
        destination: '/films/osteria-weddings-natasha-jono',
        permanent: true,
      },
      // Films that no longer exist - redirect to /films
      {
        source: '/wedding-video/qld-state-rose-garden-wedding-cam-and-erin',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/qld-state-rose-garden-wedding-cam-and-erin/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/victoria-park-wedding-paul-and-olivia',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/victoria-park-wedding-paul-and-olivia/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/earth-house-wedding-chris-and-amelia',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/earth-house-wedding-chris-and-amelia/',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/parkwood-village-wedding-dean-and-jade',
        destination: '/films',
        permanent: true,
      },
      {
        source: '/wedding-video/parkwood-village-wedding-dean-and-jade/',
        destination: '/films',
        permanent: true,
      },

      // =====================================================
      // VENUE REDIRECTS (old /wedding-venue/ to /venues/)
      // =====================================================
      {
        source: '/wedding-venue/jubris-hideaway',
        destination: '/venues/jubris-hideaway',
        permanent: true,
      },
      {
        source: '/wedding-venue/jubris-hideaway/',
        destination: '/venues/jubris-hideaway',
        permanent: true,
      },
      {
        source: '/wedding-venue/white-chapel-kalbar',
        destination: '/venues/white-chapel-kalbar',
        permanent: true,
      },
      {
        source: '/wedding-venue/white-chapel-kalbar/',
        destination: '/venues/white-chapel-kalbar',
        permanent: true,
      },
      {
        source: '/wedding-venue/gabbinbar-homestead',
        destination: '/venues/gabbinbar-homestead',
        permanent: true,
      },
      {
        source: '/wedding-venue/gabbinbar-homestead/',
        destination: '/venues/gabbinbar-homestead',
        permanent: true,
      },
      {
        source: '/wedding-venue/sanctuary-cove',
        destination: '/venues/sanctuary-cove-country-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/sanctuary-cove/',
        destination: '/venues/sanctuary-cove-country-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/crystal-blue-yacht-charters',
        destination: '/venues/crystal-blue-yacht-charters',
        permanent: true,
      },
      {
        source: '/wedding-venue/crystal-blue-yacht-charters/',
        destination: '/venues/crystal-blue-yacht-charters',
        permanent: true,
      },
      {
        source: '/wedding-venue/ocean-view-estate',
        destination: '/venues/ocean-view-estates-winery-restaurant',
        permanent: true,
      },
      {
        source: '/wedding-venue/ocean-view-estate/',
        destination: '/venues/ocean-view-estates-winery-restaurant',
        permanent: true,
      },
      {
        source: '/wedding-venue/cowbell-creek',
        destination: '/venues/cowbell-creek',
        permanent: true,
      },
      {
        source: '/wedding-venue/cowbell-creek/',
        destination: '/venues/cowbell-creek',
        permanent: true,
      },
      {
        source: '/wedding-venue/summergrove-estate',
        destination: '/venues/summergrove-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/summergrove-estate/',
        destination: '/venues/summergrove-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/sirromet-winery',
        destination: '/venues/sirromet-winery',
        permanent: true,
      },
      {
        source: '/wedding-venue/sirromet-winery/',
        destination: '/venues/sirromet-winery',
        permanent: true,
      },
      {
        source: '/wedding-venue/crowne-plaza-surfers-paradise',
        destination: '/venues/crowne-plaza-surfers-paradise',
        permanent: true,
      },
      {
        source: '/wedding-venue/crowne-plaza-surfers-paradise/',
        destination: '/venues/crowne-plaza-surfers-paradise',
        permanent: true,
      },
      {
        source: '/wedding-venue/riverlife',
        destination: '/venues/riverlife',
        permanent: true,
      },
      {
        source: '/wedding-venue/riverlife/',
        destination: '/venues/riverlife',
        permanent: true,
      },
      {
        source: '/wedding-venue/kooroomba-vineyard-and-lavender-farm',
        destination: '/venues/kooroomba-vineyard-and-lavender-farm',
        permanent: true,
      },
      {
        source: '/wedding-venue/kooroomba-vineyard-and-lavender-farm/',
        destination: '/venues/kooroomba-vineyard-and-lavender-farm',
        permanent: true,
      },
      {
        source: '/wedding-venue/preston-peak-weddings',
        destination: '/venues/preston-peak-functions-winery',
        permanent: true,
      },
      {
        source: '/wedding-venue/preston-peak-weddings/',
        destination: '/venues/preston-peak-functions-winery',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-valley-estate',
        destination: '/venues/the-valley-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-valley-estate/',
        destination: '/venues/the-valley-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/st-stephens-chapel',
        destination: '/venues/st-stephens-chapel',
        permanent: true,
      },
      {
        source: '/wedding-venue/st-stephens-chapel/',
        destination: '/venues/st-stephens-chapel',
        permanent: true,
      },
      {
        source: '/wedding-venue/coolibah-downs-private-estate',
        destination: '/venues/coolibah-downs-private-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/coolibah-downs-private-estate/',
        destination: '/venues/coolibah-downs-private-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/crams-farm-at-midginbil',
        destination: '/venues/crams-farm',
        permanent: true,
      },
      {
        source: '/wedding-venue/crams-farm-at-midginbil/',
        destination: '/venues/crams-farm',
        permanent: true,
      },
      {
        source: '/wedding-venue/austinvilla-estate',
        destination: '/venues/austinvilla-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/austinvilla-estate/',
        destination: '/venues/austinvilla-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-island-gold-coast',
        destination: '/venues/the-island-gold-coast',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-island-gold-coast/',
        destination: '/venues/the-island-gold-coast',
        permanent: true,
      },
      {
        source: '/wedding-venue/victoria-park',
        destination: '/venues/victoria-park',
        permanent: true,
      },
      {
        source: '/wedding-venue/victoria-park/',
        destination: '/venues/victoria-park',
        permanent: true,
      },
      {
        source: '/wedding-venue/parkwood-village-weddings-special-events',
        destination: '/venues/parkwood-village-weddings-special-events',
        permanent: true,
      },
      {
        source: '/wedding-venue/parkwood-village-weddings-special-events/',
        destination: '/venues/parkwood-village-weddings-special-events',
        permanent: true,
      },
      {
        source: '/wedding-venue/customs-house',
        destination: '/venues/customs-house',
        permanent: true,
      },
      {
        source: '/wedding-venue/customs-house/',
        destination: '/venues/customs-house',
        permanent: true,
      },
      {
        source: '/wedding-venue/hillstone-st-lucia',
        destination: '/venues/hillstone-st-lucia',
        permanent: true,
      },
      {
        source: '/wedding-venue/hillstone-st-lucia/',
        destination: '/venues/hillstone-st-lucia',
        permanent: true,
      },
      {
        source: '/wedding-venue/bundaleer-rainforest-gardens',
        destination: '/venues/bundaleer-rainforest-gardens',
        permanent: true,
      },
      {
        source: '/wedding-venue/bundaleer-rainforest-gardens/',
        destination: '/venues/bundaleer-rainforest-gardens',
        permanent: true,
      },
      {
        source: '/wedding-venue/cedar-creek-estate',
        destination: '/venues/cedar-creek-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/cedar-creek-estate/',
        destination: '/venues/cedar-creek-estate',
        permanent: true,
      },
      {
        source: '/wedding-venue/earth-house',
        destination: '/venues/earthhouse',
        permanent: true,
      },
      {
        source: '/wedding-venue/earth-house/',
        destination: '/venues/earthhouse',
        permanent: true,
      },
      {
        source: '/wedding-venue/southport-yacht-club',
        destination: '/venues/southport-yacht-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/southport-yacht-club/',
        destination: '/venues/southport-yacht-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/midginbil-eco-resort',
        destination: '/venues/midginbil-eco-resort',
        permanent: true,
      },
      {
        source: '/wedding-venue/midginbil-eco-resort/',
        destination: '/venues/midginbil-eco-resort',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-refinery',
        destination: '/venues/the-refinery',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-refinery/',
        destination: '/venues/the-refinery',
        permanent: true,
      },
      {
        source: '/wedding-venue/cherbon-waters',
        destination: '/venues/cherbon-waters-garden-weddings',
        permanent: true,
      },
      {
        source: '/wedding-venue/cherbon-waters/',
        destination: '/venues/cherbon-waters-garden-weddings',
        permanent: true,
      },
      // Venues that redirect to /venues (no specific page exists)
      {
        source: '/wedding-venue/the-lussh',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/the-lussh/',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/qld-state-rose-garden',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/qld-state-rose-garden/',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/sheraton-grand-mirage',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/sheraton-grand-mirage/',
        destination: '/venues',
        permanent: true,
      },

      // === Old location-based venue URLs ===
      {
        source: '/wedding-venue/gold-coast/southport-yacht-club',
        destination: '/venues/southport-yacht-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/gold-coast/southport-yacht-club/',
        destination: '/venues/southport-yacht-club',
        permanent: true,
      },
      {
        source: '/wedding-venue/gold-coast/crowne-plaza-surfers-paradise',
        destination: '/venues/crowne-plaza-surfers-paradise',
        permanent: true,
      },
      {
        source: '/wedding-venue/gold-coast/crowne-plaza-surfers-paradise/',
        destination: '/venues/crowne-plaza-surfers-paradise',
        permanent: true,
      },
      {
        source: '/wedding-venue/gold-coast/parkwood-village-weddings-special-events',
        destination: '/venues/parkwood-village-weddings-special-events',
        permanent: true,
      },
      {
        source: '/wedding-venue/gold-coast/parkwood-village-weddings-special-events/',
        destination: '/venues/parkwood-village-weddings-special-events',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/st-stephens-chapel',
        destination: '/venues/st-stephens-chapel',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/st-stephens-chapel/',
        destination: '/venues/st-stephens-chapel',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/hillstone-st-lucia',
        destination: '/venues/hillstone-st-lucia',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/hillstone-st-lucia/',
        destination: '/venues/hillstone-st-lucia',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/victoria-park',
        destination: '/venues/victoria-park',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/victoria-park/',
        destination: '/venues/victoria-park',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/bundaleer-rainforest-gardens',
        destination: '/venues/bundaleer-rainforest-gardens',
        permanent: true,
      },
      {
        source: '/wedding-venue/brisbane/bundaleer-rainforest-gardens/',
        destination: '/venues/bundaleer-rainforest-gardens',
        permanent: true,
      },
      {
        source: '/wedding-venue/byron-bay/earth-house',
        destination: '/venues/earthhouse',
        permanent: true,
      },
      {
        source: '/wedding-venue/byron-bay/earth-house/',
        destination: '/venues/earthhouse',
        permanent: true,
      },
      {
        source: '/wedding-venue/toowoomba/gabbinbar-homestead',
        destination: '/venues/gabbinbar-homestead',
        permanent: true,
      },
      {
        source: '/wedding-venue/toowoomba/gabbinbar-homestead/',
        destination: '/venues/gabbinbar-homestead',
        permanent: true,
      },
      {
        source: '/wedding-venue/toowoomba/qld-state-rose-garden',
        destination: '/venues',
        permanent: true,
      },
      {
        source: '/wedding-venue/toowoomba/qld-state-rose-garden/',
        destination: '/venues',
        permanent: true,
      },
    ]
  },
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.flarefilms.com.au',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images-pw.pixieset.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.guestsnapper.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'old.flarefilms.com.au',
        pathname: '/wp-content/uploads/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    optimizeCss: true,
  },
};

export default nextConfig;
