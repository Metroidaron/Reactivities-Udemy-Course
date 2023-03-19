import { makeAutoObservable } from "mobx"

export interface iModal {
  open: boolean;
  body?: JSX.Element;
}

export default class ModalStore {
  modal: iModal = {
    open: false,
    body: undefined
  }

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  }

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = undefined;
  }
}