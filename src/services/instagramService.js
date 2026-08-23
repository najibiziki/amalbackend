const INSTAGRAM_GRAPH_URL = "https://graph.instagram.com";

export const getLatestInstagramPosts = async () => {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("INSTAGRAM_ACCESS_TOKEN is not configured");
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "timestamp",
    "like_count",
  ].join(",");

  const url = new URL(`${INSTAGRAM_GRAPH_URL}/me/media`);

  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", "10");
  url.searchParams.set("access_token", accessToken);

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Instagram API error: ${error}`);
  }

  const data = await response.json();

  return data.data.map((post) => ({
    id: post.id,
    image: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
    platform: "Instagram",
    likes: post.like_count ?? 0,
    caption: post.caption ?? "",
    date: formatInstagramDate(post.timestamp),
    url: post.permalink,
    mediaType: post.media_type,
  }));
};

const formatInstagramDate = (timestamp) => {
  if (!timestamp) return "";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(timestamp));
};
