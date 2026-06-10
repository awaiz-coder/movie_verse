const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Fix for mongoose ObjectId
mongoose.Types.ObjectId = mongoose.Types.ObjectId;

const movies = [
  // Kannada Movies
  {
    title: "Kantara",
    description: "A human vs nature conflict set in a village in Karnataka. A demigod protects a village and its people, but there is a ripple effect when a human greedily tries to possess the divine land.",
    genre: ["Action", "Drama", "Thriller"],
    releaseYear: 2022,
    duration: "2h 28m",
    director: "Rishab Shetty",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtvL-vplyHGn_nLJPLbsfMwvkIN89ICfWokg&s",
    trailer: "https://youtu.be/8mrVmf239GU?si=ETzvtUWGzu-lng9g",
    language: "Kannada"
  },
  {
    title: "Kantara Chapter 1",
    description: "The prequel to Kantara exploring the origins of the divine conflict and the ancient traditions of the village.",
    genre: ["Action", "Drama", "Mythological"],
    releaseYear: 2024,
    duration: "2h 35m",
    director: "Rishab Shetty",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0TiCmUau-UhHBpC_8reT4w3WU2b8CArCzQ&s",
    trailer: "https://youtu.be/TMQUFhWm8C0?si=JpmwlSyjw_wqj8V2",
    language: "Kannada"
  },
  {
    title: "KGF Chapter 1",
    description: "The story revolves around Rocky, a young man who seeks power and wealth in order to fulfill his mother's promise. His journey takes him to Mumbai, where he gets involved in the gold mafia.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2018,
    duration: "2h 35m",
    director: "Prashanth Neel",
    poster: "https://www.filmibeat.com/wimg/desktop/2018/12/k-g-f_154512300430.jpg",
    trailer: "https://youtu.be/qXgF-iJ_ezE?si=1hryUnXXM8oYbQi1",
    language: "Kannada"
  },
  {
    title: "KGF Chapter 2",
    description: "Rocky continues his rise to power in the world of gold mafia. He must now face more powerful enemies and overcome greater challenges to maintain his dominance.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2022,
    duration: "2h 48m",
    director: "Prashanth Neel",
    poster: "https://i.pinimg.com/originals/f0/57/cf/f057cfe6acd9b9738902fd49e0b639cd.jpg",
    trailer: "https://youtu.be/jQsE85cI384?si=CSbvHf91HzqMPOie",
    language: "Kannada"
  },
  {
    title: "Googly",
    description: "A romantic comedy about a young man who falls in love with a girl but faces challenges due to their different personalities.",
    genre: ["Romance", "Comedy", "Drama"],
    releaseYear: 2013,
    duration: "2h 25m",
    director: "Pavan Kumar",
    poster: "https://images.jdmagicbox.com/comp/jd_social/news/2018jul31/image-176036-keyeatvawa.jpg",
    trailer: "https://youtu.be/QhhbBpzR2eA?si=SMqm8n6vCX7IohxZ",
    language: "Kannada"
  },
  {
    title: "777 Charlie",
    description: "The story of a lonely factory worker whose life changes when he adopts a Labrador named Charlie.",
    genre: ["Drama", "Adventure", "Comedy"],
    releaseYear: 2022,
    duration: "2h 44m",
    director: "Kiranraj K",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/19/777_Charlie_official_poster.jpg",
    trailer: "https://youtu.be/REqFOV2A7sI?si=05FU0LlRXxuM6yVK",
    language: "Kannada"
  },
  {
    title: "Ondu Motteya Kathe",
    description: "The story of a bald man searching for love and acceptance in a world obsessed with physical appearance.",
    genre: ["Comedy", "Drama", "Romance"],
    releaseYear: 2017,
    duration: "2h 15m",
    director: "Raj B. Shetty",
    poster: "https://upload.wikimedia.org/wikipedia/en/d/d8/Ondumotteyakathe.jpg",
    trailer: "https://youtu.be/UXv-9QdR3s8?si=kqB1P8Ot-UgX_o_z",
    language: "Kannada"
  },
  {
    title: "Ghost",
    description: "A thrilling story of a ghost who helps solve mysteries and fight injustice.",
    genre: ["Action", "Thriller", "Supernatural"],
    releaseYear: 2023,
    duration: "2h 20m",
    director: "Srinivas",
    poster: "https://m.media-amazon.com/images/M/MV5BNzNiNDJjZTgtNDFiYi00ODNhLWIzYjQtNDBlZDk4M2IxNDIwXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/lI2eFTLOFjI?si=Ti4n_N05eWtZ9iiW",
    language: "Kannada"
  },
  {
    title: "Vikrant Rona",
    description: "A mysterious thriller set in a village where a police officer investigates strange occurrences.",
    genre: ["Mystery", "Thriller", "Adventure"],
    releaseYear: 2022,
    duration: "2h 28m",
    director: "Anup Bhandari",
    poster: "https://m.media-amazon.com/images/M/MV5BNDEwMTNhYTAtYTlhZi00MzljLTg0NzEtODc0YzQ0YWYzMGE5XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/TrVZGbOqgv8?si=gU8pJv8n_eMhn7_G",
    language: "Kannada"
  },
  {
    title: "MAX",
    description: "An action-packed film about a man's journey to overcome his limits and achieve the impossible.",
    genre: ["Action", "Drama"],
    releaseYear: 2024,
    duration: "2h 25m",
    director: "V. Sathish",
    poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/max-2024-et00383005-1735288835.jpg",
    trailer: "https://youtu.be/jgUtOlged-c?si=6Jbh1L39laR3xnr-",
    language: "Kannada"
  },

  // Hindi Movies
  {
    title: "The Girlfriend",
    description: "A psychological thriller exploring complex relationships and hidden truths.",
    genre: ["Thriller", "Drama", "Mystery"],
    releaseYear: 2024,
    duration: "2h 15m",
    director: "Rohit Gupta",
    poster: "https://m.media-amazon.com/images/M/MV5BMTg3ODIwMjgtNWQ5MC00MDlkLWIzOWItMTY5M2UwN2JlZmE1XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/TYiE5GwZUdE?si=Rk4jGSyxgqGA2a8G",
    language: "Hindi"
  },
  {
    title: "Thamma",
    description: "An emotional story about family bonds and relationships.",
    genre: ["Drama", "Family"],
    releaseYear: 2024,
    duration: "2h 10m",
    director: "Amit Sharma",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_c7uxCdM1jYVC31i3p96209pmAHfXCGj-og&s",
    trailer: "https://youtu.be/Mod_oXpftJA?si=PmjAnBpZ7LkNat3k",
    language: "Hindi"
  },
  {
    title: "Ek Deewane Ki Deewaniyat",
    description: "A romantic musical about passionate love and artistic expression.",
    genre: ["Romance", "Musical", "Drama"],
    releaseYear: 2025,
    duration: "2h 30m",
    director: "Sameer Saxena",
    poster: "https://c.saavncdn.com/532/Deewaniyat-From-Ek-Deewane-Ki-Deewaniyat-Original-Motion-Picture-Soundtrack-Hindi-2025-20250827010315-500x500.jpg",
    trailer: "https://youtu.be/y9jtbWNAvXc?si=ttgyLOwdFl04zvGY",
    language: "Hindi"
  },
  {
    title: "Toxic",
    description: "A gritty drama about relationships gone wrong and their consequences.",
    genre: ["Drama", "Thriller"],
    releaseYear: 2024,
    duration: "2h 20m",
    director: "Anurag Kashyap",
    poster: "https://pbs.twimg.com/profile_images/1733008620571512832/Y4gwkSgb_400x400.jpg",
    trailer: "https://youtu.be/0PfErHA3zzQ?si=onP3fzU6OCOS5kgQ",
    language: "Hindi"
  },
  {
    title: "Ramayana",
    description: "Epic adaptation of the ancient Indian epic about Lord Rama's journey.",
    genre: ["Mythological", "Adventure", "Drama"],
    releaseYear: 2025,
    duration: "3h 15m",
    director: "Nitesh Tiwari",
    poster: "https://i.ytimg.com/vi/8HiWKbDTc7w/maxresdefault.jpg",
    trailer: "https://youtu.be/gzUu-FJ7s-Y?si=Y3z5vJinTFwap69M",
    language: "Hindi"
  },
  {
    title: "The TAJ Story",
    description: "Historical drama exploring the stories behind the construction of Taj Mahal.",
    genre: ["Historical", "Drama", "Romance"],
    releaseYear: 2024,
    duration: "2h 35m",
    director: "Ashutosh Gowariker",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJPS54ojzXPaksHeJORh4ZIKqtbuPwW271hQ&s",
    trailer: "https://youtu.be/rFDGTuwAnbk?si=TGz2e-3RTMT8tn2A",
    language: "Hindi"
  },
  {
    title: "Sikandar",
    description: "Action-packed story inspired by historical figures and their conquests.",
    genre: ["Action", "Historical", "Drama"],
    releaseYear: 2025,
    duration: "2h 45m",
    director: "AR Murugadoss",
    poster: "https://upload.wikimedia.org/wikipedia/en/4/4a/Sikandar_2025_film_poster.jpg",
    trailer: "https://youtu.be/l2AMaPCsJIQ?si=i3tWbeHEFjdCfa1Y",
    language: "Hindi"
  },
  {
    title: "Bhagwat Chapter 1: Raakshas",
    description: "Mythological fantasy based on ancient scriptures and demonic conflicts.",
    genre: ["Mythological", "Fantasy", "Action"],
    releaseYear: 2024,
    duration: "2h 40m",
    director: "Ravi Udyawar",
    poster: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Bhagwat_Chapter_One.jpg/250px-Bhagwat_Chapter_One.jpg",
    trailer: "https://youtu.be/7uBy1gkgWxQ?si=JBfYZuyCRpNAGK1C",
    language: "Hindi"
  },

  // Tamil Movies
  {
    title: "Dude",
    description: "Coming-of-age story about friendship, dreams, and urban life.",
    genre: ["Drama", "Comedy"],
    releaseYear: 2024,
    duration: "2h 25m",
    director: "Vikram Kumar",
    poster: "https://i.ytimg.com/vi/39x89Tl1vMI/maxresdefault.jpg",
    trailer: "https://youtu.be/39x89Tl1vMI?si=TSnMGDQCt09QRgAM",
    language: "Tamil"
  },
  {
    title: "Retro",
    description: "Nostalgic journey through time exploring music and relationships from different eras.",
    genre: ["Romance", "Musical", "Drama"],
    releaseYear: 2024,
    duration: "2h 30m",
    director: "Gautham Menon",
    poster: "https://i.scdn.co/image/ab67616d0000b2737319c10d5a5074154322bbdb",
    trailer: "https://youtu.be/yE560j3AK3A?si=7BseLxEBGBY3cqyU",
    language: "Tamil"
  },
  {
    title: "Vikram",
    description: "A special investigator discovers a case of serial killings is not what it seems to be, and leading down this path is only going to end in a war between everyone involved.",
    genre: ["Action", "Thriller"],
    releaseYear: 2022,
    duration: "2h 55m",
    director: "Lokesh Kanagaraj",
    poster: "https://m.media-amazon.com/images/M/MV5BMmViYjExY2UtMzZjOS00OGQ2LWEzNWYtNGYxY2NkY2RmMDE3XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/OKBMCL-frPU?si=mN3Cjdz6qcYvMs75",
    language: "Tamil"
  },
  {
    title: "Ten Hours",
    description: "Thriller about a race against time to solve a critical mystery.",
    genre: ["Thriller", "Mystery"],
    releaseYear: 2024,
    duration: "2h 15m",
    director: "Mohan Raja",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQ1YmVjNjAtZDRhYi00MDk0LThjYjEtNWM0Y2ZmZWEwNzUxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://youtu.be/LvY27Jospsc?si=ybZcPWKffbPkDKOG",
    language: "Tamil"
  },
  {
    title: "Jailer",
    description: "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker place. Can he emerge from this complex situation successfully?",
    genre: ["Action", "Comedy", "Drama"],
    releaseYear: 2023,
    duration: "2h 48m",
    director: "Nelson Dilipkumar",
    poster: "https://upload.wikimedia.org/wikipedia/en/c/cb/Jailer_2023_Tamil_film_poster.jpg",
    trailer: "https://youtu.be/Y5BeWdODPqo?si=J5xcotYfhu4XoF9a",
    language: "Tamil"
  },

  // Telugu Movies
  {
    title: "Salaar",
    description: "A gang leader tries to keep a promise made to his dying friend and takes on the other criminal gangs.",
    genre: ["Action", "Thriller"],
    releaseYear: 2023,
    duration: "2h 55m",
    director: "Prashanth Neel",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0p7b7LjUZPic6uzQpOSXOVH1w2bVEXwJWsw&s",
    trailer: "https://youtu.be/4GPvYMKtrtI?si=knrrtEgrzZzE6ne5",
    language: "Telugu"
  },
  {
    title: "Premalu",
    description: "Romantic comedy about modern relationships and misunderstandings.",
    genre: ["Romance", "Comedy"],
    releaseYear: 2024,
    duration: "2h 20m",
    director: "BVS Ravi",
    poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/premalu-telugu-et00389637-1709549109.jpg",
    trailer: "https://youtu.be/tQyEDwnwwsA?si=Pjh5N7LBepfwQbOc",
    language: "Telugu"
  },
  {
    title: "Guntur Kaaram",
    description: "Action drama set in the heart of Guntur with family conflicts and redemption.",
    genre: ["Action", "Drama", "Family"],
    releaseYear: 2024,
    duration: "2h 40m",
    director: "Trivikram Srinivas",
    poster: "https://upload.wikimedia.org/wikipedia/en/3/3e/Guntur_Kaaram_film_poster.jpg",
    trailer: "https://youtu.be/DYLG65xz55U?si=buGBAHsw4auWyciO",
    language: "Telugu"
  },
  {
    title: "Akhanda",
    description: "Story of divine intervention and the battle between good and evil.",
    genre: ["Action", "Mythological", "Drama"],
    releaseYear: 2021,
    duration: "2h 45m",
    director: "Boyapati Srinu",
    poster: "https://upload.wikimedia.org/wikipedia/en/c/c0/Akhanda_Poster.jpg",
    trailer: "https://youtu.be/CWnu8pQRCkQ?si=3N0q2bAUcIagHQzQ",
    language: "Telugu"
  },
  {
    title: "Sarkaru Vaari Paata",
    description: "A financial thriller about banking fraud and its impact on common people.",
    genre: ["Action", "Thriller", "Drama"],
    releaseYear: 2022,
    duration: "2h 35m",
    director: "Parasuram",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/17/Sarkaru_Vaari_Paata.jpg",
    trailer: "https://youtu.be/tVr9v3o7iHY?si=l97IUYYzVgi-2lYk",
    language: "Telugu"
  },
  {
    title: "They Call Him OG",
    description: "The rise of an underdog to become the Original Gangster in his world.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2024,
    duration: "2h 25m",
    director: "Sujeeth",
    poster: "https://m.media-amazon.com/images/M/MV5BMDI2N2M5ZjQtNDM2Yi00NjRlLThjOWEtZTI0NjJkOTdkN2ZlXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/_8J8LwoVH_0?si=XzBTb3XD7IU2M4O1",
    language: "Telugu"
  },

  // Malayalam Movies
  {
    title: "Turbo",
    description: "A young man with anger issues finds purpose in life when he starts a food delivery business.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2024,
    duration: "2h 30m",
    director: "Vysakh",
    poster: "https://upload.wikimedia.org/wikipedia/en/e/e2/Turbo_Poster.jpg",
    trailer: "https://youtu.be/LOE8ESPIMpE?si=6wuuxSsXBjMmOJ6C",
    language: "Malayalam"
  },
  {
    title: "Lokah",
    description: "Mythological fantasy exploring different realms and cosmic battles.",
    genre: ["Fantasy", "Mythological", "Adventure"],
    releaseYear: 2024,
    duration: "2h 35m",
    director: "Rohith VS",
    poster: "https://m.media-amazon.com/images/M/MV5BZThiYjY3ODUtOGM4Yy00OGE0LTliM2UtYjFlNDY0Mzg3OWJlXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/c6jz7rc6Uag?si=taSxmgTiPm0Gr-sO",
    language: "Malayalam"
  },
  {
    title: "Lucky Baskhar",
    description: "Comedy about a lucky man whose life takes unexpected turns.",
    genre: ["Comedy", "Drama"],
    releaseYear: 2024,
    duration: "2h 20m",
    director: "Venky Atluri",
    poster: "https://c.saavncdn.com/538/Lucky-Baskhar-Malayalam-Malayalam-2024-20241116180852-500x500.jpg",
    trailer: "https://youtu.be/EvFVXlalmXg?si=WMYWQhOhUEuf33gd",
    language: "Malayalam"
  },
  {
    title: "King of Kotha",
    description: "Gangster drama set in the underworld of Kotha with power struggles and redemption.",
    genre: ["Action", "Crime", "Drama"],
    releaseYear: 2023,
    duration: "2h 45m",
    director: "Abhilash Joshiy",
    poster: "https://m.media-amazon.com/images/M/MV5BZWFkODBlNjgtYzk1NS00MDA3LWJhM2QtNjU2YzgxMjY1OTRmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    trailer: "https://youtu.be/7tHHa20U1UI?si=QEF8nhLaUnqupLCO",
    language: "Malayalam"
  },
  {
    title: "RDX",
    description: "Action thriller about three friends and their fight for justice.",
    genre: ["Action", "Thriller", "Drama"],
    releaseYear: 2023,
    duration: "2h 25m",
    director: "Nahas Hidayath",
    poster: "https://m.media-amazon.com/images/M/MV5BNjk3YTkyZDUtYTgxYS00MTFjLTliNTEtZTAxNjE4N2UwNzcyXkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/NJjDRnE-5_4?si=EhbZlWWlUkiJ60wR",
    language: "Malayalam"
  },
  {
    title: "Thallumaala",
    description: "Musical action film with non-linear narrative and stylish presentation.",
    genre: ["Action", "Musical", "Comedy"],
    releaseYear: 2022,
    duration: "2h 15m",
    director: "Khalid Rahman",
    poster: "https://m.media-amazon.com/images/M/MV5BMjU3NmQ3NWMtNDZkOS00OTIwLTk0MjktYjNkNTI2YjQxMGY4XkEyXkFqcGc@._V1_.jpg",
    trailer: "https://youtu.be/s_OdRGbpKUA?si=BqTqqV63bfzXQUsb",
    language: "Malayalam"
  },
  {
    title: "Nadikar",
    description: "Story about the life and struggles of a popular actor.",
    genre: ["Drama", "Biographical"],
    releaseYear: 2024,
    duration: "2h 25m",
    director: "Lal Jr.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBTmaJ8zCGyF-dNDncxKnpQALxSJfGuHuehw&s",
    trailer: "https://youtu.be/A7y9yXGJtUs?si=_g1b7cUjCftI1dkq",
    language: "Malayalam"
  }
];

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@movieverse.com' });
    if (!adminExists) {
      // Create admin with plain password - the User model will hash it automatically
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@movieverse.com',
        password: 'admin123', // Plain password - will be hashed by User model pre-save hook
        role: 'admin',
        avatar: 'https://via.placeholder.com/150'
      });
      await adminUser.save();
      console.log('Admin user created successfully!');
      console.log('Email: admin@movieverse.com');
      console.log('Password: admin123');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://awaizkalyani_db_user:Awaiz%409747@cluster0.haavhvs.mongodb.net/movieverse');
    console.log('Connected to MongoDB');

    // Clear existing movies and create new ones
    await Movie.deleteMany({});
    console.log('Cleared existing movies');

    await Movie.insertMany(movies);
    console.log('Movies seeded successfully');

    // Create admin user
    await createAdminUser();

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();