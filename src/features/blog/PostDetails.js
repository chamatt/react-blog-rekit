import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Markdown } from 'react-showdown';

export class PostDetails extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { title: '', body: '', image: '', id: '' };

  handleDelete = id => {
    this.props.actions
      .deletarPost(id)
      .then(() => this.props.actions.obterPosts())
      .then(() => this.props.history.push('/'));
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.actions.obterPost(id).then(post => {
      const { title, body, image } = this.props.blog.post;
      this.setState({
        title,
        body,
        image,
        id,
      });
    });
  }

  render() {
    const { id, title, body, image } = this.state;
    let result;

    if (!this.props.blog.obterPostPending && _.isEmpty(this.props.blog.obterPostError)) {
        result = (
          <article class="details-post-container" data-post-id={id}>
            <div class="row">
              <div class="col-12">
                <div class="details-post-title wordwrap">
                  <span>{title || "Sem Título" }</span>
                </div>
              </div>

              <div class="col-12 d-flex justify-content-center align-items-center details-buttons">
                <Link to={`/edit/${id}`} className="btn btn-info">
                  Editar
                </Link>
                <a
                  className="btn btn-danger"
                  style={{ color: 'white' }}
                  onClick={() => this.handleDelete(id)}
                >
                  Deletar
                </a>
              </div>
              <div class="details-post-image col-12">
                <img src={image || 'https://bit.ly/2So2zvB'} alt="Erro" />
              </div>

              <div class="col-12">
                <div class="details-post-body wordwrap">
                  <span><Markdown markup={body}/></span>
                </div>
              </div>
            </div>
          </article>
        );
      
    } else if (this.props.blog.obterPostPending) {
      result = <div className="text-center">Carregando...</div>;
    } else if (!this.props.blog.obterPostPending && !_.isEmpty(this.props.blog.obterPostError)) {
      result = (
        <div className="alert alert-danger" role="alert">
          Não foi possível obter o post de id #{this.props.match.params.id}.
        </div>
      );
    }

    return <div className="blog-post-details">{result}</div>;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    blog: state.blog,
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
)(PostDetails);
