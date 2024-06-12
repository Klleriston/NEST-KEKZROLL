CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE public.animes (
    anime_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    estudio VARCHAR(255),
    data_de_lancamento DATE
);

CREATE TABLE public.user_favorites (
    user_id INT REFERENCES public.users(id) ON DELETE CASCADE,
    anime_id INT REFERENCES public.animes(anime_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, anime_id)
);
