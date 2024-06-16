import { Anime } from "src/anime/entities/anime.entity";

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    favorites: Anime[];
}
