import { makeAutoObservable } from "mobx";

export default class CommonStore {
    token: string | null | undefined = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setToken = (token: string | null) => {
        if (token) localStorage.setItem('jwt', token)
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}