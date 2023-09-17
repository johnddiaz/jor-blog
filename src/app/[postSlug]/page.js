import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';

export async function generateMetadata({ params }) {
  const post = await loadBlogPost(params.postSlug);

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const post = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        abstract={post.frontmatter.abstract}
        title={post.frontmatter.title}
        publishedOn={post.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={post.content} components={{ pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
