// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { AddPost, BlogContainer, PostDetails, EditPost } from './';

export default {
  path: 'blog',
  name: 'Blog',
  childRoutes: [
    { path: '/new', name: 'Add post', component: AddPost },
    { path: '/', name: 'Blog container', component: BlogContainer },
    { path: '/details/:id', name: 'Blog container', component: PostDetails },
    { path: '/edit/:id', name: 'Blog container', component: EditPost },
  ],
};
