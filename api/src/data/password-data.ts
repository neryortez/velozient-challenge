import { CardDto } from "../models/card.dto";

export const PASSWORD_DATA_TOKEN = "PASSWORD_DATA_TOKEN";

export let PASSWORD_DATA: CardDto[] = [
    {
        name: "GMail",
        url: "https://google.com",
        username: "my-email@gmail.com",
        password: "myGMailPassword",
    },
    {
        name: "Facebook",
        url: "https://facebook.com",
        username: "my-email@gmail.com",
        password: "myFacebookPassword",
    },
    {
        name: "GitHub",
        url: "https://github.com",
        username: "my-email@gmail.com",
        password: "myGitHubPassword",
    },
    {
        name: "Youtube",
        url: "https://youtube.com",
        username: "my-email@gmail.com",
        password: "myYoutubePassword",
    },
    {
        name: "Outlook",
        url: "https://outlook.com",
        username: "my-email@outlook.com",
        password: "myMailPassword",
    },
    {
        name: "Twitter",
        url: "https://twitter.com",
        username: "my-email@twitter.com",
        password: "myMailPassword",
    },
];
