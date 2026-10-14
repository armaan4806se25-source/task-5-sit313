import Section from "../Section";
import ArticleCard from "../ArticleCard";
import TutorialCard from "../TutorialCard";

const articles = [
  {
    id: 1,
    title: "Getting Started with React",
    description: "Learn the basic ideas behind React components and JSX.",
    category: "React",
    rating: 5,
    author: "Ava"
  },
  {
    id: 2,
    title: "Understanding Node.js",
    description: "A simple introduction to server-side JavaScript with Node.js.",
    category: "NodeJS",
    rating: 5,
    author: "Liam"
  },
  {
    id: 3,
    title: "React Hooks Explained",
    description: "Understand useState and useEffect with practical examples.",
    category: "React Hooks",
    rating: 5,
    author: "Mia"
  }
];

const tutorials = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Build your confidence with variables, functions and arrays.",
    category: "JavaScript",
    rating: 5,
    author: "Noah"
  },
  {
    id: 2,
    title: "Build with React Router",
    description: "Learn how routing can organise a React application.",
    category: "React Router",
    rating: 5,
    author: "Emma"
  },
  {
    id: 3,
    title: "Create an Express API",
    description: "Learn the basics of creating routes with Express.js.",
    category: "Express",
    rating: 4.9,
    author: "Oliver"
  }
];

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">

          <span className="eyebrow">
            DEVELOP • LEARN • SHARE
          </span>

          <h1>
            Welcome to DEV@Deakin
          </h1>

        </div>
      </section>

      {/* Articles */}
      <Section
        title="Featured Articles"
        subtitle="Read practical content about modern software development."
        items={articles}
        CardComponent={ArticleCard}
        buttonText="See all articles"
      />

      {/* Tutorials */}
      <Section
        title="Featured Tutorials"
        subtitle="Follow step-by-step guides and improve your development skills."
        items={tutorials}
        CardComponent={TutorialCard}
        buttonText="See all tutorials"
      />
    </>
  );
}

export default Home;