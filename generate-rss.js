import { getBlogPostList } from '../src/helpers/file-helpers';
import fs from 'fs';
import RSS from 'rss';

async function generateRss() {
  console.log('posts');
  const rss = new RSS({
    title: 'Bits & Bytes',
    description: 'A wonderful blog about JavaScript',
    site_url: 'localhost:3000',
    feed_url: 'localhost:3000/rss.xml',
    pubDate: new Date(),
  });
  const posts = await getBlogPostList();
  posts.forEach((post) => {
    rss.item({
      title: post.title,
      description: post.abstract,
      url: `localhost:3000/${post.slug}`,
      guid: post.slug,
      date: new Date(post.pubDate),
    });
  });

  fs.writeFileSync('./public/rss.xml', rss.xml({ indent: true }));
}

generateRss();
