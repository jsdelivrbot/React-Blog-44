import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  onSubmit(values) {
    // this === component 
    console.log(values);
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}:</label>
          <input
            placeholder={field.placeholder}
            className="form-control"
            type="text"
            {...field.input}
          />
        {field.meta.error}
      </div>
    );
  }

  render() {
    // redux form is wired to PostNew, adds additional properties that are passed to component
    const { handleSubmit } = this.props;

    return (
      // redux form side of submittal, then our side where we take data and submit to back end
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          placeholder="Full Stack Web Development..."
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          placeholder="React, Node.js, Webpack..."
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          placeholder="I am currently building this sick app called...."
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  // values are the user inputs into the { title: 'asdf', categories: 'asdf', content: 'asdf'}
  const errors = {};

  // validate the inputs from 'values'
  if (!values.title) {
    errors.title = 'Please enter a title for your post.';
  }
  if (values.title && values.title.length < 3) {
    errors.title = 'Please enter a title longer than 3 characters.';
  }
  if (!values.categories) {
    errors.categories = 'Please enter at least one category.';
  }
  if (!values.content) {
    errors.content = 'Please enter some content please.';
  }

  // if errors empty, the form is fine to submit
  // if errors has *any* properties, reduc form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
