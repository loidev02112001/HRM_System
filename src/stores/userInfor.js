import { defineStore } from 'pinia';

export const userInforStore = defineStore('userInfor', {
  state: () => {
    return {
      accountAvatar: '',
      accountEmail: '',
      accountId: '',
      accountName: '',
      accountRole: [],
      accountStatus: ''
    };
  },
  actions: {
    getUserInfor(values) {
      this.accountAvatar = values.accountAvatar;
      this.accountEmail = values.accountEmail;
      this.accountId = values.accountId;
      this.accountName = values.accountName;
      this.accountRole = values.accountRole;
      this.accountStatus = values.accountStatus;
    }
  },
  persist: true
});
