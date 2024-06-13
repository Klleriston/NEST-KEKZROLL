import { Anime } from "src/anime/entities/anime.entity";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    favorites: Anime[];
}
