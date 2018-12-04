import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { PostBlog } from './';

export class BlogContainer extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.obterPosts();
  }

  render() {
    console.log(this.props.common.posts);
    return (
      <React.Fragment>
        <h1 className="text-center mt-4 blog-title-header">Posts</h1>
        <hr className="blog-title-separator" />
        <section className="blog-container" id="blog">
          {this.props.common.obterPostsPending && <div className="text-center">Carregando...</div>}
          {this.props.common.obterPostsError && (
            <div className="alert alert-danger" role="alert">
              Não foi possível obter os posts, tente novamente!
            </div>
          )}
          {!this.props.common.obterPostsPending && this.props.common.posts.length === 0 && (
            <div className="alert alert-info" role="alert">
              Nenhum post! Crie um novo!
            </div>
          )}
          {!this.props.common.obterPostsError && this.props.common.posts.length !== 0 &&
            this.props.common.posts
              .slice()
              .reverse()
              .map(post => <PostBlog key={post.id} postData={post} />)}
        </section>
      </React.Fragment>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogContainer);
