import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";
import PublicHead from "../../components/publicHead";
import DefaultLayout from "../../layouts/defaultLayout";
import PropTypes from "prop-types";

export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
        first_name: "",
        last_name: "",
        avatar : "",
        submitted: false,
    };
  }
    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { first_name, last_name,avatar } = this.state;
        
        if (!(first_name && last_name && avatar)) {
            return;
        }
        
        
        this.props.set(first_name, last_name,avatar)
    };

  render() {
    const { loading } = this.props;
    const { first_name, last_name,avatar, submitted  } = this.state;
    const title = 'Agregar Usuario';
    return (
      <DefaultLayout title={title}>
        <PublicHead title={title} />
          <div className="form-box">
              <form name="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                      <label htmlFor="first_name">Nombre</label>
                      <input
                          type="text"
                          name="first_name"
                          className={'form-input' + (submitted && !first_name ? ' error' : '')}
                          value={first_name}
                          onChange={this.handleChange}
                          disabled={loading}
                          placeholder="Juan"
                      />
                      {submitted && !first_name && (
                          <div className="error-block first_name">El nombre es obligatorio.</div>
                      )}
                  </div>
                  <div className="form-group">
                      <label htmlFor="last_name">Apellido</label>
                      <input
                          type="text"
                          name="last_name"
                          className={'form-input' + (submitted && !last_name ? ' error' : '')}
                          value={last_name}
                          onChange={this.handleChange}
                          disabled={loading}
                          placeholder="Alvear"
                      />
                      {submitted && !last_name && (
                          <div className="error-block last_name">Los apellidos son obligatorios.</div>
                      )}
                  </div>
                  <div className="form-group">
                      <label htmlFor="avatar">Avatar Url</label>
                      <input
                          type="text"
                          name="avatar"
                          className={'form-input' + (submitted && !avatar ? ' error' : '')}
                          value={avatar}
                          onChange={this.handleChange}
                          disabled={loading}
                          placeholder="https://example.com/mypic.jpg"
                      />
                      {submitted && !avatar && (
                          <div className="error-block avatar">Se requiere un avatar.</div>
                      )}
                  </div>
                  <div className="form-group">
                      <button className="form-btn" disabled={loading}>
                          {loading ? <><i className="fas fa-spinner  fa-spin"/> Cargando</> : "Guardar"}
                      </button>
                  </div>
              </form>
          </div>
      </DefaultLayout>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.edit.loading
});
const mapDispatchToProps = dispatch => {
  const {  set  } = actions;
  return bindActionCreators({ set }, dispatch);
};
Add.propTypes = {
    loading : PropTypes.bool,
    set: PropTypes.func,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
