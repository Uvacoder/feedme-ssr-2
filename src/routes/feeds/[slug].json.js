import Parser from 'rss-parser';
import { getSingleFeed } from '$lib/services/feeds.service.js';
import { getPostsByFeed } from '$lib/services/posts.service.js';

const parser = new Parser();

export const get = async({params}) => {
  const {slug} = params;

  const singleFeed = await(getSingleFeed(slug));

  if(singleFeed) {

    const data = await getPostsByFeed(singleFeed.name);
    
    return {
      body: {
        data
      }
    }
  } else {
    return {
      body: {
        error: new error ('There was a problem getting the feed from database.')
      }
    }
  }
}