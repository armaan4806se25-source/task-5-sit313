import { useState } from "react";
import PopupModal from "../PopupModal";
import {
  questionSchema,
  articleSchema,
  toFieldErrors,
} from "../validation";

const emptyForm = { title: "", problem: "", abstract: "", body: "", tags: "" };

function Post() {
  // Which kind of post is selected -> drives conditional rendering
  const [postType, setPostType] = useState("question");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleTypeChange = (type) => {
    setPostType(type);
    setForm(emptyForm);
    setErrors({});
  };

  const handlePost = (e) => {
    e.preventDefault();

    const schema = postType === "question" ? questionSchema : articleSchema;
    const data =
      postType === "question"
        ? { title: form.title, problem: form.problem, tags: form.tags }
        : { title: form.title, abstract: form.abstract, body: form.body, tags: form.tags };

    const result = schema.safeParse(data);

    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      setPopup({
        type: "error",
        title: "Post not sent",
        message: "An error occurred. Please fix the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});
    // Saving to the database will be implemented in a future task
    setPopup({
      type: "success",
      title: "Post sent!",
      message: `Your ${postType} has been sent successfully.`,
    });
    setForm(emptyForm);
  };

  const closePopup = () => setPopup(null);

  const err = (name) =>
    errors[name] && <span className="field-error">{errors[name]}</span>;

  return (
    <section className="auth-page">
      <div className="post-card">
        <h1 className="post-heading">New Post</h1>

        {/* Post type selector */}
        <fieldset className="type-select">
          <legend>Select Post Type:</legend>
          <label className={postType === "question" ? "radio active" : "radio"}>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === "question"}
              onChange={() => handleTypeChange("question")}
            />
            Question
          </label>
          <label className={postType === "article" ? "radio active" : "radio"}>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === "article"}
              onChange={() => handleTypeChange("article")}
            />
            Article
          </label>
        </fieldset>

        <form onSubmit={handlePost} noValidate>
          <h2 className="post-subheading">What do you want to ask or share?</h2>
          <p className="post-hint">
            {postType === "question"
              ? "This section is designed based on the type of post. Describe your question clearly."
              : "This section is designed based on the type of post. Share your article with the community."}
          </p>

          {/* Title (both types) */}
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder={
                postType === "question"
                  ? "Start your question with how, what, why, etc."
                  : "Enter a descriptive title"
              }
              value={form.title}
              onChange={handleChange}
            />
            {err("title")}
          </div>

          {/* Conditional rendering: Question fields */}
          {postType === "question" && (
            <div className="field">
              <label htmlFor="problem">Describe your problem</label>
              <textarea
                id="problem"
                name="problem"
                rows="8"
                placeholder="Describe your problem in detail..."
                value={form.problem}
                onChange={handleChange}
              />
              {err("problem")}
            </div>
          )}

          {/* Conditional rendering: Article fields */}
          {postType === "article" && (
            <>
              <div className="field">
                <label htmlFor="abstract">Abstract</label>
                <textarea
                  id="abstract"
                  name="abstract"
                  rows="3"
                  placeholder="Enter a 1-paragraph abstract"
                  value={form.abstract}
                  onChange={handleChange}
                />
                {err("abstract")}
              </div>

              <div className="field">
                <label htmlFor="body">Article Text</label>
                <textarea
                  id="body"
                  name="body"
                  rows="12"
                  placeholder="Write your article here..."
                  value={form.body}
                  onChange={handleChange}
                />
                {err("body")}
              </div>
            </>
          )}

          {/* Tags (both types) */}
          <div className="field">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="Please add up to 5 tags, separated by commas (e.g. react, hooks)"
              value={form.tags}
              onChange={handleChange}
            />
            {err("tags")}
          </div>

          <div className="post-actions">
            <button className="primary-button" type="submit">
              Post
            </button>
          </div>
        </form>
      </div>

      {popup && <PopupModal {...popup} onClose={closePopup} />}
    </section>
  );
}

export default Post;
