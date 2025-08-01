-- Insert international movies and TV shows
INSERT INTO movies_tv_shows (title, original_title, type, director, budget, location, duration, year_time, genre, rating, description, video_url, language, country) VALUES

-- English Content
('Inception', NULL, 'Movie', 'Christopher Nolan', '$160M', 'LA, Paris, Tokyo', '148 min', '2010', 'Sci-Fi Thriller', 8.8, 'A thief who steals corporate secrets through dream-sharing technology', 'https://www.youtube.com/watch?v=YoHD9XEInc0', 'English', 'USA'),
('Breaking Bad', NULL, 'TV Show', 'Vince Gilligan', '$3M/ep', 'Albuquerque, New Mexico', '49 min/ep', '2008-2013', 'Crime Drama', 9.5, 'A chemistry teacher turned methamphetamine manufacturer', 'https://www.youtube.com/watch?v=HhesaQXLuRY', 'English', 'USA'),

-- Spanish Content
('Money Heist', 'La Casa de Papel', 'TV Show', 'Álex Pina', '$2M/ep', 'Madrid, Spain', '70 min/ep', '2017-2021', 'Crime Thriller', 8.2, 'A criminal mastermind manipulates hostages and police during a heist at the Royal Mint of Spain', 'https://www.youtube.com/watch?v=_InqQJRqGW4', 'Spanish', 'Spain'),
('Pan\'s Labyrinth', 'El Laberinto del Fauno', 'Movie', 'Guillermo del Toro', '$19M', 'Spain', '118 min', '2006', 'Fantasy Drama', 8.2, 'A young girl escapes into a fantasy world during the Spanish Civil War', 'https://www.youtube.com/watch?v=EqYiSlkvRuw', 'Spanish', 'Spain/Mexico'),
('Elite', 'Élite', 'TV Show', 'Carlos Montero', '$1.5M/ep', 'Madrid, Spain', '50 min/ep', '2018-present', 'Teen Drama', 7.5, 'Working-class students attend an exclusive private school', 'https://www.youtube.com/watch?v=QNwhAdrdwp0', 'Spanish', 'Spain'),

-- French Content
('Amélie', 'Le Fabuleux Destin d\'Amélie Poulain', 'Movie', 'Jean-Pierre Jeunet', '$10M', 'Paris, France', '122 min', '2001', 'Romantic Comedy', 8.3, 'A shy waitress decides to help those around her find happiness', 'https://www.youtube.com/watch?v=MhkNbOWimgM', 'French', 'France'),
('Call My Agent!', 'Dix Pour Cent', 'TV Show', 'Fanny Herrero', '$1.5M/ep', 'Paris, France', '52 min/ep', '2015-2020', 'Comedy Drama', 8.3, 'The daily lives of talent agents at a Parisian agency', 'https://www.youtube.com/watch?v=8B9dXNl4xeE', 'French', 'France'),
('Lupin', NULL, 'TV Show', 'George Kay', '$2M/ep', 'Paris, France', '45 min/ep', '2021-present', 'Crime Drama', 7.5, 'A master thief inspired by the adventures of Arsène Lupin', 'https://www.youtube.com/watch?v=ga0iTWXCGa0', 'French', 'France'),

-- German Content
('Dark', NULL, 'TV Show', 'Baran bo Odar', '$3M/ep', 'Berlin, Germany', '60 min/ep', '2017-2020', 'Sci-Fi Mystery', 8.7, 'A time travel conspiracy spans several generations in a German town', 'https://www.youtube.com/watch?v=rrwycJ08PSA', 'German', 'Germany'),
('The Lives of Others', 'Das Leben der Anderen', 'Movie', 'Florian Henckel von Donnersmarck', '$2M', 'Berlin, Germany', '137 min', '2006', 'Drama Thriller', 8.4, 'A Stasi agent becomes obsessed with the lives of a writer and his lover', 'https://www.youtube.com/watch?v=n3_iLOp6IhM', 'German', 'Germany'),
('Babylon Berlin', NULL, 'TV Show', 'Tom Tykwer', '$4M/ep', 'Berlin, Germany', '45 min/ep', '2017-present', 'Crime Drama', 8.4, 'A police inspector investigates a conspiracy in 1920s Berlin', 'https://www.youtube.com/watch?v=HAn3RXeCrLg', 'German', 'Germany'),

