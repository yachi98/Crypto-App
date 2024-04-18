export interface CoinPage {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  web_slug: string;
  asset_platform_id: string | null;
  platforms: { [key: string]: string };
  detail_platforms: {
    [key: string]: { decimal_place: number | null; contract_address: string };
  };
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    bitcointalk_thread_identifier: number | null;
    telegram_channel_identifier: string;
    subreddit_url: string;
    repos_url: { github: string[]; bitbucket: string[] };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: { [key: string]: number };
    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: number | null;
    ath: { [key: string]: number };
    ath_change_percentage: { [key: string]: number };
    ath_date: { [key: string]: string };
    atl: { [key: string]: number };
    atl_change_percentage: { [key: string]: number };
    atl_date: { [key: string]: string };
    market_cap: { [key: string]: number };
    market_cap_rank: number;
    fully_diluted_valuation: { [key: string]: number };
    market_cap_fdv_ratio: number;
    total_volume: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: 5.09821;
    price_change_24h_in_currency: { [key: string]: number };
    price_change_percentage_1h_in_currency: { [key: string]: number };
    price_change_percentage_24h_in_currency: { [key: string]: number };
    price_change_percentage_7d_in_currency: { [key: string]: number };
    price_change_percentage_14d_in_currency: { [key: string]: number };
    price_change_percentage_30d_in_currency: { [key: string]: number };
    price_change_percentage_60d_in_currency: { [key: string]: number };
    price_change_percentage_200d_in_currency: { [key: string]: number };
    price_change_percentage_1y_in_currency: { [key: string]: number };
    market_cap_change_24h_in_currency: { [key: string]: number };
    market_cap_change_percentage_24h_in_currency: { [key: string]: number };
    total_supply: number;
    max_supply: number;
    circulating_supply: number;
    sparkline_7d: { price: number[] };
    last_updated: string;
  };
  community_data: {
    facebook_likes: number | null;
    twitter_followers: number;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number;
    reddit_accounts_active_48h: number;
    telegram_channel_user_count: number | null;
  };
  public_interest_stats: {
    alexa_rank: number;
    bing_matches: number | null;
  };
  status_updates: string[];
  last_updated: string;
}

// export interface Description {
//   en: string;
// }
