import { Star } from "lucide-react";

function ArticleCard({ item }) {

  return (

    <article className="content-card">

      {/* Article Image */}
      <img
        className="card-image"
        src={`/images/article${item.id}.png`}
        alt={item.title}
      />

      <div className="card-body">

        {/* Category */}
        <span className="card-category">
          {item.category}
        </span>

        {/* Title */}
        <h3>
          {item.title}
        </h3>

        {/* Description */}
        <p>
          {item.description}
        </p>

        {/* Rating and Author */}
        <div className="card-meta">

          <span className="rating">

            <Star
              size={16}
              fill="currentColor"
            />

            {item.rating}

          </span>

          <span>
            Author: {item.author}
          </span>

        </div>

      </div>

    </article>
  );
}

export default ArticleCard;