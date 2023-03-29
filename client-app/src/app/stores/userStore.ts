import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/routes";
import { store } from "./store";

export default class UserStore {
  user?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.login(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => this.user = user);
      router.navigate('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  register = async (credentials: UserFormValues) => {
    try {
      const user = await agent.Account.register(credentials);
      store.commonStore.setToken(user.token);
      runInAction(() => this.user = user);
      router.navigate('/activities');
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  }

  logout = () => {
    store.commonStore.setToken(undefined);
    this.user = undefined;
    router.navigate('/');
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => this.user = user);
    } catch (error) {
      console.error(error);
    }
  }

  setImage = (image: string) => {
    if(this.user) this.user.image = image;
  }
}