-- Japanese Content
('Spirited Away', '千と千尋の神隠し', 'Movie', 'Hayao Miyazaki', '$19M', 'Tokyo, Japan', '125 min', '2001', 'Animation Fantasy', 9.2, 'A girl enters a world ruled by gods and witches where humans are changed into beasts', 'https://www.youtube.com/watch?v=ByXuk9QqQkk', 'Japanese', 'Japan'),
('Attack on Titan', '進撃の巨人', 'TV Show', 'Tetsuro Araki', '$500K/ep', 'Tokyo, Japan', '24 min/ep', '2013-2023', 'Animation Action', 9.0, 'Humanity fights for survival against giant humanoid Titans', 'https://www.youtube.com/watch?v=LHtdKWJdif4', 'Japanese', 'Japan'),
('Your Name', '君の名は。', 'Movie', 'Makoto Shinkai', '$6M', 'Tokyo, Japan', '106 min', '2016', 'Animation Romance', 8.2, 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies', 'https://www.youtube.com/watch?v=xU47nhruN-Q', 'Japanese', 'Japan'),

-- Korean Content
('Parasite', '기생충', 'Movie', 'Bong Joon-ho', '$11M', 'Seoul, South Korea', '132 min', '2019', 'Thriller Drama', 8.5, 'A poor family schemes to become employed by a wealthy family', 'https://www.youtube.com/watch?v=5xH0HfJHsaY', 'Korean', 'South Korea'),
('Squid Game', '오징어 게임', 'TV Show', 'Hwang Dong-hyuk', '$2.4M/ep', 'Seoul, South Korea', '60 min/ep', '2021-present', 'Survival Drama', 8.0, 'Desperate contestants play deadly children\'s games for a massive cash prize', 'https://www.youtube.com/watch?v=oqxAJKy0ii4', 'Korean', 'South Korea'),
('Oldboy', '올드보이', 'Movie', 'Park Chan-wook', '$4M', 'Seoul, South Korea', '120 min', '2003', 'Thriller Mystery', 8.4, 'A man seeks vengeance after being imprisoned for 15 years without explanation', 'https://www.youtube.com/watch?v=2HkjrJ6IK5E', 'Korean', 'South Korea'),

-- Chinese Content
('Crouching Tiger, Hidden Dragon', '臥虎藏龍', 'Movie', 'Ang Lee', '$17M', 'Beijing, China', '120 min', '2000', 'Martial Arts Drama', 7.9, 'A young Chinese warrior steals a sword from a famed swordsman', 'https://www.youtube.com/watch?v=YhCHw0Ovqf4', 'Chinese', 'China/Taiwan'),
('The Untamed', '陈情令', 'TV Show', 'Chen Jialin', '$1M/ep', 'Hengdian, China', '45 min/ep', '2019', 'Fantasy Romance', 8.8, 'Two soulmates navigate a world of cultivation and supernatural beings', 'https://www.youtube.com/watch?v=lE2yz7hj3IM', 'Chinese', 'China'),
('Hero', '英雄', 'Movie', 'Zhang Yimou', '$30M', 'Beijing, China', '120 min', '2002', 'Martial Arts Drama', 7.9, 'A nameless warrior recounts his defeat of three assassins to the King of Qin', 'https://www.youtube.com/watch?v=o0hkDNLBNBs', 'Chinese', 'China'),

-- Hindi Content
('3 Idiots', NULL, 'Movie', 'Rajkumar Hirani', '$6.7M', 'Delhi, India', '170 min', '2009', 'Comedy Drama', 8.4, 'Two friends search for their long-lost companion who inspired them to think differently', 'https://www.youtube.com/watch?v=K0eDlFX9GMc', 'Hindi', 'India'),
('Sacred Games', NULL, 'TV Show', 'Anurag Kashyap', '$1.5M/ep', 'Mumbai, India', '50 min/ep', '2018-2019', 'Crime Thriller', 8.6, 'A policeman receives a call from a gangster who tells him he has 25 days to save Mumbai', 'https://www.youtube.com/watch?v=ua5WZ0g69wM', 'Hindi', 'India'),
('Dangal', NULL, 'Movie', 'Nitesh Tiwari', '$3.3M', 'Haryana, India', '161 min', '2016', 'Sports Drama', 8.4, 'A former wrestler trains his daughters to become world-class wrestlers', 'https://www.youtube.com/watch?v=x_7YlGv9u1g', 'Hindi', 'India'),

-- More Hindi Movies - Bollywood Classics and Modern
('Sholay', NULL, 'Movie', 'Ramesh Sippy', '$500K', 'Ramanagara, Karnataka', '198 min', '1975', 'Action Drama', 8.2, 'Two criminals are hired to capture a ruthless dacoit who terrorizes the region', 'https://www.youtube.com/watch?v=jXkMbJkTBl0', 'Hindi', 'India'),
('Lagaan', NULL, 'Movie', 'Ashutosh Gowariker', '$4M', 'Gujarat, India', '224 min', '2001', 'Sports Drama', 8.1, 'Villagers accept a challenge from British officers to play cricket to avoid paying taxes', 'https://www.youtube.com/watch?v=yDBvVAyGNUE', 'Hindi', 'India'),
('Zindagi Na Milegi Dobara', NULL, 'Movie', 'Zoya Akhtar', '$8M', 'Spain, India', '155 min', '2011', 'Adventure Comedy', 8.2, 'Three friends embark on a bachelor trip to Spain that changes their lives', 'https://www.youtube.com/watch?v=Hrn-nGHWbQE', 'Hindi', 'India'),
('Queen', NULL, 'Movie', 'Vikas Bahl', '$2M', 'Delhi, Paris, Amsterdam', '146 min', '2013', 'Comedy Drama', 8.2, 'A woman goes on her honeymoon alone after her fiancé calls off their wedding', 'https://www.youtube.com/watch?v=BUz0MQYzd4g', 'Hindi', 'India'),
('Gully Boy', NULL, 'Movie', 'Zoya Akhtar', '$9M', 'Mumbai, India', '153 min', '2019', 'Musical Drama', 7.9, 'A street rapper from Mumbai\'s slums rises to fame through his music', 'https://www.youtube.com/watch?v=JFcgOboQZ08', 'Hindi', 'India'),
('Taare Zameen Par', NULL, 'Movie', 'Aamir Khan', '$3M', 'Mumbai, India', '165 min', '2007', 'Family Drama', 8.4, 'A teacher helps a dyslexic child overcome his learning difficulties', 'https://www.youtube.com/watch?v=StlMbx2yjJw', 'Hindi', 'India'),
('Pink', NULL, 'Movie', 'Aniruddha Roy Chowdhury', '$4M', 'Delhi, India', '136 min', '2016', 'Social Thriller', 8.1, 'A lawyer fights for three women falsely accused in a molestation case', 'https://www.youtube.com/watch?v=846NXLhHjWo', 'Hindi', 'India'),
('Andhadhun', NULL, 'Movie', 'Sriram Raghavan', '$3M', 'Pune, India', '139 min', '2018', 'Black Comedy Thriller', 8.2, 'A blind pianist gets embroiled in a series of mysterious events', 'https://www.youtube.com/watch?v=2iVYI99VGaw', 'Hindi', 'India'),
('Article 15', NULL, 'Movie', 'Anubhav Sinha', '$2.5M', 'Uttar Pradesh, India', '130 min', '2019', 'Crime Drama', 8.1, 'A police officer investigates the disappearance of three girls from a small town', 'https://www.youtube.com/watch?v=LgPJOXUxLCg', 'Hindi', 'India'),
('Tumhari Sulu', NULL, 'Movie', 'Suresh Triveni', '$2M', 'Mumbai, India', '140 min', '2017', 'Comedy Drama', 7.1, 'A housewife becomes a radio jockey and discovers her hidden talents', 'https://www.youtube.com/watch?v=qcj6ief7XjE', 'Hindi', 'India'),

-- Hindi TV Shows - Modern Web Series
('Scam 1992', NULL, 'TV Show', 'Hansal Mehta', '$1M/ep', 'Mumbai, India', '60 min/ep', '2020', 'Financial Drama', 9.5, 'The rise and fall of stockbroker Harshad Mehta in 1990s India', 'https://www.youtube.com/watch?v=c3bhKASlALs', 'Hindi', 'India'),
('The Family Man', NULL, 'TV Show', 'Raj Nidimoru', '$2M/ep', 'Mumbai, Delhi, Chennai', '45 min/ep', '2019-2021', 'Action Thriller', 8.7, 'A middle-class man secretly works as an intelligence officer', 'https://www.youtube.com/watch?v=Vb54fmzKVf0', 'Hindi', 'India'),
('Mirzapur', NULL, 'TV Show', 'Karan Anshuman', '$1.5M/ep', 'Uttar Pradesh, India', '50 min/ep', '2018-2022', 'Crime Action', 8.4, 'Power struggles and violence in the lawless city of Mirzapur', 'https://www.youtube.com/watch?v=ZNeGF-PvRHY', 'Hindi', 'India'),
('Delhi Crime', NULL, 'TV Show', 'Richie Mehta', '$1.2M/ep', 'Delhi, India', '55 min/ep', '2019-2022', 'Crime Drama', 8.5, 'Based on the investigation of the 2012 Delhi gang rape case', 'https://www.youtube.com/watch?v=5K8KletPfW8', 'Hindi', 'India'),
('Arya', NULL, 'TV Show', 'Ram Madhvani', '$800K/ep', 'Mumbai, India', '25 min/ep', '2020', 'Psychological Thriller', 7.6, 'A woman discovers her daughter may be a psychopath', 'https://www.youtube.com/watch?v=IdQ_Vk0hFdE', 'Hindi', 'India'),
('Mumbai Diaries 26/11', NULL, 'TV Show', 'Nikkhil Advani', '$1.5M/ep', 'Mumbai, India', '45 min/ep', '2021', 'Medical Drama', 8.1, 'Medical staff at a hospital during the 2008 Mumbai terror attacks', 'https://www.youtube.com/watch?v=OKvYSqucSq4', 'Hindi', 'India'),
('Aspirants', NULL, 'TV Show', 'Apoorv Singh Karki', '$200K/ep', 'Delhi, India', '35 min/ep', '2021', 'Drama Comedy', 9.1, 'Three friends prepare for civil services examination in Delhi', 'https://www.youtube.com/watch?v=GcPqZ75wkPk', 'Hindi', 'India'),
('Rocket Boys', NULL, 'TV Show', 'Abhay Pannu', '$2M/ep', 'Mumbai, India', '60 min/ep', '2022', 'Historical Biography', 8.9, 'The story of scientists Homi Bhabha and Vikram Sarabhai', 'https://www.youtube.com/watch?v=AJZWBb2-jK4', 'Hindi', 'India'),
('Gullak', NULL, 'TV Show', 'Amrit Raj Gupta', '$300K/ep', 'Uttar Pradesh, India', '30 min/ep', '2019-2022', 'Family Comedy', 8.8, 'Heartwarming stories of a middle-class family in small-town India', 'https://www.youtube.com/watch?v=s09c3WRJMdw', 'Hindi', 'India'),
('Panchayat', NULL, 'TV Show', 'Deepak Kumar Mishra', '$400K/ep', 'Uttar Pradesh, India', '35 min/ep', '2020-2022', 'Comedy Drama', 8.9, 'An engineering graduate becomes a panchayat secretary in a remote village', 'https://www.youtube.com/watch?v=mojZJ7oeD_g', 'Hindi', 'India'),

-- Classic Hindi Movies - Golden Age of Bollywood
('Mughal-E-Azam', NULL, 'Movie', 'K. Asif', '$3M', 'Mumbai, India', '197 min', '1960', 'Historical Romance', 8.7, 'Epic tale of Prince Salim\'s love for court dancer Anarkali', 'https://www.youtube.com/watch?v=lchXWJnPHvI', 'Hindi', 'India'),
('Mother India', NULL, 'Movie', 'Mehboob Khan', '$1M', 'Maharashtra, India', '172 min', '1957', 'Family Drama', 8.1, 'A woman struggles to raise her sons and save her village', 'https://www.youtube.com/watch?v=QfAe6Z-bZkw', 'Hindi', 'India'),
('Pyaasa', NULL, 'Movie', 'Guru Dutt', '$500K', 'Mumbai, India', '146 min', '1957', 'Musical Drama', 8.4, 'A poet struggles for recognition in a materialistic world', 'https://www.youtube.com/watch?v=Ow7pwIDhl5c', 'Hindi', 'India'),
('Anand', NULL, 'Movie', 'Hrishikesh Mukherjee', '$300K', 'Mumbai, India', '122 min', '1971', 'Drama', 8.1, 'A terminally ill man spreads joy and optimism wherever he goes', 'https://www.youtube.com/watch?v=kShJNLkZ7h0', 'Hindi', 'India'),
('Dilwale Dulhania Le Jayenge', NULL, 'Movie', 'Aditya Chopra', '$2M', 'London, Punjab', '189 min', '1995', 'Romance', 8.1, 'Two young Indians fall in love during a trip to Europe', 'https://www.youtube.com/watch?v=Hq-IQZnPjHI', 'Hindi', 'India'),

-- Italian Content
('Life is Beautiful', 'La Vita è Bella', 'Movie', 'Roberto Benigni', '$20M', 'Tuscany, Italy', '116 min', '1997', 'Comedy Drama', 8.6, 'A Jewish father uses humor to shield his son from the horrors of a Nazi concentration camp', 'https://www.youtube.com/watch?v=pAYEQP8gx3w', 'Italian', 'Italy'),
('Gomorrah', 'Gomorra', 'TV Show', 'Stefano Sollima', '$2M/ep', 'Naples, Italy', '50 min/ep', '2014-2021', 'Crime Drama', 8.6, 'The story of the Neapolitan crime organization and the infighting for control', 'https://www.youtube.com/watch?v=g3sK5EvWcP4', 'Italian', 'Italy'),
('Cinema Paradiso', 'Nuovo Cinema Paradiso', 'Movie', 'Giuseppe Tornatore', '$5M', 'Sicily, Italy', '155 min', '1988', 'Drama Romance', 8.5, 'A filmmaker recalls his childhood when he fell in love with the movies', 'https://www.youtube.com/watch?v=_1nzEFMjkI4', 'Italian', 'Italy'),

-- Russian Content
('Leviathan', 'Левиафан', 'Movie', 'Andrey Zvyagintsev', '$2M', 'Murmansk, Russia', '140 min', '2014', 'Drama', 7.6, 'A man fights against corruption and injustice in a small Russian town', 'https://www.youtube.com/watch?v=3bJuY7zMBzY', 'Russian', 'Russia'),
('Better Than Us', 'Лучше, чем люди', 'TV Show', 'Andrey Junkovsky', '$1M/ep', 'Moscow, Russia', '48 min/ep', '2018-2019', 'Sci-Fi Drama', 7.2, 'A family\'s life changes when they acquire an advanced android', 'https://www.youtube.com/watch?v=Pp3OfJ9wHmU', 'Russian', 'Russia'),
('Loveless', 'Нелюбовь', 'Movie', 'Andrey Zvyagintsev', '$1.5M', 'Moscow, Russia', '127 min', '2017', 'Drama', 7.7, 'A couple going through a divorce must find their missing son', 'https://www.youtube.com/watch?v=NaFdAFr_f1U', 'Russian', 'Russia'),

-- Portuguese Content
('City of God', 'Cidade de Deus', 'Movie', 'Fernando Meirelles', '$3.3M', 'Rio de Janeiro, Brazil', '130 min', '2002', 'Crime Drama', 8.6, 'Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths', 'https://www.youtube.com/watch?v=dcUOO4Itgmw', 'Portuguese', 'Brazil'),
('Elite Squad', 'Tropa de Elite', 'Movie', 'José Padilha', '$4M', 'Rio de Janeiro, Brazil', '115 min', '2007', 'Action Crime', 8.0, 'The story of a police unit in Rio de Janeiro fighting drug dealers', 'https://www.youtube.com/watch?v=Pt7nSp0rDkA', 'Portuguese', 'Brazil'),
('3%', NULL, 'TV Show', 'Pedro Aguilera', '$1M/ep', 'São Paulo, Brazil', '46 min/ep', '2016-2020', 'Sci-Fi Thriller', 7.4, 'In a future where the elite live on an island paradise, young people compete for a chance to join them', 'https://www.youtube.com/watch?v=8yyzNQfaQR8', 'Portuguese', 'Brazil'),

-- Arabic Content
('Capernaum', 'كفرناحوم', 'Movie', 'Nadine Labaki', '$4M', 'Beirut, Lebanon', '126 min', '2018', 'Drama', 8.4, 'A Lebanese boy sues his parents for the life they have given him', 'https://www.youtube.com/watch?v=ULUo0048xZc', 'Arabic', 'Lebanon'),
('Omar', 'عمر', 'Movie', 'Hany Abu-Assad', '$2M', 'Palestine', '98 min', '2013', 'Drama Thriller', 7.5, 'A young Palestinian freedom fighter agrees to work as an informant', 'https://www.youtube.com/watch?v=NN6pL4vKI6Q', 'Arabic', 'Palestine'),
('Jinn', NULL, 'TV Show', 'Mir-Jean Bou Chaaya', '$500K/ep', 'Jordan', '45 min/ep', '2019', 'Supernatural Drama', 6.1, 'A teenager discovers she has supernatural powers in this Middle Eastern series', 'https://www.youtube.com/watch?v=lKCz6v5yb8k', 'Arabic', 'Jordan'),

-- Dutch Content
('The Vanishing', 'Spoorloos', 'Movie', 'George Sluizer', '$1M', 'Netherlands', '107 min', '1988', 'Mystery Thriller', 7.7, 'A man searches for his girlfriend who disappeared at a gas station', 'https://www.youtube.com/watch?v=ObisQHLmOEE', 'Dutch', 'Netherlands'),
('Penoza', NULL, 'TV Show', 'Pieter Bart Korthuis', '$800K/ep', 'Amsterdam, Netherlands', '50 min/ep', '2010-2017', 'Crime Drama', 8.1, 'A widow takes over her husband\'s criminal empire', 'https://www.youtube.com/watch?v=kQJHYFK3LTQ', 'Dutch', 'Netherlands'),

-- Swedish Content
('The Girl with the Dragon Tattoo', 'Män som hatar kvinnor', 'Movie', 'Niels Arden Oplev', '$13M', 'Stockholm, Sweden', '152 min', '2009', 'Crime Thriller', 7.8, 'A journalist and a hacker investigate a wealthy family\'s dark secrets', 'https://www.youtube.com/watch?v=WVLvMg62RPA', 'Swedish', 'Sweden'),
('Young Royals', 'Young Royals', 'TV Show', 'Lisa Ambjörn', '$1M/ep', 'Stockholm, Sweden', '45 min/ep', '2021-2024', 'Teen Drama', 8.2, 'A teenage prince falls in love with a fellow male student at his boarding school', 'https://www.youtube.com/watch?v=_kOHKWQqzgU', 'Swedish', 'Sweden'),

-- Norwegian Content
('The Worst Person in the World', 'Verdens verste menneske', 'Movie', 'Joachim Trier', '$3.5M', 'Oslo, Norway', '128 min', '2021', 'Romance Drama', 7.7, 'A young woman navigates her twenties in Oslo', 'https://www.youtube.com/watch?v=J6QBZM0mOSM', 'Norwegian', 'Norway'),
('Skam', NULL, 'TV Show', 'Julie Andem', '$200K/ep', 'Oslo, Norway', '20 min/ep', '2015-2017', 'Teen Drama', 8.7, 'Norwegian teens navigate high school life and relationships', 'https://www.youtube.com/watch?v=MEKOz0xtLWM', 'Norwegian', 'Norway'),

-- Danish Content
('The Hunt', 'Jagten', 'Movie', 'Thomas Vinterberg', '$2M', 'Denmark', '115 min', '2012', 'Drama', 8.3, 'A teacher\'s life spirals out of control when he is falsely accused', 'https://www.youtube.com/watch?v=NjG1OQJR7xE', 'Danish', 'Denmark'),
('Borgen', NULL, 'TV Show', 'Adam Price', '$1.5M/ep', 'Copenhagen, Denmark', '58 min/ep', '2010-2022', 'Political Drama', 8.5, 'A political drama about Denmark\'s first female Prime Minister', 'https://www.youtube.com/watch?v=OY1LzXLSiQM', 'Danish', 'Denmark'),

-- Finnish Content
('The Man Without a Past', 'Mies vailla menneisyyttä', 'Movie', 'Aki Kaurismäki', '$1.2M', 'Helsinki, Finland', '97 min', '2002', 'Comedy Drama', 7.7, 'A man with amnesia starts a new life in Helsinki', 'https://www.youtube.com/watch?v=qo1dn2hbhiE', 'Finnish', 'Finland'),
('Bordertown', 'Sorjonen', 'TV Show', 'Miikko Oikkonen', '$800K/ep', 'Lappeenranta, Finland', '45 min/ep', '2016-2020', 'Crime Drama', 7.8, 'A detective moves to a small border town and investigates local crimes', 'https://www.youtube.com/watch?v=lJd_3vWZKMo', 'Finnish', 'Finland');
