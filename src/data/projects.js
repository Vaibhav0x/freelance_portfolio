// projects.js
export const projects = [
  {
    id: 1,
    title: "Youtube Search Suggestions",
    description: "A web application that provides real-time search suggestions for YouTube videos using a custom-built API.",
    tech: ["Python", "Django", "Django Rest Framework", "Tailwind", "ReactJs", "Framer Motion"],
    image: "📹",
    github: "https://github.com/Vaibhav0x/youtube-search-frontend",
    live: "https://yt-suggest-zeta.vercel.app/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 2,
    title: "Rweet Django Based Social Media Web App",
    description: "Full-stack application with user authentication, email verification, real-time updates, and a modern UI built with Django and django templates.",
    tech: ["Python", "Django", "Bootstrap", "PostgreSQL", "HTML", "CSS", "SMTP"],
    image: "🐦",
    github: "https://github.com/Vaibhav0x/TweetBlog",
    live: "https://rweetblog.onrender.com/rweet/",
    featured: true,
    category: "Full Stack"
  },
  {
    id: 3,
    title: "TransVox Transcription System",
    description: "Desktop Application for audio transcription with features like voice recognition, voice to text conversion, multi-language translation.",
    tech: ["Python", "QT Designer", "SQLite", "NLP", "Speech Recognition", "PyQt5"],
    image: "📝",
    github: "https://github.com/Vaibhav0x/TransVox",
    live: "https://vaibhav0x.github.io/Vaibhav-Portfolio/post.html?project=1",
    featured: true,
    category: "AI"
  },
  {
    id: 4,
    title: "BurNCode - Code Editor",
    description: "Collaborative code editor with real-time collaboration, syntax highlighting, and a modern UI built with React and Piston API.",
    tech: ["React", "JavaScript", "Chakra UI", "Piston API"],
    image: "💻",
    github: "https://github.com/Vaibhav0x/CodeEditor",
    live: "https://burncode.netlify.app/",
    featured: true,
    category: "Frontend"
  },
  {
    id: 5,
    title: "FilFusion: Movie Recommendation System",
    description: "AI-powered movie recommendation system with personalized suggestions, user reviews, and a sleek interface built with Streamlit.",
    tech: ["Python", "Machine Learning", "Streamlit"],
    image: "🎬",
    github: "https://github.com/Vaibhav0x/FilmFusion",
    live: "https://vaibhav0x.github.io/Vaibhav-Portfolio/post.html?project=2",
    featured: false,
    category: "AI"
  },
  {
    id: 6,
    title: "Spotify Clone: Frontend",
    description: "Beautiful music streaming interface with responsive design and modern UI components built with React.",
    tech: ["React", "JavaScript", "Tailwind"],
    image: "🎵",
    github: "https://github.com/Vaibhav0x/Spotify-Clone",
    live: "https://vaibhav-spotify-clone.netlify.app/",
    featured: false,
    category: "Frontend"
  }
];

// Auto-categorize projects
export const getProjectsByCategory = () => {
  const categories = {};

  projects.forEach(project => {
    const category = project.category || 'Other';
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(project);
  });

  return categories;
};

// Category metadata
export const categoryInfo = {
  'Full Stack': {
    icon: '⚡',
    gradient: 'from-blue-400 to-purple-500',
    description: 'End-to-end web applications'
  },
  'Frontend': {
    icon: '🎨',
    gradient: 'from-pink-400 to-rose-500',
    description: 'User interfaces & experiences'
  },
  'Backend': {
    icon: '⚙️',
    gradient: 'from-green-400 to-emerald-500',
    description: 'Server-side applications'
  },
  'AI': {
    icon: '🤖',
    gradient: 'from-orange-400 to-red-500',
    description: 'Machine learning & AI'
  },
  'Automation': {
    icon: '🔄',
    gradient: 'from-cyan-400 to-blue-500',
    description: 'Automated tools & scripts'
  }
};