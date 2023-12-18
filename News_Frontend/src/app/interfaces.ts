
export interface user {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    is_author: boolean;
}

export interface publisher {
    id: number;
    name: string;
}

export interface author {
    id: number;
    user: number;
    publisher: number;
}

export interface news {
    id: number;
    title: string;
    description: string;
    content: string;
    published_by: number;
    //date: string;
}

export interface interest {
    id: number;
    name: string;
}
