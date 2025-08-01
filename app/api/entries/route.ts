import { type NextRequest, NextResponse } from "next/server"

// Mock database with international movies and TV shows
const mockDatabase: Array<{
  id: number
  title: string
  originalTitle?: string
  type: "Movie" | "TV Show"
  director: string
  budget: string
  location: string
  duration: string
  yearTime: string
  genre?: string
  rating?: number
  description?: string
  videoUrl?: string
  language: string
  country: string
  createdAt: string
  updatedAt: string
}> = [
  // English Content
  {
    id: 1,
    title: "Inception",
    type: "Movie",
    director: "Christopher Nolan",
    budget: "$160M",
    location: "LA, Paris, Tokyo",
    duration: "148 min",
    yearTime: "2010",
    genre: "Sci-Fi Thriller",
    rating: 8.8,
    description: "A thief who steals corporate secrets through dream-sharing technology",
    videoUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
    language: "English",
    country: "USA",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "TV Show",
    director: "Vince Gilligan",
    budget: "$3M/ep",
    location: "Albuquerque, New Mexico",
    duration: "49 min/ep",
    yearTime: "2008-2013",
    genre: "Crime Drama",
    rating: 9.5,
    description: "A chemistry teacher turned methamphetamine manufacturer",
    videoUrl: "https://www.youtube.com/embed/HhesaQXLuRY",
    language: "English",
    country: "USA",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  // Spanish Content
  {
    id: 3,
    title: "Money Heist",
    originalTitle: "La Casa de Papel",
    type: "TV Show",
    director: "Álex Pina",
    budget: "$2M/ep",
    location: "Madrid, Spain",
    duration: "70 min/ep",
    yearTime: "2017-2021",
    genre: "Crime Thriller",
    rating: 8.2,
    description: "A criminal mastermind manipulates hostages and police during a heist at the Royal Mint of Spain",
    videoUrl: "https://www.youtube.com/embed/_InqQJRqGW4",
    language: "Spanish",
    country: "Spain",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    title: "Pan's Labyrinth",
    originalTitle: "El Laberinto del Fauno",
    type: "Movie",
    director: "Guillermo del Toro",
    budget: "$19M",
    location: "Spain",
    duration: "118 min",
    yearTime: "2006",
    genre: "Fantasy Drama",
    rating: 8.2,
    description: "A young girl escapes into a fantasy world during the Spanish Civil War",
    videoUrl: "https://www.youtube.com/embed/EqYiSlkvRuw",
    language: "Spanish",
    country: "Spain/Mexico",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
  // French Content
  {
    id: 5,
    title: "Amélie",
    originalTitle: "Le Fabuleux Destin d'Amélie Poulain",
    type: "Movie",
    director: "Jean-Pierre Jeunet",
    budget: "$10M",
    location: "Paris, France",
    duration: "122 min",
    yearTime: "2001",
    genre: "Romantic Comedy",
    rating: 8.3,
    description: "A shy waitress decides to help those around her find happiness",
    videoUrl: "https://www.youtube.com/embed/MhkNbOWimgM",
    language: "French",
    country: "France",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
  },
  {
    id: 6,
    title: "Call My Agent!",
    originalTitle: "Dix Pour Cent",
    type: "TV Show",
    director: "Fanny Herrero",
    budget: "$1.5M/ep",
    location: "Paris, France",
    duration: "52 min/ep",
    yearTime: "2015-2020",
    genre: "Comedy Drama",
    rating: 8.3,
    description: "The daily lives of talent agents at a Parisian agency",
    videoUrl: "https://www.youtube.com/embed/8B9dXNl4xeE",
    language: "French",
    country: "France",
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
  },
  // German Content
  {
    id: 7,
    title: "Dark",
    type: "TV Show",
    director: "Baran bo Odar",
    budget: "$3M/ep",
    location: "Berlin, Germany",
    duration: "60 min/ep",
    yearTime: "2017-2020",
    genre: "Sci-Fi Mystery",
    rating: 8.7,
    description: "A time travel conspiracy spans several generations in a German town",
    videoUrl: "https://www.youtube.com/embed/rrwycJ08PSA",
    language: "German",
    country: "Germany",
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-07T00:00:00Z",
  },
  {
    id: 8,
    title: "The Lives of Others",
    originalTitle: "Das Leben der Anderen",
    type: "Movie",
    director: "Florian Henckel von Donnersmarck",
    budget: "$2M",
    location: "Berlin, Germany",
    duration: "137 min",
    yearTime: "2006",
    genre: "Drama Thriller",
    rating: 8.4,
    description: "A Stasi agent becomes obsessed with the lives of a writer and his lover",
    videoUrl: "https://www.youtube.com/embed/n3_iLOp6IhM",
    language: "German",
    country: "Germany",
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-08T00:00:00Z",
  },
  // Japanese Content
  {
    id: 9,
    title: "Spirited Away",
    originalTitle: "千と千尋の神隠し",
    type: "Movie",
    director: "Hayao Miyazaki",
    budget: "$19M",
    location: "Tokyo, Japan",
    duration: "125 min",
    yearTime: "2001",
    genre: "Animation Fantasy",
    rating: 9.2,
    description: "A girl enters a world ruled by gods and witches where humans are changed into beasts",
    videoUrl: "https://www.youtube.com/embed/ByXuk9QqQkk",
    language: "Japanese",
    country: "Japan",
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-09T00:00:00Z",
  },
  {
    id: 10,
    title: "Attack on Titan",
    originalTitle: "進撃の巨人",
    type: "TV Show",
    director: "Tetsuro Araki",
    budget: "$500K/ep",
    location: "Tokyo, Japan",
    duration: "24 min/ep",
    yearTime: "2013-2023",
    genre: "Animation Action",
    rating: 9.0,
    description: "Humanity fights for survival against giant humanoid Titans",
    videoUrl: "https://www.youtube.com/embed/LHtdKWJdif4",
    language: "Japanese",
    country: "Japan",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
  // Korean Content
  {
    id: 11,
    title: "Parasite",
    originalTitle: "기생충",
    type: "Movie",
    director: "Bong Joon-ho",
    budget: "$11M",
    location: "Seoul, South Korea",
    duration: "132 min",
    yearTime: "2019",
    genre: "Thriller Drama",
    rating: 8.5,
    description: "A poor family schemes to become employed by a wealthy family",
    videoUrl: "https://www.youtube.com/embed/5xH0HfJHsaY",
    language: "Korean",
    country: "South Korea",
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
  },
  {
    id: 12,
    title: "Squid Game",
    originalTitle: "오징어 게임",
    type: "TV Show",
    director: "Hwang Dong-hyuk",
    budget: "$2.4M/ep",
    location: "Seoul, South Korea",
    duration: "60 min/ep",
    yearTime: "2021-present",
    genre: "Survival Drama",
    rating: 8.0,
    description: "Desperate contestants play deadly children's games for a massive cash prize",
    videoUrl: "https://www.youtube.com/embed/oqxAJKy0ii4",
    language: "Korean",
    country: "South Korea",
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
  },
  // Chinese Content
  {
    id: 13,
    title: "Crouching Tiger, Hidden Dragon",
    originalTitle: "臥虎藏龍",
    type: "Movie",
    director: "Ang Lee",
    budget: "$17M",
    location: "Beijing, China",
    duration: "120 min",
    yearTime: "2000",
    genre: "Martial Arts Drama",
    rating: 7.9,
    description: "A young Chinese warrior steals a sword from a famed swordsman",
    videoUrl: "https://www.youtube.com/embed/YhCHw0Ovqf4",
    language: "Chinese",
    country: "China/Taiwan",
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
  },
  {
    id: 14,
    title: "The Untamed",
    originalTitle: "陈情令",
    type: "TV Show",
    director: "Chen Jialin",
    budget: "$1M/ep",
    location: "Hengdian, China",
    duration: "45 min/ep",
    yearTime: "2019",
    genre: "Fantasy Romance",
    rating: 8.8,
    description: "Two soulmates navigate a world of cultivation and supernatural beings",
    videoUrl: "https://www.youtube.com/embed/lE2yz7hj3IM",
    language: "Chinese",
    country: "China",
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
  },
  // Hindi Content
  {
    id: 15,
    title: "3 Idiots",
    type: "Movie",
    director: "Rajkumar Hirani",
    budget: "$6.7M",
    location: "Delhi, India",
    duration: "170 min",
    yearTime: "2009",
    genre: "Comedy Drama",
    rating: 8.4,
    description: "Two friends search for their long-lost companion who inspired them to think differently",
    videoUrl: "https://www.youtube.com/embed/K0eDlFX9GMc",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 16,
    title: "Sacred Games",
    type: "TV Show",
    director: "Anurag Kashyap",
    budget: "$1.5M/ep",
    location: "Mumbai, India",
    duration: "50 min/ep",
    yearTime: "2018-2019",
    genre: "Crime Thriller",
    rating: 8.6,
    description: "A policeman receives a call from a gangster who tells him he has 25 days to save Mumbai",
    videoUrl: "https://www.youtube.com/embed/ua5WZ0g69wM",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
  },
  // More Hindi Content - Bollywood Movies
  {
    id: 21,
    title: "Sholay",
    type: "Movie",
    director: "Ramesh Sippy",
    budget: "$500K",
    location: "Ramanagara, Karnataka",
    duration: "198 min",
    yearTime: "1975",
    genre: "Action Drama",
    rating: 8.2,
    description: "Two criminals are hired to capture a ruthless dacoit who terrorizes the region",
    videoUrl: "https://www.youtube.com/embed/jXkMbJkTBl0",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-21T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
  },
  {
    id: 22,
    title: "Lagaan",
    type: "Movie",
    director: "Ashutosh Gowariker",
    budget: "$4M",
    location: "Gujarat, India",
    duration: "224 min",
    yearTime: "2001",
    genre: "Sports Drama",
    rating: 8.1,
    description: "Villagers accept a challenge from British officers to play cricket to avoid paying taxes",
    videoUrl: "https://www.youtube.com/embed/yDBvVAyGNUE",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-22T00:00:00Z",
    updatedAt: "2024-01-22T00:00:00Z",
  },
  {
    id: 23,
    title: "Zindagi Na Milegi Dobara",
    type: "Movie",
    director: "Zoya Akhtar",
    budget: "$8M",
    location: "Spain, India",
    duration: "155 min",
    yearTime: "2011",
    genre: "Adventure Comedy",
    rating: 8.2,
    description: "Three friends embark on a bachelor trip to Spain that changes their lives",
    videoUrl: "https://www.youtube.com/embed/Hrn-nGHWbQE",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-23T00:00:00Z",
    updatedAt: "2024-01-23T00:00:00Z",
  },
  {
    id: 24,
    title: "Queen",
    type: "Movie",
    director: "Vikas Bahl",
    budget: "$2M",
    location: "Delhi, Paris, Amsterdam",
    duration: "146 min",
    yearTime: "2013",
    genre: "Comedy Drama",
    rating: 8.2,
    description: "A woman goes on her honeymoon alone after her fiancé calls off their wedding",
    videoUrl: "https://www.youtube.com/embed/BUz0MQYzd4g",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-24T00:00:00Z",
    updatedAt: "2024-01-24T00:00:00Z",
  },
  {
    id: 25,
    title: "Gully Boy",
    type: "Movie",
    director: "Zoya Akhtar",
    budget: "$9M",
    location: "Mumbai, India",
    duration: "153 min",
    yearTime: "2019",
    genre: "Musical Drama",
    rating: 7.9,
    description: "A street rapper from Mumbai's slums rises to fame through his music",
    videoUrl: "https://www.youtube.com/embed/JFcgOboQZ08",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-25T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
  },
  {
    id: 26,
    title: "Taare Zameen Par",
    type: "Movie",
    director: "Aamir Khan",
    budget: "$3M",
    location: "Mumbai, India",
    duration: "165 min",
    yearTime: "2007",
    genre: "Family Drama",
    rating: 8.4,
    description: "A teacher helps a dyslexic child overcome his learning difficulties",
    videoUrl: "https://www.youtube.com/embed/StlMbx2yjJw",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-26T00:00:00Z",
    updatedAt: "2024-01-26T00:00:00Z",
  },
  {
    id: 27,
    title: "Pink",
    type: "Movie",
    director: "Aniruddha Roy Chowdhury",
    budget: "$4M",
    location: "Delhi, India",
    duration: "136 min",
    yearTime: "2016",
    genre: "Social Thriller",
    rating: 8.1,
    description: "A lawyer fights for three women falsely accused in a molestation case",
    videoUrl: "https://www.youtube.com/embed/846NXLhHjWo",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-27T00:00:00Z",
    updatedAt: "2024-01-27T00:00:00Z",
  },
  {
    id: 28,
    title: "Andhadhun",
    type: "Movie",
    director: "Sriram Raghavan",
    budget: "$3M",
    location: "Pune, India",
    duration: "139 min",
    yearTime: "2018",
    genre: "Black Comedy Thriller",
    rating: 8.2,
    description: "A blind pianist gets embroiled in a series of mysterious events",
    videoUrl: "https://www.youtube.com/embed/2iVYI99VGaw",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-28T00:00:00Z",
    updatedAt: "2024-01-28T00:00:00Z",
  },
  {
    id: 29,
    title: "Article 15",
    type: "Movie",
    director: "Anubhav Sinha",
    budget: "$2.5M",
    location: "Uttar Pradesh, India",
    duration: "130 min",
    yearTime: "2019",
    genre: "Crime Drama",
    rating: 8.1,
    description: "A police officer investigates the disappearance of three girls from a small town",
    videoUrl: "https://www.youtube.com/embed/LgPJOXUxLCg",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-29T00:00:00Z",
    updatedAt: "2024-01-29T00:00:00Z",
  },
  {
    id: 30,
    title: "Tumhari Sulu",
    type: "Movie",
    director: "Suresh Triveni",
    budget: "$2M",
    location: "Mumbai, India",
    duration: "140 min",
    yearTime: "2017",
    genre: "Comedy Drama",
    rating: 7.1,
    description: "A housewife becomes a radio jockey and discovers her hidden talents",
    videoUrl: "https://www.youtube.com/embed/qcj6ief7XjE",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-30T00:00:00Z",
    updatedAt: "2024-01-30T00:00:00Z",
  },

  // Hindi TV Shows
  {
    id: 31,
    title: "Scam 1992",
    type: "TV Show",
    director: "Hansal Mehta",
    budget: "$1M/ep",
    location: "Mumbai, India",
    duration: "60 min/ep",
    yearTime: "2020",
    genre: "Financial Drama",
    rating: 9.5,
    description: "The rise and fall of stockbroker Harshad Mehta in 1990s India",
    videoUrl: "https://www.youtube.com/embed/c3bhKASlALs",
    language: "Hindi",
    country: "India",
    createdAt: "2024-01-31T00:00:00Z",
    updatedAt: "2024-01-31T00:00:00Z",
  },
  {
    id: 32,
    title: "The Family Man",
    type: "TV Show",
    director: "Raj Nidimoru",
    budget: "$2M/ep",
    location: "Mumbai, Delhi, Chennai",
    duration: "45 min/ep",
    yearTime: "2019-2021",
    genre: "Action Thriller",
    rating: 8.7,
    description: "A middle-class man secretly works as an intelligence officer",
    videoUrl: "https://www.youtube.com/embed/Vb54fmzKVf0",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: 33,
    title: "Mirzapur",
    type: "TV Show",
    director: "Karan Anshuman",
    budget: "$1.5M/ep",
    location: "Uttar Pradesh, India",
    duration: "50 min/ep",
    yearTime: "2018-2022",
    genre: "Crime Action",
    rating: 8.4,
    description: "Power struggles and violence in the lawless city of Mirzapur",
    videoUrl: "https://www.youtube.com/embed/ZNeGF-PvRHY",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-02T00:00:00Z",
    updatedAt: "2024-02-02T00:00:00Z",
  },
  {
    id: 34,
    title: "Delhi Crime",
    type: "TV Show",
    director: "Richie Mehta",
    budget: "$1.2M/ep",
    location: "Delhi, India",
    duration: "55 min/ep",
    yearTime: "2019-2022",
    genre: "Crime Drama",
    rating: 8.5,
    description: "Based on the investigation of the 2012 Delhi gang rape case",
    videoUrl: "https://www.youtube.com/embed/5K8KletPfW8",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-03T00:00:00Z",
    updatedAt: "2024-02-03T00:00:00Z",
  },
  {
    id: 35,
    title: "Arya",
    type: "TV Show",
    director: "Ram Madhvani",
    budget: "$800K/ep",
    location: "Mumbai, India",
    duration: "25 min/ep",
    yearTime: "2020",
    genre: "Psychological Thriller",
    rating: 7.6,
    description: "A woman discovers her daughter may be a psychopath",
    videoUrl: "https://www.youtube.com/embed/IdQ_Vk0hFdE",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-04T00:00:00Z",
    updatedAt: "2024-02-04T00:00:00Z",
  },
  {
    id: 36,
    title: "Mumbai Diaries 26/11",
    type: "TV Show",
    director: "Nikkhil Advani",
    budget: "$1.5M/ep",
    location: "Mumbai, India",
    duration: "45 min/ep",
    yearTime: "2021",
    genre: "Medical Drama",
    rating: 8.1,
    description: "Medical staff at a hospital during the 2008 Mumbai terror attacks",
    videoUrl: "https://www.youtube.com/embed/OKvYSqucSq4",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-05T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
  },
  {
    id: 37,
    title: "Aspirants",
    type: "TV Show",
    director: "Apoorv Singh Karki",
    budget: "$200K/ep",
    location: "Delhi, India",
    duration: "35 min/ep",
    yearTime: "2021",
    genre: "Drama Comedy",
    rating: 9.1,
    description: "Three friends prepare for civil services examination in Delhi",
    videoUrl: "https://www.youtube.com/embed/GcPqZ75wkPk",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-06T00:00:00Z",
    updatedAt: "2024-02-06T00:00:00Z",
  },
  {
    id: 38,
    title: "Rocket Boys",
    type: "TV Show",
    director: "Abhay Pannu",
    budget: "$2M/ep",
    location: "Mumbai, India",
    duration: "60 min/ep",
    yearTime: "2022",
    genre: "Historical Biography",
    rating: 8.9,
    description: "The story of scientists Homi Bhabha and Vikram Sarabhai",
    videoUrl: "https://www.youtube.com/embed/AJZWBb2-jK4",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-07T00:00:00Z",
    updatedAt: "2024-02-07T00:00:00Z",
  },
  {
    id: 39,
    title: "Gullak",
    type: "TV Show",
    director: "Amrit Raj Gupta",
    budget: "$300K/ep",
    location: "Uttar Pradesh, India",
    duration: "30 min/ep",
    yearTime: "2019-2022",
    genre: "Family Comedy",
    rating: 8.8,
    description: "Heartwarming stories of a middle-class family in small-town India",
    videoUrl: "https://www.youtube.com/embed/s09c3WRJMdw",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-08T00:00:00Z",
    updatedAt: "2024-02-08T00:00:00Z",
  },
  {
    id: 40,
    title: "Panchayat",
    type: "TV Show",
    director: "Deepak Kumar Mishra",
    budget: "$400K/ep",
    location: "Uttar Pradesh, India",
    duration: "35 min/ep",
    yearTime: "2020-2022",
    genre: "Comedy Drama",
    rating: 8.9,
    description: "An engineering graduate becomes a panchayat secretary in a remote village",
    videoUrl: "https://www.youtube.com/embed/mojZJ7oeD_g",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-09T00:00:00Z",
    updatedAt: "2024-02-09T00:00:00Z",
  },

  // Classic Hindi Movies
  {
    id: 41,
    title: "Mughal-E-Azam",
    type: "Movie",
    director: "K. Asif",
    budget: "$3M",
    location: "Mumbai, India",
    duration: "197 min",
    yearTime: "1960",
    genre: "Historical Romance",
    rating: 8.7,
    description: "Epic tale of Prince Salim's love for court dancer Anarkali",
    videoUrl: "https://www.youtube.com/embed/lchXWJnPHvI",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-10T00:00:00Z",
    updatedAt: "2024-02-10T00:00:00Z",
  },
  {
    id: 42,
    title: "Mother India",
    type: "Movie",
    director: "Mehboob Khan",
    budget: "$1M",
    location: "Maharashtra, India",
    duration: "172 min",
    yearTime: "1957",
    genre: "Family Drama",
    rating: 8.1,
    description: "A woman struggles to raise her sons and save her village",
    videoUrl: "https://www.youtube.com/embed/QfAe6Z-bZkw",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-11T00:00:00Z",
    updatedAt: "2024-02-11T00:00:00Z",
  },
  {
    id: 43,
    title: "Pyaasa",
    type: "Movie",
    director: "Guru Dutt",
    budget: "$500K",
    location: "Mumbai, India",
    duration: "146 min",
    yearTime: "1957",
    genre: "Musical Drama",
    rating: 8.4,
    description: "A poet struggles for recognition in a materialistic world",
    videoUrl: "https://www.youtube.com/embed/Ow7pwIDhl5c",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-12T00:00:00Z",
    updatedAt: "2024-02-12T00:00:00Z",
  },
  {
    id: 44,
    title: "Anand",
    type: "Movie",
    director: "Hrishikesh Mukherjee",
    budget: "$300K",
    location: "Mumbai, India",
    duration: "122 min",
    yearTime: "1971",
    genre: "Drama",
    rating: 8.1,
    description: "A terminally ill man spreads joy and optimism wherever he goes",
    videoUrl: "https://www.youtube.com/embed/kShJNLkZ7h0",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-13T00:00:00Z",
    updatedAt: "2024-02-13T00:00:00Z",
  },
  {
    id: 45,
    title: "Dilwale Dulhania Le Jayenge",
    type: "Movie",
    director: "Aditya Chopra",
    budget: "$2M",
    location: "London, Punjab",
    duration: "189 min",
    yearTime: "1995",
    genre: "Romance",
    rating: 8.1,
    description: "Two young Indians fall in love during a trip to Europe",
    videoUrl: "https://www.youtube.com/embed/Hq-IQZnPjHI",
    language: "Hindi",
    country: "India",
    createdAt: "2024-02-14T00:00:00Z",
    updatedAt: "2024-02-14T00:00:00Z",
  },
  {
    id: 46,
    title: "Sample Video 1",
    type: "Movie",
    director: "Test Director",
    budget: "$1M",
    location: "Test Location",
    duration: "120 min",
    yearTime: "2024",
    genre: "Test",
    rating: 8.0,
    description: "Sample video for testing direct video playback",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    language: "English",
    country: "Test",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 47,
    title: "Sample Video 2",
    type: "TV Show",
    director: "Test Director 2",
    budget: "$500K/ep",
    location: "Test Location 2",
    duration: "45 min/ep",
    yearTime: "2024",
    genre: "Test",
    rating: 7.5,
    description: "Another sample video for testing",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    language: "English",
    country: "Test",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },

  // Update nextId to continue from 46
]

let nextId = 48

// Validation schema
function validateEntry(data: any) {
  const errors: string[] = []

  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required")
  }

  if (!data.type || !["Movie", "TV Show"].includes(data.type)) {
    errors.push("Type must be either 'Movie' or 'TV Show'")
  }

  if (!data.director || typeof data.director !== "string" || data.director.trim().length === 0) {
    errors.push("Director is required")
  }

  if (!data.budget || typeof data.budget !== "string" || data.budget.trim().length === 0) {
    errors.push("Budget is required")
  }

  if (!data.location || typeof data.location !== "string" || data.location.trim().length === 0) {
    errors.push("Location is required")
  }

  if (!data.duration || typeof data.duration !== "string" || data.duration.trim().length === 0) {
    errors.push("Duration is required")
  }

  if (!data.yearTime || typeof data.yearTime !== "string" || data.yearTime.trim().length === 0) {
    errors.push("Year/Time is required")
  }

  if (!data.language || typeof data.language !== "string" || data.language.trim().length === 0) {
    errors.push("Language is required")
  }

  if (!data.country || typeof data.country !== "string" || data.country.trim().length === 0) {
    errors.push("Country is required")
  }

  if (data.rating !== undefined && (typeof data.rating !== "number" || data.rating < 0 || data.rating > 10)) {
    errors.push("Rating must be a number between 0 and 10")
  }

  return errors
}

// GET - Fetch entries with pagination, search, and filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const type = searchParams.get("type") || ""
    const language = searchParams.get("language") || ""

    let filteredEntries = [...mockDatabase]

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredEntries = filteredEntries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchLower) ||
          (entry.originalTitle && entry.originalTitle.toLowerCase().includes(searchLower)) ||
          entry.director.toLowerCase().includes(searchLower) ||
          entry.location.toLowerCase().includes(searchLower) ||
          entry.language.toLowerCase().includes(searchLower) ||
          entry.country.toLowerCase().includes(searchLower) ||
          (entry.genre && entry.genre.toLowerCase().includes(searchLower)),
      )
    }

    // Apply type filter
    if (type && type !== "all") {
      filteredEntries = filteredEntries.filter((entry) => entry.type === type)
    }

    // Apply language filter
    if (language && language !== "all") {
      filteredEntries = filteredEntries.filter((entry) => entry.language === language)
    }

    // Sort by creation date (newest first)
    filteredEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedEntries = filteredEntries.slice(startIndex, endIndex)

    const hasMore = endIndex < filteredEntries.length

    return NextResponse.json({
      entries: paginatedEntries,
      hasMore,
      total: filteredEntries.length,
      page,
      limit,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }
}

// POST - Create new entry
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate input
    const validationErrors = validateEntry(data)
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: "Validation failed", details: validationErrors }, { status: 400 })
    }

    // Create new entry
    const newEntry = {
      id: nextId++,
      title: data.title.trim(),
      originalTitle: data.originalTitle?.trim() || undefined,
      type: data.type,
      director: data.director.trim(),
      budget: data.budget.trim(),
      location: data.location.trim(),
      duration: data.duration.trim(),
      yearTime: data.yearTime.trim(),
      genre: data.genre?.trim() || undefined,
      rating: data.rating || undefined,
      description: data.description?.trim() || undefined,
      videoUrl: data.videoUrl?.trim() || undefined,
      language: data.language.trim(),
      country: data.country.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockDatabase.push(newEntry)

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 })
  }
}
