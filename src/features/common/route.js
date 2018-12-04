import { BlogContainer, AddPost } from './';
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

export default {
  path: 'common',
  name: 'Common',
  childRoutes: [
    { path: '/', name: 'Blog container', component: BlogContainer },
    { path: '/new', name: 'Add post', component: AddPost },
  ],
};